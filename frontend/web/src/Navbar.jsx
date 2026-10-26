import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 🌐 Multi-language Dictionary for Navbar
const navbarTranslations = {
  English: {
    hello: 'HELLO',
    signIn: 'SIGN IN',
    home: 'HOME',
    collections: 'COLLECTIONS',
    vendorActive: 'Vendor Dashboard (Active)',
    openShop: 'Open Your Shop on LuxuryStore',
    moodPicks: '✨ Picks for Your Mood:',
    searchPlaceholder: 'Search (e.g. Watch, Shirt or in Hindi)...',
    recentSearch: '🕒 Recent Search History:',
    clearHistory: 'Clear',
    activeVendor: 'Active Vendor'
  },
  Hindi: {
    hello: 'नमस्ते',
    signIn: 'साइन इन करें',
    home: 'होम',
    collections: 'कलेक्शंस',
    vendorActive: 'वेंडर डैशबोर्ड (Active)',
    openShop: 'LuxuryStore पर अपनी दुकान खोलें',
    moodPicks: '✨ आपके मूड के खास पिक्स:',
    searchPlaceholder: 'खोजें (जैसे Watch, शर्ट या हिंदी में)...',
    recentSearch: '🕒 हाल की खोज (Search History):',
    clearHistory: 'साफ करें',
    activeVendor: 'एक्टिव वेंडर'
  },
  Tamil: {
    hello: 'வணக்கம்',
    signIn: 'லாகின் செய்',
    home: 'முகப்பு',
    collections: 'தொகுப்புகள்',
    vendorActive: 'விற்பனையாளர் டாஷ்போர்டு (Active)',
    openShop: 'LuxuryStore இல் உங்கள் கடையைத் திறக்கவும்',
    moodPicks: '✨ உங்கள் மனநிலைக்கு ஏற்ற தேர்வுகள்:',
    searchPlaceholder: 'தேடுங்கள் (எ.கா. வாட்ச், சட்டை)...',
    recentSearch: '🕒 সাম্প্রতিক தேடல்கள்:',
    clearHistory: 'அழி',
    activeVendor: 'செயலில் உள்ள விற்பனையாளர்'
  },
  Marathi: {
    hello: 'नमस्कार',
    signIn: 'साइन इन करा',
    home: 'होम',
    collections: 'कलेक्शन्स',
    vendorActive: 'वेंडर डॅशबोर्ड (Active)',
    openShop: 'LuxuryStore वर तुमचे दुकान उघडा',
    moodPicks: '✨ तुमच्या मूडसाठी खास निवडी:',
    searchPlaceholder: 'शोधा (उदा. घड्याळ, शर्ट किंवा हिंदीत)...',
    recentSearch: '🕒 अलीकडील शोध इतिहास:',
    clearHistory: 'क्लियर करा',
    activeVendor: 'ॲक्टिव्ह वेंडर'
  },
  Bengali: {
    hello: 'হ্যালো',
    signIn: 'সাইন ইন করুন',
    home: 'হোম',
    collections: 'কালেকশন',
    vendorActive: 'ভেন্ডর ড্যাশবোর্ড (Active)',
    openShop: 'LuxuryStore-এ আপনার দোকান খুলুন',
    moodPicks: '✨ আপনার মুডের বিশেষ পছন্দ:',
    searchPlaceholder: 'খুঁজুন (যেমন ঘড়ি, শার্ট)...',
    recentSearch: '🕒 সাম্প্রতিক অনুসন্ধান ইতিহাস:',
    clearHistory: 'মুছে ফেলুন',
    activeVendor: 'সক্রিয় ভেন্ডর'
  },
  Telugu: {
    hello: 'నమస్కారం',
    signIn: 'సైన్ ఇన్ చేయండి',
    home: 'హోమ్',
    collections: 'కలెక్షన్లు',
    vendorActive: 'వెండర్ డాష్‌బోర్డ్ (Active)',
    openShop: 'LuxuryStore లో మీ దుకాణాన్ని ప్రారంభించండి',
    moodPicks: '✨ మీ మూడ్ కోసం ప్రత్యేక ఎంపికలు:',
    searchPlaceholder: 'వెతకండి (ఉదా. వాచ్, షర్ట్)...',
    recentSearch: '🕒 ఇటీవల వెతికిన చరిత్ర:',
    clearHistory: 'క్లియర్ చేయి',
    activeVendor: 'యాక్టివ్ వెండర్'
  },
  Kannada: {
    hello: 'ನಮಸ್ಕಾರ',
    signIn: 'ಸೈನ್ ಇನ್ ಮಾಡಿ',
    home: 'ಮುಖಪುಟ',
    collections: 'ಸಂಗ್ರಹಣೆಗಳು',
    vendorActive: 'ಮಾರಾಟಗಾರರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ (Active)',
    openShop: 'LuxuryStore ನಲ್ಲಿ ನಿಮ್ಮ ಅಂಗಡಿಯನ್ನು ತೆರೆಯಿರಿ',
    moodPicks: '✨ ನಿಮ್ಮ ಮೂಡ್‌ಗಾಗಿ ವಿಶೇಷ ಆಯ್ಕೆಗಳು:',
    searchPlaceholder: 'ಹುಡುಕಿ (ಉದಾ. ವಾಚ್, ಶರ್ಟ್)...',
    recentSearch: '🕒 ಇತ್ತೀಚಿನ ಹುಡುಕಾಟದ ಇತಿಹಾಸ:',
    clearHistory: 'ತೆರವುಗೊಳಿಸಿ',
    activeVendor: 'ಸಕ್ರಿಯ ಮಾರಾಟಗಾರ'
  },
  Malayalam: {
    hello: 'നമസ്കാരം',
    signIn: 'സൈൻ ഇൻ ചെയ്യുക',
    home: 'ഹോം',
    collections: 'ശേഖരങ്ങൾ',
    vendorActive: 'വെണ്ടർ ഡാഷ്‌ബോർഡ് (Active)',
    openShop: 'LuxuryStore-ൽ നിങ്ങളുടെ കട ആരംഭിക്കുക',
    moodPicks: '✨ നിങ്ങളുടെ മൂഡിന് അനുയോജ്യമായവ:',
    searchPlaceholder: 'തിരയുക (ഉദാ: വാച്ച്, ഷർട്ട്)...',
    recentSearch: '🕒 സമീപകാല തിരച്ചിൽ ചരിത്രം:',
    clearHistory: 'വ്യക്തമാക്കുക',
    activeVendor: 'സജീവ വെണ്ടർ'
  }
};

export default function Navbar({ shopName, isMenuOpen, setIsMenuOpen, setShowVendorModal, setActiveTab, onProductSelect, allProducts = [] }) {
  // 🌐 भाषा सिंक स्टेट
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'English';
  });
  const t = navbarTranslations[currentLang] || navbarTranslations.English;

  // यूजर लॉगिन और प्रोफाइल चेक के लिए स्टेट्स
  const [userName, setUserName] = useState(localStorage.getItem('userName') || localStorage.getItem('vendorEmail') || '');
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('userAvatar') || localStorage.getItem('vendorAvatar') || '');
  const isVendorActive = localStorage.getItem('vendorToken') || localStorage.getItem('vendorEmail');

  // सर्च और मूड एआई स्टेट्स
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');
  const [showMoodDropdown, setShowMoodDropdown] = useState(false);
  const [moodRecommendations, setMoodRecommendations] = useState([]);

  // 🔄 प्रोफाइल, अवतार और भाषा बदलने का लिसनर
  useEffect(() => {
    const handleStorageUpdate = () => {
      setUserName(localStorage.getItem('userName') || localStorage.getItem('vendorEmail') || '');
      setUserAvatar(localStorage.getItem('userAvatar') || localStorage.getItem('vendorAvatar') || '');
    };

    const handleLangChange = (event) => {
      const savedLang = event.detail || localStorage.getItem('appLanguage') || 'English';
      setCurrentLang(savedLang);
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('avatarChanged', handleStorageUpdate);
    window.addEventListener('languageChanged', handleLangChange);
    
    handleStorageUpdate();

    const history = JSON.parse(localStorage.getItem('luxury_search_history')) || [];
    setSearchHistory(history);

    // कस्टमर मूड एआई लॉजिक
    const userMoods = JSON.parse(localStorage.getItem('luxury_user_mood')) || [];
    if (userMoods.length > 0 && allProducts.length > 0) {
      const lastCategory = userMoods[userMoods.length - 1];
      const matched = allProducts.filter(p => p.category?.toLowerCase() === lastCategory.toLowerCase());
      setMoodRecommendations(matched.length > 0 ? matched : allProducts.slice(0, 4));
    } else {
      setMoodRecommendations(allProducts.slice(0, 4));
    }

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('avatarChanged', handleStorageUpdate);
      window.removeEventListener('languageChanged', handleLangChange);
    };
  }, [allProducts]);

  // स्मार्ट सर्च हैंडलर (हिंदी/इंग्लिश और फजी मैच)
  const handleSearchChange = async (queryText) => {
    setSearchQuery(queryText);
    if (!queryText.trim()) {
      setSearchResults([]);
      setSearchMessage('');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5001/api/products/search?query=${queryText}`);
      setSearchResults(res.data.products || []);
      setSearchMessage(res.data.message || '');

      let updatedHistory = [queryText, ...searchHistory.filter(item => item !== queryText)];
      updatedHistory = updatedHistory.slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('luxury_search_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("सर्च करने में एरर:", error);
    }
  };

  const handleItemClick = (product) => {
    let moodHistory = JSON.parse(localStorage.getItem('luxury_user_mood')) || [];
    if (product.category) {
      moodHistory.push(product.category);
      if (moodHistory.length > 10) moodHistory.shift();
      localStorage.setItem('luxury_user_mood', JSON.stringify(moodHistory));
    }

    setSearchResults([]);
    setSearchQuery('');
    if (onProductSelect) onProductSelect(product.id);
  };

  return (
    <>
      {/* SIDEBAR */}
      <div 
        style={{ 
          position: 'fixed', top: 0, left: 0, 
          width: isMenuOpen ? '100%' : '0', height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 999999, 
          opacity: isMenuOpen ? 1 : 0, transition: 'opacity 0.3s ease', 
          pointerEvents: isMenuOpen ? 'auto' : 'none' 
        }} 
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '300px', height: '100%', 
            backgroundColor: '#1a1226', color: '#fff', boxShadow: '5px 0 25px rgba(0,0,0,0.8)', 
            padding: '25px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #4a2858' 
          }} 
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #4a2858', paddingBottom: '15px' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '2px', color: '#f3e5ab' }}>
              {userName ? `${t.hello}, ${userName.toUpperCase()}` : `${t.hello}, ${t.signIn}`}
            </span>
            <button onClick={() => setIsMenuOpen(false)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#fff' }}>✕</button>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '20px', fontWeight: '600' }}>
            <li style={{ cursor: 'pointer' }} onClick={() => { setIsMenuOpen(false); if(setActiveTab) setActiveTab('home'); }}>{t.home}</li>
            <li style={{ cursor: 'pointer' }} onClick={() => { setIsMenuOpen(false); if(setActiveTab) setActiveTab('collections'); }}>{t.collections}</li>
            <li 
              style={{ cursor: 'pointer', padding: '5px 0', color: '#d4af37', fontWeight: '700' }} 
              onClick={() => {
                setIsMenuOpen(false);
                if (setShowVendorModal) setShowVendorModal(true);
              }}
            >
              👑 {isVendorActive ? t.vendorActive : t.openShop}
            </li>
          </ul>

          {/* साइडबार में मूड एआई शॉर्टकट */}
          {moodRecommendations.length > 0 && (
            <div style={{ marginTop: 'auto', background: '#120d1a', padding: '12px', borderRadius: '8px', border: '1px solid #d4af37' }}>
              <p style={{ fontSize: '12px', color: '#ffd700', margin: '0 0 8px 0', fontWeight: 'bold' }}>{t.moodPicks}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {moodRecommendations.slice(0, 2).map((item) => (
                  <div key={item.id} onClick={() => { setIsMenuOpen(false); handleItemClick(item); }} style={{ fontSize: '13px', cursor: 'pointer', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    👉 {item.product_name} (₹{item.price})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#161310', padding: '12px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #d4af37', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.8)', gap: '15px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => setIsMenuOpen(true)} style={{ background: 'none', border: 'none', fontSize: '1.6rem', cursor: 'pointer', color: '#d4af37' }}>☰</button>
          
          <div style={{ fontSize: '1.3rem', fontWeight: '900', letterSpacing: '3px', color: '#ffd700', textShadow: '0 0 10px rgba(212,175,55,0.4)', whiteSpace: 'nowrap' }}>
            {shopName ? shopName.toUpperCase() : 'LUXURY STORE'}
          </div>
        </div>

        {/* 🔍 स्मार्ट सर्च बार + सर्च हिस्ट्री */}
        <div style={{ position: 'relative', flex: '1', maxWidth: '450px', minWidth: '220px' }}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setShowMoodDropdown(true)}
            style={{ 
              width: '100%', padding: '9px 14px', borderRadius: '20px', 
              border: '1px solid #d4af37', background: '#0a0907', color: '#fff', fontSize: '14px',
              outline: 'none'
            }}
          />

          {/* सर्च हिस्ट्री (जब इनपुट खाली हो) */}
          {!searchQuery && searchHistory.length > 0 && showMoodDropdown && (
            <div style={{ position: 'absolute', top: '42px', left: 0, width: '100%', background: '#1c1712', border: '1px solid #d4af37', padding: '8px', borderRadius: '8px', zIndex: 10, boxShadow: '0 5px 15px rgba(0,0,0,0.9)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <span style={{ fontSize: '11px', color: '#ffd700', fontWeight: 'bold' }}>{t.recentSearch}</span>
                <span style={{ fontSize: '10px', color: '#aaa', cursor: 'pointer' }} onClick={() => { localStorage.removeItem('luxury_search_history'); setSearchHistory([]); }}>{t.clearHistory}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {searchHistory.map((item, index) => (
                  <span 
                    key={index} 
                    onClick={() => handleSearchChange(item)}
                    style={{ background: '#2c251e', color: '#ffd700', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', border: '1px solid #44372a' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* सर्च रिजल्ट्स ड्रॉपडाउन */}
          {searchResults.length > 0 && (
            <div style={{ position: 'absolute', top: '42px', left: 0, width: '100%', background: '#161310', border: '1px solid #d4af37', borderRadius: '8px', zIndex: 20, maxHeight: '280px', overflowY: 'auto', boxShadow: '0 8px 25px rgba(0,0,0,0.9)' }}>
              {searchMessage && <p style={{ color: '#ffd700', fontSize: '11px', margin: '6px 10px', padding: '4px', background: '#221c14', borderRadius: '4px' }}>{searchMessage}</p>}
              {searchResults.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleItemClick(product)}
                  style={{ padding: '8px 12px', borderBottom: '1px solid #2a221a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#221c14'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <img src={product.image_url} alt={product.product_name} style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #d4af37' }} />
                  <div>
                    <p style={{ margin: 0, color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>{product.product_name}</p>
                    <p style={{ margin: 0, color: '#d4af37', fontSize: '11px' }}>₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* राइट साइड: वेंडर बैज और यूजर प्रोफाइल */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isVendorActive && (
            <span style={{ fontSize: '0.7rem', backgroundColor: '#d4af37', color: '#000', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', boxShadow: '0 0 8px rgba(212,175,55,0.6)', whiteSpace: 'nowrap' }}>
              {t.activeVendor}
            </span>
          )}

          <div 
            onClick={() => {
              if (setActiveTab) setActiveTab('account');
            }}
            style={{ 
              width: '36px', height: '36px', borderRadius: '50%', 
              border: '2px solid #d4af37', overflow: 'hidden', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#221e18'
            }}
            title="Go to Account"
          >
            {userAvatar ? (
              <img src={userAvatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : userName ? (
              <span style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '0.9rem' }}>
                {userName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <span style={{ fontSize: '1.2rem' }}>👤</span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}