import React, { useState, useEffect } from 'react';
import Login from './logincasmer';

// 1. सभी समर्थित भाषाओं का अनुवाद डिक्शनरी (Translation Dictionary)
const translations = {
  English: {
    manageAccount: 'MANAGE ACCOUNT',
    profileId: '👤 PROFILE ID',
    wallet: '💰 WALLET',
    addresses: '📍 ADDRESSES',
    payment: '💳 PAYMENT',
    order: '📦 ORDER',
    wishlist: '❤️ WISHLIST',
    security: '🔒 SECURITY',
    becomeSupplier: '🛠 BECOME A SUPPLIER',
    language: '🌐 LANGUAGE',
    helpCare: '🎧 HELP CARE',
    legal: '⚖️ LEGAL AND POLICIES',
    logout: '🚪 LOGOUT',
    hello: 'HELLO',
    member: 'MEMBER',
    fulfillment: '🚚 LUXURY STORE FULFILLMENT & EXPRESS LOGISTICS',
    backToMenu: '← Back to Menu',
    chooseLang: 'Choose your language / भाषा चुनें',
    close: 'Close / बंद करें'
  },
  Hindi: {
    manageAccount: 'खाता प्रबंधित करें',
    profileId: '👤 प्रोफाइल आईडी',
    wallet: '💰 वॉलेट',
    addresses: '📍 पते ',
    payment: '💳 भुगतान ',
    order: '📦 ऑर्डर ',
    wishlist: '❤️ विशलिस्ट',
    security: '🔒 सुरक्षा',
    becomeSupplier: '🛠 सप्लायर बनें',
    language: '🌐 भाषा ',
    helpCare: '🎧 सहायता केंद्र ',
    legal: '⚖️ कानूनी और नीतियां',
    logout: '🚪 लॉग आउट',
    hello: 'नमस्ते',
    member: 'सदस्य',
    fulfillment: '🚚 लग्जरी स्टोर पूर्ति एवं एक्सप्रेस लॉजिस्टिक्स',
    backToMenu: '← मुख्य मेनू पर वापस जाएं',
    chooseLang: 'अपनी भाषा चुनें',
    close: 'बंद करें'
  },
  Tamil: {
    manageAccount: 'கணக்கை நிர்வகிக்கவும்',
    profileId: '👤 சுயவிவர ஐடி',
    wallet: '💰 வாலட்',
    addresses: '📍 முகவரிகள்',
    payment: '💳 பணம் செலுத்துதல்',
    order: '📦 ஆர்டர்கள்',
    wishlist: '❤️ விருப்பப்பட்டியல்',
    security: '🔒 பாதுகாப்பு',
    becomeSupplier: '🛠 விற்பனையாளராகுங்கள்',
    language: '🌐 மொழி',
    helpCare: '🎧 உதவி மையம்',
    legal: '⚖️ விதிகள் & கொள்கைகள்',
    logout: '🚪 வெளியேறு',
    hello: 'வணக்கம்',
    member: 'உறுப்பினர்',
    fulfillment: '🚚 LUXURY STORE FULFILLMENT & EXPRESS LOGISTICS',
    backToMenu: '← முதன்மை மெனுவுக்குத் திரும்பு',
    chooseLang: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    close: 'மூடு'
  },
  Marathi: {
    manageAccount: 'खाते व्यवस्थापित करा',
    profileId: '👤 प्रोफाइल आयडी',
    wallet: '💰 वॉलेट',
    addresses: '📍 पत्ते',
    payment: '💳 पेमेंट',
    order: '📦 ऑर्डर्स',
    wishlist: '❤️ विशलिस्ट',
    security: '🔒 सुरक्षा',
    becomeSupplier: '🛠 पुरवठादार बना',
    language: '🌐 भाषा',
    helpCare: '🎧 मदत केंद्र',
    legal: '⚖️ कायदेशीर आणि धोरणे',
    logout: '🚪 लॉग आउट',
    hello: 'नमस्कार',
    member: 'सदस्य',
    fulfillment: '🚚 लक्झरी स्टोअर एक्सप्रेस लॉजिस्टिक्स',
    backToMenu: '← मुख्य मेनूवर परत जा',
    chooseLang: 'तुमची भाषा निवडा',
    close: 'बंद करा'
  },
  Bengali: {
    manageAccount: 'অ্যাকাউন্ট পরিচালনা করুন',
    profileId: '👤 প্রোফাইল আইডি',
    wallet: '💰 ওয়ালেট',
    addresses: '📍 ঠিকানা',
    payment: '💳 পেমেন্ট',
    order: '📦 অর্ডার',
    wishlist: '❤️ উইশলিস্ট',
    security: '🔒 সিকিউরিটি',
    becomeSupplier: '🛠 সাপ্লায়ার হন',
    language: '🌐 ভাষা',
    helpCare: '🎧 হেল্প কেয়ার',
    legal: '⚖️ আইনি ও নীতিমালা',
    logout: '🚪 লগ আউট',
    hello: 'হ্যালো',
    member: 'সদস্য',
    fulfillment: '🚚 LUXURY STORE FULFILLMENT & EXPRESS LOGISTICS',
    backToMenu: '← মূল মেনুতে ফিরে যান',
    chooseLang: 'আপনার ভাষা নির্বাচন করুন',
    close: 'বন্ধ করুন'
  },
  Telugu: {
    manageAccount: 'ఖాతాను నిర్వహించండి',
    profileId: '👤 ప్రొఫైల్ ఐడి',
    wallet: '💰 వాలెట్',
    addresses: '📍 చిరునామాలు',
    payment: '💳 చెల్లింపు',
    order: '📦 ఆర్డర్లు',
    wishlist: '❤️ విష్‌‌లిస్ట్',
    security: '🔒 సెక్యూరిటీ',
    becomeSupplier: '🛠 సరఫరాదారు అవ్వండి',
    language: '🌐 భాష',
    helpCare: '🎧 హెల్ప్ కేర్',
    legal: '⚖️ చట్టపరమైన & విధానాలు',
    logout: '🚪 లాగ్ అవుట్',
    hello: 'నమస్కారం',
    member: 'సభ్యుడు',
    fulfillment: '🚚 LUXURY STORE FULFILLMENT & EXPRESS LOGISTICS',
    backToMenu: '← ప్రధాన మెనూకి తిరిగి వెళ్లండి',
    chooseLang: 'మీ భాషను ఎంచుకోండి',
    close: 'మూసివేయి'
  },
  Kannada: {
    manageAccount: 'ಖಾತೆಯನ್ನು ನಿರ್ವಹಿಸಿ',
    profileId: '👤 ಪ್ರೊಫೈಲ್ ಐಡಿ',
    wallet: '💰 ವಾಲೆಟ್',
    addresses: '📍 ವಿಳಾಸಗಳು',
    payment: '💳 ಪಾವತಿ',
    order: '📦 ಆರ್ಡರ್‌ಗಳು',
    wishlist: '❤️ ವಿಶ್‌ಲಿಸ್ಟ್',
    security: '🔒 ಭದ್ರತೆ',
    becomeSupplier: '🛠 ಸರಬರಾಜುದಾರರಾಗಿ',
    language: '🌐 ಭಾಷೆ',
    helpCare: '🎧 ಸಹಾಯ ಕೇಂದ್ರ',
    legal: '⚖️ ಕಾನೂನು ಮತ್ತು ನೀತಿಗಳು',
    logout: '🚪 ಲಾಗ್ ಔಟ್',
    hello: 'ನಮಸ್ಕಾರ',
    member: 'ಸದಸ್ಯ',
    fulfillment: '🚚 LUXURY STORE FULFILLMENT & EXPRESS LOGISTICS',
    backToMenu: '← ಮುಖ್ಯ ಮೆನುಗೆ ಹಿಂತಿರುಗಿ',
    chooseLang: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    close: 'ಮುಚ್ಚಿ'
  },
  Malayalam: {
    manageAccount: 'അക്കൗണ്ട് കൈകാര്യം ചെയ്യുക',
    profileId: '👤 പ്രൊഫൈൽ ഐഡി',
    wallet: '💰 വാലറ്റ്',
    addresses: '📍 വിലാസങ്ങൾ',
    payment: '💳 പണമടയ്ക്കൽ',
    order: '📦 ഓർഡറുകൾ',
    wishlist: '❤️ വിഷ്‌ലിസ്റ്റ്',
    security: '🔒 സുരക്ഷ',
    becomeSupplier: '🛠 ഒരു സപ്ലയർ ആകുക',
    language: '🌐 ഭാഷ',
    helpCare: '🎧 ഹെൽപ്പ് കെയർ',
    legal: '⚖️ നിയമങ്ങളും നയങ്ങളും',
    logout: '🚪 ലോഗ് ഔട്ട്',
    hello: 'ഹലോ',
    member: 'അംഗം',
    fulfillment: '🚚 LUXURY STORE FULFILLMENT & EXPRESS LOGISTICS',
    backToMenu: '← പ്രധാന മെനുവിലേക്ക് മടങ്ങുക',
    chooseLang: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
    close: 'അടയ്ക്കുക'
  }
};

export default function Account({ activeTab, setActiveTab }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Language Modal & Selection State
  const [showLangModal, setShowLangModal] = useState(false);
  
  // भाषा स्टेट (localStorage से इनिशियलाइज किया गया)
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'English';
  });

  // चुनी गई भाषा के अनुसार टेक्स्ट डिक्शनरी (fallback English पर रहेगा)
  const t = translations[currentLang] || translations.English;

  // फुल पेज मॉडल स्टेट
  const [modalType, setModalType] = useState(null);

  const [supplierData, setSupplierData] = useState({
    businessName: '',
    gstNumber: '',
    category: '',
    contactPerson: '',
    phone: ''
  });

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    avatar: ''
  });

  const [walletBalance, setWalletBalance] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [newAddressInput, setNewAddressInput] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const [payments, setPayments] = useState([]);
  const [newPaymentInput, setNewPaymentInput] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [orders, setOrders] = useState([]);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [activeSubTab, setActiveSubTab] = useState(null);

  // भाषा बदलने को तुरंत सिंक करने के लिए कस्टम इवेंट लिसनर
  useEffect(() => {
    const handleLangChange = (event) => {
      const savedLang = event.detail || localStorage.getItem('appLanguage') || 'English';
      setCurrentLang(savedLang);
    };

    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  // AI Help Chat States
  const [aiChatMessages, setAiChatMessages] = useState([
    { sender: 'ai', text: 'नमस्कार हुकुम! लग्‍जरी स्टोर हेल्प केयर में आपका स्वागत है। मैं आपकी क्या सहायता कर सकता हूँ?' }
  ]);
  const [aiInput, setAiInput] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    const savedPhone = localStorage.getItem('customerPhone');
    const savedLang = localStorage.getItem('appLanguage');
    
    if (savedLang) {
      setCurrentLang(savedLang);
    }

    if (token && savedPhone) {
      setIsLoggedIn(true);
    }

    const savedProfile = localStorage.getItem('customerProfile');
    let currentProfile = {
      name: '',
      email: '',
      phone: savedPhone || '',
      dob: '',
      avatar: ''
    };

    if (savedProfile) { 
      try { 
        currentProfile = { ...currentProfile, ...JSON.parse(savedProfile) }; 
      } catch (e) {} 
    }

    if (!currentProfile.email && savedPhone) {
      currentProfile.email = `customer_${savedPhone.slice(-4)}@luxurystore.com`;
    }
    setProfile(currentProfile);
    localStorage.setItem('customerProfile', JSON.stringify(currentProfile));

    const savedWallet = localStorage.getItem('customerWallet');
    if (savedWallet) {
      setWalletBalance(Number(savedWallet));
    }
    
    const savedAddresses = localStorage.getItem('customerAddresses');
    if (savedAddresses) { try { setAddresses(JSON.parse(savedAddresses)); } catch (e) {} }
    
    const savedPayments = localStorage.getItem('customerPayments');
    if (savedPayments) { try { setPayments(JSON.parse(savedPayments)); } catch (e) {} }
    
    const userEmail = currentProfile.email;
    if (userEmail) {
      fetch(`http://localhost:5001/api/customer-orders/${userEmail}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.orders) {
            setOrders(data.orders);
          }
        })
        .catch(err => console.error("ऑर्डर हिस्ट्री लोड करने में एरर:", err));
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("क्या आप वाकई लॉग आउट करना चाहते हैं, हुकुम?");
    if (confirmLogout) {
      setIsLoggedIn(false);
      setProfile(null);
      localStorage.removeItem('customerProfile');
      localStorage.removeItem('customerToken');
      localStorage.removeItem('customerPhone');
      alert('आप सफलतापूर्वक लॉग आउट हो गए हैं, हुकुम!');
    }
  };

  const handleLanguageSelect = (selectedLanguage) => {
    // 1. स्टेट अपडेट
    setCurrentLang(selectedLanguage);
    
    // 2. लोकल स्टोरेज अपडेट
    localStorage.setItem('appLanguage', selectedLanguage);
    
    // 3. कस्टम इवेंट ट्रिगर (ताकि पूरे ऐप/पेज को पता चले)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: selectedLanguage }));
    
    // 4. मोडल बंद करना
    setShowLangModal(false);
    
    alert(`भाषा सफलतापूर्वक बदलकर "${selectedLanguage}" कर दी गई है, हुकुम!`);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        const updatedProfile = { ...profile, avatar: base64Image };
        setProfile(updatedProfile);
        localStorage.setItem('customerProfile', JSON.stringify(updatedProfile));
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    if (!otpSent) {
      setOtpSent(true);
      alert('वेरिफिकेशन के लिए डेमो ओटीपी: 123456');
      return;
    }
    if (otp !== '123456') {
      alert('गलत ओटीपी! कृपया 123456 दर्ज करें');
      return;
    }
    setIsEditing(false);
    setOtpSent(false);
    setOtp('');
    localStorage.setItem('customerProfile', JSON.stringify(profile));
    alert('प्रोफाइल सफलतापूर्वक अपडेट हो गई है, हुकुम!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('कृपया सभी पासवर्ड फील्ड भरें, हुकुम!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('नया पासवर्ड मेल नहीं खा रहा है, हुकुम!');
      return;
    }
    if (newPassword.length < 6) {
      alert('पासवर्ड कम से कम 6 अंकों का होना चाहिए, हुकुम!');
      return;
    }

    alert('पासवर्ड सफलतापूर्वक बदल दिया गया है, हुकुम!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressInput.trim()) return;
    const updated = [...addresses, newAddressInput];
    setAddresses(updated);
    localStorage.setItem('customerAddresses', JSON.stringify(updated));
    setNewAddressInput('');
    setShowAddressForm(false);
    alert('नया पता सफलतापूर्वक जोड़ दिया गया है, हुकुम!');
  };

  const handleFetchLiveLocation = () => {
    if (!navigator.geolocation) {
      alert('आपका ब्राउज़र जीपीएस लोकेशन सपोर्ट नहीं करता है, हुकुम!');
      return;
    }
    
    alert('आपकी लाइव जीपीएस लोकेशन फेच की जा रही है...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const gpsAddress = `Live GPS Location [Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}]`;
        const updated = [gpsAddress, ...addresses];
        setAddresses(updated);
        localStorage.setItem('customerAddresses', JSON.stringify(updated));
        setSelectedAddressIndex(0);
        alert('लाइव लोकेशन सफलतापूर्वक सेव हो गई है, हुकुम!');
      },
      () => {
        alert('लोकेशन प्राप्त नहीं हो सकी। कृपया परमिशन चेक करें।');
      }
    );
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!newPaymentInput.trim()) return;
    const updated = [...payments, newPaymentInput];
    setPayments(updated);
    localStorage.setItem('customerPayments', JSON.stringify(updated));
    setNewPaymentInput('');
    setShowPaymentForm(false);
    alert('पेमेंट मेथड जोड़ दिया गया है, हुकुम!');
  };

  const handleShareReferral = () => {
    const referralText = `Luxury Store पर आएं और बेहतरीन मेन्सवियर खरीदें! मेरा रेफरल कोड इस्तेमाल करें और पाएं विशेष डिस्काउंट।`;
    if (navigator.share) {
      navigator.share({ title: 'Luxury Store Refer & Earn', text: referralText, url: window.location.href })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(referralText);
      alert('रेफरल लिंक कॉपी हो गया है! इसे अपने दोस्तों के साथ व्हाट्सएप पर शेयर करें, हुकुम!');
    }
  };

  const handleSendAiMessage = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    const newMsgs = [...aiChatMessages, { sender: 'user', text: userMsg }];
    setAiChatMessages(newMsgs);
    setAiInput('');

    setTimeout(() => {
      let reply = "हुकुम, आपके इस सवाल पर हमारी सपोर्ट टीम जल्द ही आपसे संपर्क करेगी।";
      const lower = userMsg.toLowerCase();
      if (lower.includes('order') || lower.includes('ऑर्डर')) {
        reply = "आप अपना ऑर्डर 'Order History' में जाकर ट्रैक कर सकते हैं, हुकुम!";
      } else if (lower.includes('refund') || lower.includes('return') || lower.includes('वापस')) {
        reply = "रिफंड या रिटर्न की प्रक्रिया 3 से 5 कार्य दिवसों में पूरी हो जाती है, हुकुम।";
      } else if (lower.includes('delivery') || lower.includes('डिलीवरी')) {
        reply = "सामान्यतः डिलीवरी में 3-5 दिन का समय लगता है, हुकुम।";
      }

      setAiChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 800);
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} setProfile={setProfile} />;
  }

  return (
    <div style={{ backgroundColor: '#0c0a09', color: '#f3e5ab', minHeight: '100vh', padding: '25px', fontFamily: 'sans-serif', boxSizing: 'border-box', width: '100%', paddingBottom: '100px', position: 'relative' }}>

      {/* Language Modal */}
      {showLangModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#161310', border: '1px solid #d4af37', borderRadius: '15px', padding: '25px', width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 0 20px rgba(212,175,55,0.3)' }}>
            <h3 style={{ color: '#d4af37', margin: '0 0 20px 0', fontSize: '1.2rem', letterSpacing: '1px' }}>{t.chooseLang}</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {[
                { name: 'English', label: 'English' },
                { name: 'Hindi', label: 'हिंदी' },
                { name: 'Tamil', label: 'தமிழ்' },
                { name: 'Marathi', label: 'मराठी' },
                { name: 'Bengali', label: 'বাংলা' },
                { name: 'Telugu', label: 'తెలుగు' },
                { name: 'Kannada', label: 'ಕನ್ನಡ' },
                { name: 'Malayalam', label: 'മലയാളം' }
              ].map((langOption) => (
                <button 
                  key={langOption.name} 
                  onClick={() => handleLanguageSelect(langOption.name)}
                  style={{ 
                    backgroundColor: currentLang === langOption.name ? '#d4af37' : '#1f1a14', 
                    color: currentLang === langOption.name ? '#000000' : '#f3e5ab', 
                    border: currentLang === langOption.name ? '1px solid #d4af37' : '1px solid #33291a', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold', 
                    fontSize: '0.95rem', 
                    transition: '0.2s' 
                  }}
                >
                  {langOption.label} {currentLang === langOption.name ? '✓' : ''}
                </button>
              ))}
            </div>

            <button onClick={() => setShowLangModal(false)} style={{ backgroundColor: 'transparent', color: '#d4af37', border: '1px solid #d4af37', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
              {t.close}
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '15px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <label htmlFor="directProfilePicUpload" style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '50%', border: '2px solid #d4af37', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#161310', cursor: 'pointer', flexShrink: '0' }} title="Click to change photo">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '1.5rem', color: '#d4af37' }}>👤</span>
            )}
            <div style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', fontSize: '9px', textAlign: 'center', color: '#d4af37', padding: '2px 0' }}>
              EDIT
            </div>
          </label>
          <input id="directProfilePicUpload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          
          <div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#f3e5ab' }}>{t.hello}, {profile.name ? profile.name.toUpperCase() : t.member}</h2>
            <span style={{ fontSize: '0.75rem', color: '#d4af37' }}>Phone: {profile.phone || localStorage.getItem('customerPhone')}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#1f1a14', border: '1px solid #d4af37', padding: '8px 12px', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.65rem', color: '#888', display: 'block' }}>WALLET</span>
            <span style={{ fontSize: '0.9rem', color: '#2ecc71', fontWeight: 'bold' }}>₹{walletBalance}</span>
          </div>
        </div>
      </div>

      <hr style={{ borderColor: '#33291a', marginBottom: '20px' }} />

      {activeSubTab === null ? (
        <div style={{ backgroundColor: '#161310', border: '1px solid #d4af37', borderRadius: '10px', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px', borderBottom: '1px solid #33291a', paddingBottom: '8px', letterSpacing: '1px' }}>
            {t.manageAccount}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.9rem' }}>
            <div style={{ color: '#f3e5ab', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15' }} onClick={() => setActiveSubTab('profile')}>{t.profileId}</div>
            <div style={{ color: '#f3e5ab', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15' }} onClick={() => setActiveSubTab('wallet')}>{t.wallet}</div>
            <div style={{ color: '#f3e5ab', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15' }} onClick={() => setActiveSubTab('addresses')}>{t.addresses}</div>
            <div style={{ color: '#f3e5ab', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15' }} onClick={() => setActiveSubTab('payments')}>{t.payment}</div>
            <div style={{ color: '#f3e5ab', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15' }} onClick={() => setActiveTab && setActiveTab('orderHistory')}>{t.order} ({orders.length})</div>
            <div style={{ color: '#f3e5ab', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15' }} onClick={() => setActiveTab && setActiveTab('wishlist')}>{t.wishlist}</div>
            <div style={{ color: '#f3e5ab', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15' }} onClick={() => setActiveSubTab('security')}>{t.security}</div>
            
            <div style={{ color: '#f8e7ae', cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #221c15', fontWeight: 'bold' }} onClick={() => {
              if (localStorage.getItem('vendorToken')) {
                setActiveTab && setActiveTab('vendorDashboard');
              } else {
                setActiveTab && setActiveTab('shopRegistration');
              }
            }}>
              {t.becomeSupplier}
            </div>

            {/* चुनी गई भाषा अब यहाँ डायनामिक दिखाई देगी */}
            <div 
              style={{ color: '#d4af37', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15', fontWeight: 'bold' }} 
              onClick={() => setShowLangModal(true)}
            >
              {t.language}: <span style={{ color: '#ffffff', backgroundColor: '#33291a', padding: '2px 8px', borderRadius: '4px', marginLeft: '5px' }}>{currentLang}</span>
            </div>
          
            <div style={{ color: '#f3e5ab', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15' }} onClick={() => setActiveSubTab('helpCare')}>
              {t.helpCare}
            </div>

            <div style={{ color: '#f3e5ab', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #221c15' }} onClick={() => setActiveSubTab('legal')}>
              {t.legal}
            </div>

            <div style={{ color: '#c2d384e7', cursor: 'pointer', padding: '8px 0', fontWeight: 'bold' }} onClick={handleLogout}>
              {t.logout}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: '#161310', border: '1px solid #d4af37', borderRadius: '10px', padding: '20px', width: '100%', boxSizing: 'border-box', maxWidth: '600px', margin: '0 auto' }}>
          
          <button 
            onClick={() => setActiveSubTab(null)} 
            style={{ backgroundColor: '#33291a', color: '#d4af37', border: '1px solid #d4af37', padding: '6px 14px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '20px' }}
          >
            {t.backToMenu}
          </button>

          {activeSubTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#d4af37', fontSize: '1rem', borderBottom: '1px solid #33291a', paddingBottom: '8px' }}>Personal Information</h3>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#d4af37', display: 'block' }}>NAME</label>
                <input type="text" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #443826', color: '#fff', padding: '5px 0', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#d4af37', display: 'block' }}>EMAIL (Auto-Generated / Editable)</label>
                <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={!isEditing} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #443826', color: '#fff', padding: '5px 0', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#d4af37', display: 'block' }}>PHONE (Verified Unique Login)</label>
                <input type="text" name="phone" value={profile.phone || localStorage.getItem('customerPhone')} disabled style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #443826', color: '#888', padding: '5px 0', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#d4af37', display: 'block' }}>DATE OF BIRTH</label>
                <input type="text" name="dob" value={profile.dob} onChange={handleChange} disabled={!isEditing} placeholder="DD / MM / YYYY" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #443826', color: '#fff', padding: '5px 0', fontSize: '0.9rem' }} />
              </div>
              {otpSent && (
                <div>
                  <label style={{ fontSize: '0.7rem', color: '#ea0a55', display: 'block' }}>ENTER DEMO OTP (Use: 123456)</label>
                  <input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={{ width: '100%', background: 'transparent', border: '1px solid #d4af37', color: '#fff', padding: '8px', fontSize: '0.9rem', borderRadius: '5px' }} />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: '#d4af37', cursor: 'pointer' }} onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'CHANGE / EDIT DETAILS'}
                </span>
                <button onClick={() => { if(!isEditing) setIsEditing(true); else handleUpdate(); }} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '8px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {isEditing ? (otpSent ? 'VERIFY & SAVE' : 'SEND OTP') : 'EDIT PROFILE'}
                </button>           
              </div>
            </div>
          )}

          {activeSubTab === 'wallet' && (
            <div>
              <h3 style={{ color: '#d4af37', fontSize: '1rem', borderBottom: '1px solid #33291a', paddingBottom: '8px' }}>Wallet & Refer & Earn</h3>
              <div style={{ marginTop: '15px', backgroundColor: '#1f1a14', padding: '15px', borderRadius: '8px', border: '1px solid #33291a', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#aaa', display: 'block' }}>AVAILABLE WALLET BALANCE</span>
                <span style={{ fontSize: '1.8rem', color: '#2ecc71', fontWeight: 'bold', display: 'block', margin: '8px 0' }}>₹{walletBalance}</span>
                <span style={{ fontSize: '0.75rem', color: '#d4af37' }}>इस बैलेंस का इस्तेमाल आप अगली खरीदारी में डिस्काउंट पाने के लिए कर सकते हैं, हुकुम!</span>
              </div>

              <div style={{ marginTop: '20px', backgroundColor: '#1f1a14', padding: '15px', borderRadius: '8px', border: '1px solid #33291a' }}>
                <h4 style={{ color: '#d4af37', margin: '0 0 8px 0', fontSize: '0.9rem' }}>🎁 Refer & Earn Rewards</h4>
                <p style={{ fontSize: '0.75rem', color: '#aaa', margin: '0 0 12px 0' }}>अपने दोस्तों को स्टोर पर आमंत्रित करें। जब वे आपके नंबर से जुड़ेंगे, तो आपको और उन्हें कैशबैक मिलेगा।</p>
                <button onClick={handleShareReferral} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px', width: '100%', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
                  SHARE REFERRAL LINK ON WHATSAPP
                </button>
              </div>
            </div>
          )}

          {activeSubTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #33291a', paddingBottom: '8px' }}>
                <h3 style={{ color: '#d4af37', fontSize: '1rem', margin: 0 }}>Delivery Address & Live GPS</h3>
                <button onClick={handleFetchLiveLocation} style={{ backgroundColor: '#2ecc71', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                  📍 Use Live GPS
                </button>
              </div>

              <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {addresses.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: '#777', textAlign: 'center', padding: '20px 0' }}>कोई पता सेव नहीं है, हुकुम।</p>
                ) : (
                  addresses.map((addr, idx) => (
                    <div key={idx} onClick={() => setSelectedAddressIndex(idx)} style={{ fontSize: '0.85rem', color: selectedAddressIndex === idx ? '#f3e5ab' : '#aaa', margin: 0, padding: '10px', backgroundColor: selectedAddressIndex === idx ? '#261f14' : '#1f1a14', borderRadius: '6px', border: selectedAddressIndex === idx ? '1px solid #d4af37' : '1px solid #33291a', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontWeight: 'bold', color: '#d4af37', display: 'block', fontSize: '0.75rem' }}>{idx === 0 ? 'DEFAULT DELIVERY ADDRESS' : `ADDRESS ${idx + 1}`}</span>
                        {addr}
                      </div>
                      {selectedAddressIndex === idx && <span style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '0.8rem' }}>✓ Selected</span>}
                    </div>
                  ))
                )}
              </div>

              {!showAddressForm ? (
                <button onClick={() => setShowAddressForm(true)} style={{ backgroundColor: 'transparent', color: '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  + Add New Address Manually
                </button>
              ) : (
                <form onSubmit={handleAddAddress} style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" placeholder="Enter complete address (Street, City, Pincode)" value={newAddressInput} onChange={(e) => setNewAddressInput(e.target.value)} style={{ width: '100%', background: 'transparent', border: '1px solid #d4af37', color: '#fff', padding: '8px', fontSize: '0.9rem', borderRadius: '5px', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>Save Address</button>
                    <button type="button" onClick={() => setShowAddressForm(false)} style={{ backgroundColor: 'transparent', color: '#d4af37', border: '1px solid #d4af37', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeSubTab === 'payments' && (
            <div>
              <h3 style={{ color: '#d4af37', fontSize: '1rem', borderBottom: '1px solid #33291a', paddingBottom: '8px' }}>Payment Methods</h3>
              <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {payments.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: '#777', textAlign: 'center', padding: '20px 0' }}>कोई पेमेंट मेथड सेव नहीं है, हुकुम।</p>
                ) : (
                  payments.map((pay, idx) => (
                    <p key={idx} style={{ fontSize: '0.85rem', color: '#aaa', margin: 0, padding: '8px', backgroundColor: '#1f1a14', borderRadius: '5px', border: '1px solid #33291a' }}>
                      💳 {pay}
                    </p>
                  ))
                )}
              </div>
              {!showPaymentForm ? (
                <button onClick={() => setShowPaymentForm(true)} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  + Add New UPI / Card
                </button>
              ) : (
                <form onSubmit={handleAddPayment} style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" placeholder="Enter UPI ID (e.g., username@upi)" value={newPaymentInput} onChange={(e) => setNewPaymentInput(e.target.value)} style={{ width: '100%', background: 'transparent', border: '1px solid #d4af37', color: '#fff', padding: '8px', fontSize: '0.9rem', borderRadius: '5px', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>Save Payment</button>
                    <button type="button" onClick={() => setShowPaymentForm(false)} style={{ backgroundColor: 'transparent', color: '#d4af37', border: '1px solid #d4af37', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeSubTab === 'security' && (
            <div>
              <h3 style={{ color: '#d4af37', fontSize: '1rem', borderBottom: '1px solid #33291a', paddingBottom: '8px', marginBottom: '15px' }}>Security & Password Management</h3>
              
              <form onSubmit={handlePasswordChange} style={{ backgroundColor: '#1f1a14', padding: '15px', borderRadius: '6px', border: '1px solid #33291a', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 'bold' }}>🔑 Change Account Password</span>
                
                <div>
                  <label style={{ fontSize: '0.7rem', color: '#aaa', display: 'block' }}>OLD PASSWORD</label>
                  <input type="password" placeholder="Enter old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} style={{ width: '100%', background: '#161310', border: '1px solid #33291a', color: '#fff', padding: '8px', fontSize: '0.85rem', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.7rem', color: '#aaa', display: 'block' }}>NEW PASSWORD</label>
                  <input type="password" placeholder="Enter new password (min 6 chars)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%', background: '#161310', border: '1px solid #33291a', color: '#fff', padding: '8px', fontSize: '0.85rem', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.7rem', color: '#aaa', display: 'block' }}>CONFIRM NEW PASSWORD</label>
                  <input type="password" placeholder="Re-enter new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', background: '#161310', border: '1px solid #33291a', color: '#fff', padding: '8px', fontSize: '0.85rem', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>

                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', marginTop: '5px' }}>
                  Update Password
                </button>
              </form>
            </div>
          )}

          {activeSubTab === 'helpCare' && (
            <div>
              <h3 style={{ color: '#d4af37', fontSize: '1rem', borderBottom: '1px solid #33291a', paddingBottom: '8px', marginBottom: '15px' }}>🎧 Help Care AI Support</h3>
              <div style={{ backgroundColor: '#1f1a14', border: '1px solid #33291a', borderRadius: '8px', padding: '12px', height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                
                <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '5px' }}>
                  {aiChatMessages.map((msg, idx) => (
                    <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'user' ? '#d4af37' : '#2a2218', color: msg.sender === 'user' ? '#000' : '#f3e5ab', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', maxWidth: '80%' }}>
                      {msg.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendAiMessage} style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <input type="text" placeholder="यहाँ अपना सवाल लिखें, हुकुम..." value={aiInput} onChange={(e) => setAiInput(e.target.value)} style={{ flex: 1, backgroundColor: '#161310', border: '1px solid #33291a', color: '#fff', padding: '8px', borderRadius: '4px', fontSize: '0.8rem' }} />
                  <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '8px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}>भेजें</button>
                </form>
              </div>
            </div>
          )}

          {activeSubTab === 'legal' && (
            <div>
              <h3 style={{ color: '#d4af37', fontSize: '1rem', borderBottom: '1px solid #33291a', paddingBottom: '8px', marginBottom: '15px' }}>⚖️ Legal and Policies</h3>
              <div style={{ backgroundColor: '#1f1a14', padding: '15px', borderRadius: '8px', border: '1px solid #33291a', fontSize: '0.85rem', color: '#ccc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <strong style={{ color: '#d4af37', display: 'block', marginBottom: '4px' }}>1. Terms & Conditions</strong>
                  इस लग्जरी स्टोर का उपयोग करके आप हमारे सभी नियमों और शर्तों से बंधे होने की सहमति देते हैं। सभी उत्पाद और डिजाइन कॉपीराइट के अधीन हैं।
                </div>
                <div>
                  <strong style={{ color: '#d4af37', display: 'block', marginBottom: '4px' }}>2. Privacy Policy</strong>
                  आपकी व्यक्तिगत जानकारी (जैसे फोन नंबर, पता) पूरी तरह सुरक्षित रखी जाती है और इसका उपयोग केवल आपके ऑर्डर की डिलीवरी के लिए किया जाता है।
                </div>
                <div>
                  <strong style={{ color: '#d4af37', display: 'block', marginBottom: '4px' }}>3. Shipping & Return Policy</strong>
                  ऑर्डर शिपिंग आमतौर पर 3 से 5 कार्यदिवसों में होती है। रिटर्न या एक्सचेंज की सुविधा डिलीवरी के 7 दिनों के भीतर उपलब्ध है, हुकुम।
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #33291a', paddingTop: '15px', fontSize: '0.8rem', color: '#d4af37' }}>
        {t.fulfillment}
      </div>
    </div>
  );
}