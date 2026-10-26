import React, { useState, useEffect } from 'react';

export default function VendorPortal({ 
  shopName, setShopName, 
  ownerName, setOwnerName, 
  phone, setPhone, 
  email, setEmail, 
  password, setPassword, 
  vendorProducts, setVendorProducts, 
  setShowVendorPage, 
  isAlreadyRegistered, 
  setIsAlreadyRegistered 
}) {
  const [step, setStep] = useState(1);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [prodWeight, setProdWeight] = useState("450");
  const [prodCategory, setProdCategory] = useState("polo");

  // 🔄 पेज रिफ्रेश होने पर localStorage और डेटाबेस से सेशन चेक करना
  useEffect(() => {
    const savedEmail = email || localStorage.getItem("vendor_email");
    const savedStep = localStorage.getItem("vendor_step");

    if (savedEmail) {
      if (!email) setEmail(savedEmail);
      
      const checkDatabaseSession = async () => {
        try {
          const response = await fetch('http://localhost:5001/api/vendors/check-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: savedEmail })
          });
          const data = await response.json();
          if (data.success) {
            setShopName(data.vendor.shop_name);
            setOwnerName(data.vendor.owner_name);
            setPhone(data.vendor.phone);
            setStep(3); // सीधा डैशबोर्ड दिखाएं
            setIsAlreadyRegistered(true);
          } else {
            if (savedStep) setStep(parseInt(savedStep));
          }
        } catch (err) {
          console.error("Session check error:", err);
          if (savedStep) setStep(parseInt(savedStep));
        }
      };
      checkDatabaseSession();
    }
  }, []);

  // स्टेप बदलने पर localStorage में सेव करना
  const updateStepAndStorage = (newStep, userEmail) => {
    setStep(newStep);
    localStorage.setItem("vendor_step", newStep);
    if (userEmail) {
      setEmail(userEmail);
      localStorage.setItem("vendor_email", userEmail);
    }
  };

  // बैकएंड सर्वर पर रजिस्ट्रेशन और 6-digit OTP भेजने का फंक्शन
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!shopName || !ownerName || !phone || !email || !password) {
      alert("हुकुम, कृपया सभी डिटेल्स भरें!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/vendors/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopName, ownerName, phone, email, password })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        alert(`📩 ${data.message}`);
        updateStepAndStorage(2, email); // स्टेप 2 पर जाएं और ईमेल सेव करें
      } else {
        alert(`❌ ${data.message || "रजिस्ट्रेशन में त्रुटि!"}`);
      }
    } catch (err) {
      alert("सर्वर से कनेक्ट नहीं हो पा रहा है हुकुम! सुनिश्चित करें कि backend/server.js चल रहा है।");
    }
  };

  // बैकएंड सर्वर पर 6-digit OTP वेरीफाई करने का फंक्शन
  const handleVerifyOtp = async () => {
    if (enteredOtp.length !== 6) {
      alert("हुकुम, कृपया पूरा 6-अंकों का OTP दर्ज करें!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: enteredOtp })
      });

      const data = await response.json();

      if (data.success) {
        alert(`🎉 बधाई हो हुकुम! ${shopName} का अकाउंट सुरक्षित रूप से वेरीफाई हो गया है!`);
        setIsAlreadyRegistered(true);
        updateStepAndStorage(3, email);
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      alert("वेरिफिकेशन के दौरान सर्वर एरर आ गई हुकुम!");
    }
  };

  // 🗄️ डेटाबेस में प्रोडक्ट सेव करने का एपीआई फंक्शन
  const saveProductToDatabase = async (prodData) => {
    try {
      await fetch('http://localhost:5001/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          productName: prodData.name,
          price: prodData.rawPrice,
          weight: prodWeight,
          category: prodCategory,
          image: prodData.img
        })
      });
    } catch (error) {
      console.error("डेटाबेस एपीआई कनेक्ट नहीं हो पाई:", error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', color: '#fff', fontFamily: '"Segoe UI", sans-serif' }}>
      
      {/* TOP INFO STRIP */}
      <div style={{ width: '100%', maxWidth: '600px', backgroundColor: '#000', color: '#d4af37', padding: '10px 15px', display: 'flex', justifyContent: 'space-around', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #d4af37', borderRadius: '6px', marginBottom: '20px', flexWrap: 'wrap', gap: '5px' }}>
        <span>{shopName ? `🏪 ${shopName}` : '[ShopNaam]'}</span>
        <span>{ownerName ? `👤 ${ownerName}` : '[ownername]'}</span>
        <span>{phone ? `📞 ${phone}` : '[number]'}</span>
      </div>

      <div style={{ backgroundColor: '#fff', color: '#000', padding: '25px', borderRadius: '12px', width: '100%', maxWidth: '480px', border: '2px solid #d4af37', boxShadow: '0 5px 20px rgba(212,175,55,0.4)' }}>
        
        {/* STEP 1: REGISTRATION FORM */}
        {step === 1 && (
          <div>
            <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>👑 सिक्योर वेंडर रजिस्ट्रेशन</h3>
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
              <input type="text" placeholder="Shop Name (जैसे- Tabahi Menswear)" value={shopName} onChange={(e) => setShopName(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input type="text" placeholder="Owner Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <button type="submit" style={{ backgroundColor: '#000', color: '#d4af37', border: 'none', padding: '12px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Send Secure 6-Digit OTP 🚀</button>
            </form>
          </div>
        )}

        {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
        {step === 2 && (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🔒 सर्वर 6-अंकों का OTP वेरिफिकेशन</h3>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '10px' }}>आपके ईमेल/कंसोल पर भेजे गए 6-अंकों का सुरक्षित कोड दर्ज करें:</p>
            
            <input 
                type="text" 
                placeholder="------" 
                value={enteredOtp} 
                onChange={(e) => setEnteredOtp(e.target.value)} 
                maxLength="6"
                required 
                style={{ 
                    width: '100%', 
                    padding: '12px', 
                    fontSize: '20px', 
                    textAlign: 'center', 
                    letterSpacing: '8px',
                    backgroundColor: '#222',
                    color: '#fff',
                    border: '1px solid #555',
                    borderRadius: '5px',
                    marginBottom: '15px'
                }}
            />

            <div>
              <button onClick={handleVerifyOtp} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '12px 25px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Verify & Proceed</button>
            </div>
          </div>
        )}

        {/* STEP 3: DASHBOARD & ADD PRODUCT */}
        {step === 3 && (
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#d4af37', textAlign: 'center' }}>🛍️ वेंडर डैशबोर्ड: नया प्रोडक्ट जोड़ें</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
              <input type="text" placeholder="Product Name (जैसे- Polo Shirt)" value={productName} onChange={(e) => setProductName(e.target.value)} style={{ padding: '9px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input type="number" placeholder="Price in ₹ (जैसे- 1200)" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} style={{ padding: '9px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input type="number" placeholder="Weight in Grams (जैसे- 450)" value={prodWeight} onChange={(e) => setProdWeight(e.target.value)} style={{ padding: '9px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input type="text" placeholder="Category (जैसे- polo, luxury)" value={prodCategory} onChange={(e) => setProdCategory(e.target.value)} style={{ padding: '9px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input type="text" placeholder="Product Image URL" value={productImage} onChange={(e) => setProductImage(e.target.value)} style={{ padding: '9px', borderRadius: '5px', border: '1px solid #ccc' }} />

              <button type="button" onClick={async () => {
                if (!productName || !productPrice) {
                  alert("कृपया प्रोडक्ट का नाम और कीमत दर्ज करें!");
                  return;
                }
                const finalImg = productImage || "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&q=80";
                
                const price = parseFloat(productPrice) || 0;
                const referral = price * 0.15;
                const closing = price > 1000 ? 40 : 25;
                const shipping = 37;
                const gstOnFees = (referral + closing + shipping) * 0.18;
                const netEarnings = price - (referral + closing + shipping + gstOnFees);

                const newProdObj = { 
                  name: productName, 
                  rawPrice: price,
                  price: `₹${price}`, 
                  netPayout: `₹${netEarnings.toFixed(2)}`,
                  img: finalImg 
                };

                await saveProductToDatabase(newProdObj);
                setVendorProducts([...vendorProducts, newProdObj]);

                alert(`✅ ${productName} सफलतापूर्वक जोड़ दिया गया!\n💰 आपकी अनुमानित शुद्ध कमाई: ₹${netEarnings.toFixed(2)}`);
                setProductName("");
                setProductPrice("");
                setProductImage("");
              }} style={{ backgroundColor: '#000', color: '#d4af37', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>+ Add Product & Calculate Fees 🚀</button>
            </div>

            <div style={{ borderTop: '2px dashed #d4af37', paddingTop: '12px', textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => setShowVendorPage(false)} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>🏠 होमपेज पर जाएं</button>
              <button onClick={async () => {
                try {
                  await fetch('http://localhost:5001/api/vendors/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                  });
                } catch (e) {
                  console.error(e);
                }
                // लॉगआउट पर स्टोरेज साफ़ करें
                localStorage.removeItem("vendor_email");
                localStorage.removeItem("vendor_step");
                setIsAlreadyRegistered(false);
                updateStepAndStorage(1, "");
                alert("सफलतापूर्वक लॉग आउट हो गए हैं हुकुम!");
              }} style={{ backgroundColor: '#ff4444', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>🔒 Logout</button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <span style={{ color: '#0066cc', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }} onClick={() => setShowVendorPage(false)}>← होमपेज पर वापस जाएं</span>
        </div>
      </div>
    </div>
  );
}