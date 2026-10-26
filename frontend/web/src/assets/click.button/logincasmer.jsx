import React, { useState } from 'react';

// दुनिया भर के प्रमुख देश और उनके कोड/लेंथ की लिस्ट
const COUNTRY_CODES = [
  { name: 'India', code: '+91', flag: 'IN', length: 10 },
  { name: 'United States', code: '+1', flag: '🇺🇸', length: 10 },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧', length: 10 },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', length: 9 },
  { name: 'Canada', code: '+1', flag: '🇨🇦', length: 10 },
  { name: 'Australia', code: '+61', flag: '🇦🇺', length: 9 },
  { name: 'Germany', code: '+49', flag: '🇩🇪', length: 11 },
  { name: 'France', code: '+33', flag: '🇫🇷', length: 9 },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', length: 9 },
];

const BACKEND = 'http://localhost:5001';

export default function Login({ setIsLoggedIn, setProfile, setCurrentTab, setCurrentUser }) {
  // 🌐 भाषा चयन स्टेट (पूरी ऐप के लिए)
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('preferred_language') || null);

  // 📝 मल्टी-स्टेप फ्लो स्टेट: 'language' -> 'name' -> 'dob' -> 'phone' -> 'otp' -> 'email'
  const [flowStep, setFlowStep] = useState('language');

  // यूजर इनपुट स्टेट्स
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [modalType, setModalType] = useState(null);

  // भाषा चुनने पर नाम वाले स्टेप पर जाना (यहाँ ग्लोबल इवेंट जोड़ दिया गया है ताकि पूरी ऐप में भाषा अपडेट हो सके)
  const handleChooseLanguage = async (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('preferred_language', langCode);
    
    // 🌐 पूरी एप्लीकेशन को भाषा बदलने का सिग्नल भेजना
    window.dispatchEvent(new Event('languageChange'));

    setFlowStep('name'); 
    try {
      await fetch(`${BACKEND}/api/vendor/update-language`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'bunty@luxury.com', language: langCode })
      });
    } catch (error) {
      console.error("भाषा अपडेट एरर:", error);
    }
  };

  // नाम सेव करके जन्म तिथि (DOB) वाले स्टेप पर जाना
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim()) {
      alert('हुकुम, कृपया अपना नाम तो दर्ज करें!');
      return;
    }
    setFlowStep('dob');
  };

  // जन्म तिथि सेव करके फोन नंबर वाले स्टेप पर जाना
  const handleDobSubmit = (e) => {
    e.preventDefault();
    if (!dob) {
      alert('हुकुम, कृपया अपनी जन्म तिथि (Date of Birth) दर्ज करें!');
      return;
    }
    setFlowStep('phone');
  };

  // OTP भेजने का फंक्शन
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!loginPhone || loginPhone.length !== selectedCountry.length) {
      alert(`हुकुम, ${selectedCountry.name} के लिए मोबाइल नंबर ठीक ${selectedCountry.length} अंकों का होना चाहिए!`);
      return;
    }

    const fullPhoneNumber = `${selectedCountry.code} ${loginPhone}`;
    const attemptsKey = `otp_attempts_${fullPhoneNumber}`;
    const currentAttempts = Number(localStorage.getItem(attemptsKey) || 0);

    if (currentAttempts >= 2) {
      alert('सुरक्षा कारणों से इस नंबर पर ओटीपी भेजने की सीमा (2 बार) समाप्त हो चुकी है, हुकुम!');
      return;
    }

    localStorage.setItem(attemptsKey, currentAttempts + 1);

    fetch(`${BACKEND}/api/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: fullPhoneNumber })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setFlowStep('otp');
        alert(`ओटीपी आपके मोबाइल नंबर (${fullPhoneNumber}) पर भेज दिया गया है, हुकुम! (टर्मिनल चेक करें)`);
      } else {
        alert(data.message || 'ओटीपी भेजने में विफल!');
      }
    })
    .catch(err => {
      console.error('API Error:', err);
      alert('सर्वर से कनेक्ट नहीं हो पा रहा है, हुकुम!');
    });
  };

  // OTP वेरीफाई होने के बाद ईमेल वाले स्टेप पर जाना
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const fullPhoneNumber = `${selectedCountry.code} ${loginPhone}`.trim();

    try {
      const response = await fetch(`${BACKEND}/api/verify-otp-custom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhoneNumber, otp: enteredOtp })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCustomerEmail(`customer_${Math.floor(Math.random() * 10000)}@luxury.com`);
        setFlowStep('email'); 
      } else {
        alert(data.message || 'गलत ओटीपी, कृपया दोबारा प्रयास करें हुकुम!');
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('सर्वर से कनेक्ट करने में समस्या आ रही है, हुकुम!');
    }
  };

  // अंतिम रूप से अकाउंट बनाकर लॉगिन पूरा करना
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const fullPhoneNumber = `${selectedCountry.code} ${loginPhone}`.trim();
    const existingCustomers = JSON.parse(localStorage.getItem('adminCustomers') || '[]');
    
    let activeCustomer = {
      id: Date.now(),
      name: `${firstName} ${lastName}`.trim(),
      dob: dob,
      email: customerEmail,
      phone: fullPhoneNumber,
      wallet: 20,
      created_at: new Date().toISOString()
    };

    existingCustomers.push(activeCustomer);
    localStorage.setItem('adminCustomers', JSON.stringify(existingCustomers));
    alert('नया खाता सफलतापूर्वक बन गया है! ₹20 वेलकम बोनस आपके वॉलेट में जोड़ दिया गया है, हुकुम!');

    if (typeof setIsLoggedIn === 'function') setIsLoggedIn(true);
    if (typeof setProfile === 'function') setProfile(activeCustomer);
    if (typeof setCurrentUser === 'function') setCurrentUser(activeCustomer);
    if (typeof setCurrentTab === 'function') setCurrentTab('home');

    localStorage.setItem('customerProfile', JSON.stringify(activeCustomer));
    localStorage.setItem('customerToken', 'active_user_token');
    localStorage.setItem('customerPhone', fullPhoneNumber);
  };

  return (
    <div style={{ backgroundColor: '#0c0a09', color: '#f3e5ab', minHeight: '100vh', padding: '15px', fontFamily: 'sans-serif', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* 📜 नियम और शर्तें / प्राइवेसी पॉलिसी मोडल */}
      {modalType ? (
        <div style={{ backgroundColor: '#161310', border: '2px solid #d4af37', borderRadius: '12px', padding: '25px', width: '100%', maxWidth: '450px', boxSizing: 'border-box', color: '#f3e5ab', position: 'relative', boxShadow: '0 0 25px rgba(212, 175, 55, 0.25)' }}>
          <button onClick={() => setModalType(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#d4af37', color: '#000', border: 'none', borderRadius: '50%', width: '30px', height: '30px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
          
          {modalType === 'terms' ? (
            <div>
              <h2 style={{ color: '#d4af37', borderBottom: '1px solid #33291a', paddingBottom: '10px', marginTop: 0, fontSize: '1.2rem' }}>📜 Terms & Conditions</h2>
              <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#ccc', maxHeight: '320px', overflowY: 'auto', paddingRight: '5px', textAlign: 'left' }}>
                <p><b>1. Introduction:</b> Welcome to Luxury Store Jodhpur.</p>
                <p><b>2. Account Security:</b> Users are solely responsible for maintaining credentials.</p>
              </div>
            </div>
          ) : modalType === 'privacy' ? (
            <div>
              <h2 style={{ color: '#d4af37', borderBottom: '1px solid #33291a', paddingBottom: '10px', marginTop: 0, fontSize: '1.2rem' }}>🔒 Privacy Policy</h2>
              <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#ccc', maxHeight: '320px', overflowY: 'auto', paddingRight: '5px', textAlign: 'left' }}>
                <p><b>1. Information Collection:</b> We collect details strictly for order processing.</p>
              </div>
            </div>
          ) : null}
          
          <button onClick={() => setModalType(null)} style={{ width: '100%', marginTop: '20px', backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Close & Return
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: '#161310', border: '1px solid #d4af37', borderRadius: '12px', padding: '20px 18px', width: '100%', maxWidth: '380px', boxSizing: 'border-box', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.6)', position: 'relative' }}>
          
          {/* 1️⃣ भाषा चयन स्क्रीन */}
          {flowStep === 'language' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px', color: '#d4af37' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>अ𐤀</span>
                <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#f3e5ab', fontWeight: 'normal' }}>Choose your language</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { code: 'en', label: 'English', bg: '#eef6f9' },
                  { code: 'hi', label: 'हिंदी', bg: '#f9eef3' },
                  { code: 'ta', label: 'தமிழ்', bg: '#f9f3ee' },
                  { code: 'mr', label: 'मराठी', bg: '#f2eef9' },
                  { code: 'bn', label: 'বাংলা', bg: '#fdf8e2' },
                  { code: 'te', label: 'తెలుగు', bg: '#eef9f3' },
                  { code: 'kn', label: 'ಕನ್ನಡ', bg: '#eef4f9' },
                  { code: 'ml', label: 'മലയാളം', bg: '#f9eeee' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleChooseLanguage(lang.code)}
                    style={{ backgroundColor: lang.bg, color: '#000', border: '1px solid #d4af37', borderRadius: '8px', padding: '12px 8px', fontSize: '1rem', cursor: 'pointer', fontWeight: '500' }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2️⃣ नाम और सरनेम दर्ज करने का पेज */}
          {flowStep === 'name' && (
            <form onSubmit={handleNameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h3 style={{ color: '#d4af37', textAlign: 'center', margin: '0 0 10px 0', fontSize: '1.1rem' }}>👤 Personal Information</h3>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#d4af37', display: 'block', marginBottom: '4px' }}>FIRST NAME</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required
                  style={{ width: '100%', background: '#1f1a14', border: '1px solid #d4af37', color: '#fff', padding: '9px', fontSize: '0.85rem', borderRadius: '6px', boxSizing: 'border-box' }} 
                />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#d4af37', display: 'block', marginBottom: '4px' }}>SURNAME / LAST NAME</label>
                <input 
                  type="text" 
                  placeholder="Enter your surname" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  style={{ width: '100%', background: '#1f1a14', border: '1px solid #d4af37', color: '#fff', padding: '9px', fontSize: '0.85rem', borderRadius: '6px', boxSizing: 'border-box' }} 
                />
              </div>
              <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', marginTop: '5px' }}>
                Continue to Date of Birth
              </button>
            </form>
          )}

          {/* 3️⃣ जन्म तिथि (Date of Birth) दर्ज करने का नया पेज */}
          {flowStep === 'dob' && (
            <form onSubmit={handleDobSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h3 style={{ color: '#d4af37', textAlign: 'center', margin: '0 0 10px 0', fontSize: '1.1rem' }}>📅 Date of Birth</h3>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#d4af37', display: 'block', marginBottom: '4px' }}>SELECT DOB (DD/MM/YYYY)</label>
                <input 
                  type="date" 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)} 
                  required
                  style={{ width: '100%', background: '#1f1a14', border: '1px solid #d4af37', color: '#fff', padding: '9px', fontSize: '0.85rem', borderRadius: '6px', boxSizing: 'border-box' }} 
                />
              </div>
              <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', marginTop: '5px' }}>
                Continue to Phone
              </button>
            </form>
          )}

          {/* 4️⃣ फोन नंबर वाला पेज */}
          {flowStep === 'phone' && (
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                <h3 style={{ color: '#d4af37', margin: '0 0 5px 0', fontSize: '1rem' }}>✧ PHONE VERIFICATION ✧</h3>
              </div>
              <label style={{ fontSize: '0.68rem', color: '#d4af37', display: 'block', fontWeight: 'bold' }}>PHONE NUMBER</label>
              
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1f1a14', border: '1px solid #d4af37', borderRadius: '6px', padding: '2px 8px' }}>
                <select 
                  value={selectedCountry.code} 
                  onChange={(e) => {
                    const found = COUNTRY_CODES.find(c => c.code === e.target.value);
                    if (found) setSelectedCountry(found);
                  }}
                  style={{ background: 'transparent', border: 'none', color: '#f3e5ab', fontSize: '0.82rem', cursor: 'pointer', outline: 'none', marginRight: '4px' }}
                >
                  {COUNTRY_CODES.map((c, idx) => (
                    <option key={idx} value={c.code} style={{ backgroundColor: '#161310', color: '#f3e5ab' }}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>

                <input 
                  type="tel" 
                  placeholder={`Enter ${selectedCountry.length}-digit number`}
                  value={loginPhone} 
                  onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))} 
                  required
                  maxLength={selectedCountry.length}
                  style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '8px 0', fontSize: '0.85rem', outline: 'none' }} 
                />
              </div>
              <span style={{ fontSize: '0.6rem', color: '#888', display: 'block' }}>
                {selectedCountry.name} ({selectedCountry.code}) — {selectedCountry.length} digits required
              </span>

              <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', marginTop: '10px' }}>
                Send OTP
              </button>
            </form>
          )}

          {/* 5️⃣ OTP वेरीफिकेशन पेज */}
          {flowStep === 'otp' && (
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.7rem', color: '#d4af37', display: 'block' }}>ENTER OTP SENT TO {selectedCountry.code} {loginPhone}</label>
              <input 
                type="text" 
                placeholder="Enter 6-digit OTP" 
                value={enteredOtp} 
                onChange={(e) => setEnteredOtp(e.target.value)} 
                required
                maxLength="6"
                style={{ width: '100%', background: '#1f1a14', border: '1px solid #d4af37', color: '#fff', padding: '10px', fontSize: '0.9rem', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center', letterSpacing: '2px' }} 
              />
              <button type="submit" style={{ backgroundColor: '#2ecc71', color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', marginTop: '5px' }}>
                Verify OTP
              </button>
              <button type="button" onClick={() => setFlowStep('phone')} style={{ backgroundColor: 'transparent', color: '#aaa', border: 'none', fontSize: '0.7rem', cursor: 'pointer', textDecoration: 'underline' }}>
                Change Phone Number
              </button>
            </form>
          )}

          {/* 6️⃣ ईमेल आईडी डालने वाला पेज */}
          {flowStep === 'email' && (
            <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h3 style={{ color: '#d4af37', textAlign: 'center', margin: '0 0 5px 0', fontSize: '1.1rem' }}>✉️ Email Address</h3>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#d4af37', display: 'block', marginBottom: '4px' }}>EMAIL (Editable)</label>
                <input 
                  type="email" 
                  value={customerEmail} 
                  onChange={(e) => setCustomerEmail(e.target.value)} 
                  required
                  style={{ width: '100%', background: '#1f1a14', border: '1px solid #d4af37', color: '#fff', padding: '9px', fontSize: '0.85rem', borderRadius: '6px', boxSizing: 'border-box' }} 
                />
              </div>
              <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', marginTop: '5px' }}>
                Complete Sign Up & Login
              </button>
            </form>
          )}

          {/* टर्म्स एंड कंडीशंस लिंक नीचे */}
          {flowStep !== 'language' && (
            <div style={{ marginTop: '15px', fontSize: '0.65rem', color: '#aaa', lineHeight: '1.3' }}>
              By continuing, you agree to Luxury Store's <br/>
              <span onClick={() => setModalType('terms')} style={{ color: '#d4af37', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>Terms & Conditions</span> 
              {' '}and{' '}
              <span onClick={() => setModalType('privacy')} style={{ color: '#d4af37', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>Privacy Policy</span>
            </div>
          )}

        </div>
      )}
    </div>
  );
}