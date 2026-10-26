const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // PostgreSQL pool इम्पोर्ट करें
const sendEmail = require('../services/emailService');
const sendSMS = require('../services/smsService');
const crypto = require('crypto');

// 1. वेंडर रजिस्ट्रेशन रूट (PostgreSQL के साथ)
router.post('/register', async (req, res) => {
  try {
    const { shopName, ownerName, phone, email, password } = req.body;
    const storeName = "LUXURYSTORE";

    // चेक करें कि डेटाबेस में ईमेल या फोन पहले से रजिस्टर्ड है या नहीं
    const existingVendor = await pool.query(
      'SELECT * FROM vendors WHERE email = $1 OR phone = $2', 
      [email, phone]
    );

    if (existingVendor.rows.length > 0) {
      return res.status(400).json({ success: false, message: "यह ईमेल या फोन नंबर पहले से LUXURYSTORE में रजिस्टर्ड है हुकुम!" });
    }

    // पासवर्ड सिक्योर करना (Bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // नया वेंडर PostgreSQL डेटाबेस में सेव करें
    await pool.query(
      `INSERT INTO vendors (shop_name, owner_name, phone, email, password, otp, is_verified, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, false, false)`,
      [shopName, ownerName, phone, email, hashedPassword, otp]
    );

    // 🚀 ईमेल और मोबाइल SMS पर OTP भेजें
    try {
      await sendEmail(email, ownerName, otp, storeName);
      await sendSMS(phone, otp, storeName);
    } catch (notifErr) {
      console.warn("⚠️ नोटिफिकेशन भेजने में वार्निंग:", notifErr.message);
    }

    res.json({ 
      success: true, 
      message: "LUXURYSTORE डेटाबेस में सुरक्षित रजिस्टर हो गया! आपके ईमेल और मोबाइल दोनों पर OTP भेज दिया गया है हुकुम।" 
    });

  } catch (err) {
    console.error("❌ रजिस्ट्रेशन एरर:", err);
    res.status(500).json({ success: false, message: "सर्वर एरर आ गई हुकुम!", error: err.message });
  }
});

// 2. OTP वेरिफिकेशन रूट
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await pool.query('SELECT * FROM vendors WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "वेंडर नहीं मिला!" });
    }

    const vendor = result.rows[0];

    if (vendor.otp === otp) {
      await pool.query(
        'UPDATE vendors SET is_verified = TRUE, is_active = TRUE, otp = NULL WHERE email = $1', 
        [email]
      );

      const token = jwt.sign(
        { id: vendor.id, email: vendor.email }, 
        process.env.JWT_SECRET || 'LUXURYSTORE_AMAZON_SECRET_KEY', 
        { expiresIn: '1d' }
      );
      
      res.json({ success: true, message: "LUXURYSTORE अकाउंट पूरी तरह वेरीफाई और एक्टिव हो गया है!", token });
    } else {
      res.status(400).json({ success: false, message: "गलत OTP है हुकुम!" });
    }
  } catch (err) {
    console.error("❌ वेरिफिकेशन एरर:", err);
    res.status(500).json({ success: false, message: "वेरिफिकेशन में दिक्कत आ गई!" });
  }
});

// 3. वेंडर लॉगिन रूट
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM vendors WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "वेंडर नहीं मिला!" });
        }

        const vendor = result.rows[0];
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "गलत पासवर्ड!" });
        }

        const token = jwt.sign(
            { vendorId: vendor.id, email: vendor.email },
            process.env.JWT_SECRET || 'LUXURYSTORE_AMAZON_SECRET_KEY',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: "लॉगिन सफल!",
            token: token,
            vendor: { id: vendor.id, name: vendor.owner_name, email: vendor.email }
        });
    } catch (error) {
        console.error("❌ लॉगिन एरर:", error);
        res.status(500).json({ success: false, message: "सर्वर एरर, कृपया बाद में कोशिश करें।" });
    }
});

// 4. वेंडर प्रोफाइल फेच करने का API
router.get('/profile', async (req, res) => {
  try {
    const { email } = req.query;
    const result = await pool.query('SELECT * FROM vendors WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "डेटा नहीं मिला हुकुम!" });
    }
    
    res.json({ success: true, vendor: result.rows[0] });
  } catch (err) {
    console.error("❌ प्रोफाइल फेच एरर:", err);
    res.status(500).json({ success: false, message: "सर्वर एरर" });
  }
});

// 5. एडमिन रिजेक्ट रूट
router.get('/admin/reject', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send(`<h1 style="color: red; text-align: center; margin-top: 50px;">❌ अमान्य अनुरोध (ईमेल नहीं मिला) हुकुम!</h1>`);
    }

    const result = await pool.query('DELETE FROM vendors WHERE email = $1 RETURNING *', [email]);
    
    if (result.rows.length === 0) {
      return res.status(404).send(`<h1 style="color: red; text-align: center; margin-top: 50px;">❌ वेंडर नहीं मिला या पहले ही हटाया जा चुका है हुकुम!</h1>`);
    }

    res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; padding: 20px;">
        <h1 style="color: #dc3545;">❌ वेंडर (${email}) का रजिस्ट्रेशन अस्वीकृत (Reject) कर दिया गया है हुकुम!</h1>
        <p style="font-size: 18px; color: #555;">डेटाबेस से इस वेंडर का रिकॉर्ड हटा दिया गया है। अब यह विंडो बंद कर सकते हैं।</p>
      </div>
    `);
  } catch (error) {
    console.error("❌ रिजेक्ट करने में एरर:", error);
    res.status(500).send(`
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; padding: 20px;">
        <h1 style="color: red;">❌ रिजेक्ट करने में सर्वर एरर आई है हुकुम!</h1>
      </div>
    `);
  }
});

// 6. Razorpay पेमेंट वेबहुक रूट
router.post('/payment-webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'your_webhook_secret';

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      console.warn("⚠️ चेतावनी: अवैध Razorpay वेबहुक सिग्नेचर!");
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const event = req.body.event;
    const paymentEntity = req.body.payload?.payment?.entity;

    if (event === 'payment.captured') {
      const orderId = paymentEntity.notes?.order_id;
      if (orderId) {
        await pool.query("UPDATE orders SET status = 'PAID' WHERE id = $1", [orderId]);
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error("❌ वेबहुक एरर:", error);
    res.status(500).json({ success: false, message: "Webhook server error" });
  }
});

module.exports = router;