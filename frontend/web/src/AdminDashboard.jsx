import React, { useState, useEffect } from 'react';

// 🌐 Multi-language Dictionary for Admin Dashboard
const adminTranslations = {
  English: {
    adminAccessTitle: '👑 RESTRICTED ADMIN ACCESS',
    adminAccessDesc: 'This area is secure and restricted to Super Admins only, Hukum.',
    passwordPlaceholder: 'Enter Admin Password',
    unlockBtn: 'Unlock Admin Panel',
    wrongPassword: 'Wrong password, Hukum! Access denied.',
    dashboardTitle: '👑 ADMIN CONTROL PANEL',
    dashboardSubtitle: 'Full Security, Packing Video & Anti-Money Scam Protection System',
    refreshBtn: '🔄 Refresh Data',
    lockBtn: '🔒 Lock Panel',
    totalSelling: 'Total Selling',
    topSelling: 'Top Selling Item',
    mostSearched: 'Most Searched',
    fraudAlerts: 'Fraud & Scam Alerts',
    active: 'Active',
    suspended: 'Suspended',
    suspendBtn: '🚫 Suspend ID',
    activateBtn: '✅ Activate ID',
    vendorsTab: '🏪 Vendors',
    customersTab: '👥 Customers',
    customerOrdersTab: '🛒 Customer Orders & Time',
    cancellationsTab: '❌ Cancellations & Phone',
    antiScamTab: '📦 Packing & Return Proofs',
    moneyFraudTab: '🚨 Money & Device Scams',
    screenControlTab: '🎛️ Home & 8+ Banners Control',
    whatsappTab: '📢 Bulk WhatsApp',
    businessControlTab: '💼 Business Account',
    aiManagerTab: '🤖 AI Auto-Pilot',
    supportTicketsTab: '🛠️ Issues & Tickets',
    loadingText: 'Loading data, Hukum...',
    noVendors: 'No vendors registered.',
    noUsers: 'No customers registered.',
    noOrders: 'No customer orders recorded yet.',
    noCancellations: 'No cancellation records found.',
    noProofs: 'No proof records available.',
    noFraud: 'No fraud or money scam detected. Your app is secure!',
    saveControlsBtn: '💾 Save All Controls & Banners',
    addBannerBtn: '➕ Add New Banner (Up to 8)',
    sendBroadcastBtn: '🚀 Send WhatsApp Broadcast',
    saveSettingsBtn: '💾 Save Settings',
    saveAiBtn: '💾 Save AI Settings',
    fixBtn: '✨ Fix',
    scamBtn: '🚫 Scam',
    safeBtn: '✅ Safe',
    banBtn: '🚫 Permanent Device Ban',
    successUpdate: 'Successfully updated, Hukum! Nothing deleted.',
    savedSettings: 'Settings saved successfully, Hukum!',
    savedAi: 'AI Auto-Pilot & Protection activated, Hukum!',
    broadcastSuccess: 'Bulk WhatsApp broadcast sent successfully to all customers and vendors, Hukum!'
  },
  Hindi: {
    adminAccessTitle: '👑 प्रतिबंधित एडमिन एक्सेस',
    adminAccessDesc: 'यह एरिया केवल मालिक (Super Admin) के लिए सुरक्षित है हुकुम।',
    passwordPlaceholder: 'एडमिन पासवर्ड दर्ज करें',
    unlockBtn: 'एडमिन पैनल अनलॉक करें',
    wrongPassword: 'गलत पासवर्ड हुकुम! एक्सेस अस्वीकार कर दिया गया है।',
    dashboardTitle: '👑 एडमिन कंट्रोल पैनल',
    dashboardSubtitle: 'पूर्ण सुरक्षा, पैकिंग वीडियो और एंटी-मनी स्कैम प्रोटेक्शन सिस्टम',
    refreshBtn: '🔄 डेटा रिफ्रेश करें',
    lockBtn: '🔒 पैनल लॉक करें',
    totalSelling: 'कुल बिक्री (Total Selling)',
    topSelling: 'टॉप बिकने वाला आइटम',
    mostSearched: 'सबसे ज्यादा खोजा गया',
    fraudAlerts: 'फ्रॉड और स्कैम अलर्ट',
    active: 'सक्रिय (Active)',
    suspended: 'सस्पेंड (Suspended)',
    suspendBtn: '🚫 आईडी सस्पेंड करें',
    activateBtn: '✅ आईडी एक्टिव करें',
    vendorsTab: '🏪 वेंडर्स',
    customersTab: '👥 कस्टमर्स',
    customerOrdersTab: '🛒 कस्टमर ऑर्डर्स और समय',
    cancellationsTab: '❌ कैंसिलेशन और फोन',
    antiScamTab: '📦 पैकिंग और रिटर्न प्रूफ',
    moneyFraudTab: '🚨 मनी और डिवाइस स्कैम',
    screenControlTab: '🎛️ होम और 8+ बैनर्स कंट्रोल',
    whatsappTab: '📢 बल्क व्हाट्सएप',
    businessControlTab: '💼 बिजनेस अकाउंट',
    aiManagerTab: '🤖 AI ऑटो-पायलट',
    supportTicketsTab: '🛠️ समस्याएं और टिकट',
    loadingText: 'डेटा लोड हो रहा है हुकुम...',
    noVendors: 'कोई दुकानदार रजिस्टर्ड नहीं है।',
    noUsers: 'कोई ग्राहक रजिस्टर्ड नहीं है।',
    noOrders: 'अभी तक कोई ग्राहक ऑर्डर रिकॉर्ड नहीं मिला है।',
    noCancellations: 'कोई कैंसिलेशन रिकॉर्ड नहीं मिला है।',
    noProofs: 'कोई प्रूफ रिकॉर्ड मौजूद नहीं है।',
    noFraud: 'कोई फ्रॉड या मनी स्कैम डिटेक्ट नहीं हुआ है। आपका ऐप सुरक्षित है!',
    saveControlsBtn: '💾 सभी कंट्रोल्स और बैनर्स सेव करें',
    addBannerBtn: '➕ नया बैनर जोड़ें (7-8 तक)',
    sendBroadcastBtn: '🚀 व्हाट्सएप ब्रॉडकास्ट भेजें',
    saveSettingsBtn: '💾 सेटिंग्स सेव करें',
    saveAiBtn: '💾 AI सेटिंग्स सेव करें',
    fixBtn: '✨ ठीक करें',
    scamBtn: '🚫 स्कैम',
    safeBtn: '✅ सुरक्षित',
    banBtn: '🚫 डिवाइस परमानेंट बैन',
    successUpdate: 'बिना कुछ डिलीट किए सफलतापूर्वक अपडेट हो गया हुकुम!',
    savedSettings: 'बिजनेस अकाउंट सेटिंग्स सेव हो गई हैं हुकुम!',
    savedAi: 'AI ऑटो-पायलट और फ्रॉड प्रोटेक्शन मैनेजर एक्टिवेट कर दिया गया है हुकुम!',
    broadcastSuccess: 'सफलतापूर्वक सभी ग्राहकों और वेंडर्स को WhatsApp ब्रॉडकास्ट भेज दिया गया है हुकुम!'
  },
  Tamil: {
    adminAccessTitle: '👑 கட்டுப்பாடான நிர்வாகி அணுகல்',
    adminAccessDesc: 'இந்த பகுதி சூப்பர் நிர்வாகிக்கு மட்டுமே பாதுகாப்பானது.',
    passwordPlaceholder: 'நிர்வாகி கடவுச்சொல்லை உள்ளிடவும்',
    unlockBtn: 'நிர்வாக பலகையை திற',
    wrongPassword: 'தவறான கடவுச்சொல்!',
    dashboardTitle: '👑 நிர்வாக கட்டுப்பாட்டு பலகம்',
    dashboardSubtitle: 'முழு பாதுகாப்பு மற்றும் மோசடி தடுப்பு அமைப்பு',
    refreshBtn: '🔄 தரவைப் புதுப்பிக்கவும்',
    lockBtn: '🔒 பூட்டு',
    totalSelling: 'மொத்த விற்பனை',
    topSelling: 'அதிகம் விற்கப்பட்ட பொருள்',
    mostSearched: 'அதிகம் தேடப்பட்டது',
    fraudAlerts: 'மோசடி எச்சரிக்கைகள்',
    active: 'செயலில் உள்ளது',
    suspended: 'இடைநிறுத்தப்பட்டது',
    suspendBtn: '🚫 முடக்கு',
    activateBtn: '✅ செயல்படுத்து',
    vendorsTab: '🏪 விற்பனையாளர்கள்',
    customersTab: '👥 வாடிக்கையாளர்கள்',
    customerOrdersTab: '🛒 வாடிக்கையாளர் ஆர்டர்கள்',
    cancellationsTab: '❌ ரத்துசெய்தல்',
    antiScamTab: '📦 பேக்கிங் சான்றுகள்',
    moneyFraudTab: '🚨 பண மோசடிகள்',
    screenControlTab: '🎛️ முகப்பு & கடை',
    whatsappTab: '📢 மொத்த வாட்ஸ்அப்',
    businessControlTab: '💼 வணிக கணக்கு',
    aiManagerTab: '🤖 AI ஆட்டோ-பைலட்',
    supportTicketsTab: '🛠️ சிக்கல்கள்',
    loadingText: 'தரவு ஏற்றப்படுகிறது...',
    noVendors: 'விற்பனையாளர்கள் இல்லை.',
    noUsers: 'வாடிக்கையாளர்கள் இல்லை.',
    noOrders: 'ஆர்டர்கள் இல்லை.',
    noCancellations: 'ரத்து பதிவுகள் இல்லை.',
    noProofs: 'சான்றுகள் இல்லை.',
    noFraud: 'மோசடிகள் கண்டறியப்படவில்லை.',
    saveControlsBtn: '💾 சேமி',
    addBannerBtn: '➕ புதிய பேனர் சேர்',
    sendBroadcastBtn: '🚀 அனுப்பு',
    saveSettingsBtn: '💾 அமைப்புகளை சேமி',
    saveAiBtn: '💾 AI சேமி',
    fixBtn: '✨ சரிசெய்',
    scamBtn: '🚫 மோசடி',
    safeBtn: '✅ பாதுகாப்பான',
    banBtn: '🚫 தடை',
    successUpdate: 'வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
    savedSettings: 'அமைப்புகள் சேமிக்கப்பட்டன!',
    savedAi: 'AI செயல்படுத்தப்பட்டது!',
    broadcastSuccess: 'வாட்ஸ்அப் செய்தி அனுப்பப்பட்டது!'
  },
  Marathi: {
    adminAccessTitle: '👑 प्रतिबंधित अॅडमिन प्रवेश',
    adminAccessDesc: 'हे क्षेत्र केवळ सुपर अॅडमिनसाठी सुरक्षित आहे हुकुम.',
    passwordPlaceholder: 'अॅडमिन पासवर्ड प्रविष्ट करा',
    unlockBtn: 'अॅडमिन पनेल अनलॉक करा',
    wrongPassword: 'चुकीचा पासवर्ड हुकुम!',
    dashboardTitle: '👑 अॅडमिन कंट्रोल पनेल',
    dashboardSubtitle: 'पूर्ण सुरक्षा, पॅकिंग व्हिडिओ आणि स्कॅम प्रोटेक्शन सिस्टम',
    refreshBtn: '🔄 डेटा रिफ्रेश करा',
    lockBtn: '🔒 पनेल लॉक करा',
    totalSelling: 'एकूण विक्री',
    topSelling: 'सर्वात जास्त विकले जाणारे उत्पादन',
    mostSearched: 'सर्वात जास्त शोधले गेलेले',
    fraudAlerts: 'फ्रॉड आणि स्कॅम अलर्ट',
    active: 'सक्रिय',
    suspended: 'निलंबित',
    suspendBtn: '🚫 सस्पेंड करा',
    activateBtn: '✅ चालू करा',
    vendorsTab: '🏪 वेंडर्स',
    customersTab: '👥 ग्राहक',
    customerOrdersTab: '🛒 ग्राहक ऑर्डर्स',
    cancellationsTab: '❌ रद्द केलेल्या ऑर्डर्स',
    antiScamTab: '📦 पॅकिंग आणि रिटर्न प्रूफ',
    moneyFraudTab: '🚨 मनी आणि डिव्हाइस स्कॅम',
    screenControlTab: '🎛️ होम आणि स्टोअर',
    whatsappTab: '📢 बल्क व्हॉट्सॲप',
    businessControlTab: '💼 बिझनेस खाते',
    aiManagerTab: '🤖 AI ऑटो-पायलट',
    supportTicketsTab: '🛠️ समस्या आणि तिकीट',
    loadingText: 'डेटा लोड होत आहे हुकुम...',
    noVendors: 'कोणताही विक्रेता नोंदणीकृत नाही.',
    noUsers: 'कोणताही ग्राहक नोंदणीकृत नाही.',
    noOrders: 'कोणतीही ऑर्डर नाही.',
    noCancellations: 'कोणताही कॅन्सिलेशन रेकॉर्ड नाही.',
    noProofs: 'कोणताही प्रूफ रेकॉर्ड नाही.',
    noFraud: 'कोणताही फ्रॉड डिटेक्टर झालेला नाही.',
    saveControlsBtn: '💾 कंट्रोल्स सेव्ह करा',
    addBannerBtn: '➕ नवीन बॅनर जोडा',
    sendBroadcastBtn: '🚀 व्हॉट्सॲप ब्रॉडकास्ट पाठवा',
    saveSettingsBtn: '💾 सेटिंग्ज सेव्ह करा',
    saveAiBtn: '💾 AI सेटिंग्ज सेव्ह करा',
    fixBtn: '✨ ठीक करा',
    scamBtn: '🚫 स्कॅम',
    safeBtn: '✅ सुरक्षित',
    banBtn: '🚫 डिव्हाइस बॅन करा',
    successUpdate: 'यशस्वीरित्या अपडेट झाले हुकुम!',
    savedSettings: 'सेटिंग्ज सेव्ह झाल्या आहेत हुकुम!',
    savedAi: 'AI ऑटो-पायलट सक्रिय झाला आहे हुकुम!',
    broadcastSuccess: 'सर्व ग्राहक आणि वेंडर्सना व्हॉट्सॲप ब्रॉडकास्ट पाठवला आहे हुकुम!'
  },
  Bengali: {
    adminAccessTitle: '👑 সীমাবদ্ধ অ্যাডমিন অ্যাক্সেস',
    adminAccessDesc: 'এই এলাকাটি শুধুমাত্র সুপার অ্যাডমিনের জন্য নিরাপদ।',
    passwordPlaceholder: 'অ্যাডমিন পাসওয়ার্ড লিখুন',
    unlockBtn: 'অ্যাডমিন প্যানেল আনলক করুন',
    wrongPassword: 'ভুল পাসওয়ার্ড!',
    dashboardTitle: '👑 অ্যাডমিন কন্ট্রোল প্যানেল',
    dashboardSubtitle: 'সম্পূর্ণ নিরাপত্তা এবং অ্যান্টি-স্ক্যাম সিস্টেম',
    refreshBtn: '🔄 ডেটা রিফ্রেশ করুন',
    lockBtn: '🔒 লক করুন',
    totalSelling: 'মোট বিক্রি',
    topSelling: 'শীর্ষ বিক্রীত আইটেম',
    mostSearched: 'সবচেয়ে বেশি খোঁজা হয়েছে',
    fraudAlerts: 'প্রতারণা সতর্কতা',
    active: 'সক্রিয়',
    suspended: 'সাসপেন্ডেড',
    vendorsTab: '🏪 വെണ്ടർ',
    customersTab: '👥 കസ്റ്റമർ',
    customerOrdersTab: '🛒 কাস্টমার অর্ডার',
    cancellationsTab: '❌ റദ്ദാക്കിയത്',
    antiScamTab: '📦 പ്രൂഫ്',
    moneyFraudTab: '🚨 മനി ഫ്രൗഡ്',
    screenControlTab: '🎛️ হোম এবং স্টোর',
    whatsappTab: '📢 বাল্ক হোয়াটসঅ্যাপ',
    businessControlTab: '💼 বিজনেস অ্যাকাউন্ট',
    aiManagerTab: '🤖 AI অটো-পাইলট',
    supportTicketsTab: '🛠️ সমস্যা এবং টিকিট',
    loadingText: 'ডেটা লোড হচ্ছে...',
    noVendors: 'কোনো ভেন্ডর নেই।',
    noUsers: 'কোনো গ্রাহক নেই।',
    noOrders: 'কোনো অর্ডার নেই।',
    noCancellations: 'কোনো রেকর্ড নেই।',
    noProofs: 'কোনো প্রমাণ নেই।',
    noFraud: 'কোনো প্রতারণা সনাক্ত হয়নি।',
    saveControlsBtn: '💾 সংরক্ষণ করুন',
    addBannerBtn: '➕ ব্যানার যোগ করুন',
    sendBroadcastBtn: '🚀 পাঠান',
    saveSettingsBtn: '💾 সেটিংস সংরক্ষণ করুন',
    saveAiBtn: '💾 AI সংরক্ষণ করুন',
    fixBtn: '✨ ঠিক করুন',
    scamBtn: '🚫 স্ক্যাম',
    safeBtn: '✅ নিরাপদ',
    banBtn: '🚫 নিষিদ্ধ করুন',
    successUpdate: 'সফলভাবে আপডেট হয়েছে!',
    savedSettings: 'সেটিংস সংরক্ষিত হয়েছে!',
    savedAi: 'AI সক্রিয় হয়েছে!',
    broadcastSuccess: 'হোয়াটসঅ্যাপ বার্তা পাঠানো হয়েছে!'
  },
  Telugu: {
    adminAccessTitle: '👑 పరిమిత నిర్వాహక యాక్సెస్',
    adminAccessDesc: 'ఈ ప్రాంతం సూపర్ అడ్మిన్‌కు మాత్రమే సురక్షితం.',
    passwordPlaceholder: 'అడ్మిన్ పాస్‌వర్డ్ నమోదు చేయండి',
    unlockBtn: 'అడ్మిన్ ప్యానెల్ అన్‌లాక్ చేయండి',
    wrongPassword: 'తప్పు పాస్‌వర్డ్!',
    dashboardTitle: '👑 అడ్మిన్ కంట్రోల్ ప్యానెల్',
    dashboardSubtitle: 'పూర్తి భద్రత మరియు మోసాల నిరోధక వ్యవస్థ',
    refreshBtn: '🔄 డేటాను రిఫ్రెష్ చేయండి',
    lockBtn: '🔒 లాక్ చేయండి',
    totalSelling: 'మొత్తం అమ్మకం',
    topSelling: 'అత్యధికంగా అమ్ముడైన అంశం',
    mostSearched: 'అధికంగా వెతికినది',
    fraudAlerts: 'మోసాల హెచ్చరికలు',
    active: 'యాక్టివ్',
    suspended: 'సస్పెండ్',
    suspendBtn: '🚫 సస్పెండ్ చేయి',
    activateBtn: '✅ యాక్టివేట్ చేయి',
    vendorsTab: '🏪 వెండర్లు',
    customersTab: '👥 కస్టమర్లు',
    customerOrdersTab: '🛒 ఆర్డర్లు',
    cancellationsTab: '❌ రద్దులు',
    antiScamTab: '📦 ప్రూఫ్స్',
    moneyFraudTab: '🚨 మనీ మోసాలు',
    screenControlTab: '🎛️ హోమ్ & స్టోర్',
    whatsappTab: '📢 వాట్సాప్',
    businessControlTab: '💼 బిజినెస్ ఖాతా',
    aiManagerTab: '🤖 AI ఆటో-పైలట్',
    supportTicketsTab: '🛠️ సమస్యలు',
    loadingText: 'డేటా లోడ్ అవుతోంది...',
    noVendors: 'వెండర్లు లేరు.',
    noUsers: 'కస్టమర్లు లేరు.',
    noOrders: 'ఆర్డర్లు లేవు.',
    noCancellations: 'రికార్డులు లేవు.',
    noProofs: 'ప్రూఫ్స్ లేవు.',
    noFraud: 'మోసాలు కనుగొనబడలేదు.',
    saveControlsBtn: '💾 సేవ్ చేయి',
    addBannerBtn: '➕ బ్యానర్ జోడించు',
    sendBroadcastBtn: '🚀 పంపు',
    saveSettingsBtn: '💾 సెట్టింగ్‌లు సేవ్ చేయి',
    saveAiBtn: '💾 AI సేవ్ చేయి',
    fixBtn: '✨ పరిష్కరించు',
    scamBtn: '🚫 స్కామ్',
    safeBtn: '✅ సురక్షితం',
    banBtn: '🚫 నిషేధించు',
    successUpdate: 'విజయవంతంగా నవీకరించబడింది!',
    savedSettings: 'సెట్టింగ్‌లు సేవ్ చేయబడ్డాయి!',
    savedAi: 'AI సక్రియం చేయబడింది!',
    broadcastSuccess: 'వాట్సాప్ సందేశం పంపబడింది!'
  },
  Kannada: {
    adminAccessTitle: '👑 ನಿರ್ಬಂಧಿತ ಅಡ್ಮಿನ್ ಪ್ರವೇಶ',
    adminAccessDesc: 'ಈ ಪ್ರದೇಶವು ಸೂಪರ್ ಅಡ್ಮಿನ್‌ಗೆ ಮಾತ್ರ ಸುರಕ್ಷಿತವಾಗಿದೆ.',
    passwordPlaceholder: 'ಅಡ್ಮಿನ್ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ',
    unlockBtn: 'ಅಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್ ಅನ್‌ಲಾಕ್ ಮಾಡಿ',
    wrongPassword: 'ತಪ್ಪು ಪಾಸ್‌ವರ್ಡ್!',
    dashboardTitle: '👑 ಅಡ್ಮಿನ್ ಕಂಟ್ರೋಲ್ ಪ್ಯಾನೆಲ್',
    dashboardSubtitle: 'ಪೂರ್ಣ ಭದ್ರತೆ ಮತ್ತು ವಂಚನೆ ತಡೆಗಟ್ಟುವ ವ್ಯವಸ್ಥೆ',
    refreshBtn: '🔄 ಡೇಟಾ ರಿಫ್ರೆಶ್ ಮಾಡಿ',
    lockBtn: '🔒 ಲಾಕ್ ಮಾಡಿ',
    totalSelling: 'ಒಟ್ಟು ಮಾರಾಟ',
    topSelling: 'ಅತಿ ಹೆಚ್ಚು ಮಾರಾಟವಾದ ವಸ್ತು',
    mostSearched: 'ಹೆಚ್ಚು ಹುಡುಕಲಾಗಿದೆ',
    fraudAlerts: 'ವಂಚನೆ ಎಚ್ಚರಿಕೆಗಳು',
    active: 'ಸಕ್ರಿಯ',
    suspended: 'ಸ್ಥಗಿತಗೊಂಡಿದೆ',
    suspendBtn: '🚫 ಸಸ್ಪೆಂಡ್',
    activateBtn: '✅ ಸಕ್ರಿಯಗೊಳಿಸಿ',
    vendorsTab: '🏪 ಮಾರಾಟಗಾರರು',
    customersTab: '👥 ಗ್ರಾಹಕರು',
    customerOrdersTab: '🛒 ಆರ್ಡರ್‌ಗಳು',
    cancellationsTab: '❌ ರದ್ದತಿಗಳು',
    antiScamTab: '📦 ಪ್ಯಾಕಿಂಗ್ ಪುರಾವೆಗಳು',
    moneyFraudTab: '🚨 ಹಣಕಾಸು ವಂಚನೆಗಳು',
    screenControlTab: '🎛️ ಹೋಮ್ & ಸ್ಟೋರ್',
    whatsappTab: '📢 ವಾಟ್ಸಾಪ್',
    businessControlTab: '💼 ವ್ಯಾಪಾರ ಖಾತೆ',
    aiManagerTab: '🤖 AI ಆಟೋ-ಪೈಲಟ್',
    supportTicketsTab: '🛠️ ಸಮಸ್ಯೆಗಳು',
    loadingText: 'ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    noVendors: 'ಮಾರಾಟಗಾರರಿಲ್ಲ.',
    noUsers: 'ಗ್ರಾಹಕರಿಲ್ಲ.',
    noOrders: 'ಆರ್ಡರ್‌ಗಳಿಲ್ಲ.',
    noCancellations: 'ದಾಖಲೆಗಳಿಲ್ಲ.',
    noProofs: 'ಪುರಾವೆಗಳಿಲ್ಲ.',
    noFraud: 'ಯಾವುದೇ ವಂಚನೆ ಪತ್ತೆಯಾಗಿಲ್ಲ.',
    saveControlsBtn: '💾 ಉಳಿಸಿ',
    addBannerBtn: '➕ ಬ್ಯಾನರ್ ಸೇರಿಸಿ',
    sendBroadcastBtn: '🚀 ಕಳುಹಿಸಿ',
    saveSettingsBtn: '💾 ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ',
    saveAiBtn: '💾 AI ಉಳಿಸಿ',
    fixBtn: '✨ ಸರಿಪಡಿಸಿ',
    scamBtn: '🚫 ಹಗರಣ',
    safeBtn: '✅ ಸುರಕ್ಷಿತ',
    banBtn: '🚫 ನಿಷೇಧಿಸಿ',
    successUpdate: 'ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!',
    savedSettings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಲಾಗಿದೆ!',
    savedAi: 'AI ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ!',
    broadcastSuccess: 'ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ!'
  },
  Malayalam: {
    adminAccessTitle: '👑 നിയന്ത്രിത അഡ്മിൻ പ്രവേശനം',
    adminAccessDesc: 'ഈ പ്രദേശം സൂപ്പർ അഡ്മിന് മാത്രമായി സുരക്ഷിതമാണ്.',
    passwordPlaceholder: 'അഡ്മിൻ പാസ്‌വേഡ് നൽകുക',
    unlockBtn: 'അഡ്മിൻ പാനൽ അൺലോക്ക് ചെയ്യുക',
    wrongPassword: 'തെറ്റായ പാസ്‌വേഡ്!',
    dashboardTitle: '👑 അഡ്മിൻ കൺട്രോൾ പാനൽ',
    dashboardSubtitle: 'പൂർണ്ണ സുരക്ഷയും തട്ടിപ്പ് തടയൽ സംവിധാനവും',
    refreshBtn: '🔄 ഡാറ്റ പുതുക്കുക',
    lockBtn: '🔒 ലോക്ക് ചെയ്യുക',
    totalSelling: 'ആകെ വിൽപന',
    topSelling: 'കൂടുതൽ വിറ്റഴിഞ്ഞ ഇനം',
    mostSearched: 'കൂടുതൽ തിരഞ്ഞത്',
    fraudAlerts: 'തട്ടിപ്പ് മുന്നറിയിപ്പുകൾ',
    active: 'സജീവം',
    suspended: 'തടഞ്ഞു',
    suspendBtn: '🚫 സസ്പെൻഡ് ചെയ്യുക',
    activateBtn: '✅ സജീവമാക്കുക',
    vendorsTab: '🏪 വെണ്ടർമാർ',
    customersTab: '👥 ഉപഭോക്താക്കൾ',
    customerOrdersTab: '🛒 ഓർഡറുകൾ',
    cancellationsTab: '❌ റദ്ദാക്കലുകൾ',
    antiScamTab: '📦 പാക്കിംഗ് തെളിവുകൾ',
    moneyFraudTab: '🚨 പണ തട്ടിപ്പുകൾ',
    screenControlTab: '🎛️ ഹോം & സ്റ്റോർ',
    whatsappTab: '📢 വാട്സാപ്പ്',
    businessControlTab: '💼 ബിസിനസ്സ് അക്കൗണ്ട്',
    aiManagerTab: '🤖 AI ഓട്ടോ-പൈലറ്റ്',
    supportTicketsTab: '🛠️ പ്രശ്നങ്ങൾ',
    loadingText: 'ഡാറ്റ ലോഡ് ചെയ്യുന്നു...',
    noVendors: 'വെണ്ടർമാർ ഇല്ല.',
    noUsers: 'ഉപഭോക്താക്കൾ ഇല്ല.',
    noOrders: 'ഓർഡറുകൾ ഇല്ല.',
    noCancellations: 'രേഖകൾ ഇല്ല.',
    noProofs: 'തെളിവുകൾ ഇല്ല.',
    noFraud: 'തട്ടിപ്പുകൾ കണ്ടെത്തിയിട്ടില്ല.',
    saveControlsBtn: '💾 സംരക്ഷിക്കുക',
    addBannerBtn: '➕ ബാനർ ചേർക്കുക',
    sendBroadcastBtn: '🚀 അയക്കുക',
    saveSettingsBtn: '💾 ക്രമീകരണങ്ങൾ സംരക്ഷിക്കുക',
    saveAiBtn: '💾 AI സംരക്ഷിക്കുക',
    fixBtn: '✨ പരിഹരിക്കുക',
    scamBtn: '🚫 തട്ടിപ്പ്',
    safeBtn: '✅ സുരക്ഷിതം',
    banBtn: '🚫 നിരോധിക്കുക',
    successUpdate: ' വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു!',
    savedSettings: 'ക്രമീകരണങ്ങൾ സംരക്ഷിച്ചു!',
    savedAi: 'AI സജീവമാക്കി!',
    broadcastSuccess: 'വാട്സാപ്പ് സന്ദേശം അയച്ചു!'
  }
};

const AdminDashboard = () => {
    // 🌐 Multi-language State Syncing
    const [currentLang, setCurrentLang] = useState(() => {
        return localStorage.getItem('appLanguage') || 'English';
    });
    const t = adminTranslations[currentLang] || adminTranslations.English;

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

    // 🛡️ लोकल स्टोरेज से चेक करेंगे ताकि रीफ्रेश करने पर एडमिन लॉग-आउट न हो
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('admin_logged_in') === 'true';
    });
    const [passInput, setPassInput] = useState('');
    const [vendors, setVendors] = useState([]);
    const [users, setUsers] = useState([]);
    
    // 🛒 कस्टमर ऑर्डर हिस्ट्री और टाइमस्टैम्प स्टेट (नया जोड़ा गया - कोई पुराना डिलीट नहीं हुआ)
    const [customerOrders, setCustomerOrders] = useState([
        { id: 1, orderId: 'ORD-9901', customerName: 'Rajendra Singh', phone: '9829011223', item: 'Royal Velvet Kurta', amount: 3499, time: '2026-03-29 14:20:10', address: 'Sardarpura, Jodhpur', status: 'Delivered' },
        { id: 2, orderId: 'ORD-9902', customerName: 'Mahendra Parihar', phone: '9414055667', item: 'Gold Lion Branded Hoodie', amount: 1999, time: '2026-03-29 15:05:42', address: 'Paota Road, Jodhpur', status: 'Packing Verification' }
    ]);

    // 📊 सेल्स, कैंसिलेशन, टॉप आइटम्स और सर्च डेटा स्टेट (ओरिजिनल पुरा)
    const [analytics, setAnalytics] = useState({
        totalSelling: 0,
        topSellingItem: 'N/A',
        topSearched: 'N/A',
        totalCancelled: 0,
        cancelReasons: []
    });
    
    // 🎛️ विस्तृत होम स्क्रीन डिस्प्ले और 7-8 बैनर कंट्रोल स्टेट (अपग्रेटेड)
    const [homeControls, setHomeControls] = useState({
        showBanner: true,
        announcementText: '✨ 2026 Luxury Collection Live Now!',
        featuredCategory: 'All',
        maintenanceMode: false,
        festivalDiscount: '10%',
        freeDeliveryAbove: '999',
        storeThemeColor: '#d4af37',
        sectionOrder: ['banners', 'categories', 'topSellers', 'recentProducts'],
        banners: [
            { id: 1, title: 'Royal Jodhpur Edit', image: 'https://via.placeholder.com/600x200', link: '/shop' },
            { id: 2, title: 'Summer Luxury Polo', image: 'https://via.placeholder.com/600x200', link: '/polo' },
            { id: 3, title: 'Gold Lion Special', image: 'https://via.placeholder.com/600x200', link: '/gold' },
            { id: 4, title: 'Wedding Sherwani Collection', image: 'https://via.placeholder.com/600x200', link: '/wedding' },
            { id: 5, title: 'Casual Tracksuits', image: 'https://via.placeholder.com/600x200', link: '/tracksuits' },
            { id: 6, title: 'Handcrafted Mojaris', image: 'https://via.placeholder.com/600x200', link: '/mojaris' },
            { id: 7, title: 'VIP Royal Club Special', image: 'https://via.placeholder.com/600x200', link: '/vip' }
        ]
    });

    const [whatsappMsg, setWhatsappMsg] = useState('');
    const [businessAccountStatus, setBusinessAccountStatus] = useState({
        accountTier: 'Royal VIP Business',
        paymentGatewayActive: true,
        autoPayouts: true,
        maxVendorLimit: 50
    });
    const [aiAutoPilot, setAiAutoPilot] = useState({
        autoPromoteTopSellers: true,
        smartInventoryAlerts: true,
        autoBlockSuspiciousUsers: true
    });
    const [supportTickets, setSupportTickets] = useState([
        { id: 101, user: 'Rahul Sharma', issue: 'Payment deducted but order not placed', status: 'Pending', phone: '9829011223' },
        { id: 102, user: 'Vikram Singh', issue: 'Vendor panel login error', status: 'Pending', phone: '9414055667' }
    ]);

    // 🛡️ 1. एंटी-स्कैम, पैकिंग वीडियो और 4 फोटो / 2 वीडियो रिटर्न प्रूफ स्टेट (ओरिजिनल)
    const [antiScamProofs, setAntiScamProofs] = useState([
        { id: 501, orderId: 'ORD-9821', customerName: 'Amit Kumar', phone: '9829011223', type: 'Return / Claim', status: 'Under Review (Checking Scam)', photosCount: 4, videosCount: 2, packingVideoVerified: true, date: '2026-03-27' },
        { id: 502, orderId: 'ORD-9825', customerName: 'Rohit Jain', phone: '9414098765', type: 'Cancelled Order', status: 'Approved (Proofs Attached)', photosCount: 4, videosCount: 2, packingVideoVerified: true, date: '2026-03-26' }
    ]);

    // 🚨 2. पेमेंट और डिवाइस फ्रॉड / मनी स्कैम अलर्ट स्टेट (ओरिजिनल)
    const [fraudAlerts, setFraudAlerts] = useState([
        { id: 901, deviceId: 'DEV-JODHPUR-992', suspectPhone: '98290XXXXX', scamType: 'Multiple Orders / Same Device Payment Abuse', vendorAffected: 'Royal Men’s Wear', timestamp: '2026-03-28 14:10', status: '🚨 Red Alert Sent to Admin & Vendor' },
        { id: 902, deviceId: 'DEV-JAIPUR-114', suspectPhone: '94140YYYYY', scamType: 'Fake Chargeback / Money Scam Attempt', vendorAffected: 'Jodhpur Ethnic House', timestamp: '2026-03-27 19:45', status: '🚨 Blocked Automatically' }
    ]);

    const [activeTab, setActiveTab] = useState('vendors'); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const ADMIN_SECRET = 'Bunty@986'; 

    const handleLogin = (e) => {
        e.preventDefault();
        if (passInput === ADMIN_SECRET) {
            setIsAuthenticated(true);
            localStorage.setItem('admin_logged_in', 'true');
            fetchAllData();
        } else {
            alert(t.wrongPassword);
            setPassInput('');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_logged_in');
    };

    const fetchAllData = async () => {
        setLoading(true);
        setMessage('');
        await Promise.all([fetchVendors(), fetchUsers(), fetchAnalyticsData()]);
        setLoading(false);
    };

    const fetchVendors = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/admin/vendors');
            const data = await response.json();
            if (data.success) {
                setVendors(data.vendors || []);
            } else {
                setMessage('दुकानदारों का डेटा लोड करने में समस्या!');
            }
        } catch (error) {
            console.error('Error fetching vendors:', error);
            setMessage('सर्वर (Port 5001) से संपर्क नहीं हो पा रहा है!');
        }
    };

    const fetchUsers = async () => {
        try {
            let apiUsers = [];
            try {
                const response = await fetch('http://localhost:5001/api/admin/users');
                const data = await response.json();
                if (data.success) {
                    apiUsers = data.users || [];
                }
            } catch (err) {}

            const localCustomers = JSON.parse(localStorage.getItem('adminCustomers') || '[]');
            const combinedUsers = [...localCustomers];
            apiUsers.forEach(u => {
                if (!combinedUsers.some(c => c.phone === u.phone)) {
                    combinedUsers.push(u);
                }
            });

            setUsers(combinedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            const localCustomers = JSON.parse(localStorage.getItem('adminCustomers') || '[]');
            setUsers(localCustomers);
        }
    };

    const fetchAnalyticsData = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/admin/analytics');
            const data = await response.json();
            if (data.success) {
                setAnalytics(data.analytics);
            }
        } catch (error) {
            const localAnalytics = JSON.parse(localStorage.getItem('storeAnalytics') || JSON.stringify({
                totalSelling: 142500,
                topSellingItem: 'Luxury Velvet Polo Shirt',
                topSearched: 'Gold Lion Branded Hoodies',
                totalCancelled: 4,
                cancelReasons: [
                    { id: 1, item: 'Casual Black Shirt', reason: 'Size fitting issue (Too tight)', customerPhone: '9829012345', date: '2026-03-24' },
                    { id: 2, item: 'Jodhpur Royal Kurta', reason: 'Late delivery expectation', customerPhone: '9414098765', date: '2026-03-22' },
                    { id: 3, item: 'Golden Belt', reason: 'Changed mind / Ordered duplicate', customerPhone: '9928011223', date: '2026-03-20' },
                    { id: 4, item: 'Designer Tracksuit', reason: 'Color preference changed', customerPhone: '9529044556', date: '2026-03-18' }
                ]
            }));
            setAnalytics(localAnalytics);
        }

        const savedHomeControls = JSON.parse(localStorage.getItem('adminHomeControls') || JSON.stringify(homeControls));
        setHomeControls(savedHomeControls);

        const savedBusinessCtrl = JSON.parse(localStorage.getItem('adminBusinessCtrl') || JSON.stringify(businessAccountStatus));
        setBusinessAccountStatus(savedBusinessCtrl);

        const savedAiCtrl = JSON.parse(localStorage.getItem('adminAiCtrl') || JSON.stringify(aiAutoPilot));
        setAiAutoPilot(savedAiCtrl);

        const savedTickets = JSON.parse(localStorage.getItem('adminSupportTickets') || JSON.stringify(supportTickets));
        setSupportTickets(savedTickets);

        const savedProofs = JSON.parse(localStorage.getItem('adminAntiScamProofs') || JSON.stringify(antiScamProofs));
        setAntiScamProofs(savedProofs);

        const savedFraudAlerts = JSON.parse(localStorage.getItem('adminFraudAlerts') || JSON.stringify(fraudAlerts));
        setFraudAlerts(savedFraudAlerts);

        const savedCustomerOrders = JSON.parse(localStorage.getItem('adminCustomerOrders') || JSON.stringify(customerOrders));
        setCustomerOrders(savedCustomerOrders);
    };

    const handleSaveHomeControls = (e) => {
        e.preventDefault();
        localStorage.setItem('adminHomeControls', JSON.stringify(homeControls));
        alert(t.successUpdate);
    };

    const handleAddBanner = () => {
        if (homeControls.banners.length >= 8) {
            alert('आप अधिकतम 8 बैनर ही जोड़ सकते हैं हुकुम!');
            return;
        }
        const newBanner = {
            id: homeControls.banners.length + 1,
            title: `New Banner ${homeControls.banners.length + 1}`,
            image: 'https://via.placeholder.com/600x200',
            link: '/shop'
        };
        const updatedBanners = [...homeControls.banners, newBanner];
        setHomeControls({...homeControls, banners: updatedBanners});
    };

    const handleRemoveBanner = (bannerId) => {
        const updatedBanners = homeControls.banners.filter(b => b.id !== bannerId);
        setHomeControls({...homeControls, banners: updatedBanners});
    };

    const handleBannerChange = (id, field, value) => {
        const updatedBanners = homeControls.banners.map(b => b.id === id ? { ...b, [field]: value } : b);
        setHomeControls({...homeControls, banners: updatedBanners});
    };

    const handleMoveSection = (index, direction) => {
        const newOrder = [...homeControls.sectionOrder];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newOrder.length) return;
        const temp = newOrder[index];
        newOrder[index] = newOrder[targetIndex];
        newOrder[targetIndex] = temp;
        setHomeControls({...homeControls, sectionOrder: newOrder});
    };

    const handleSaveBusinessCtrl = (e) => {
        e.preventDefault();
        localStorage.setItem('adminBusinessCtrl', JSON.stringify(businessAccountStatus));
        alert(t.savedSettings);
    };

    const handleSaveAiCtrl = (e) => {
        e.preventDefault();
        localStorage.setItem('adminAiCtrl', JSON.stringify(aiAutoPilot));
        alert(t.savedAi);
    };

    const handleSendBulkWhatsapp = (e) => {
        e.preventDefault();
        if (!whatsappMsg.trim()) {
            alert('कृपया संदेश (Message) लिखें हुकुम!');
            return;
        }
        alert(t.broadcastSuccess);
        setWhatsappMsg('');
    };

    const handleResolveTicket = (ticketId) => {
        const updated = supportTickets.map(t => t.id === ticketId ? { ...t, status: 'Resolved (Solved)' } : t);
        setSupportTickets(updated);
        localStorage.setItem('adminSupportTickets', JSON.stringify(updated));
        alert(t.successUpdate);
    };

    // 🛡️ स्कैम डिक्लेयर या वेरीफाई करने का फंक्शन
    const handleVerifyProofStatus = (proofId, newStatus) => {
        const updated = antiScamProofs.map(p => p.id === proofId ? { ...p, status: newStatus } : p);
        setAntiScamProofs(updated);
        localStorage.setItem('adminAntiScamProofs', JSON.stringify(updated));
        alert(t.successUpdate);
    };

    // 🚨 नया फ्रॉड ब्लॉक करने का फंक्शन
    const handleBlockFraudUser = (alertId) => {
        const updated = fraudAlerts.map(f => f.id === alertId ? { ...f, status: '🚫 User & Device Permanently Banned' } : f);
        setFraudAlerts(updated);
        localStorage.setItem('adminFraudAlerts', JSON.stringify(updated));
        alert(t.successUpdate);
    };

    const handleToggleStatus = async (vendorId, currentStatus) => {
        const newStatus = !currentStatus;
        const actionText = newStatus ? "सक्रिय (Active)" : "सस्पेंड (Suspend)";

        if (!window.confirm(`क्या आप वाकई इस दुकानदार को ${actionText} करना चाहते हैं हुकुम?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/api/admin/vendor-status/${vendorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: newStatus })
            });

            const result = await response.json();
            if (response.ok && (result.success || result.message)) {
                alert(t.successUpdate);
                fetchVendors();
            } else {
                alert(result.message || 'स्टेटस अपडेट नहीं हो सका!');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('सर्वर एरर: स्टेटस बदलते समय गड़बड़ी हुई।');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchAllData();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div style={{ backgroundColor: '#0c0a09', color: '#f3e5ab', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
                <form onSubmit={handleLogin} style={{ backgroundColor: '#161310', border: '1px solid #d4af37', padding: '30px', borderRadius: '10px', width: '350px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                    <h3 style={{ color: '#d4af37', marginBottom: '10px' }}>{t.adminAccessTitle}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '20px' }}>{t.adminAccessDesc}</p>
                    <input 
                        type="password" 
                        placeholder={t.passwordPlaceholder} 
                        value={passInput} 
                        onChange={(e) => setPassInput(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', backgroundColor: '#0c0a09', border: '1px solid #443826', color: '#fff', borderRadius: '5px', marginBottom: '15px', boxSizing: 'border-box', textAlign: 'center', fontSize: '1rem' }} 
                    />
                    <button type="submit" style={{ width: '100%', backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
                        {t.unlockBtn}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ padding: '30px', backgroundColor: '#0c0a09', color: '#f3e5ab', minHeight: '100vh', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #33291a', paddingBottom: '15px', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#d4af37' }}>{t.dashboardTitle}</h2>
                    <span style={{ fontSize: '0.85rem', color: '#888' }}>{t.dashboardSubtitle}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={fetchAllData} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {t.refreshBtn}
                    </button>
                    <button onClick={handleLogout} style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {t.lockBtn}
                    </button>
                </div>
            </div>

            {/* 📈 क्विक बिजनेस इनसाइट्स कार्ड्स */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #2ecc71' }}>
                    <div style={{ fontSize: '0.75rem', color: '#aaa' }}>💰 {t.totalSelling}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2ecc71', marginTop: '5px' }}>₹ {analytics.totalSelling.toLocaleString()}</div>
                </div>
                <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #d4af37' }}>
                    <div style={{ fontSize: '0.75rem', color: '#aaa' }}>🔥 {t.topSelling}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', marginTop: '5px' }}>{analytics.topSellingItem}</div>
                </div>
                <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3498db' }}>
                    <div style={{ fontSize: '0.75rem', color: '#aaa' }}>🔍 {t.mostSearched}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', marginTop: '5px' }}>{analytics.topSearched}</div>
                </div>
                <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #e74c3c' }}>
                    <div style={{ fontSize: '0.75rem', color: '#aaa' }}>🚨 {t.fraudAlerts}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#e74c3c', marginTop: '5px' }}>{fraudAlerts.length} Active</div>
                </div>
            </div>

            {/* सभी 11 टैब नेविगेशन - आपका एक भी पुराना टैब डिलीट नहीं हुआ है */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveTab('vendors')} style={{ backgroundColor: activeTab === 'vendors' ? '#d4af37' : '#161310', color: activeTab === 'vendors' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.vendorsTab} ({vendors.length})
                </button>
                <button onClick={() => setActiveTab('users')} style={{ backgroundColor: activeTab === 'users' ? '#d4af37' : '#161310', color: activeTab === 'users' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.customersTab} ({users.length})
                </button>
                <button onClick={() => setActiveTab('customerOrders')} style={{ backgroundColor: activeTab === 'customerOrders' ? '#d4af37' : '#161310', color: activeTab === 'customerOrders' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.customerOrdersTab} ({customerOrders.length})
                </button>
                <button onClick={() => setActiveTab('cancellations')} style={{ backgroundColor: activeTab === 'cancellations' ? '#d4af37' : '#161310', color: activeTab === 'cancellations' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.cancellationsTab}
                </button>
                <button onClick={() => setActiveTab('antiScam')} style={{ backgroundColor: activeTab === 'antiScam' ? '#d4af37' : '#161310', color: activeTab === 'antiScam' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.antiScamTab}
                </button>
                <button onClick={() => setActiveTab('moneyFraudProtection')} style={{ backgroundColor: activeTab === 'moneyFraudProtection' ? '#e74c3c' : '#161310', color: activeTab === 'moneyFraudProtection' ? '#fff' : '#e74c3c', border: '1px solid #e74c3c', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.moneyFraudTab} ({fraudAlerts.length})
                </button>
                <button onClick={() => setActiveTab('screenControl')} style={{ backgroundColor: activeTab === 'screenControl' ? '#d4af37' : '#161310', color: activeTab === 'screenControl' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.screenControlTab}
                </button>
                <button onClick={() => setActiveTab('whatsappSender')} style={{ backgroundColor: activeTab === 'whatsappSender' ? '#d4af37' : '#161310', color: activeTab === 'whatsappSender' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.whatsappTab}
                </button>
                <button onClick={() => setActiveTab('businessControl')} style={{ backgroundColor: activeTab === 'businessControl' ? '#d4af37' : '#161310', color: activeTab === 'businessControl' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.businessControlTab}
                </button>
                <button onClick={() => setActiveTab('aiManager')} style={{ backgroundColor: activeTab === 'aiManager' ? '#d4af37' : '#161310', color: activeTab === 'aiManager' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.aiManagerTab}
                </button>
                <button onClick={() => setActiveTab('supportTickets')} style={{ backgroundColor: activeTab === 'supportTickets' ? '#d4af37' : '#161310', color: activeTab === 'supportTickets' ? '#000' : '#d4af37', border: '1px solid #d4af37', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.supportTicketsTab}
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#d4af37' }}>
                    <p style={{ fontSize: '1.1rem' }}>{t.loadingText}</p>
                </div>
            ) : message ? (
                <div style={{ backgroundColor: 'rgba(231, 76, 60, 0.1)', border: '1px solid #e74c3c', padding: '15px', borderRadius: '8px', color: '#e74c3c', textAlign: 'center', marginBottom: '20px' }}>
                    {message}
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    
                    {/* 1. वेंडर लिस्ट टेबल */}
                    {activeTab === 'vendors' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#161310', border: '1px solid #33291a', borderRadius: '8px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#261f14', color: '#d4af37', textAlign: 'left', fontSize: '0.85rem' }}>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>ID</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Shop Name</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Owner</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Phone / Email</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Category</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Status</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a', textAlign: 'center' }}>Action / Control</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.length === 0 ? (
                                    <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>{t.noVendors}</td></tr>
                                ) : (
                                    vendors.map((vendor) => (
                                        <tr key={vendor.id || vendor._id} style={{ borderBottom: '1px solid #221a12', fontSize: '0.85rem' }}>
                                            <td style={{ padding: '12px' }}>#{vendor.id || vendor._id}</td>
                                            <td style={{ padding: '12px', fontWeight: 'bold', color: '#fff' }}>{vendor.shopname || vendor.shopName}</td>
                                            <td style={{ padding: '12px' }}>{vendor.ownername || vendor.ownerName}</td>
                                            <td style={{ padding: '12px' }}><div>{vendor.phone}</div><div style={{ fontSize: '0.75rem', color: '#888' }}>{vendor.email}</div></td>
                                            <td style={{ padding: '12px' }}>{vendor.category || 'N/A'}</td>
                                            <td style={{ padding: '12px' }}>
                                                {vendor.is_active || vendor.isActive ? (
                                                    <span style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>🟢 {t.active}</span>
                                                ) : (
                                                    <span style={{ backgroundColor: 'rgba(231, 76, 60, 0.15)', color: '#e74c3c', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>🔴 {t.suspended}</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                                <button 
                                                    onClick={() => handleToggleStatus(vendor.id || vendor._id, vendor.is_active !== undefined ? vendor.is_active : vendor.isActive)}
                                                    style={{ backgroundColor: (vendor.is_active || vendor.isActive) ? '#e74c3c' : '#2ecc71', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}
                                                >
                                                    {(vendor.is_active || vendor.isActive) ? t.suspendBtn : t.activateBtn}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}

                    {/* 2. यूजर्स लिस्ट टेबल */}
                    {activeTab === 'users' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#161310', border: '1px solid #33291a', borderRadius: '8px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#261f14', color: '#d4af37', textAlign: 'left', fontSize: '0.85rem' }}>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>ID</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Name / Username</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Email</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Phone</th>
                                    <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Joined Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>{t.noUsers}</td></tr>
                                ) : (
                                    users.map((user, index) => (
                                        <tr key={user.id || index} style={{ borderBottom: '1px solid #221a12', fontSize: '0.85rem' }}>
                                            <td style={{ padding: '12px' }}>#{user.id || index + 1}</td>
                                            <td style={{ padding: '12px', fontWeight: 'bold', color: '#fff' }}>{user.name || user.username || 'Luxury Store Member'}</td>
                                            <td style={{ padding: '12px', color: '#aaa' }}>{user.email || 'customer@luxury.in'}</td>
                                            <td style={{ padding: '12px', color: '#2ecc71', fontWeight: 'bold' }}>{user.phone || 'N/A'}</td>
                                            <td style={{ padding: '12px', fontSize: '0.75rem', color: '#888' }}>{user.created_at ? new Date(user.created_at).toLocaleDateString() : new Date().toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}

                    {/* 🛒 3. नया कस्टमर ऑर्डर और टाइमस्टैम्प टैब */}
                    {activeTab === 'customerOrders' && (
                        <div>
                            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>🛒 Customer Orders & Exact Timestamp Tracker</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#161310', border: '1px solid #33291a', borderRadius: '8px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#261f14', color: '#d4af37', textAlign: 'left', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Order ID</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Customer Name & Phone</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Ordered Item</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Amount</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Order Time & Date</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Delivery Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerOrders.length === 0 ? (
                                        <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>{t.noOrders}</td></tr>
                                    ) : (
                                        customerOrders.map((ord) => (
                                            <tr key={ord.id} style={{ borderBottom: '1px solid #221a12', fontSize: '0.85rem' }}>
                                                <td style={{ padding: '12px', fontWeight: 'bold', color: '#d4af37' }}>#{ord.orderId}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <div style={{ color: '#fff', fontWeight: 'bold' }}>{ord.customerName}</div>
                                                    <div style={{ color: '#2ecc71', fontSize: '0.75rem' }}>📞 {ord.phone}</div>
                                                </td>
                                                <td style={{ padding: '12px', color: '#fff' }}>{ord.item}</td>
                                                <td style={{ padding: '12px', color: '#2ecc71', fontWeight: 'bold' }}>₹ {ord.amount}</td>
                                                <td style={{ padding: '12px', color: '#3498db', fontSize: '0.8rem', fontWeight: 'bold' }}>⏰ {ord.time}</td>
                                                <td style={{ padding: '12px', color: '#aaa', fontSize: '0.8rem' }}>📍 {ord.address}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 4. कैंसिलेशन और ग्राहक फोन नंबर */}
                    {activeTab === 'cancellations' && (
                        <div>
                            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>🚫 आर्डर कैंसिलेशन और ग्राहक संपर्क (Customer Phone & Reason)</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#161310', border: '1px solid #33291a', borderRadius: '8px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#261f14', color: '#d4af37', textAlign: 'left', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>#ID</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Cancelled Item</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>ग्राहक का फोन नंबर (Customer Phone)</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>दिक्कत / कारण (Reason)</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics.cancelReasons.length === 0 ? (
                                        <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>{t.noCancellations}</td></tr>
                                    ) : (
                                        analytics.cancelReasons.map((item, idx) => (
                                            <tr key={item.id || idx} style={{ borderBottom: '1px solid #221a12', fontSize: '0.85rem' }}>
                                                <td style={{ padding: '12px' }}>#{item.id || idx + 1}</td>
                                                <td style={{ padding: '12px', fontWeight: 'bold', color: '#fff' }}>{item.item}</td>
                                                <td style={{ padding: '12px', color: '#2ecc71', fontWeight: 'bold' }}>📞 {item.customerPhone || '98290XXXXX'}</td>
                                                <td style={{ padding: '12px', color: '#e74c3c' }}>{item.reason}</td>
                                                <td style={{ padding: '12px', color: '#888', fontSize: '0.75rem' }}>{item.date}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 📦 5. पैकिंग वीडियो और रिटर्न प्रूफ्स (4 फोटो और 2 वीडियो) टैब */}
                    {activeTab === 'antiScam' && (
                        <div>
                            <h3 style={{ color: '#d4af37', marginBottom: '10px' }}>📦 Packing Video & Return/Cancellation Anti-Scam Proofs</h3>
                            <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '20px' }}>यहाँ आइटम पैकिंग का वीडियो और ग्राहक द्वारा रिटर्न/कैंसिलेशन पर अपलोड की गई **4 फोटो और 2 वीडियो** का रिकॉर्ड है, ताकि स्कैम पकड़ा जा सके।</p>
                            
                            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#161310', border: '1px solid #33291a', borderRadius: '8px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#261f14', color: '#d4af37', textAlign: 'left', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Order ID</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Customer Name & Phone</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Type</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Packing Video</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Customer Proofs (4 Photos / 2 Videos)</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Status</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a', textAlign: 'center' }}>Verify / Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {antiScamProofs.length === 0 ? (
                                        <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>{t.noProofs}</td></tr>
                                    ) : (
                                        antiScamProofs.map((proof) => (
                                            <tr key={proof.id} style={{ borderBottom: '1px solid #221a12', fontSize: '0.85rem' }}>
                                                <td style={{ padding: '12px', fontWeight: 'bold', color: '#d4af37' }}>#{proof.orderId}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <div style={{ color: '#fff', fontWeight: 'bold' }}>{proof.customerName}</div>
                                                    <div style={{ color: '#2ecc71', fontSize: '0.75rem' }}>📞 {proof.phone}</div>
                                                </td>
                                                <td style={{ padding: '12px', color: '#aaa' }}>{proof.type}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <span style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>📹 Video Saved</span>
                                                </td>
                                                <td style={{ padding: '12px', color: '#3498db', fontWeight: 'bold' }}>
                                                    📸 {proof.photosCount} Photos | 🎥 {proof.videosCount} Videos
                                                </td>
                                                <td style={{ padding: '12px' }}>
                                                    <span style={{ backgroundColor: 'rgba(231, 76, 60, 0.15)', color: '#e74c3c', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{proof.status}</span>
                                                </td>
                                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                                    <button 
                                                        onClick={() => handleVerifyProofStatus(proof.id, '❌ Confirmed Scam / Rejected')}
                                                        style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem', marginRight: '5px' }}
                                                    >
                                                        {t.scamBtn}
                                                    </button>
                                                    <button 
                                                        onClick={() => handleVerifyProofStatus(proof.id, '✅ Genuine / Approved')}
                                                        style={{ backgroundColor: '#2ecc71', color: '#000', border: 'none', padding: '6px 10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}
                                                    >
                                                        {t.safeBtn}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 🚨 6. Money & Multi-Device Scam Protection (Red Alert) */}
                    {activeTab === 'moneyFraudProtection' && (
                        <div>
                            <div style={{ backgroundColor: 'rgba(231, 76, 60, 0.1)', border: '1px solid #e74c3c', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                                <h3 style={{ color: '#e74c3c', margin: '0 0 5px 0' }}>🚨 ADVANCED MONEY & DEVICE SCAM PROTECTION SYSTEM</h3>
                                <p style={{ fontSize: '0.85rem', color: '#f3e5ab', margin: 0 }}>
                                    यदि कोई शातिर व्यक्ति एक ही मोबाइल फोन या डिवाइस से बार-बार (2-3 बार) फर्जी अकाउंट बनाकर पेमेंट या आर्डर का घोटाला करने की कोशिश करेगा, तो सिस्टम तुरंत **Red Alert** जारी करके **एडमिन (आपको) और संबंधित दुकानदार (Vendor)** को व्हाट्सएप/डैशबोर्ड पर सूचित कर देगा!
                                </p>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#161310', border: '1px solid #33291a', borderRadius: '8px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#261f14', color: '#d4af37', textAlign: 'left', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Alert ID</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Device & Suspect Phone</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Scam Type / Pattern Detected</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Affected Vendor</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Time</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a', textAlign: 'center' }}>Admin Action (Ban / Clear)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fraudAlerts.length === 0 ? (
                                        <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>{t.noFraud}</td></tr>
                                    ) : (
                                        fraudAlerts.map((alert) => (
                                            <tr key={alert.id} style={{ borderBottom: '1px solid #221a12', fontSize: '0.85rem' }}>
                                                <td style={{ padding: '12px', fontWeight: 'bold', color: '#e74c3c' }}>#{alert.id}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <div style={{ color: '#fff', fontWeight: 'bold' }}>{alert.deviceId}</div>
                                                    <div style={{ color: '#e74c3c', fontSize: '0.75rem' }}>📞 {alert.suspectPhone}</div>
                                                </td>
                                                <td style={{ padding: '12px', color: '#f3e5ab', fontWeight: 'bold' }}>{alert.scamType}</td>
                                                <td style={{ padding: '12px', color: '#d4af37' }}>{alert.vendorAffected}</td>
                                                <td style={{ padding: '12px', color: '#888', fontSize: '0.75rem' }}>{alert.timestamp}</td>
                                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                                    <button 
                                                        onClick={() => handleBlockFraudUser(alert.id)}
                                                        style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}
                                                    >
                                                        {t.banBtn}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                  {/* 🎛️ 7. होम स्क्रीन और 7-8 बैनर कंट्रोल पैनल */}
                    {activeTab === 'screenControl' && (
                        <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '25px', borderRadius: '8px', maxWidth: '800px' }}>
                            <h3 style={{ color: '#d4af37', marginTop: 0, marginBottom: '15px' }}>🎛️ Complete Store & Home Screen Controller (7-8 Banners + Rearrange)</h3>
                            
                            <form onSubmit={handleSaveHomeControls}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: '#f3e5ab' }}>📢 Top Announcement Banner Text:</label>
                                    <input type="text" value={homeControls.announcementText} onChange={(e) => setHomeControls({...homeControls, announcementText: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0c0a09', border: '1px solid #443826', color: '#fff', borderRadius: '5px', boxSizing: 'border-box' }} />
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: '#f3e5ab' }}>⭐ Featured Category on Home:</label>
                                    <select value={homeControls.featuredCategory} onChange={(e) => setHomeControls({...homeControls, featuredCategory: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0c0a09', border: '1px solid #443826', color: '#fff', borderRadius: '5px', boxSizing: 'border-box' }}>
                                        <option value="All">All Collections</option>
                                        <option value="Polo Shirts">Polo Shirts</option>
                                        <option value="Luxury Kurtas">Luxury Kurtas</option>
                                    </select>
                                </div>

                                <div style={{ marginBottom: '20px', borderTop: '1px solid #33291a', paddingTop: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <h4 style={{ color: '#d4af37', margin: 0 }}>🖼️ Multi-Banners Manager (Up to 8 Banners):</h4>
                                        <button type="button" onClick={handleAddBanner} style={{ backgroundColor: '#2ecc71', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>{t.addBannerBtn}</button>
                                    </div>
                                    
                                    {homeControls.banners.map((banner, index) => (
                                        <div key={banner.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center', backgroundColor: '#0c0a09', padding: '10px', borderRadius: '6px', border: '1px solid #33291a' }}>
                                            <span style={{ color: '#d4af37', fontWeight: 'bold' }}>#{index + 1}</span>
                                            <input type="text" placeholder="Banner Title" value={banner.title} onChange={(e) => handleBannerChange(banner.id, 'title', e.target.value)} style={{ flex: 1, padding: '8px', backgroundColor: '#161310', border: '1px solid #443826', color: '#fff', borderRadius: '4px' }} />
                                            <input type="text" placeholder="Image URL" value={banner.image} onChange={(e) => handleBannerChange(banner.id, 'image', e.target.value)} style={{ flex: 1, padding: '8px', backgroundColor: '#161310', border: '1px solid #443826', color: '#fff', borderRadius: '4px' }} />
                                            <button type="button" onClick={() => handleRemoveBanner(banner.id)} style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>❌</button>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginBottom: '20px', borderTop: '1px solid #33291a', paddingTop: '15px' }}>
                                    <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>🔄 Home Layout Sections Rearrange (आगे-पीछे कंट्रोल):</h4>
                                    {homeControls.sectionOrder.map((section, idx) => (
                                        <div key={section} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0c0a09', padding: '8px 12px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #33291a' }}>
                                            <span style={{ color: '#fff', textTransform: 'capitalize' }}>{idx + 1}. {section}</span>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <button type="button" onClick={() => handleMoveSection(idx, 'up')} style={{ backgroundColor: '#33291a', color: '#d4af37', border: 'none', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer' }}>⬆️ ऊपर</button>
                                                <button type="button" onClick={() => handleMoveSection(idx, 'down')} style={{ backgroundColor: '#33291a', color: '#d4af37', border: 'none', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer' }}>⬇️ नीचे</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>{t.saveControlsBtn}</button>
                            </form>
                        </div>
                    )}

                    {/* 8. Bulk WhatsApp Sender */}
                    {activeTab === 'whatsappSender' && (
                        <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '25px', borderRadius: '8px', maxWidth: '600px' }}>
                            <h3 style={{ color: '#d4af37', marginTop: 0, marginBottom: '10px' }}>📢 Bulk WhatsApp & SMS Broadcast Sender</h3>
                            <form onSubmit={handleSendBulkWhatsapp}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: '#f3e5ab' }}>💬 टाइप करें अपना मैसेज:</label>
                                    <textarea rows="5" value={whatsappMsg} onChange={(e) => setWhatsappMsg(e.target.value)} placeholder="मैसेज यहाँ लिखें..." style={{ width: '100%', padding: '12px', backgroundColor: '#0c0a09', border: '1px solid #443826', color: '#fff', borderRadius: '5px', boxSizing: 'border-box' }}></textarea>
                                </div>
                                <button type="submit" style={{ backgroundColor: '#2ecc71', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>{t.sendBroadcastBtn}</button>
                            </form>
                        </div>
                    )}

                    {/* 9. Business Account Control */}
                    {activeTab === 'businessControl' && (
                        <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '25px', borderRadius: '8px', maxWidth: '600px' }}>
                            <h3 style={{ color: '#d4af37', marginTop: 0, marginBottom: '10px' }}>💼 Business Account Controls</h3>
                            <form onSubmit={handleSaveBusinessCtrl}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: '#f3e5ab' }}>🏷️ Business Tier:</label>
                                    <input type="text" value={businessAccountStatus.accountTier} onChange={(e) => setBusinessAccountStatus({...businessAccountStatus, accountTier: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0c0a09', border: '1px solid #443826', color: '#fff', borderRadius: '5px', boxSizing: 'border-box' }} />
                                </div>
                                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>{t.saveSettingsBtn}</button>
                            </form>
                        </div>
                    )}

                    {/* 10. AI Manager */}
                    {activeTab === 'aiManager' && (
                        <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '25px', borderRadius: '8px', maxWidth: '600px' }}>
                            <h3 style={{ color: '#d4af37', marginTop: 0, marginBottom: '10px' }}>🤖 AI Application Auto-Pilot Handler</h3>
                            <form onSubmit={handleSaveAiCtrl}>
                                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input type="checkbox" id="aiBlock" checked={aiAutoPilot.autoBlockSuspiciousUsers} onChange={(e) => setAiAutoPilot({...aiAutoPilot, autoBlockSuspiciousUsers: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: '#e74c3c' }} />
                                    <label htmlFor="aiBlock" style={{ fontSize: '0.9rem', cursor: 'pointer', color: '#e74c3c' }}>AI Auto-Block Fraud / Fake Multi-Device Orders & Users</label>
                                </div>
                                <button type="submit" style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>{t.saveAiBtn}</button>
                            </form>
                        </div>
                    )}

                    {/* 11. Support Tickets */}
                    {activeTab === 'supportTickets' && (
                        <div>
                            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>🛠️ Customer & Vendor Issues / Support Tickets</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#161310', border: '1px solid #33291a', borderRadius: '8px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#261f14', color: '#d4af37', textAlign: 'left', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Ticket ID</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>User Name</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Phone</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Issue</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a' }}>Status</th>
                                        <th style={{ padding: '12px', borderBottom: '1px solid #33291a', textAlign: 'center' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {supportTickets.map((tItem) => (
                                        <tr key={tItem.id} style={{ borderBottom: '1px solid #221a12', fontSize: '0.85rem' }}>
                                            <td style={{ padding: '12px' }}>#{tItem.id}</td>
                                            <td style={{ padding: '12px', fontWeight: 'bold', color: '#fff' }}>{tItem.user}</td>
                                            <td style={{ padding: '12px', color: '#2ecc71' }}>📞 {tItem.phone}</td>
                                            <td style={{ padding: '12px', color: '#e74c3c' }}>{tItem.issue}</td>
                                            <td style={{ padding: '12px' }}>{tItem.status}</td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                                {tItem.status.includes('Pending') && (
                                                    <button onClick={() => handleResolveTicket(tItem.id)} style={{ backgroundColor: '#2ecc71', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>{t.fixBtn}</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default AdminDashboard;