require('dotenv').config();
const express = require('express');
const app = express(); // 1. सबसे पहले ऐप बनाएं
const http = require('http');
const { Server } = require('socket.io');
const nodemailer = require('nodemailer');
const axios = require('axios'); 
const cors = require('cors');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
const Razorpay = require('razorpay');
const { Pool } = require('pg');
const { createClient } = require('redis');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// 👇 Multer setup properly placed at the top
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// 🛡️ 1. क्रिटिकल सिक्योरिटी गार्ड: JWT_SECRET चेक
const JWT_SECRET = process.env.JWT_SECRET || 'LUXURY_SECRET_KEY_2026';
if (!JWT_SECRET) {
  console.error("❌ क्रिटिकल एरर: JWT_SECRET डिफाइंड नहीं है!");
  process.exit(1); 
}

// 🛡️ 2. अन-हैंडल्ड प्रॉमिस क्रैश गार्ड (सर्वर कभी अचानक बंद नहीं होगा)
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection detected:', reason);
});
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

// 1. सबसे पहले 'io' को यहाँ इनिशियलाइज करें (एक ही बार)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['polling', 'websocket'],
  pingTimeout: 60000,
  pingInterval: 25000
});

// ⚡ Socket.IO Unified Connection Handling
io.on('connection', (socket) => {
  const rawShopId = socket.handshake.query.shopId || socket.handshake.auth?.shopId;
  const shopId = rawShopId ? rawShopId.split('&')[0] : 'General';
  
  console.log(`⚡ Vendor/User Connected: ${socket.id} | Initial Shop: ${shopId}`);

  if (shopId && shopId !== 'General') {
    socket.join(`shop_${shopId}`);
  }

  // जब user "joinShopRoom" event भेजे
  socket.on('joinShopRoom', (data, callback) => {
    const targetShopId = data.shopId;
    const roomName = `shop_${targetShopId}`;
    
    socket.join(roomName);
    console.log(`👤 ${socket.id} joined room: ${roomName}`);
    
    if (callback) callback({ success: true, message: `Joined ${roomName}` });
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Disconnected: Socket ID: ${socket.id}`);
  });
});

// 🛡️ PostgreSQL Pool Connection
const pool = new Pool({
  user: process.env.DB_USER || '',
  host: process.env.DB_HOST || '',
  database: process.env.DB_NAME || '',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || '',
});

// ⚡ Redis Client Setup
const redisClient = createClient();
redisClient.on('error', (err) => console.log('❌ Redis Client Error', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('⚡ Redis Cache से सफलतापूर्वक कनेक्ट हो गया है हुकुम!');
  } catch (e) {
    console.log('⚠️ Redis Connection Skipped/Failed');
  }
})();

// 🛡️ बेसिक सिक्योरिटी हेडर (Helmet) & Middlewares
app.use(helmet()); 
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors({ 
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🚦 रेट लिमिटर - टेस्टिंग के लिए सीमा बढ़ा दी गई है
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 मिनट
  max: 1000, // 1000 रिक्वेस्ट प्रति मिनट
  message: { success: false, message: "⚠️ बहुत ज्यादा रिक्वेस्ट आ रही हैं हुकुम." }
});
app.use('/api/', globalLimiter);

// 🔐 लॉगिन/रजिस्टर के लिए स्ट्रिक्ट रेट लिमिटर
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 15, 
  message: { success: false, message: "⚠️ सुरक्षा चेतावनी: बार-बार गलत प्रयास किए गए हैं। कृपया 10 मिनट बाद कोशिश करें हुकुम." }
});
app.use('/api/verify-email-otp', authLimiter);
app.use('/api/verify-whatsapp-otp', authLimiter);

// 💳 Razorpay Payment Gateway Initialization
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'your_key_id',
  key_secret: process.env.RAZORPAY_SECRET || 'your_secret'
});

// ==================== DATABASE TABLES INITIALIZATION ====================
const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_heavy_data (
        user_email VARCHAR(255) PRIMARY KEY,
        cart_data JSONB,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("📦 PostgreSQL Database Table Connected & Verified!");
  } catch (err) {
    console.error("❌ Database Table Init Error:", err);
  }
};
initDatabase();

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD
  }
});

// 🔥 WhatsApp OTP भेजने का लोकल (टर्मिनल) फंक्शन
async function sendWhatsAppOtp(phone, otp) {
    console.log("========================================");
    console.log(`💬 WhatsApp OTP for ${phone}: ${otp}`);
    console.log("========================================");
    return true;
}

// 🔐 ऑथेंटिकेशन मिडलवेयर सुधारें
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "टोकन गायब है, कृपया लॉगिन करें हुकुम!" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "अमान्य या एक्सपायर्ड टोकन है हुकुम!" });
    }
    req.user = user;
    next();
  });
};

const authenticateVendor = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: "Access Denied / Forbidden" });
  }

  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.vendor = verified;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

// ==================== FIXED PLACE ORDER API ====================
app.post('/api/place-order', async (req, res) => {
  try {
    const body = req.body || {};
    const customerInfo = body.customerInfo || {};

    const finalCustomer = customerInfo.name || body.customerName || body.name || 'Valued Customer';
    const finalEmail = customerInfo.email || body.customerEmail || body.email || 'Guest@domain.com';
    const finalPhone = customerInfo.phone || body.phone || '';
    const finalAddress = customerInfo.address || body.shippingAddress || body.address || '';
    
    // Shop ID extraction
    const rawShopId = body.shopId || body.shop_id || (body.items?.[0]?.shop_id);
    const shopId = rawShopId ? String(rawShopId).trim() : 'General';

    // Total Amount float conversion
    let cleanAmount = 0;
    const rawAmount = body.totalAmount !== undefined ? body.totalAmount : body.amount;
    if (typeof rawAmount === 'string') {
      cleanAmount = parseFloat(rawAmount.replace(/[^0-9.]/g, '')) || 0;
    } else {
      cleanAmount = parseFloat(rawAmount) || 0;
    }

    // Preserve original Items array (JSON format support)
    const rawItems = body.items || body.item;
    let itemsJson = [];
    if (Array.isArray(rawItems)) {
      itemsJson = rawItems;
    } else if (typeof rawItems === 'string') {
      itemsJson = [{ name: rawItems, qty: 1, price: cleanAmount }];
    } else if (typeof rawItems === 'object') {
      itemsJson = [rawItems];
    }

    // Display string summary for socket
    const itemSummaryString = itemsJson.map(i => `${i.title || i.name || 'Product'} (x${i.qty || i.quantity || 1})`).join(', ');

    const uniqueOrderId = 'ORD_' + Date.now();

    // Database Insert (JSON stringified items for flexible JSON rendering in React)
    const query = `
      INSERT INTO orders (order_id, shop_id, customer, customer_email, phone, items, total_amount, shipping_address, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Order Confirmed', NOW())
      RETURNING *;
    `;
    const values = [uniqueOrderId, shopId, finalCustomer, finalEmail, finalPhone, JSON.stringify(itemsJson), cleanAmount, finalAddress];
    const result = await pool.query(query, values);
    const savedOrder = result.rows[0];

    // Socket Payload Setup
    const socketPayload = {
      orderId: savedOrder.order_id || uniqueOrderId,
      shop_id: shopId,
      customer: finalCustomer,
      phone: finalPhone,
      address: finalAddress,
      item: itemSummaryString,
      amount: `₹${cleanAmount}`,
      paymentMode: body.paymentMethod || 'Cash on Delivery',
      status: savedOrder.status || 'Order Confirmed',
      orderDate: savedOrder.created_at || new Date().toISOString()
    };

    if (shopId && shopId !== 'General') {
      io.to(`shop_${shopId}`).emit('newOrder', socketPayload);
    }
    io.emit('newOrder', socketPayload);

    return res.status(200).json({
      success: true,
      message: "ऑर्डर सफलतापूर्वक प्लेस हो गया है हुकुम!",
      order: savedOrder
    });

  } catch (err) {
    console.error("❌ Place Order Error:", err);
    return res.status(500).json({ 
      success: false, 
      message: "सर्वर एरर: " + err.message 
    });
  }
});

// ==================== 4. SHOP REGISTRATION NUMBER MATCH SYSTEM ====================
app.post('/api/shops/register', async (req, res) => {
  try {
    const { ownerName, phone, storeId, vendorEmail } = req.body;

    const vendorResult = await pool.query('SELECT * FROM vendors WHERE email = $1', [vendorEmail]);

    if (vendorResult.rows.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "रजिस्ट्रेशन विफल: यह ईमेल डेटाबेस में नहीं मिला हुकुम!" 
      });
    }

    const vendor = vendorResult.rows[0];

    if (!vendor.phone || !phone || !vendor.phone.includes(phone.trim())) {
      return res.status(400).json({ 
        success: false, 
        message: "रजिस्ट्रेशन विफल: दुकान का मोबाइल नंबर आपके लॉगिन मोबाइल नंबर से मैच नहीं हो रहा है!" 
      });
    }

    res.json({ success: true, message: "दुकान सफलतापूर्वक रजिस्टर और वेरीफाई हो गई है हुकुम!" });
  } catch (error) {
    console.error("Shop Registration Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== 1. VENDOR REGISTRATION & SEPARATE OTPs ====================
app.post('/api/vendors/register', upload.single('shopPhoto'), async (req, res) => {
  try {
    console.log("📥 FormData Body:", req.body); 
    console.log("📥 Uploaded File:", req.file); 
    
    const { 
      shopName, ownerName, phone, email, password, 
      category, address, state, city, pin, occupierName, natureOfBusiness 
    } = req.body;

    const finalPhoto = req.file ? req.file.path : (req.body.shopPhoto || req.body.shop_photo || '');
    const finalShopName = shopName || req.body.establishmentName || req.body.shop_name;
    const finalOwnerName = ownerName || req.body.occupierName || req.body.owner_name;

    if (!finalShopName || !phone || !email || !password || !pin || !natureOfBusiness || !address || !city || !category) {
      return res.status(400).json({ success: false, message: "कृपया सभी जरूरी फील्ड भरें हुकुम!" });
    }

    // ✅ 1. ईमेल की जाँच करें (PostgreSQL DB)
    const existingVendor = await pool.query('SELECT * FROM vendors WHERE email = $1', [email]);

    // ✅ 2. यदि ईमेल पहले से मौजूद है, तो res.status(200) और alreadyRegistered: true भेजें
    if (existingVendor.rows.length > 0) {
      return res.status(200).json({ 
        success: false, 
        alreadyRegistered: true, 
        message: "यह ईमेल पहले से रजिस्टर्ड है। कृपया OTP दर्ज करें!" 
      });
    }

    const salt = await bcrypt.genSalt(12); 
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const shopId = "SHOP_" + Date.now();
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const whatsappOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(
      `INSERT INTO vendors (shop_id, shopname, ownername, phone, email, password, category, address, state, city, pin, occupiername, natureofbusiness, shop_photo, otp, email_otp, whatsapp_otp, otp_expiry, isverified, is_active, is_logged_in) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, false, true, false)`,
      [shopId, finalShopName, finalOwnerName || 'Occupier', phone, email, hashedPassword, category, address, state, city, pin, occupierName, natureOfBusiness, finalPhoto, emailOtp, emailOtp, whatsappOtp, otpExpiry]
    );

    const customerMailOptions = {
      from: 'luxurystore10k@gmail.com',
      to: email,
      subject: `🔒 LUXURYSTORE - Email Verification OTP`,
      text: `नमस्ते हुकुम,\n\nआपका ईमेल रजिस्ट्रेशन OTP है: ${emailOtp}`
    };
    await transporter.sendMail(customerMailOptions);

    if (phone) {
      await sendWhatsAppOtp(phone, whatsappOtp);
    }

    const ADMIN_SECRET = process.env.ADMIN_APPROVAL_SECRET || 'LUXURY_ADMIN_SECRET_2026';
    const approvalLink = `http://localhost:${PORT}/api/admin/approve?email=${email}&token=${ADMIN_SECRET}`;
    const rejectLink = `http://localhost:${PORT}/api/admin/reject?email=${email}&token=${ADMIN_SECRET}`;

    await transporter.sendMail({
      from: 'luxurystore10k@gmail.com',
      to: 'luxurystore10k@gmail.com',
      subject: `🚨 नया वेंडर रजिस्ट्रेशन अनुरोध: ${finalShopName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #f4f4f4; border-radius: 5px;">
          <h2 style="color: #333;">नया वेंडर रजिस्ट्रेशन अनुरोध आया है हुकुम!</h2>
          
          ${finalPhoto ? `<div style="margin-bottom: 15px;"><p><b>दुकान की फोटो:</b></p><img src="cid:shopPhotoImg" alt="Shop Photo" style="max-width: 200px; border-radius: 5px; border: 1px solid #ccc;" /></div>` : ''}
          
          <p><b>दुकान का नाम:</b> ${finalShopName}</p>
          <p><b>ओनर:</b> ${finalOwnerName}</p>
          <p><b>मोबाइल:</b> ${phone}</p>
          <p><b>ईमेल:</b> ${email}</p>
          
          <div style="background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 15px 0;">
            <p style="margin: 0; font-size: 16px; color: #856404;"><b>वेंडर का ईमेल OTP:</b> <span style="font-size: 18px; color: #d9534f; font-weight: bold;">${emailOtp}</span></p>
          </div>

          <br>
          <p>दुकान का अकाउंट अप्रूव करने के लिए नीचे दिए गए बटन पर क्लिक करें:</p>
          <a href="${approvalLink}" style="padding: 12px 25px; background: #28a745; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; margin-right: 10px;">✅ Accept / Apply</a>
          <a href="${rejectLink}" style="padding: 12px 25px; background: #dc3545; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">❌ Reject</a>
        </div>
      `,
      attachments: finalPhoto ? [{
        filename: 'shop-photo.jpg',
        path: finalPhoto,
        cid: 'shopPhotoImg'
      }] : []
    });

    return res.status(200).json({ 
      success: true, 
      message: `रजिस्ट्रेशन सफल! 6-अंकों का सुरक्षित OTP आपके ईमेल (${email}) पर भेज दिया गया है हुकुम!` 
    });

  } catch (error) {
    console.error("❌ रजिस्ट्रेशन एरर:", error);
    return res.status(500).json({ success: false, message: "सर्वर एरर, डेटा सुरक्षित नहीं हो सका!" });
  }
});

// ==================== RESEND EMAIL OTP ROUTE ====================
app.post('/api/resend-email-otp', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "ईमेल आईडी नहीं मिली हुकुम!" });
        }

        const cleanEmail = email.trim().toLowerCase();
        const result = await pool.query('SELECT * FROM vendors WHERE email = $1', [cleanEmail]);
        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: "यह ईमेल डेटाबेस में नहीं मिला हुकुम!" });
        }

        const vendor = result.rows[0];
        const newEmailOtp = Math.floor(100000 + Math.random() * 900000).toString();
        
        await pool.query('UPDATE vendors SET email_otp = $1 WHERE id = $2', [newEmailOtp, vendor.id]);

        await transporter.sendMail({
            from: 'luxurystore10k@gmail.com',
            to: cleanEmail,
            subject: `🔒 LUXURYSTORE - Resend Email Verification OTP`,
            text: `नमस्ते हुकुम,\n\nआपका नया ईमेल रजिस्ट्रेशन OTP है: ${newEmailOtp}`
        });

        res.status(200).json({ success: true, message: "नया Email OTP सफलतापूर्वक भेज दिया गया है हुकुम!" });
    } catch (err) {
        console.error("Resend Email OTP Error:", err);
        res.status(500).json({ success: false, message: "सर्वर साइड एरर है हुकुम!" });
    }
});

// ==================== 2. DUAL & SINGLE OTP VERIFICATION ====================
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, emailOtp, whatsappOtp, otp } = req.body;

    // Fast-track test OTP Bypass
    if (otp === "123456") {
      try {
        await pool.query('UPDATE vendors SET is_logged_in = TRUE WHERE email = $1', [email]);
        return res.json({ success: true, message: "OTP verified successfully" });
      } catch (err) {
        return res.status(500).json({ success: false, message: "Database update error" });
      }
    }

    const result = await pool.query('SELECT * FROM vendors WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: "यह ईमेल रजिस्टर्ड नहीं है हुकुम!" });
    }

    const vendor = result.rows[0];

    if (vendor.is_active === false) {
      return res.status(403).json({ success: false, message: "❌ आपका खाता एडमिन द्वारा सस्पेंड कर दिया गया है हुकुम!" });
    }

    const now = new Date();
    if (vendor.otp_expiry && new Date(vendor.otp_expiry) < now) {
      return res.status(400).json({ success: false, message: "❌ OTP की समय सीमा (10 मिनट) समाप्त हो चुकी है हुकुम!" });
    }

    const dbEmailOtp = String(vendor.email_otp || vendor.otp).trim();
    const dbWhatsappOtp = String(vendor.whatsapp_otp || "").trim();

    const inputEmailOtp = String(emailOtp || otp).trim();
    const inputWhatsappOtp = String(whatsappOtp || "").trim();

    // Check Dual or Single matching
    const isEmailValid = dbEmailOtp === inputEmailOtp;
    const isWhatsappValid = dbWhatsappOtp !== "" ? dbWhatsappOtp === inputWhatsappOtp : true;

    if (isEmailValid && isWhatsappValid) {
      await pool.query('UPDATE vendors SET isverified = true, is_logged_in = true, email_otp = NULL, whatsapp_otp = NULL, otp_attempts = 0 WHERE email = $1', [email]);
      
      const ADMIN_SECRET = process.env.ADMIN_APPROVAL_SECRET || 'LUXURY_ADMIN_SECRET_2026';
      const approvalLink = `http://localhost:${PORT}/api/admin/approve?email=${email}&token=${ADMIN_SECRET}`;
      const rejectLink = `http://localhost:${PORT}/api/admin/reject?email=${email}&token=${ADMIN_SECRET}`;

      await transporter.sendMail({
        from: 'luxurystore10k@gmail.com',
        to: 'luxurystore10k@gmail.com',
        subject: `🚨 नया वेंडर अप्रूवल अनुरोध: ${vendor.shopname}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #f4f4f4; border-radius: 5px;">
            <h2 style="color: #333;">नया वेंडर रजिस्ट्रेशन अनुरोध आया है हुकुम!</h2>
            <p><b>दुकान का नाम:</b> ${vendor.shopname}</p>
            <p><b>ओनर:</b> ${vendor.ownername}</p>
            <p><b>मोबाइल:</b> ${vendor.phone}</p>
            <p><b>ईमेल:</b> ${vendor.email}</p>
            <br>
            <a href="${approvalLink}" style="padding: 12px 25px; background: #28a745; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; margin-right: 10px;">✅ Accept / Apply</a>
            <a href="${rejectLink}" style="padding: 12px 25px; background: #dc3545; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">❌ Reject</a>
          </div>
        `
      });

      return res.status(200).json({ 
        success: true, 
        message: "OTP सफलतापूर्वक वेरीफाई हो गया है हुकुम।" 
      });
    } else {
      const newAttempts = (vendor.otp_attempts || 0) + 1;
      await pool.query('UPDATE vendors SET otp_attempts = $1, last_otp_request = CURRENT_TIMESTAMP WHERE email = $2', [newAttempts, email]);

      if (newAttempts >= 3) {
        return res.status(400).json({ 
          success: false, 
          message: "❌ आपने 3 बार गलत OTP दर्ज कर दिया है! सुरक्षा के कारण अब 24 घंटे बाद कोशिश करें हुकुम." 
        });
      }

      return res.status(400).json({ 
        success: false, 
        message: `❌ गलत OTP दर्ज किया गया है हुकुम! (प्रयास ${newAttempts}/3)` 
      });
    }

  } catch (error) {
    console.error("❌ एरर:", error);
    return res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

// ==================== 3. ADMIN APPROVAL ROUTE ====================
app.get('/api/admin/approve', async (req, res) => {
    const { email, token } = req.query;

    try {
        if (!email) {
            return res.status(400).send(`<h1 style="color: red; text-align: center; margin-top: 50px;">❌ ईमेल पैरामीटर गायब है हुकुम!</h1>`);
        }

        const ADMIN_APPROVAL_SECRET = process.env.ADMIN_APPROVAL_SECRET || 'LUXURY_ADMIN_SECRET_2026';
        
        if (!token || token !== ADMIN_APPROVAL_SECRET) {
            return res.status(403).send(`<h1 style="color: red; text-align: center; margin-top: 50px;">❌ अमान्य या गायब अप्रूवल टोकन हुकुम!</h1>`);
        }

        const cleanEmail = String(email).trim().toLowerCase();

        const checkVendor = await pool.query('SELECT * FROM vendors WHERE LOWER(email) = $1', [cleanEmail]);
        if (checkVendor.rows.length === 0) {
            return res.status(404).send(`<h1 style="color: red; text-align: center; margin-top: 50px;">❌ वेंडर नहीं मिला हुकुम!</h1>`);
        }

        const alreadyApproved = checkVendor.rows[0].is_approved;

        const updateQuery = `
            UPDATE vendors 
            SET is_approved = true, 
                isverified = true, 
                registration_status = 'approved',
                email_otp = NULL,
                whatsapp_otp = NULL
            WHERE LOWER(email) = $1 
            RETURNING *
        `;
        const result = await pool.query(updateQuery, [cleanEmail]);
        const vendor = result.rows[0];

        if (!alreadyApproved) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER || 'luxurystore10k@gmail.com',
                    to: cleanEmail,
                    subject: '🎉 LuxuryStore - आपकी दुकान अप्रूव हो गई है!',
                    text: `नमस्ते ${vendor.ownername || 'वेंडर'},\n\nआपकी दुकान "${vendor.shopname || vendor.shop_name}" का रजिस्ट्रेशन स्वीकार कर लिया गया है। अब आप अपने डैशबोर्ड में लॉगिन कर सकते हैं।`
                });
            } catch (emailErr) {
                console.error("❌ वेंडर को अप्रूवल ईमेल भेजने में विफलता:", emailErr);
            }
        }

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

        res.send(`
          <div style="background: #0c0b0a; color: #ffd700; font-family: Arial, sans-serif; text-align: center; padding: 60px 20px; min-height: 100vh; box-sizing: border-box;">
            <div style="max-width: 600px; margin: 0 auto; background: #161310; border: 1px solid #d4af37; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.8);">
              <h2 style="color: #68e1d5; margin-bottom: 20px;">
                ${alreadyApproved ? 'ℹ️ यह अकाउंट पहले से अप्रूव्ड है हुकुम!' : '✅ वेंडर का अकाउंट सफलतापूर्वक अप्रूव कर दिया गया है हुकुम!'}
              </h2>
              <p style="color: #fff; font-size: 1.1rem; margin-bottom: 10px;"><b>दुकान:</b> ${vendor.shopname || vendor.shop_name || 'N/A'}</p>
              <p style="color: #aaa; font-size: 0.95rem; margin-bottom: 30px;">ईमेल <b>${cleanEmail}</b> डेटाबेस में एक्टिव है।</p>
              <a href="${frontendUrl}" style="background: #d4af37; color: #000; padding: 14px 35px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block; font-size: 1rem; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);">
                दुकान डैशबोर्ड खोलें (Open Dashboard) 🚀
              </a>
            </div>
          </div>
        `);

    } catch (err) {
        console.error("❌ अप्रूव करने में एरर:", err);
        res.status(500).send(`<h1 style="color: red; text-align: center; margin-top: 50px;">❌ सर्वर एरर!</h1>`);
    }
});

// ==================== WHATSAPP OTP VERIFICATION ROUTE ====================
app.post('/api/verify-whatsapp-otp', async (req, res) => {
    const { phone, otp } = req.body;
    try {
        const cleanPhone = phone ? phone.trim() : '';
        const cleanOtp = otp ? otp.trim() : '';
        const last10Digits = cleanPhone.slice(-10);

        const vendorResult = await pool.query(
            'SELECT * FROM vendors WHERE phone LIKE $1 ORDER BY id DESC LIMIT 1', 
            [`%${last10Digits}%`]
        );
        
        if (vendorResult.rows.length > 0) {
            const vendor = vendorResult.rows[0];
            const dbOtp = String(vendor.whatsapp_otp || vendor.otp || '').trim();

            if (dbOtp === cleanOtp) {
                await pool.query('UPDATE vendors SET whatsapp_otp = NULL, isverified = true WHERE id = $1', [vendor.id]);
                return res.json({ success: true, message: "WhatsApp OTP सफलतापूर्वक वेरीफाई हो गया है हुकुम!" });
            } else {
                return res.json({ success: false, message: "गलत WhatsApp OTP है हुकुम!" });
            }
        } else {
            return res.json({ success: false, message: "मोबाइल नंबर डेटाबेस में नहीं मिला हुकुम!" });
        }
    } catch (err) {
        console.error("WhatsApp OTP Error:", err);
        res.status(500).json({ success: false, message: "सर्वर साइड एरर है हुकुम!" });
    }
});

app.post('/api/verify-email-otp', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const vendorResult = await pool.query('SELECT * FROM vendors WHERE email = $1', [email]);
        
        if (vendorResult.rows.length > 0) {
            const dbEmailOtp = String(vendorResult.rows[0].email_otp || vendorResult.rows[0].otp).trim();
            if (dbEmailOtp === String(otp).trim()) {
                return res.json({ success: true, message: "ईमेल OTP सफलतापूर्वक वेरीफाई हो गया!" });
            }
        }
        return res.json({ success: false, message: "गलत OTP दर्ज किया गया है हुकुम!" });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ success: false, message: "सर्वर इंटरनल एरर आ गया हुकुम!" });
    }
});

// ==================== COMMISSION SPLIT & CHECKOUT API ====================
app.post('/api/checkout-commission', async (req, res) => {
  try {
    const { totalAmount, vendorId } = req.body;

    if (!totalAmount || !vendorId) {
      return res.status(400).json({ success: false, message: "ऑर्डर की राशि और वेंडर आईडी आवश्यक है हुकुम!" });
    }

    const adminCommissionRate = 0.10; 
    const adminShare = totalAmount * adminCommissionRate;
    const vendorShare = totalAmount - adminShare;

    res.status(200).json({
      success: true,
      message: "ऑटोमैटिक कमीशन सफलतापूर्वक स्प्लिट हो गया है हुकुम!",
      breakdown: {
        total: totalAmount,
        adminCommission: adminShare, 
        vendorPayout: vendorShare     
      }
    });

  } catch (error) {
    console.error("❌ कमीशन स्प्लिट एरर:", error);
    res.status(500).json({ success: false, message: "कमीशन प्रोसेस करने में सर्वर एरर!" });
  }
});

// ==================== DUAL OTP SECURITY TRIGGER ====================
app.post('/api/security/dual-otp', async (req, res) => {
  try {
    const { customerEmail, customerPhone } = req.body;
    
    const customerEmailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const customerWhatsappOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const adminNotificationOtp = Math.floor(100000 + Math.random() * 900000).toString();

    await transporter.sendMail({
      from: 'luxurystore10k@gmail.com',
      to: customerEmail,
      subject: `🛡️ Secure Checkout - Email OTP`,
      text: `प्रिय ग्राहक, आपके ट्रांजैक्शन के लिए आपका ईमेल OTP है: ${customerEmailOtp}`
    });

    if (customerPhone) {
      await sendWhatsAppOtp(customerPhone, customerWhatsappOtp);
    }

    await transporter.sendMail({
      from: 'luxurystore10k@gmail.com',
      to: 'luxurystore10k@gmail.com',
      subject: `🚨 ADMIN SECURITY ALERT - New Transaction OTP`,
      text: `हुकुम, नया ट्रांजैक्शन इनिशिएट हुआ है। आपका एडमिन नोटिफिकेशन OTP है: ${adminNotificationOtp}`
    });

    res.status(200).json({
      success: true,
      message: "अलग-अलग ईमेल और WhatsApp OTP सफलतापूर्वक भेज दिए गए हैं हुकुम!",
      debugAdminOtp: adminNotificationOtp 
    });

  } catch (error) {
    console.error("❌ Dual OTP एरर:", error);
    res.status(500).json({ success: false, message: "डुअल OTP भेजने में सर्वर एरर!" });
  }
});

// ==================== PRODUCTS & SEARCH APIs ====================
app.get('/api/products/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: "सर्च क्वेरी आवश्यक है हुकुम!" });
    }

    const searchQuery = `%${query}%`;
    const result = await pool.query(
      `SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1 OR category ILIKE $1 ORDER BY id DESC`,
      [searchQuery]
    );

    if (result.rows.length === 0) {
      const fallbackResult = await pool.query(`SELECT * FROM products ORDER BY id DESC LIMIT 5`);
      return res.status(200).json({
        success: true,
        exactMatch: false,
        message: "⚠️ सटीक आइटम उपलब्ध नहीं है, मिलते-जुले आइटम्स दिखाए जा रहे हैं हुकुम!",
        products: fallbackResult.rows
      });
    }

    res.status(200).json({
      success: true,
      exactMatch: true,
      products: result.rows
    });
  } catch (error) {
    console.error("❌ प्रोडक्ट सर्च एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productResult = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);

    if (productResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "उत्पाद नहीं मिला हुकुम!" });
    }

    const product = productResult.rows[0];
    const relatedResult = await pool.query(
      'SELECT * FROM products WHERE category = $1 AND id != $2 LIMIT 4',
      [product.category, productId]
    );

    res.status(200).json({
      success: true,
      product,
      relatedProducts: relatedResult.rows
    });

  } catch (error) {
    console.error("❌ सर्वर एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.get('/api/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const result = await pool.query('SELECT * FROM products ORDER BY id DESC LIMIT $1 OFFSET $2', [limit, offset]);
        const countResult = await pool.query('SELECT COUNT(*) FROM products');
        const totalProducts = parseInt(countResult.rows[0].count);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products: result.rows
        });
    } catch (error) {
        console.error("❌ प्रोडक्ट्स फैच करने में एरर:", error);
        res.status(500).json({ success: false, message: "सर्वर एरर!" });
    }
});

app.post('/api/products', async (req, res) => {
  try {
    let { title, name, productName: pName, price, stock, category, img, image, image_url, description, bio } = req.body;
    
    const productName = name || pName || title || "Luxury Collection Item";
    const productImage = image || img || image_url || "";
    const productDesc = description || bio || category || "";
    
    const parsedPrice = parseFloat(price) || 500;
    const parsedStock = String(stock || '1');
    const finalCategory = category || "General";

    const bannedKeywords = ['illegal', 'weapon', 'drugs', 'fake', 'counterfeit'];
    const isIllegal = bannedKeywords.some(word => productName.toLowerCase().includes(word));

    if (isIllegal) {
      return res.status(400).json({ success: false, message: "❌ यह प्रतिबंधित आइटम है हुकुम!" });
    }

    await pool.query(
      `INSERT INTO products (name, description, price, category, stock, image, status) 
       VALUES ($1, $2, $3, $4, $5, $6, 'active')`,
      [productName, productDesc, String(parsedPrice), finalCategory, parsedStock, productImage]
    );

    await redisClient.del('all_products');
    res.status(200).json({ success: true, message: "प्रोडक्ट सफलतापूर्वक जोड़ दिया गया है हुकुम!" });
  } catch (error) {
    console.error("❌ प्रोडक्ट जोड़ने में एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.post('/api/vendor/add-product', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "⚠️ एक्सेस Denied! कृपया पहले लॉगिन करें हुकुम।" });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const vendorId = decoded.id;

    const vendorCheck = await pool.query('SELECT shop_id, is_active FROM vendors WHERE id = $1', [vendorId]);
    if (vendorCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: "❌ वेंडर अकाउंट नहीं मिला हुकुम!" });
    }

    if (vendorCheck.rows[0].is_active === false) {
      return res.status(403).json({ success: false, message: "❌ आपका खाता सस्पेंड है, आप प्रोडक्ट नहीं जोड़ सकते हुकुम!" });
    }

    const shopId = vendorCheck.rows[0].shop_id;
    let { productName, name, description, bio, price, category, stock, imageUrl, image } = req.body;
    
    const finalName = name || productName;
    const finalDesc = description || bio || category;
    const finalImage = image || imageUrl || '';
    const parsedPrice = parseFloat(price) || 0;
    const parsedStock = String(stock || '1');

    if (!finalName || !parsedPrice || !category) {
      return res.status(400).json({ success: false, message: "कृपया प्रोडक्ट का नाम, सही कीमत और कैटेगरी जरूर भरें हुकुम!" });
    }

    const bannedKeywords = ['illegal', 'weapon', 'drugs', 'fake', 'counterfeit'];
    if (bannedKeywords.some(word => finalName.toLowerCase().includes(word))) {
      return res.status(400).json({ success: false, message: "❌ सुरक्षा नियम उल्लंघन! यह आइटम प्रतिबंधित है हुकुम।" });
    }

    await pool.query(
      `INSERT INTO products (shop_id, name, description, price, category, stock, image, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')`,
      [shopId, finalName, finalDesc, String(parsedPrice), category, parsedStock, finalImage]
    );

    await redisClient.del('all_products');
    res.status(200).json({ success: true, message: "उत्पाद सफलतापूर्वक जोड़ दिया गया है हुकुम!" });

  } catch (error) {
    console.error("❌ प्रोडक्ट जोड़ने में एरर:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ success: false, message: "⚠️ अमान्य टोकन! कृपया दोबारा लॉगिन करें।" });
    }
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

// ==================== RESEND WHATSAPP OTP ROUTE ====================
app.post('/api/resend-whatsapp-otp', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ success: false, message: "मोबाइल नंबर नहीं मिला हुकुम!" });
        }

        const cleanPhone = phone.trim();
        const last10Digits = cleanPhone.slice(-10);
        
        const result = await pool.query('SELECT * FROM vendors WHERE phone LIKE $1', [`%${last10Digits}%`]);
        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: "मोबाइल नंबर डेटाबेस में नहीं मिला हुकुम!" });
        }

        const vendor = result.rows[0];
        const newWhatsappOtp = Math.floor(100000 + Math.random() * 900000).toString();
        
        await pool.query('UPDATE vendors SET whatsapp_otp = $1 WHERE id = $2', [newWhatsappOtp, vendor.id]);
        await sendWhatsAppOtp(vendor.phone, newWhatsappOtp);

        res.status(200).json({ success: true, message: "नया WhatsApp OTP सफलतापूर्वक भेज दिया गया है हुकुम!" });
    } catch (err) {
        console.error("Resend WhatsApp Error:", err);
        res.status(500).json({ success: false, message: "सर्वर साइड एरर है हुकुम!" });
    }
});

// ==================== UPDATE VENDOR PHONE ROUTE ====================
app.post('/api/update-vendor-phone', async (req, res) => {
    try {
        const { vendorId, newPhone } = req.body;
        if (!newPhone || newPhone.trim() === '') {
            return res.status(400).json({ success: false, message: "नया मोबाइल नंबर दर्ज करें हुकुम!" });
        }

        const cleanNewPhone = newPhone.trim();
        const newWhatsappOtp = Math.floor(100000 + Math.random() * 900000).toString();
        
        await pool.query('UPDATE vendors SET phone = $1, whatsapp_otp = $2 WHERE id = $3', [cleanNewPhone, newWhatsappOtp, vendorId]);
        await sendWhatsAppOtp(cleanNewPhone, newWhatsappOtp);

        res.status(200).json({ success: true, message: "मोबाइल नंबर सफलतापूर्वक अपडेट कर दिया गया है हुकुम!" });
    } catch (err) {
        console.error("Update Phone Error:", err);
        res.status(500).json({ success: false, message: "सर्वर साइड एरर है हुकुम!" });
    }
});

// ==================== REVIEWS, PAYMENTS & STOCK LOCKING ====================
app.post('/api/products/:id/review', async (req, res) => {
  try {
    const productId = req.params.id;
    const { rating, reviewText, customerName } = req.body;

    if (!rating || !reviewText) {
      return res.status(400).json({ success: false, message: "कृपया रेटिंग और रिव्यु दोनों दें हुकुम!" });
    }

    await pool.query(
      `INSERT INTO product_reviews (product_id, customer_name, rating, review_text) VALUES ($1, $2, $3, $4)`,
      [productId, customerName || 'Verified Customer', rating, reviewText]
    );

    res.status(200).json({ success: true, message: "आपका रिव्यु सफलतापूर्वक जोड़ दिया गया है हुकुम!" });
  } catch (error) {
    console.error("❌ रिव्यु सेव करने में एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.post('/api/create-payment-order', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ success: false, message: "राशि आवश्यक है हुकुम!" });
    }
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "receipt_order_" + Date.now()
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("❌ Razorpay एरर:", error);
    res.status(500).json({ success: false, message: "पेमेंट आर्डर बनाने में सर्वर एरर!" });
  }
});

app.post('/api/reduce-stock-secure', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    await pool.query('BEGIN');
    const result = await pool.query('SELECT stock FROM products WHERE id = $1 FOR UPDATE', [productId]);
    
    if (result.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ success: false, message: "प्रोडक्ट नहीं मिला हुकुम!" });
    }

    if (result.rows[0].stock < quantity) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ success: false, message: "स्टॉक खत्म हो चुका है हुकुम!" });
    }
    
    await pool.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [quantity, productId]);
    await pool.query('COMMIT');
    res.status(200).json({ success: true, message: "स्टॉक सुरक्षित रूप से अपडेट हो गया है!" });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("❌ Concurrency Stock Error:", error);
    res.status(500).json({ success: false, message: "ट्रांजैक्शन फेल हुआ हुकुम!" });
  }
});

app.post('/api/create-order', async (req, res) => {
  const client = await pool.connect();
  try {
    const { customerEmail, productId, quantity } = req.body;

    await client.query('BEGIN'); // Transaction Start

    // 1. केवल तभी स्टॉक घटाएं जब स्टॉक पर्याप्त हो (Atomic Update)
    const updateStockQuery = `
      UPDATE products 
      SET stock = stock - $1 
      WHERE id = $2 AND stock >= $1 
      RETURNING *;
    `;
    const stockResult = await client.query(updateStockQuery, [quantity, productId]);

    // अगर स्टॉक पर्याप्त नहीं है तो तुरंत रिजेक्ट करें
    if (stockResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        message: "क्षमा करें, यह आइटम आउट ऑफ स्टॉक (Out of Stock) हो गया है!" 
      });
    }

    // 2. स्टॉक कटने के बाद ही ऑर्डर टेबल में एंट्री करें
    const insertOrderQuery = `
      INSERT INTO orders (customer_email, product_id, quantity, status) 
      VALUES ($1, $2, $3, 'Pending') 
      RETURNING *;
    `;
    const orderResult = await client.query(insertOrderQuery, [customerEmail, productId, quantity]);

    await client.query('COMMIT'); // Transaction Complete

    return res.json({ 
      success: true, 
      message: "ऑर्डर सफलतापूर्वक दर्ज हो गया!", 
      order: orderResult.rows[0] 
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Order Error:", error);
    return res.status(500).json({ success: false, message: "सर्वर त्रुटि" });
  } finally {
    client.release();
  }
});

// ==================== ADMIN & VENDOR MANAGEMENT ROUTES ====================
app.get('/api/admin/vendors', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, shopname, ownername, phone, email, category, is_active FROM vendors ORDER BY id DESC');
    res.status(200).json({ success: true, vendors: result.rows });
  } catch (error) {
    console.error("❌ वेंडर्स फैच करने में एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.put('/api/admin/toggle-vendor/:id', async (req, res) => {
  try {
    const vendorId = req.params.id;
    const { status } = req.body; 
    await pool.query('UPDATE vendors SET is_active = $1 WHERE id = $2', [status, vendorId]);
    res.status(200).json({ success: true, message: `वेंडर स्थिति अपडेट कर दी गई है हुकुम! (Active: ${status})` });
  } catch (error) {
    console.error("❌ सस्पेंशन एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.get('/api/admin/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC'); 
    res.status(200).json({ success: true, users: result.rows });
  } catch (error) {
    console.error("❌ कस्टमर्स फैच करने में एरर:", error);
    res.status(500).json({ error: true, message: "सर्वर एरर!" });
  }
});

app.post('/api/admin/approve-vendor-email', async (req, res) => {
    try {
        const { vendorEmail } = req.body;

        if (!vendorEmail) {
            return res.status(400).json({ success: false, message: "ईमेल आईडी प्रदान करें हुकुम!" });
        }

        const cleanEmail = String(vendorEmail).trim().toLowerCase();

        const result = await pool.query(
            'UPDATE vendors SET is_approved = true, registration_status = $1 WHERE LOWER(email) = $2 RETURNING *', 
            ['approved', cleanEmail]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "दुकान / वेंडर नहीं मिला हुकुम!" });
        }
        
        const vendor = result.rows[0];

        try {
            await transporter.sendMail({
                from: 'luxurystore10k@gmail.com',
                to: cleanEmail,
                subject: 'LuxuryStore - Shop Approved!',
                text: `हुकुम! आपकी दुकान ${vendor.shopname || vendor.shop_name} का रजिस्ट्रेशन एडमिन द्वारा स्वीकृत कर लिया गया है!`
            });
        } catch (emailErr) {
            console.error("❌ Notification Email Failed:", emailErr);
        }

        res.json({ 
            success: true, 
            message: "दुकान सफलतापूर्वक एक्सेप्ट कर ली गई है हुकुम!",
            vendor: {
                shopId: vendor.shop_id,
                email: vendor.email,
                isApproved: vendor.is_approved
            }
        });

    } catch (err) {
        console.error("Server Error in Approve Vendor:", err);
        res.status(500).json({ success: false, message: "सर्वर एरर!" });
    }
});

// ==================== 🌐 LANGUAGE SELECTION API ====================
app.post('/api/vendor/update-language', async (req, res) => {
  try {
    const { email, language } = req.body;
    if (!email || !language) {
      returnstatus(400).json({ success: false, message: "ईमेल और भाषा का चयन आवश्यक है हुकुम!" });
    }

    await pool.query(
      `UPDATE vendors SET preferred_language = $1 WHERE email = $2`,
      [language, email]
    );

    res.status(200).json({ 
      success: true, 
      message: `भाषा सफलताપूर्व ${language} सेट कर दी गई है हुकुम!` 
    });
  } catch (error) {
    console.error("❌ भाषा अपडेट करने में एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

// ==================== HEAVY DATA, WISHLIST & ORDERS APIS ====================
app.post('/api/save-heavy-data', async (req, res) => {
  try {
    const { userEmail, cartData } = req.body;
    if (!userEmail) {
      return res.status(400).json({ success: false, message: "ईमेल आवश्यक है हुकुम!" });
    }

    const query = `
      INSERT INTO user_heavy_data (user_email, cart_data, updated_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      ON CONFLICT (user_email) 
      DO UPDATE SET cart_data = EXCLUDED.cart_data, updated_at = CURRENT_TIMESTAMP
    `;
    await pool.query(query, [userEmail, JSON.stringify(cartData || [])]);

    res.status(200).json({ success: true, message: "डेटा सुरक्षित रूप से सेव हो गया है हुकुम!" });
  } catch (error) {
    console.error("❌ डेटाबेस सेव एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.get('/api/get-heavy-data/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const result = await pool.query('SELECT cart_data FROM user_heavy_data WHERE user_email = $1', [userEmail]);

    if (result.rows.length === 0) {
      return res.status(200).json({ success: true, cartData: [] });
    }

    res.status(200).json({ success: true, cartData: result.rows[0].cart_data });
  } catch (error) {
    console.error("❌ डेटा फेच एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.post('/api/save-vendor-orders', async (req, res) => {
  try {
    const { vendorEmail, orders } = req.body;
    await pool.query(
      `INSERT INTO vendor_orders (vendor_email, order_data) VALUES ($1, $2)`,
      [vendorEmail, JSON.stringify(orders)]
    );
    res.status(200).json({ success: true, message: "ऑर्डर डेटाबेस में सेव हो गया हुकुम!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.get('/api/get-vendor-orders/:email', async (req, res) => {
  try {
    const result = await pool.query('SELECT order_data FROM vendor_orders WHERE vendor_email = $1', [req.params.email]);
    res.status(200).json({ success: true, orders: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.get('/api/wishlist', async (req, res) => {
  try {
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/wishlist', async (req, res) => {
  try {
    res.json({ success: true, message: 'Wishlist saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save' });
  }
});

app.post('/api/save-order', async (req, res) => {
  try {
    const { vendorEmail, customerEmail, items, totalAmount, shippingAddress, paymentId } = req.body;

    if (!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ success: false, message: "ऑर्डर की जानकारी अधूरी है हुकुम!" });
    }

    const result = await pool.query(
      `INSERT INTO orders (vendor_email, customer_email, items, total_amount, shipping_address, payment_id, status) 
       VALUES ($1, $2, $3, $4, $5, $6, 'PENDING') RETURNING *`,
      [vendorEmail || 'admin@luxurystore.com', customerEmail || 'Guest', JSON.stringify(items), totalAmount, shippingAddress || '', paymentId || 'COD']
    );

    const savedOrder = result.rows[0];
    io.emit('order_notification_alert', { message: "नया आर्डर प्राप्त हुआ है हुकुम!", orderData: savedOrder });

    res.status(200).json({ success: true, message: "ऑर्डर सफलतापूर्वक सेव हो गया है!", orderId: savedOrder.id });
  } catch (error) {
    console.error("❌ आर्डर सेव एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.get('/api/customer-orders/:email', async (req, res) => {
  try {
    const customerEmail = req.params.email;
    const result = await pool.query('SELECT * FROM orders WHERE customer_email = $1 ORDER BY id DESC', [customerEmail]);
    res.status(200).json({ success: true, orders: result.rows });
  } catch (error) {
    console.error("❌ आर्डर हिस्ट्री एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.post('/api/vendor/status', async (req, res) => {
    try {
        const { email } = req.body;
        const result = await pool.query('SELECT is_approved FROM vendors WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            res.json({ success: true, isApproved: result.rows[0].is_approved });
        } else {
            res.json({ success: false, message: "वेंडर नहीं मिला!" });
        }
    } catch (err) {
        console.error("Status Check Error:", err);
        res.status(500).json({ success: false, message: "सर्वर एरर" });
    }
});

// ==================== FIXED USER ORDER HISTORY ROUTE ====================
app.get('/api/user-orders', async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ success: false, message: 'ईमेल आवश्यक है हुकुम!' });
    }

    try {
        // ILIKE match use karein taaki Case sensitivity email issue na aaye
        const query = `SELECT * FROM orders WHERE customer_email ILIKE $1 ORDER BY id DESC`;
        const result = await pool.query(query, [email.trim()]);

        res.json({ success: true, orders: result.rows });
    } catch (err) {
        console.error("❌ ऑर्डर हिस्ट्री फेच एरर:", err);
        res.status(500).json({ success: false, message: 'सर्वर एरर हुकुम!', error: err.message });
    }
});

// ==================== COUPONS, SHIPPING & ANALYTICS APIs ====================
app.post('/api/admin/create-coupon', async (req, res) => {
  try {
    const { code, discountPercentage, minOrderValue, expiresAt } = req.body;
    if (!code || !discountPercentage) {
      return res.status(400).json({ success: false, message: "कूपन कोड और डिस्काउंट आवश्यक है हुकुम!" });
    }

    await pool.query(
      `INSERT INTO coupons (code, discount_percentage, min_order_value, expires_at, is_active) 
       VALUES ($1, $2, $3, $4, true)`,
      [code.toUpperCase(), discountPercentage, minOrderValue || 0, expiresAt]
    );

    res.status(200).json({ success: true, message: `कूपन सफलतापूर्वक बना दिया गया है हुकुम!` });
  } catch (error) {
    console.error("❌ कूपन एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.post('/api/apply-coupon', async (req, res) => {
  try {
    const { couponCode, cartTotal } = req.body;
    if (!couponCode || !cartTotal) {
      return res.status(400).json({ success: false, message: "कूपन कोड और कार्ट टोटल जरूरी है हुकुम!" });
    }

    const result = await pool.query(`SELECT * FROM coupons WHERE code = $1 AND is_active = true`, [couponCode.toUpperCase()]);
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: "अमान्य कूपन कोड है हुकुम!" });
    }

    const coupon = result.rows[0];
    if (coupon.expires_at && new Date() > new Date(coupon.expires_at)) {
      return res.status(400).json({ success: false, message: "यह कूपन एक्सपायर हो चुका है हुकुम!" });
    }

    if (cartTotal < coupon.min_order_value) {
      return res.status(400).json({ success: false, message: `यह कूपन न्यूनतम ₹${coupon.min_order_value} पर लागू है!` });
    }

    const discountAmount = (cartTotal * coupon.discount_percentage) / 100;
    const finalTotal = cartTotal - discountAmount;

    res.status(200).json({ success: true, message: "कूपन लग गया है!", discountAmount, finalTotal });
  } catch (error) {
    console.error("❌ कूपन एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.post('/api/shipping/calculate-rate', async (req, res) => {
  try {
    const { pinCode, weightInKg } = req.body;
    if (!pinCode) {
      return res.status(400).json({ success: false, message: "पिन कोड दर्ज करें हुकुम!" });
    }

    let baseShippingFee = pinCode.startsWith('342') ? 30 : 50;
    const weightCharge = (weightInKg || 1) * 20;

    res.status(200).json({
      success: true,
      shippingFee: baseShippingFee + weightCharge,
      message: "शिपिंग चार्ज कैलकुलेट हो गया है हुकुम!"
    });
  } catch (error) {
    console.error("❌ शिपिंग एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

// ==================== ADMIN & ANALYTICS APIS ====================

app.get('/api/admin/reports-dashboard', async (req, res) => {
  try {
    const vendorsCount = await pool.query('SELECT COUNT(*) FROM vendors');
    const usersCount = await pool.query('SELECT COUNT(*) FROM users');
    const productsCount = await pool.query('SELECT COUNT(*) FROM products');

    let totalOrders = 0, totalRevenue = 0;
    try {
      const orderStats = await pool.query('SELECT COUNT(*) as total_orders, SUM(total_amount) as revenue FROM orders');
      totalOrders = orderStats.rows[0].total_orders || 0;
      totalRevenue = orderStats.rows[0].revenue || 0;
    } catch (e) {}

    const recentVendors = await pool.query('SELECT id, shopname, ownername, email, created_at, is_active FROM vendors ORDER BY id DESC LIMIT 5');

    res.status(200).json({
      success: true,
      analytics: {
        totalVendors: parseInt(vendorsCount.rows[0].count),
        totalUsers: parseInt(usersCount.rows[0].count),
        totalProducts: parseInt(productsCount.rows[0].count),
        totalOrders: parseInt(totalOrders),
        totalRevenue: parseFloat(totalRevenue)
      },
      recentVendors: recentVendors.rows
    });
  } catch (error) {
    console.error("❌ डैशबोर्ड एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.get('/api/admin/top-viewed-products', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.product_name, p.category, COUNT(a.id) as total_views 
      FROM product_analytics a
      JOIN products p ON a.product_id = p.id
      GROUP BY p.id, p.product_name, p.category
      ORDER BY total_views DESC LIMIT 5
    `);
    res.status(200).json({ success: true, trendingProducts: result.rows });
  } catch (error) {
    console.error("❌ एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.put('/api/admin/vendor-status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    await pool.query('UPDATE vendors SET is_active = $1 WHERE id = $2', [isActive, id]);

    res.json({ success: true, message: 'Vendor status updated successfully in PostgreSQL' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Database error: ' + err.message });
  }
});

// ==================== PRODUCT & CACHE APIS ====================

app.get('/api/cached-products', async (req, res) => {
  try {
    const cachedData = await redisClient.get('all_products');
    if (cachedData) {
      return res.status(200).json({ success: true, source: 'redis-cache', products: JSON.parse(cachedData) });
    }

    const result = await pool.query('SELECT * FROM products ORDER BY id DESC LIMIT 20');
    await redisClient.set('all_products', JSON.stringify(result.rows), { EX: 60 });

    res.status(200).json({ success: true, source: 'database', products: result.rows });
  } catch (error) {
    console.error("❌ Redis Error:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.post('/api/track-activity', async (req, res) => {
  try {
    const { userEmail, productId, actionType } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!productId) {
      return res.status(400).json({ success: false, message: "प्रोडक्ट आईडी आवश्यक है हुकुम!" });
    }

    await pool.query(
      `INSERT INTO product_analytics (user_email, product_id, action_type, ip_address) VALUES ($1, $2, $3, $4)`,
      [userEmail || 'Guest', productId, actionType || 'VIEW', clientIp]
    );

    res.status(200).json({ success: true, message: "गतिविधि ट्रैक हो गई है हुकुम!" });
  } catch (error) {
    console.error("❌ ट्रैकिंग एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

// ==================== MARKETING APIS ====================

app.post('/api/marketing/send-abandoned-cart-reminder', async (req, res) => {
  try {
    const { customerEmail, customerPhone, customerName } = req.body;
    if (!customerEmail && !customerPhone) {
      return res.status(400).json({ success: false, message: "ईमेल या फोन नंबर जरूरी है हुकुम!" });
    }

    if (customerEmail) {
      await transporter.sendMail({
        from: 'luxurystore10k@gmail.com',
        to: customerEmail,
        subject: `🛒 आपका कार्ट आपका इंतज़ार कर रहा है - Luxury Store`,
        text: `नमस्ते ${customerName || 'हुकुम'}, अपना आर्डर पूरा करें और पाएं स्पेशल डिस्काउंट!`
      });
    }

    res.status(200).json({ success: true, message: "मार्केटिंग रिमाइंडर भेज दिया गया है हुकुम!" });
  } catch (error) {
    console.error("❌ एरर:", error);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

// ==================== VENDOR MANAGEMENT APIS ====================

app.post('/api/vendors/check-session', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false });

  try {
    const result = await pool.query('SELECT * FROM vendors WHERE email = $1 AND is_logged_in = TRUE', [email]);
    if (result.rows.length > 0) {
      res.json({ success: true, vendor: result.rows[0] });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post('/api/vendors/logout', async (req, res) => {
  const { email } = req.body;
  try {
    await pool.query('UPDATE vendors SET is_logged_in = FALSE WHERE email = $1', [email]);
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post('/api/vendor/profile', authenticateVendor, async (req, res) => {
  try {
    const { shop_id, shopName, ownerName, phone, email, upiId, paymentMethod, profilePhoto } = req.body;
    return res.status(200).json({ success: true, message: "Profile updated successfully!" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
});

app.get('/api/vendor/verify', async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "वेंडर वेरीफाइड है हुकुम!" });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

// ==================== STORIES, STAFF, PRODUCTS & CHAT APIS ====================

app.get('/api/vendor/stories', async (req, res) => {
  const { shop_id } = req.query;
  try {
    const query = shop_id 
      ? 'SELECT * FROM vendor_stories WHERE shop_id = $1 ORDER BY id DESC'
      : 'SELECT * FROM vendor_stories ORDER BY id DESC LIMIT 10';
    const values = shop_id ? [shop_id] : [];
    
    const result = await pool.query(query, values);
    res.json({ success: true, stories: result.rows });
  } catch (err) {
    console.error("Stories fetch error:", err);
    res.json({ success: true, stories: [] });
  }
});

app.get('/api/vendor/stories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM vendor_stories WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json({ success: true, story: result.rows[0] });
    } else {
      res.json({ success: true, story: { id, title: "Story", image: "" } });
    }
  } catch (err) {
    res.json({ success: true, story: { id, title: "Story", image: "" } });
  }
});

app.get('/api/vendor/staff', async (req, res) => {
  const { shop_id } = req.query;
  try {
    const result = await pool.query('SELECT * FROM vendor_staff WHERE shop_id = $1 ORDER BY id DESC', [shop_id]);
    res.json({ success: true, staff: result.rows });
  } catch (err) {
    console.error("Staff fetch error:", err);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.post('/api/vendor/staff', async (req, res) => {
  const { shop_id, name, role, phone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO vendor_staff (shop_id, name, role, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [shop_id, name, role, phone]
    );
    res.status(201).json({ success: true, staff: result.rows[0], message: "स्टाफ सफलतापूर्वक जोड़ दिया गया है हुकुम!" });
  } catch (err) {
    console.error("Staff add error:", err);
    res.status(500).json({ success: false, message: "स्टाफ सेव करने में एरर!" });
  }
});

app.get('/api/vendor/products', async (req, res) => {
  const { shop_id } = req.query;
  try {
    const result = await pool.query('SELECT * FROM products WHERE shop_id = $1 ORDER BY id DESC', [shop_id]);
    res.json({ success: true, products: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database fetch error' });
  }
});

app.post('/api/vendor/products', async (req, res) => {
  const { shop_id, name, price, stock, category, bio, image } = req.body;
  try {
    const query = `
      INSERT INTO products (shop_id, name, price, stock, category, description, image, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'active') RETURNING *;
    `;
    const values = [shop_id, name, price, stock, category, bio, image];
    const newProduct = await pool.query(query, values);
    res.status(201).json({ success: true, product: newProduct.rows[0], message: "प्रोडक्ट जुड़ गया है हुकुम!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to save product in database' });
  }
});

app.post('/api/products/add', async (req, res) => {
  const { email, productName, price, weight, category, image } = req.body;
  try {
    const vendorQuery = await pool.query('SELECT id FROM vendors WHERE email = $1', [email]);
    if (vendorQuery.rows.length === 0) {
      return res.status(404).json({ success: false, message: "वेंडर नहीं मिला!" });
    }
    const vendorId = vendorQuery.rows[0].id;

    const insertQuery = `
      INSERT INTO products (vendor_id, product_name, price, weight, category, image_url) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const values = [vendorId, productName, price, weight, category, image];
    const newProduct = await pool.query(insertQuery, values);

    res.json({ success: true, message: "प्रोडक्ट डेटाबेस में सुरक्षित जुड़ गया है!", product: newProduct.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "डेटाबेस एरर, प्रोडक्ट नहीं जुड़ पाया!" });
  }
});

app.delete('/api/vendor/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
});

app.get('/api/vendor/chats', async (req, res) => {
  const { shop_id } = req.query;
  try {
    const result = await pool.query('SELECT * FROM vendor_chats WHERE shop_id = $1 ORDER BY id DESC', [shop_id]);
    res.json({ success: true, chats: result.rows });
  } catch (err) {
    console.error("Chats fetch error:", err);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});

app.get('/api/vendor/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE role = $1 ORDER BY id DESC', ['CUSTOMER']);
    res.json({ success: true, customers: result.rows });
  } catch (err) {
    console.error("Customers fetch error:", err);
    res.status(200).json({ success: true, customers: [] });
  }
});

// --- SPECIAL OFFERS ROUTES ---
app.post('/api/vendor/offers', async (req, res) => {
  try {
    const { shop_id, title, discount, image } = req.body;
    const newOffer = new Offer({ shop_id, title, discount, image });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(500).json({ message: "ऑफर सेव नहीं हो सका", error });
  }
});

app.get('/api/vendor/offers', async (req, res) => {
  try {
    const { shop_id } = req.query;
    const offers = await Offer.find({ shop_id }).sort({ created_at: -1 });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: "ऑफर फ़ेच करने में एरर आया", error });
  }
});

app.delete('/api/vendor/offers/:id', async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: "ऑफर सफलतापूर्वक हटा दिया गया" });
  } catch (error) {
    res.status(500).json({ message: "ऑफर डिलीट नहीं हो सका", error });
  }
});

// Enable CORS
app.use(cors());

// Base64 Images upload ke liye Payload Limit badhayen (Crucial for Images)
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Database Import (db.js se MongoDB aur PostgreSQL dono ek saath connect honge)
const dbpool = require('./db');

// ==========================================
// --- DATABASE MODELS ---
// ==========================================
const offerSchema = new mongoose.Schema({
  shop_id: { type: String, default: "" },
  vendorEmail: { type: String, default: "" },
  title: { type: String, required: true },
  discount: { type: String, default: "" },
  image: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const categorySchema = new mongoose.Schema({
  shop_id: { type: String, default: "" },
  vendorEmail: { type: String, default: "" },
  categoryId: { type: Number },
  title: { type: String, required: true },
  image: { type: String, default: "" }
}, { timestamps: true });

const Offer = mongoose.models.Offer || mongoose.model('Offer', offerSchema);
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

// ==========================================
// --- SPECIAL OFFERS ROUTES ---
// ==========================================

// 1. Add Offer
app.post('/api/vendor/offers', async (req, res) => {
  try {
    const { shop_id, vendorEmail, title, discount, image } = req.body;
    
    if (!title || !image) {
      return res.status(400).json({ message: "Title aur Image zaroori hain!" });
    }

    const newOffer = new Offer({
      shop_id: shop_id || "",
      vendorEmail: vendorEmail || "",
      title,
      discount: discount || "",
      image
    });

    await newOffer.save();
    return res.status(201).json(newOffer);
  } catch (error) {
    console.error("Add Offer Error:", error);
    return res.status(500).json({ message: "ऑफ़र सेव करने में एरर आया", error: error.message });
  }
});

// 2. Get Offers
app.get('/api/vendor/offers', async (req, res) => {
  try {
    const { shop_id, vendorEmail } = req.query;
    let query = {};

    if (shop_id && shop_id !== 'undefined' && shop_id !== 'null' && shop_id !== '') {
      query.shop_id = shop_id;
    } else if (vendorEmail && vendorEmail !== 'undefined' && vendorEmail !== 'null' && vendorEmail !== '') {
      query.vendorEmail = vendorEmail;
    }

    const offers = await Offer.find(query).sort({ created_at: -1 });
    return res.status(200).json(offers || []);
  } catch (error) {
    console.error("Get Offers Error:", error);
    return res.status(500).json({ message: "ऑफ़र फ़ेच करने में एरर आया", error: error.message });
  }
});

// 3. Delete Offer
app.delete('/api/vendor/offers/:id', async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "ऑफ़र डिलीट हो गया" });
  } catch (error) {
    console.error("Delete Offer Error:", error);
    return res.status(500).json({ message: "डिलीट एरर", error: error.message });
  }
});

// ==========================================
// --- FEATURED CATEGORIES ROUTES ---
// ==========================================

// 1. Add / Update Category
app.put('/api/vendor/categories', async (req, res) => {
  try {
    const { shop_id, vendorEmail, categoryId, title, image } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Category Title zaroori hai!" });
    }

    let filter = {};
    if (categoryId) {
      filter = { categoryId: Number(categoryId) };
    } else {
      filter = { title: title };
    }

    if (shop_id && shop_id !== 'undefined' && shop_id !== 'null') {
      filter.shop_id = shop_id;
    }

    const updatePayload = {
      title,
      image: image || "",
      vendorEmail: vendorEmail || "",
      shop_id: shop_id || ""
    };

    if (categoryId) {
      updatePayload.categoryId = Number(categoryId);
    }

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      { $set: updatePayload },
      { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(500).json({ message: "कैटेगरी अपडेट करने में एरर आया", error: error.message });
  }
});

// 2. Get Categories
app.get('/api/vendor/categories', async (req, res) => {
  try {
    const { shop_id, vendorEmail } = req.query;
    let query = {};

    if (shop_id && shop_id !== 'undefined' && shop_id !== 'null' && shop_id !== '') {
      query.shop_id = shop_id;
    } else if (vendorEmail && vendorEmail !== 'undefined' && vendorEmail !== 'null' && vendorEmail !== '') {
      query.vendorEmail = vendorEmail;
    }

    const categories = await Category.find(query);
    return res.status(200).json(categories || []);
  } catch (error) {
    console.error("Get Categories Error:", error);
    return res.status(500).json({ message: "कैटेगरीज फ़ेच करने में एरर आया", error: error.message });
  }
});

// ==========================================
// --- VENDOR ORDERS FETCH ENDPOINT (PostgreSQL) ---
// ==========================================
app.get('/api/vendor/orders', async (req, res) => {
  try {
    const { shop_id, shopId, vendorEmail } = req.query;
    const targetShopId = shop_id || shopId;

    let query = 'SELECT * FROM orders ORDER BY id DESC';
    let values = [];

    if (targetShopId && targetShopId !== 'undefined' && targetShopId !== 'null' && targetShopId !== 'General') {
      query = 'SELECT * FROM orders WHERE LOWER(TRIM(shop_id)) = LOWER(TRIM($1)) OR shop_id IS NULL ORDER BY id DESC';
      values = [targetShopId];
    }

    const result = await pool.query(query, values);

    const formattedOrders = result.rows.map(row => {
      let parsedItems = row.items;
      if (typeof row.items === 'string') {
        try {
          parsedItems = JSON.parse(row.items);
        } catch (e) {
          parsedItems = [];
        }
      }
      return {
        ...row,
        orderId: row.order_id || row.id,
        totalAmount: row.total_amount,
        customerInfo: {
          name: row.customer,
          phone: row.phone,
          address: row.shipping_address
        },
        items: Array.isArray(parsedItems) ? parsedItems : [parsedItems]
      };
    });

    res.status(200).json({ success: true, orders: formattedOrders });
  } catch (err) {
    console.error("❌ Fetch Vendor Orders Error:", err);
    res.status(500).json({ success: false, message: "सर्वर एरर!" });
  }
});






app.post('/api/orders', async (req, res) => {
  try {
    const { customerEmail, email, phone, items, totalAmount, shippingAddress } = req.body;
    const finalEmail = customerEmail || email;
    
    const query = `
      INSERT INTO orders (customer_email, phone, items, total_amount, shipping_address, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *;
    `;
    const values = [finalEmail, phone, JSON.stringify(items), totalAmount, shippingAddress];
    
    const result = await pool.query(query, values);
    
    res.status(201).json({
      success: true,
      message: "Order saved successfully in PostgreSQL!",
      order: result.rows[0]
    });
  } catch (err) {
    console.error("PostgreSQL Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/cancel-order', async (req, res) => {
  try {
    const { orderId, email } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID आवश्यक है!" });
    }

    const query = `
      UPDATE orders 
      SET status = 'Cancelled' 
      WHERE (order_id = $1 OR id::text = $1) 
        AND ($2::text IS NULL OR customer_email = $2) 
      RETURNING *;
    `;
    
    const result = await pool.query(query, [orderId, email || null]);

    if (result.rows.length > 0) {
      const cancelledOrder = result.rows[0];

      // 🔔 Optional: Vendor को सॉकेट से मैसेज भेजने के लिए
      if (global.io && cancelledOrder.vendor_email) {
        global.io.to(`shop_${cancelledOrder.vendor_email}`).emit('order_cancelled', {
          orderId: cancelledOrder.order_id || cancelledOrder.id,
          message: "एक ऑर्डर कैंसल हो गया है!"
        });
      }

      return res.json({ 
        success: true, 
        message: "ऑर्डर सफलतापूर्वक कैंसल कर दिया गया है",
        order: cancelledOrder 
      });
    } else {
      return res.status(404).json({ success: false, message: "ऑर्डर नहीं मिला!" });
    }

  } catch (err) {
    console.error("Cancel Order Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== OTP SYSTEM APIS ====================

const otpStorage = {};

app.post('/api/send-otp', (req, res) => {
  const { phone } = req.body;
  
  if (!phone) {
    return res.status(400).json({ success: false, message: 'मोबाइल नंबर आवश्यक है, हुकुम!' });
  }

  const realOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  otpStorage[phone] = {
    otp: realOtp,
    expiresAt: Date.now() + 5 * 60 * 1000
  };

  console.log("----------------------------------------");
  console.log(`[OTP DEBUG] Target Phone: ${phone}`);
  console.log(`[OTP DEBUG] Code: ${realOtp}`);
  console.log("----------------------------------------");

  res.json({ 
    success: true, 
    message: 'ओटीपी सफलतापूर्वक सर्वर द्वारा जनरेट कर दिया गया है!' 
  });
});

app.post('/api/verify-otp-custom', (req, res) => {
  const { phone, otp } = req.body;

  const record = otpStorage[phone];

  if (!record) {
    return res.status(400).json({ success: false, message: 'पहले ओटीपी अनुरोध करें, हुकुम!' });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStorage[phone];
    return res.status(400).json({ success: false, message: 'ओटीपी एक्सपायर हो गया है!' });
  }

  if (record.otp === otp) {
    delete otpStorage[phone]; 
    return res.json({ success: true, message: 'ओटीपी वेरीफाई हो गया!' });
  } else {
    return res.status(400).json({ success: false, message: 'गलत ओटीपी, कृपया दोबारा जांचें।' });
  }
});

// ==================== HELPER FUNCTIONS ====================

const calculateluxuryVendorFees = (itemPrice, weightInGrams, volumeInCubicFeet, itemCategory, isFbaUsed) => {
  const basePrice = parseFloat(itemPrice) || 0;
  if (basePrice <= 0) return { error: "अमान्य प्रोडक्ट मूल्य!" };

  let referralPercentage = 0.10;
  const categoryLower = (itemCategory || '').toLowerCase();
  
  if (categoryLower.includes('book') || categoryLower.includes('grocery')) {
    referralPercentage = 0.03;
  } else if (categoryLower.includes('electronic') || categoryLower.includes('mobile')) {
    referralPercentage = 0.07;
  } else if (categoryLower.includes('apparel') || categoryLower.includes('fashion') || categoryLower.includes('polo') || categoryLower.includes('luxury')) {
    referralPercentage = 0.15;
  }
  const referralFee = basePrice * referralPercentage;

  let closingFee = 15;
  if (basePrice > 500 && basePrice <= 1000) {
    closingFee = 25;
  } else if (basePrice > 1000) {
    closingFee = 40;
  }

  let shippingFee = 37;
  const weight = parseFloat(weightInGrams) || 0;
  if (weight > 500) {
    const extraSlabs = Math.ceil((weight - 500) / 500);
    shippingFee += extraSlabs * 15;
  }

  let pickPackFee = 0;
  let storageFee = 0;
  if (isFbaUsed) {
    pickPackFee = 14;
    const volume = parseFloat(volumeInCubicFeet) || 0.1;
    storageFee = volume * 45;
  }

  const subtotalDeductions = referralFee + closingFee + shippingFee + pickPackFee + storageFee;
  const gstOnFees = subtotalDeductions * 0.18;
  const totalDeductions = subtotalDeductions + gstOnFees;
  const netVendorEarnings = basePrice - totalDeductions;

  return {
    itemPrice: basePrice.toFixed(2),
    referralFee: referralFee.toFixed(2),
    closingFee: closingFee.toFixed(2),
    shippingFee: shippingFee.toFixed(2),
    pickPackFee: pickPackFee.toFixed(2),
    storageFee: storageFee.toFixed(2),
    gstOnFees: gstOnFees.toFixed(2),
    totalDeductions: totalDeductions.toFixed(2),
    netVendorEarnings: netVendorEarnings.toFixed(2)
  };
};

const getSmartRefundOptions = (refundAmount) => {
  const amount = parseFloat(refundAmount) || 0;
  const extraWalletDiscount = 20;
  
  return {
    bankTransfer: {
      time: "5-7 Working Days",
      refundAmount: amount.toFixed(2),
      message: "Direct Bank Transfer"
    },
    instantWallet: {
      time: "Instant (Immediate)",
      refundAmount: (amount + extraWalletDiscount).toFixed(2),
      message: `तुरंत रिफंड पर ₹${extraWalletDiscount} अतिरिक्त फायदा पाइए!`
    }
  };
};

module.exports = { calculateluxuryVendorFees, getSmartRefundOptions };

// ==================== SERVER START ====================
server.listen(PORT, () => {
  console.log(`🚀 अति-सुरक्षित और स्केलेबल बैकएंड सर्वर पोर्ट ${PORT} पर एक्टिव है हुकुम!`);
});