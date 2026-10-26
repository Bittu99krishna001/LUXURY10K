import React, { useState, useEffect } from 'react';

// 🌐 Multi-language Dictionary for Side Menu
const menuTranslations = {
  English: {
    menuTitle: 'LUXURY MENU',
    home: '🏠 Home',
    cart: '🛒 Cart',
    wishlist: '🤍 Wishlist',
    account: '👤 Account',
    vendorDashboard: '🏪 Vendor Dashboard'
  },
  Hindi: {
    menuTitle: 'लक्जरी मेनू',
    home: '🏠 होम',
    cart: '🛒 कार्ट',
    wishlist: '🤍 विशलिस्ट',
    account: '👤 अकाउंट',
    vendorDashboard: '🏪 वेंडर डैशबोर्ड'
  },
  Tamil: {
    menuTitle: 'லக்சரி மெனு',
    home: '🏠 முகப்பு',
    cart: '🛒 கார்ட்',
    wishlist: '🤍 விருப்பப்பட்டியல்',
    account: '👤 கணக்கு',
    vendorDashboard: '🏪 விற்பனையாளர் டாஷ்போர்டு'
  },
  Marathi: {
    menuTitle: 'लक्झरी मेनू',
    home: '🏠 होम',
    cart: '🛒 कार्ट',
    wishlist: '🤍 विशलिस्ट',
    account: '👤 खाते',
    vendorDashboard: '🏪 व्हेंडर डॅशबोर्ड'
  },
  Bengali: {
    menuTitle: 'লাক্সারি মেনু',
    home: '🏠 হোম',
    cart: '🛒 কার্ট',
    wishlist: '🤍 উইশলিস্ট',
    account: '👤 অ্যাকাউন্ট',
    vendorDashboard: '🏪 ভেন্ডর ড্যাশবোর্ড'
  },
  Telugu: {
    menuTitle: 'లగ్జరీ మెనూ',
    home: '🏠 హోమ్',
    cart: '🛒 కార్ట్',
    wishlist: '🤍 విష్‌లిస్ట్',
    account: '👤 ఖాతా',
    vendorDashboard: '🏪 వెండర్ డాష్‌బోర్డ్'
  },
  Kannada: {
    menuTitle: 'ಲಕ್ಸುರಿ ಮೆನು',
    home: '🏠 ಮುಖಪುಟ',
    cart: '🛒 ಕಾರ್ಟ್',
    wishlist: '🤍 ಇಷ್ಟಪಟ್ಟಿ',
    account: '👤 ಖಾತೆ',
    vendorDashboard: '🏪 ವೆಂಡರ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'
  },
  Malayalam: {
    menuTitle: 'ലക്സറി മെനു',
    home: '🏠 ഹോം',
    cart: '🛒 കാർട്ട്',
    wishlist: '🤍 വിഷ്‌ലിസ്റ്റ്',
    account: '👤 അക്കൗണ്ട്',
    vendorDashboard: '🏪 വെണ്ടർ ഡാഷ്‌ബോർഡ്'
  }
};

export default function Menu({ isOpen, onClose, setActiveTab }) {
  // 🌐 भाषा सिंक स्टेट
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'English';
  });

  const t = menuTranslations[currentLang] || menuTranslations.English;

  // 🔄 रियल-टाइम भाषा बदलने का लिसनर
  useEffect(() => {
    const handleLangChange = (event) => {
      const savedLang = event.detail || localStorage.getItem('appLanguage') || 'English';
      setCurrentLang(savedLang);
    };

    window.addEventListener('languageChanged', handleLangChange);
    window.addEventListener('storage', handleLangChange);

    return () => {
      window.removeEventListener('languageChanged', handleLangChange);
      window.removeEventListener('storage', handleLangChange);
    };
  }, []);

  // अगर मेनू बंद है, तो स्क्रीन पर कुछ भी मत दिखाओ
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-start'
    }}>
      {/* साइड मेनू का मुख्य बॉक्स */}
      <div style={{
        width: '280px',
        height: '100%',
        backgroundColor: '#161310',
        borderRight: '1px solid #d4af37',
        padding: '25px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '5px 0 25px rgba(0,0,0,0.9)'
      }}>
        
        {/* हेडर और क्लोज (✕) बटन */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px', 
          borderBottom: '1px solid rgba(212,175,55,0.3)', 
          paddingBottom: '15px' 
        }}>
          <h2 style={{ color: '#d4af37', margin: 0, fontSize: '1.2rem', letterSpacing: '1px' }}>{t.menuTitle}</h2>
          <span 
            onClick={onClose} 
            style={{ fontSize: '1.5rem', cursor: 'pointer', color: '#d4af37', fontWeight: 'bold' }}
          >
            ✕
          </span>
        </div>

        {/* मेनू के विकल्प */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1.1rem' }}>
          <div 
            onClick={() => { setActiveTab('home'); onClose(); }} 
            style={{ cursor: 'pointer', color: '#f3e5ab', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            {t.home}
          </div>
          <div 
            onClick={() => { setActiveTab('cart'); onClose(); }} 
            style={{ cursor: 'pointer', color: '#f3e5ab', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            {t.cart}
          </div>
          <div 
            onClick={() => { setActiveTab('wishlist'); onClose(); }} 
            style={{ cursor: 'pointer', color: '#f3e5ab', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            {t.wishlist}
          </div>
          <div 
            onClick={() => { setActiveTab('account'); onClose(); }} 
            style={{ cursor: 'pointer', color: '#f3e5ab', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            {t.account}
          </div>
          <div 
            onClick={() => { setActiveTab('vendorDashboard'); onClose(); }} 
            style={{ cursor: 'pointer', color: '#ffd700', padding: '8px 0', fontWeight: 'bold' }}
          >
            {t.vendorDashboard}
          </div>
        </div>
      </div>

      {/* साइड वाले खाली हिस्से पर क्लिक करने पर मेनू बंद हो जाएगा */}
      <div onClick={onClose} style={{ flex: 1, height: '100%' }} />
    </div>
  );
}