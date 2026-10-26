import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// 🌐 Multi-language Dictionary for Vendor Dashboard
const vendorTranslations = {
  English: {
    welcome: 'Welcome',
    liveSocket: 'Live Socket Connected',
    offline: 'Offline',
    saving: 'Saving...',
    lowStockAlert: 'Low Stock Alert: Products are running out of stock!',
    viewInventory: 'View Inventory',
    dashboardOverview: '📊 Dashboard Overview',
    profileInfo: '🛡️ Store Information',
    productsTab: '👕 Products',
    ordersTab: '🛍️ Orders',
    customersTab: '👥 Customers',
    marketingTab: '✨ Featured Categories & Special Offers',
    staffTab: '🧑‍💼 Staff',
    chatTab: '💬 AI Support & Owner Chat',
    settingsTab: '⚙️ Registration & Settings',
    logout: '🚪 LOGOUT',
    storeReports: 'Store Reports',
    downloadExcel: '📥 Download Excel / CSV Report',
    totalEarnings: 'Total Earnings',
    totalOrders: 'Total Orders Sold',
    totalProducts: 'Total Products',
    soldOutItems: 'Sold Out Items',
    uniqueStoreCode: 'Unique Store Code (Store ID Code)',
    uniqueStoreDesc: 'This is your unique 16-digit store code by which customers can recognize you.',
    backToDashboard: '⬅️ Back to Main Dashboard',
    editProduct: '📝 Edit Product',
    inventoryManagement: '👕 Inventory Management (Add / Edit Product)',
    addProdBtn: '+ Add New Product',
    updateProdBtn: 'Update Product',
    searchPlaceholder: '🔍 Search...',
    edit: 'Edit',
    delete: 'Delete',
    customerOrdersTitle: '🛍️ Customer Orders & WebSocket Live Feed',
    searchOrderPlaceholder: '🔍 Search Order/Pincode...',
    noOrders: 'No orders found.',
    whatsappBtn: '💬 WhatsApp',
    itemsList: 'Items List:',
    registeredCustomers: '👥 Registered Customers',
    featuredCatTitle: '✨ FEATURED CATEGORIES CONTROLLER',
    featuredCatDesc: 'From here you can control photos of the 4 main homepage categories:',
    noImage: 'No Image Loaded',
    specialOffersTitle: '🏷️ SPECIAL OFFERS & ADS MANAGER',
    addOfferBtn: '+ Add New Special Offer',
    staffManagement: '🧑‍💼 Staff Management',
    addStaffBtn: 'Add Staff',
    aiSupportOwnerChat: '💬 AI Support & Owner Chat',
    aiSupportBtn: '🤖 AI Support',
    talkToOwnerBtn: '👑 Talk to Owner',
    aiPlaceholder: 'Ask anything to AI support...',
    ownerPlaceholder: 'Send message to application owner...',
    send: 'Send',
    vendorRegistrationTitle: '⚙️ Vendor Registration & Profile Update',
    shopNameLabel: 'Shop Name:',
    ownerNameLabel: 'Owner Name:',
    phoneLabel: 'Mobile / WhatsApp Number:',
    storeIdLabel: 'Unique Store ID (Store ID Digits):',
    upiLabel: 'UPI ID (For Payments):',
    logoLabel: 'Shop Photo / Logo:',
    saveRegisterBtn: '💾 Save / Register Details',
    scanQr: 'Scan QR to Open',
    owner: 'Owner'
  },
  Hindi: {
    welcome: 'स्वागत है',
    liveSocket: 'लाइవ్ सॉकेट कनेक्टेड',
    offline: 'ऑफलाइन',
    saving: 'सेव हो रहा है...',
    lowStockAlert: 'लो स्टॉक अलर्ट: प्रोडक्ट्स का स्टॉक खत्म होने वाला है!',
    viewInventory: 'इन्वेंट्री देखें',
    dashboardOverview: '📊 डैशबोर्ड ओवरव्यू',
    profileInfo: '🛡️ दुकान की जानकारी',
    productsTab: '👕 प्रोडक्ट्स',
    ordersTab: '🛍️ ऑर्डर्स',
    customersTab: '👥 कस्टमर्स',
    marketingTab: '✨ फीचर्ड कैटेगरीज और ऑफर्स',
    staffTab: '🧑‍💼 स्टाफ',
    chatTab: '💬 AI सपोर्ट और ओनर चैट',
    settingsTab: '⚙️ रजिस्ट्रेशन और सेटिंग्स',
    logout: '🚪 लॉगआउट',
    storeReports: 'दुकान की मुख्य रिपोर्ट्स',
    downloadExcel: '📥 डाउनलोड एक्सेल / सीएसवी रिपोर्ट',
    totalEarnings: 'कुल कमाई',
    totalOrders: 'कुल बिके ऑर्डर्स',
    totalProducts: 'कुल प्रोडक्ट्स',
    soldOutItems: 'सोल्ड आउट आइटम्स',
    uniqueStoreCode: 'यूनिक शॉप कोड (स्टोर आईडी कोड)',
    uniqueStoreDesc: 'यह आपकी दुकान का यूनिक 16-अंकों का कोड है जिससे ग्राहक आपको पहचान सकते हैं।',
    backToDashboard: '⬅️ मुख्य डैशबोर्ड पर वापस जाएं',
    editProduct: '📝 एडिट प्रोडक्ट',
    inventoryManagement: '👕 इन्वेंट्री मैनेजमेंट (नया प्रोडक्ट जोड़ें / एडिट करें)',
    addProdBtn: '+ नया प्रोडक्ट जोड़ें',
    updateProdBtn: 'अपडेट प्रोडक्ट',
    searchPlaceholder: '🔍 खोजें...',
    edit: 'एडिट',
    delete: 'डिलीट',
    customerOrdersTitle: '🛍️ कस्टमर ऑर्डर्स और वेबसोकेट लाइव फीड',
    searchOrderPlaceholder: '🔍 आर्डर/पिनकोड खोजें...',
    noOrders: 'कोई आर्डर नहीं मिला।',
    whatsappBtn: '💬 व्हाट्सएप',
    itemsList: 'आइटम लिस्ट:',
    registeredCustomers: '👥 रजिस्टर्ड कस्टमर्स',
    featuredCatTitle: '✨ फीचर्ड कैटेगरीज कंट्रोलर',
    featuredCatDesc: 'यहाँ से आप ऐप के होमपेज की 4 मुख्य Categories के फोटो कंट्रोल कर सकते हैं:',
    noImage: 'कोई इमेज लोड नहीं है',
    specialOffersTitle: '🏷️ स्पेशल ऑफर्स और विज्ञापन मैनेजर',
    addOfferBtn: '+ नया स्पेशल ऑफर जोड़ें',
    staffManagement: '🧑‍💼 स्टाफ मैनेजमेंट',
    addStaffBtn: 'स्टाफ जोड़ें',
    aiSupportOwnerChat: '💬 AI सपोर्ट & एप्लीकेशन ओनर चैट',
    aiSupportBtn: '🤖 AI सपोर्ट',
    talkToOwnerBtn: '👑 ओनर से बात करें',
    aiPlaceholder: 'AI सपोर्ट से कुछ भी पूछें...',
    ownerPlaceholder: 'एप्लीकेशन ओनर को संदेश भेजें...',
    send: 'भेजें',
    vendorRegistrationTitle: '⚙️ वेंडर रजिस्ट्रेशन और प्रोफाइल अपडेट',
    shopNameLabel: 'दुकान का नाम (शॉप नेम):',
    ownerNameLabel: 'ओनर का नाम:',
    phoneLabel: 'मोबाइल / व्हाट्सएप नंबर:',
    storeIdLabel: 'यूनिक शॉप आईडी (स्टोर आईडी):',
    upiLabel: 'UPI ID (पेमेंट्स के लिए):',
    logoLabel: 'दुकान का फोटो / लोगो:',
    saveRegisterBtn: '💾 डिटेल्स सेव / रजिस्टर करें',
    scanQr: 'स्कैन QR टू ओपन',
    owner: 'ओनर'
  },
  Tamil: {
    welcome: 'நல்வரவு',
    liveSocket: 'நேரலை இணைக்கப்பட்டுள்ளது',
    offline: 'ஆஃப்லைன்',
    saving: 'சேமிக்கிறது...',
    lowStockAlert: 'குறைந்த பங்கு எச்சரிக்கை: பொருட்கள் தீர்ந்து வருகின்றன!',
    viewInventory: 'பட்டியலைக் காண்க',
    dashboardOverview: '📊 டாஷ்போர்டு கண்ணோட்டம்',
    profileInfo: '🛡️ கடை தகவல்',
    productsTab: '👕 தயாரிப்புகள்',
    ordersTab: '🛍️ ஆர்டர்கள்',
    customersTab: '👥 வாடிக்கையாளர்கள்',
    marketingTab: '✨ சிறப்பு வகைகள் மற்றும் சலுகைகள்',
    staffTab: '🧑‍💼 பணியாளர்கள்',
    chatTab: '💬 AI ஆதரவு மற்றும் உரிமையாளர் அரட்டை',
    settingsTab: '⚙️ பதிவு மற்றும் அமைப்புகள்',
    logout: '🚪 வெளியேறு',
    storeReports: 'கடை அறிக்கைகள்',
    downloadExcel: '📥 எக்செல் / CSV அறிக்கையைப் பதிவிறக்குக',
    totalEarnings: 'மொத்த வருமானம்',
    totalOrders: 'மொத்த ஆர்டர்கள்',
    totalProducts: 'மொத்த தயாரிப்புகள்',
    soldOutItems: 'விற்று தீர்ந்த பொருட்கள்',
    uniqueStoreCode: 'தனித்துவமான கடை குறியீடு',
    uniqueStoreDesc: 'இது உங்கள் கடைக்கான தனித்துவமான 16 இலக்க குறியீடு.',
    backToDashboard: '⬅️ முகப்பு டாஷ்போர்டுக்குத் திரும்பு',
    editProduct: '📝 தயாரிப்பைத் திருத்து',
    inventoryManagement: '👕 சரக்கு மேலாண்மை',
    addProdBtn: '+ புதிய தயாரிப்பைச் சேர்',
    updateProdBtn: 'புதுப்பிக்கவும்',
    searchPlaceholder: '🔍 தேடுக...',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    customerOrdersTitle: '🛍️ வாடிக்கையாளர் ஆர்டர்கள்',
    searchOrderPlaceholder: '🔍 ஆர்டர் தேடுக...',
    noOrders: 'ஆர்டர்கள் இல்லை.',
    whatsappBtn: '💬 WhatsApp',
    itemsList: 'பொருட்கள் பட்டியல்:',
    registeredCustomers: '👥 பதிவு செய்யப்பட்ட வாடிக்கையாளர்கள்',
    featuredCatTitle: '✨ சிறப்பு வகைகள் கட்டுப்படுத்தி',
    featuredCatDesc: 'இங்கு முகப்பு பக்க வகைகளைக் கட்டுப்படுத்தலாம்:',
    noImage: 'படம் இல்லை',
    specialOffersTitle: '🏷️ சிறப்பு சலுகைகள் மேலாளர்',
    addOfferBtn: '+ புதிய சலுகையைச் சேர்',
    staffManagement: '🧑‍💼 பணியாளர் மேலாண்மை',
    addStaffBtn: 'பணியாளரைச் சேர்',
    aiSupportOwnerChat: '💬 AI ஆதரவு & உரிமையாளர் அரட்டை',
    aiSupportBtn: '🤖 AI ஆதரவு',
    talkToOwnerBtn: '👑 உரிமையாளரிடம் பேசுங்கள்',
    aiPlaceholder: 'AI ஆதரவிடம் கேளுங்கள்...',
    ownerPlaceholder: 'உரிமையாளருக்கு செய்தி அனுப்புங்கள்...',
    send: 'அனுப்பு',
    vendorRegistrationTitle: '⚙️ விற்பனையாளர் பதிவு மற்றும் சுயவிவரம்',
    shopNameLabel: 'கடை பெயர்:',
    ownerNameLabel: 'உரிமையாளர் பெயர்:',
    phoneLabel: 'மொபைல் எண்:',
    storeIdLabel: 'கடை ஐடி:',
    upiLabel: 'UPI ID:',
    logoLabel: 'கடை லோகோ:',
    saveRegisterBtn: '💾 சேமி / பதிவு செய்',
    scanQr: 'திறக்க QR ஐ ஸ்கேன் செய்யவும்',
    owner: 'உரிமையாளர்'
  },
  Marathi: {
    welcome: 'स्वागत आहे',
    liveSocket: 'लाइव्ह कनेक्टेड',
    offline: 'ऑफलाइन',
    saving: 'सेव्ह होत आहे...',
    lowStockAlert: 'कमी स्टॉक अलर्ट: उत्पादने संपत आली आहेत!',
    viewInventory: 'इन्व्हेंटरी पहा',
    dashboardOverview: '📊 डॅशबोर्ड विहंगावलोकन',
    profileInfo: '🛡️ दुकानाची माहिती',
    productsTab: '👕 उत्पादने',
    ordersTab: '🛍️ ऑर्डर्स',
    customersTab: '👥 ग्राहक',
    marketingTab: '✨ वैशिष्ट्यीकृत श्रेण्या आणि ऑफर्स',
    staffTab: '🧑‍💼 कर्मचारी',
    chatTab: '💬 AI सपोर्ट आणि मालक चॅट',
    settingsTab: '⚙️ नोंदणी आणि सेटिंग्ज',
    logout: '🚪 बाहेर पडा',
    storeReports: 'दुकान अहवाल',
    downloadExcel: '📥 एक्सेल / सीएसव्ही अहवाल डाउनलोड करा',
    totalEarnings: 'एकूण कमाई',
    totalOrders: 'एकूण ऑर्डर्स',
    totalProducts: 'एकूण उत्पादने',
    soldOutItems: 'विक्री झालेली उत्पादने',
    uniqueStoreCode: 'युनिक दुकान कोड',
    uniqueStoreDesc: 'हा तुमचा युनिक १६-अंकी दुकान कोड आहे.',
    backToDashboard: '⬅️ मुख्य डॅशबोर्डवर परत जा',
    editProduct: '📝 उत्पादन संपादित करा',
    inventoryManagement: '👕 इन्व्हेंटरी व्यवस्थापन',
    addProdBtn: '+ नवीन उत्पादन जोडा',
    updateProdBtn: 'अपडेट करा',
    searchPlaceholder: '🔍 शोधा...',
    edit: 'संपादित करा',
    delete: 'काढून टाका',
    customerOrdersTitle: '🛍️ ग्राहक ऑर्डर्स',
    searchOrderPlaceholder: '🔍 ऑर्डर शोधा...',
    noOrders: 'कोणतीही ऑर्डर नाही.',
    whatsappBtn: '💬 WhatsApp',
    itemsList: 'आयटम सूची:',
    registeredCustomers: '👥 नोंदणीकृत ग्राहक',
    featuredCatTitle: '✨ वैशिष्ट्यीकृत श्रेण्या नियंत्रक',
    featuredCatDesc: 'येथून तुम्ही मुख्य श्रेण्यांचे फोटो नियंत्रित करू शकता:',
    noImage: 'कोणतीही प्रतिमा नाही',
    specialOffersTitle: '🏷️ विशेष ऑफर्स व्यवस्थापक',
    addOfferBtn: '+ नवीन ऑफर जोडा',
    staffManagement: '🧑‍💼 कर्मचारी व्यवस्थापन',
    addStaffBtn: 'कर्मचारी जोडा',
    aiSupportOwnerChat: '💬 AI सपोर्ट & मालक चॅट',
    aiSupportBtn: '🤖 AI सपोर्ट',
    talkToOwnerBtn: '👑 मालकांशी बोला',
    aiPlaceholder: 'AI सपोर्टला काहीही विचारಾ...',
    ownerPlaceholder: 'मालकाला संदेश पाठवा...',
    send: 'पाठवा',
    vendorRegistrationTitle: '⚙️ वेंडर नोंदणी आणि प्रोफाइल अपडेट',
    shopNameLabel: 'दुकानाचे नाव:',
    ownerNameLabel: 'मालकाचे नाव:',
    phoneLabel: 'मोबाईल नंबर:',
    storeIdLabel: 'स्टोर आयडी:',
    upiLabel: 'UPI ID:',
    logoLabel: 'दुकानाचा लोगो:',
    saveRegisterBtn: '💾 सेव्ह / नोंदणी करा',
    scanQr: 'स्कॅन QR',
    owner: 'मालक'
  },
  Bengali: {
    welcome: 'স্বাগতম',
    liveSocket: 'লাইভ কানেক্টেড',
    offline: 'অফলাইন',
    saving: 'সংরক্ষণ করা হচ্ছে...',
    lowStockAlert: 'কম স্টক সতর্কতা: পণ্য শেষ হয়ে আসছে!',
    viewInventory: 'ইনভেন্টরি দেখুন',
    dashboardOverview: '📊 ড্যাশবোর্ড ওভারভিউ',
    profileInfo: '🛡️ দোকানের তথ্য',
    productsTab: '👕 পণ্য',
    ordersTab: '🛍️ অর্ডার',
    customersTab: '👥 গ্রাহক',
    marketingTab: '✨ বৈশিষ্ট্যযুক্ত বিভাগ এবং অফার',
    staffTab: '🧑‍💼 কর্মী',
    chatTab: '💬 AI সাপোর্ট এবং ওনার চ্যাট',
    settingsTab: '⚙️ রেজিস্ট্রেশন এবং সেটিংস',
    logout: '🚪 লগআউট',
    storeReports: 'দোকানের রিপোর্ট',
    downloadExcel: '📥 এক্সেল / সিএসভি রিপোর্ট ডাউনলোড করুন',
    totalEarnings: 'মোট আয়',
    totalOrders: 'মোট অর্ডার',
    totalProducts: 'মোট পণ্য',
    soldOutItems: 'বিক্রি হয়ে যাওয়া আইটেম',
    uniqueStoreCode: 'ইউনিক স্টোর কোড',
    uniqueStoreDesc: 'এটি আপনার দোকানের অনন্য ১৬-সংখ্যার কোড।',
    backToDashboard: '⬅️ মূল ড্যাশবোর্ডে ফিরে যান',
    editProduct: '📝 পণ্য সম্পাদনা করুন',
    inventoryManagement: '👕 ইনভেন্টরি ম্যানেজমেন্ট',
    addProdBtn: '+ নতুন পণ্য যোগ করুন',
    updateProdBtn: 'আপডেট করুন',
    searchPlaceholder: '🔍 অনুসন্ধান করুন...',
    edit: 'সম্পাদনা',
    delete: 'মুছে ফেলুন',
    customerOrdersTitle: '🛍️ গ্রাহক অর্ডার',
    searchOrderPlaceholder: '🔍 অর্ডার খুঁজুন...',
    noOrders: 'কোনো অর্ডার পাওয়া যায়নি।',
    whatsappBtn: '💬 WhatsApp',
    itemsList: 'আইটেম তালিকা:',
    registeredCustomers: '👥 নিবন্ধিত গ্রাহক',
    featuredCatTitle: '✨ বৈশিষ্ট্যযুক্ত বিভাগ নিয়ন্ত্রক',
    featuredCatDesc: 'এখান থেকে আপনি প্রধান বিভাগগুলির ছবি নিয়ন্ত্রণ করতে পারেন:',
    noImage: 'কোনো ছবি নেই',
    specialOffersTitle: '🏷️ বিশেষ অফার ম্যানেজার',
    addOfferBtn: '+ নতুন অফার যোগ করুন',
    staffManagement: '🧑‍💼 স্টাফ ম্যানেজমেন্ট',
    addStaffBtn: 'স্টাফ যোগ করুন',
    aiSupportOwnerChat: '💬 AI সাপোর্ট & ওনার চ্যাট',
    aiSupportBtn: '🤖 AI সাপোর্ট',
    talkToOwnerBtn: '👑 ওনারের সাথে কথা বলুন',
    aiPlaceholder: 'AI সাপোর্টকে যেকোনো কিছু জিজ্ঞাসা করুন...',
    ownerPlaceholder: 'অ্যাপ্লিকেশন ওনারকে বার্তা পাঠান...',
    send: 'পাঠান',
    vendorRegistrationTitle: '⚙️ ভেন্ডর রেজিস্ট্রেশন এবং প্রোফাইল আপডেট',
    shopNameLabel: 'দোকানের নাম:',
    ownerNameLabel: 'মালিকের নাম:',
    phoneLabel: 'মোবাইল নম্বর:',
    storeIdLabel: 'স্টোর আইডি:',
    upiLabel: 'UPI ID:',
    logoLabel: 'দোকানের লোগো:',
    saveRegisterBtn: '💾 সংরক্ষণ / রেজিস্টার করুন',
    scanQr: 'স্ক্যান QR',
    owner: 'মালিক'
  },
  Telugu: {
    welcome: 'స్వాగతం',
    liveSocket: 'లైవ్ కనెక్ట్ చేయబడింది',
    offline: 'ఆఫ్‌లైన్',
    saving: 'సేవ్ అవుతోంది...',
    lowStockAlert: 'తక్కువ స్టాక్ హెచ్చరిక: ఉత్పత్తులు అయిపోతున్నాయి!',
    viewInventory: 'ఇన్వెంటరీని వీక్షించండి',
    dashboardOverview: '📊 డాష్‌బోర్డ్ అవలోకనం',
    profileInfo: '🛡️ స్టోర్ సమాచారం',
    productsTab: '👕 ఉత్పత్తులు',
    ordersTab: '🛍️ ఆర్డర్లు',
    customersTab: '👥 కస్టమర్లు',
    marketingTab: '✨ ఫీచర్ చేసిన వర్గాలు & ప్రత్యేక ఆఫర్లు',
    staffTab: '🧑‍💼 సిబ్బంది',
    chatTab: '💬 AI మద్దతు & యజమాని చాట్',
    settingsTab: '⚙️ నమోదు & సెట్టింగ్‌లు',
    logout: '🚪 లాగౌట్',
    storeReports: 'స్టోర్ నివేదికలు',
    downloadExcel: '📥 ఎక్సెల్ / CSV నివేదికను డౌన్‌లోడ్ చేయండి',
    totalEarnings: 'మొత్తం సంపాదన',
    totalOrders: 'మొత్తం ఆర్డర్లు',
    totalProducts: 'మొత్తం ఉత్పత్తులు',
    soldOutItems: 'అమ్మిన వస్తువులు',
    uniqueStoreCode: 'ప్రత్యేక స్టోర్ కోడ్',
    uniqueStoreDesc: 'ఇది మీ ప్రత్యేక 16-అంకెల స్టోర్ కోడ్.',
    backToDashboard: '⬅️ ప్రధాన డాష్‌బోర్డ్‌కి తిరిగి వెళ్లు',
    editProduct: '📝 ఉత్పత్తిని సవరించు',
    inventoryManagement: '👕 ఇన్వెంటరీ నిర్వహణ',
    addProdBtn: '+ కొత్త ఉత్పత్తిని జోడించు',
    updateProdBtn: 'నవీకరించు',
    searchPlaceholder: '🔍 వెతకండి...',
    edit: 'సవరించు',
    delete: 'తొలగించు',
    customerOrdersTitle: '🛍️ కస్టమర్ ఆర్డర్లు',
    searchOrderPlaceholder: '🔍 ఆర్డర్ వెతకండి...',
    noOrders: 'ఆర్డర్లు కనుగొనబడలేదు.',
    whatsappBtn: '💬 WhatsApp',
    itemsList: 'వస్తువుల జాబితా:',
    registeredCustomers: '👥 నమోదు చేసుకున్న కస్టమర్లు',
    featuredCatTitle: '✨ ఫీచర్ చేసిన వర్గాల కంట్రోలర్',
    featuredCatDesc: 'ఇక్కడ నుండి మీరు ప్రధాన వర్గాల ఫోటోలను నియంత్రించవచ్చు:',
    noImage: 'చిత్రం లేదు',
    specialOffersTitle: '🏷️ ప్రత్యేక ఆఫర్ల మేనేజర్',
    addOfferBtn: '+ కొత్త ఆఫర్‌ను జోడించు',
    staffManagement: '🧑‍💼 సిబ్బంది నిర్వహణ',
    addStaffBtn: 'సిబ్బందిని జోడించు',
    aiSupportOwnerChat: '💬 AI మద్దతు & యజమాని చాట్',
    aiSupportBtn: '🤖 AI మద్దతు',
    talkToOwnerBtn: '👑 యజమానితో మాట్లాడండి',
    aiPlaceholder: 'AI మద్దతును ఏదైనా అడగండి...',
    ownerPlaceholder: 'అప్లికేషన్ యజమానికి సందేశం పంపండి...',
    send: 'పంపు',
    vendorRegistrationTitle: '⚙️ వెండర్ నమోదు & ప్రొఫైల్ నవీకరణ',
    shopNameLabel: 'దుకాణం పేరు:',
    ownerNameLabel: 'యజమాని పేరు:',
    phoneLabel: 'మొబైల్ నంబర్:',
    storeIdLabel: 'స్టోర్ ఐడి:',
    upiLabel: 'UPI ID:',
    logoLabel: 'స్టోర్ లోగో:',
    saveRegisterBtn: '💾 సేవ్ / నమోదు చేయి',
    scanQr: 'స్కాన్ QR',
    owner: 'యజమాని'
  },
  Kannada: {
    welcome: 'ಸ್ವಾಗತ',
    liveSocket: 'ಲೈವ್ ಸಂಪರ್ಕಗೊಂಡಿದೆ',
    offline: 'ಆಫ್‌ಲೈನ್',
    saving: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
    lowStockAlert: 'ಕಡಿಮೆ ಸ್ಟಾಕ್ ಎಚ್ಚರಿಕೆ: ಉತ್ಪನ್ನಗಳು ಖಾಲಿಯಾಗುತ್ತಿವೆ!',
    viewInventory: 'ಇನ್ವೆಂಟರಿ ವೀಕ್ಷಿಸಿ',
    dashboardOverview: '📊 ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅವಲೋಕನ',
    profileInfo: '🛡️ ಅಂಗಡಿ ಮಾಹಿತಿ',
    productsTab: '👕 ಉತ್ಪನ್ನಗಳು',
    ordersTab: '🛍️ ಆರ್ಡರ್‌ಗಳು',
    customersTab: '👥 ಗ್ರಾಹಕರು',
    marketingTab: '✨ ವಿಶೇಷ ವಿಭಾಗಗಳು ಮತ್ತು ಕೊಡುಗೆಗಳು',
    staffTab: '🧑‍💼 ಸಿಬ್ಬಂದಿ',
    chatTab: '💬 AI ಬೆಂಬಲ ಮತ್ತು ಮಾಲೀಕರ ಚಾಟ್',
    settingsTab: '⚙️ ನೋಂದಣಿ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    logout: '🚪 ಹೊರನಡಿ',
    storeReports: 'ಅಂಗಡಿ ವರದಿಗಳು',
    downloadExcel: '📥 ಎಕ್ಸೆಲ್ / CSV ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    totalEarnings: 'ಒಟ್ಟು ಗಳಿಕೆ',
    totalOrders: 'ಒಟ್ಟು ಆರ್ಡರ್‌ಗಳು',
    totalProducts: 'ಒಟ್ಟು ಉತ್ಪನ್ನಗಳು',
    soldOutItems: 'ಖಾಲಿಯಾದ ವಸ್ತುಗಳು',
    uniqueStoreCode: 'ವಿಶಿಷ್ಟ ಅಂಗಡಿ ಕೋಡ್',
    uniqueStoreDesc: 'ಇದು ನಿಮ್ಮ ಅಂಗಡಿಯ ವಿಶಿಷ್ಟ 16-ಅಂಕಿಯ ಕೋಡ್ ಆಗಿದೆ.',
    backToDashboard: '⬅️ ಮುಖ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    editProduct: '📝 ಉತ್ಪನ್ನ ಸಂಪಾದಿಸಿ',
    inventoryManagement: '👕 ಇನ್ವೆಂಟರಿ ನಿರ್ವಹಣೆ',
    addProdBtn: '+ ಹೊಸ ಉತ್ಪನ್ನ ಸೇರಿಸಿ',
    updateProdBtn: 'ಅಪ್‌ಡೇಟ್ ಮಾಡಿ',
    searchPlaceholder: '🔍 ಹುಡುಕಿ...',
    edit: 'ಸಂಪಾದಿಸಿ',
    delete: 'ಅಳಿಸಿ',
    customerOrdersTitle: '🛍️ ಗ್ರಾಹಕರ ಆರ್ಡರ್‌ಗಳು',
    searchOrderPlaceholder: '🔍 ಆರ್ಡರ್ ಹುಡುಕಿ...',
    noOrders: 'ಯಾವ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ.',
    whatsappBtn: '💬 WhatsApp',
    itemsList: 'ವಸ್ತುಗಳ ಪಟ್ಟಿ:',
    registeredCustomers: '👥 ನೋಂದಾಯಿತ ಗ್ರಾಹಕರು',
    featuredCatTitle: '✨ ವಿಶೇಷ ವರ್ಗಗಳ ನಿಯಂತ್ರಕ',
    featuredCatDesc: 'ಇಲ್ಲಿಂದ ನೀವು ಮುಖ್ಯ ವರ್ಗಗಳ ಫೋಟೋಗಳನ್ನು ನಿಯಂತ್ರಿಸಬಹುದು:',
    noImage: 'ಯಾವ ಚಿತ್ರವಿಲ್ಲ',
    specialOffersTitle: '🏷️ ವಿಶೇಷ ಕೊಡುಗೆಗಳ ವ್ಯವಸ್ಥಾಪಕ',
    addOfferBtn: '+ ಹೊಸ ಕೊಡುಗೆ ಸೇರಿಸಿ',
    staffManagement: '🧑‍💼 ಸಿಬ್ಬಂದಿ ನಿರ್ವಹಣೆ',
    addStaffBtn: 'ಸಿಬ್ಬಂದಿ ಸೇರಿಸಿ',
    aiSupportOwnerChat: '💬 AI ಬೆಂಬಲ ಮತ್ತು ಮಾಲೀಕರ ಚಾಟ್',
    aiSupportBtn: '🤖 AI ಬೆಂಬಲ',
    talkToOwnerBtn: '👑 ಮಾಲೀಕರೊಂದಿಗೆ ಮಾತನಾಡಿ',
    aiPlaceholder: 'AI ಬೆಂಬಲವನ್ನು ಏನು ಬೇಕಾದರೂ ಕೇಳಿ...',
    ownerPlaceholder: 'ಅಪ್ಲಿಕೇಶನ್ ಮಾಲೀಕರಿಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ...',
    send: 'ಕಳುಹಿಸಿ',
    vendorRegistrationTitle: '⚙️ ವೆಂಡರ್ ನೋಂದಣಿ ಮತ್ತು ಪ್ರೊಫೈಲ್ ಅಪ್‌ಡೇಟ್',
    shopNameLabel: 'ಅಂಗಡಿ ಹೆಸರು:',
    ownerNameLabel: 'ಮಾಲೀಕರ ಹೆಸರು:',
    phoneLabel: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ:',
    storeIdLabel: 'ಸ್ಟೋರ್ ಐಡಿ:',
    upiLabel: 'UPI ID:',
    logoLabel: 'ಅಂಗಡಿ ಲೋಗೋ:',
    saveRegisterBtn: '💾 ಉಳಿಸಿ / ನೋಂದಾಯಿಸಿ',
    scanQr: 'ಸ್ಕಾನ್ QR',
    owner: 'ಮಾಲೀಕ'
  },
  Malayalam: {
    welcome: 'സ്വാഗതം',
    liveSocket: 'ലൈവ് കണക്റ്റുചെയ്‌തു',
    offline: 'ഓഫ്‌ലൈൻ',
    saving: 'സേവ് ചെയ്യുന്നു...',
    lowStockAlert: 'കുറഞ്ഞ സ്റ്റോക്ക് മുന്നറിയിപ്പ്: ഉൽപ്പന്നങ്ങൾ തീരുന്നു!',
    viewInventory: 'ഇൻവെന്ററി കാണുക',
    dashboardOverview: '📊 ഡാഷ്‌ബോർഡ് അവലോകനം',
    profileInfo: '🛡️ സ്റ്റോർ വിവരങ്ങൾ',
    productsTab: '👕 ഉൽപ്പന്നങ്ങൾ',
    ordersTab: '🛍️ ഓർഡറുകൾ',
    customersTab: '👥 ഉപഭോക്താക്കൾ',
    marketingTab: '✨ പ്രത്യേക വിഭാഗങ്ങളും ഓഫറുകളും',
    staffTab: '🧑‍💼 ജീവനക്കാർ',
    chatTab: '💬 AI പിന്തുണയും ഉടമ ചാറ്റും',
    settingsTab: '⚙️ രജിസ്ട്രേഷനും ക്രമീകരണങ്ങളും',
    logout: '🚪 പുറത്തുകടക്കുക',
    storeReports: 'സ്റ്റോർ റിപ്പോർട്ടുകൾ',
    downloadExcel: '📥 എക്സൽ / CSV റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',
    totalEarnings: 'ആകെ വരുമാനം',
    totalOrders: 'ആകെ ഓർഡറുകൾ',
    totalProducts: 'ആകെ ഉൽപ്പന്നങ്ങൾ',
    soldOutItems: 'വിൽപന കഴിഞ്ഞവ',
    uniqueStoreCode: 'യൂണീക്ക് സ്റ്റോർ കോഡ്',
    uniqueStoreDesc: 'ഇത് നിങ്ങളുടെ കടയുടെ പ്രത്യേക 16 അക്ക കോഡ് ആണ്.',
    backToDashboard: '⬅️ പ്രധാന ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക',
    editProduct: '📝 ഉൽപ്പന്നം എഡിറ്റ് ചെയ്യുക',
    inventoryManagement: '👕 ഇൻവെന്ററി മാനേജ്മെന്റ്',
    addProdBtn: '+ പുതിയ ഉൽപ്പന്നം ചേർക്കുക',
    updateProdBtn: 'അപ്ഡേറ്റ് ചെയ്യുക',
    searchPlaceholder: '🔍 തിരയുക...',
    edit: 'എഡിറ്റ്',
    delete: 'നീക്കം ചെയ്യുക',
    customerOrdersTitle: '🛍️ ഉപഭോക്തൃ ഓർഡറുകൾ',
    searchOrderPlaceholder: '🔍 ഓർഡർ തിരയുക...',
    noOrders: 'ഓർഡറുകൾ ലഭ്യമല്ല.',
    whatsappBtn: '💬 WhatsApp',
    itemsList: 'ഐറ്റം ലിസ്റ്റ്:',
    registeredCustomers: '👥 രജിസ്റ്റർ ചെയ്ത ഉപഭോക്താക്കൾ',
    featuredCatTitle: '✨ പ്രത്യേക വിഭാഗങ്ങളുടെ കൺട്രോളർ',
    featuredCatDesc: 'ഇവിടെ നിങ്ങൾക്ക് പ്രധാന വിഭാഗങ്ങളുടെ ഫോട്ടോകൾ നിയന്ത്രിക്കാം:',
    noImage: 'ചിത്രമില്ല',
    specialOffersTitle: '🏷️ പ്രത്യേക ഓഫറുകൾ മാനേജർ',
    addOfferBtn: '+ പുതിയ ഓഫർ ചേർക്കുക',
    staffManagement: '🧑‍💼 സ്റ്റാഫ് മാനേജ്മെന്റ്',
    addStaffBtn: 'സ്റ്റാഫിനെ ചേർക്കുക',
    aiSupportOwnerChat: '💬 AI പിന്തുണ & ഉടമ ചാറ്റ്',
    aiSupportBtn: '🤖 AI പിന്തുണ',
    talkToOwnerBtn: '👑 ഉടമയോട് സംസാരിക്കുക',
    aiPlaceholder: 'AI പിന്തുണയോട് എന്തും ചോദിക്കുക...',
    ownerPlaceholder: 'അപ്ലിക്കേഷൻ ഉടമയ്ക്ക് സന്ദേശം അയക്കുക...',
    send: 'അയക്കുക',
    vendorRegistrationTitle: '⚙️ വെണ്ടർ രജിസ്ട്രേഷനും പ്രൊഫൈൽ അപ്ഡേറ്റും',
    shopNameLabel: 'കടയുടെ പേര്:',
    ownerNameLabel: 'ഉടമയുടെ പേര്:',
    phoneLabel: 'മൊബൈൽ നമ്പർ:',
    storeIdLabel: 'സ്റ്റോർ ഐഡി:',
    upiLabel: 'UPI ID:',
    logoLabel: 'കടയുടെ ലോഗോ:',
    saveRegisterBtn: '💾 സേവ് / രജിസ്റ്റർ ചെയ്യുക',
    scanQr: 'സ്കാൻ QR',
    owner: 'ഉടമ'
  }
};

const API_BASE_URL = 'http://localhost:5001';

const navStyle = (isActive) => ({
  padding: '11px 14px',
  borderRadius: '6px',
  background: isActive ? '#3d264d' : 'transparent',
  color: isActive ? '#dfb15b' : '#fff',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.85rem',
  border: isActive ? '1px solid #dfb15b' : '1px solid transparent',
  transition: '0.2s ease'
});

const inputStyle = {
  padding: '10px 12px',
  backgroundColor: '#1c1324',
  border: '1px solid #3d264d',
  borderRadius: '6px',
  color: '#fff',
  outline: 'none',
  fontSize: '0.85rem',
  width: '100%',
  boxSizing: 'border-box',
  marginTop: '4px'
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#dfb15b',
  color: '#0f0c14',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  cursor: 'pointer',
  marginTop: '8px'
};

// 16-Digit Auto Generator Helper
const generate16DigitShopId = () => {
  let result = '';
  const digits = '0123456789';
  for (let i = 0; i < 16; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return result;
};

export default function VendorDashboard({ setActiveTab }) {
  // 🌐 भाषा सिंक स्टेट
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'English';
  });
  const t = vendorTranslations[currentLang] || vendorTranslations.English;

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

  const vendorToken = localStorage.getItem('vendorToken');

  // 1. Mobile Screen Awareness State
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Active Section Persistence
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('vendorActiveSection') || 'dashboard';
  });

  const changeSection = (section) => {
    setActiveSection(section);
    localStorage.setItem('vendorActiveSection', section);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // Chat States & AI Support Mode Added Safely
  const [chatMessages, setChatMessages] = useState([
    { sender: "AI Assistant", message: "नमस्ते हुकुम! मैं आपका AI सपोर्ट असिस्टेंट हूँ। दुकान या आर्डर से संबंधित कोई भी सहायता चाहिए तो बताएं।", time: "Just now" }
  ]);
  const [replyMsg, setReplyMsg] = useState('');
  const [chatMode, setChatMode] = useState('ai'); // 'ai' or 'owner'

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const triggerNotification = (title, body) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body, icon: "/favicon.ico" });
    }
  };

  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '', bio: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState('');

  // Featured Categories & Special Offers
  const [featuredCategories, setFeaturedCategories] = useState([
    { id: 1, title: "MEN'S SHIRTS", image: '' },
    { id: 2, title: "MEN'S WATCHES", image: '' },
    { id: 3, title: "MEN'S SUNGLASSES", image: '' },
    { id: 4, title: "LUXURY SHOES", image: '' }
  ]);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({ title: '', discount: '', image: '' });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('vendorProfile');
    let initialShopId = localStorage.getItem('shopId');
    if (!initialShopId) {
      initialShopId = generate16DigitShopId();
      localStorage.setItem('shopId', initialShopId);
    }
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          shopId: parsed.shopId || initialShopId
        };
      } catch (e) { }
    }
    return {
      shopName: '',
      ownerName: '',
      phone: '',
      email: '',
      address: 'Jodhpur',
      city: '',
      state: '',
      pin: '',
      upiId: '',
      paymentMethod: 'UPI & Cash on Delivery',
      shopId: initialShopId,
      profilePhoto: ''
    };
  });

  // Dynamic ShopId variable
  const shopId = profile?.shopId || localStorage.getItem('shopId') || "";

  const normalizeProducts = (productList) => {
    if (!Array.isArray(productList)) return [];
    return productList.map(p => ({
      ...p,
      id: p.id || p._id
    }));
  };

  const normalizeOrders = (orderList) => {
    if (!Array.isArray(orderList)) return [];
    return orderList.map(o => {
      let parsedItems = o.items;
      if (typeof parsedItems === 'string') {
        try { parsedItems = JSON.parse(parsedItems); } catch (e) { parsedItems = []; }
      }
      
      // Pincode extraction fix across all possible database fields
      const rawPin = o.pincode || o.pin || o.pincode_code || o.zip || o.zipcode || o.shipping_address?.pincode || o.customerInfo?.pincode || o.address_pincode || '';

      return {
        ...o,
        rawId: o._id || o.id || o.orderId || o.order_id,
        id: o.orderId || o.id || o._id || o.order_id,
        customer: typeof o.customer === 'object' ? (o.customer?.name || o.customer?.customer) : (o.customer || o.customerInfo?.name || 'Valued Customer'),
        phone: o.phone || o.customerInfo?.phone || o.customer?.phone || 'N/A',
        address: o.shipping_address || o.address || o.shippingAddress || o.customerInfo?.address || 'N/A',
        pincode: rawPin,
        amount: o.total_amount || o.totalAmount || o.amount || 0,
        items: Array.isArray(parsedItems) ? parsedItems : (parsedItems ? [parsedItems] : []),
        created_at: o.created_at || o.orderDate || new Date().toISOString()
      };
    });
  };

  const fetchOrdersFromDatabase = (sId = shopId) => {
    if (!sId) return;
    fetch(`${API_BASE_URL}/api/vendor/orders?shop_id=${sId}&shopId=${sId}`, {
      headers: {
        'Authorization': `Bearer ${vendorToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) setIsOnline(true);
        return res.json();
      })
      .then(data => {
        const rawOrders = Array.isArray(data) ? data : (data?.orders || data?.data || []);
        setOrders(normalizeOrders(rawOrders));
      })
      .catch(() => {
        setIsOnline(false);
      });
  };

  const fetchProductsFromDatabase = async (sId = shopId) => {
    if (!sId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendor/products?shop_id=${sId}`, {
        headers: {
          'Authorization': `Bearer ${vendorToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        const rawProducts = Array.isArray(data) ? data : (data?.products || data?.data || []);
        setProducts(normalizeProducts(rawProducts));
        setIsOnline(true);
      }
    } catch (error) {
      setIsOnline(false);
    }
  };

  const fetchStaffFromDatabase = async (sId = shopId) => {
    if (!sId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendor/staff?shop_id=${sId}`, {
        headers: {
          'Authorization': `Bearer ${vendorToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data.staff)) {
        setStaffList(data.staff);
      }
    } catch (e) { }
  };

  useEffect(() => {
    if (shopId) {
      fetchProductsFromDatabase(shopId);
      fetchOrdersFromDatabase(shopId);
      fetchStaffFromDatabase(shopId);
    }
  }, [shopId]);

  useEffect(() => {
    let isMounted = true;
    if (!vendorToken) return;

    fetch(`${API_BASE_URL}/api/vendor/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vendorToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        setIsOnline(true);
        return res.json();
      })
      .then(data => {
        if (isMounted && data) {
          const vData = data.vendor || data.profile || data.user || data;

          setProfile(prevProfile => {
            const fetchedShopId = vData.shopId || vData.shop_id || prevProfile.shopId || shopId;
            const updated = {
              ...prevProfile,
              shopName: vData.establishmentName || vData.shopName || vData.shop_name || vData.name || prevProfile.shopName || "",
              ownerName: vData.occupierName || vData.employerName || vData.ownerName || vData.owner_name || prevProfile.ownerName || "",
              phone: vData.phone || vData.mobile || vData.phoneNumber || vData.whatsapp || prevProfile.phone || "",
              email: vData.email || prevProfile.email || "",
              category: vData.natureOfBusiness || vData.establishmentCategory || vData.category || prevProfile.category || "",
              address: vData.address || prevProfile.address || "",
              city: vData.city || prevProfile.city || "",
              state: vData.state || prevProfile.state || "",
              pin: vData.pin || vData.pincode || prevProfile.pin || "",
              upiId: vData.upiId || vData.upi_id || prevProfile.upiId || "",
              paymentMethod: vData.paymentMethod || vData.payment_method || prevProfile.paymentMethod || "UPI & Cash on Delivery",
              shopId: fetchedShopId || prevProfile.shopId || "",
              profilePhoto: vData.profilePhoto || vData.profile_photo || vData.photo || vData.shopPhoto || prevProfile.profilePhoto || ""
            };
            localStorage.setItem('vendorProfile', JSON.stringify(updated));
            if (fetchedShopId) localStorage.setItem('shopId', fetchedShopId);
            return updated;
          });
        }
      })
      .catch(() => {
        if (isMounted) setIsOnline(false);
      });

    return () => { isMounted = false; };
  }, [vendorToken]);

  // Live Socket Syncing Logic
  useEffect(() => {
    if (!shopId || !vendorToken) return;

    fetchOrdersFromDatabase(shopId);

    const socket = io(API_BASE_URL, {
      auth: { token: vendorToken },
      query: { shopId: shopId, shop_id: shopId },
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      socket.emit('joinShopRoom', { shopId: shopId, shop_id: shopId });
      socket.emit('join', { shopId: shopId, shop_id: shopId });
      socket.emit('joinRoom', `shop_${shopId}`);
      socket.emit('joinRoom', shopId);
      setIsOnline(true);
    });

    socket.on('newOrder', (newOrder) => {
      const orderShopId = newOrder?.shop_id || newOrder?.shopId;

      if (!orderShopId || String(orderShopId).trim() === String(shopId).trim() || orderShopId === 'General') {
        const rawPin = newOrder.pincode || newOrder.pin || newOrder.pincode_code || newOrder.zip || newOrder.zipcode || '';
        const formattedOrder = {
          ...newOrder,
          rawId: newOrder._id || newOrder.id || newOrder.orderId || newOrder.order_id,
          id: newOrder.orderId || newOrder.id || newOrder._id || newOrder.order_id || ('ORD-' + Date.now()),
          shop_id: shopId,
          customer: typeof newOrder.customer === 'object' 
            ? (newOrder.customer?.name || newOrder.customer?.customer) 
            : (newOrder.customer || newOrder.customerInfo?.name || 'Valued Customer'),
          phone: newOrder.phone || newOrder.customerInfo?.phone || newOrder.customer?.phone || 'N/A',
          address: newOrder.shipping_address || newOrder.address || newOrder.shippingAddress || newOrder.customerInfo?.address || 'N/A',
          pincode: rawPin,
          amount: newOrder.total_amount || newOrder.totalAmount || newOrder.amount || 0,
          created_at: newOrder.created_at || newOrder.orderDate || new Date().toISOString(),
          items: typeof newOrder.item === 'string' ? [{ name: newOrder.item, qty: 1 }] : (newOrder.items || [])
        };

        setOrders(prev => [formattedOrder, ...prev.filter(o => String(o.id) !== String(formattedOrder.id))]);
        
        if (typeof triggerNotification === 'function') {
          triggerNotification("🛍️ नया आर्डर मिला है!", `Total: ₹${formattedOrder.amount}`);
        }
      }
    });

    socket.on('connect_error', () => setIsOnline(false));
    socket.on('disconnect', () => setIsOnline(false));

    return () => {
      socket.removeAllListeners();
      if (socket.connected) {
        socket.disconnect();
      }
    };

  }, [shopId, vendorToken]);

  const totalSalesRevenue = orders.reduce((acc, order) => {
    const cleanAmount = parseFloat(String(order.amount || 0).replace(/[^0-9.]/g, '')) || 0;
    return acc + cleanAmount;
  }, 0);

  const totalItemsSold = orders.length;

  const handleUpdateOrderStatus = async (orderObj, newStatus) => {
    const targetId = orderObj.rawId || orderObj.id || orderObj._id;
    try {
      const res = await fetch(`${API_BASE_URL}/api/vendor/orders/${targetId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${vendorToken}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrdersFromDatabase();
        alert(`✨ आर्डर स्टेटस अपडेट करके '${newStatus}' कर दिया गया है हुकुम!`);
      } else {
        setOrders(prev => prev.map(o => (o.id === orderObj.id || o.rawId === targetId) ? { ...o, status: newStatus } : o));
        alert(`✨ आर्डर स्टेटस अपडेट कर दिया गया है हुकुम!`);
      }
    } catch (e) {
      setOrders(prev => prev.map(o => (o.id === orderObj.id || o.rawId === targetId) ? { ...o, status: newStatus } : o));
      alert(`✨ आर्डर स्टेटस अपडेट कर दिया गया है हुकुम!`);
    }
  };

  const sendWhatsAppConfirmation = (order) => {
    const itemName = Array.isArray(order.items) && order.items.length > 0 ? order.items[0].name || order.items[0].title || 'Product' : (order.item || 'Items');
    const msg = `Namaste ${order.customer} ji! Aapka order (${itemName} - ₹${order.amount}) ${profile.shopName} se confirm ho gaya hai. Jald hi dispatch kiya jayega. Dhanyawad!`;
    const encodedURL = `https://wa.me/91${order.phone}?text=${encodeURIComponent(msg)}`;
    window.open(encodedURL, '_blank');
  };

  const exportToCSV = () => {
    const headers = ["Order ID,Customer Name,Phone,Address,Pincode,Payment,Amount,Status\n"];
    const rows = orders.map(o => `${o.id},"${o.customer || 'User'}",${o.phone || ''},"${o.address || ''}",${o.pincode || ''},${o.payment || 'COD'},${o.amount || 0},${o.status || 'Pending'}\n`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Sales_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("📥 सेल्स डेटा सफलतापूर्वक Excel/CSV फाइल में डाउनलोड हो गया है हुकुम!");
  };

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (shopId) {
      fetch(`${API_BASE_URL}/api/vendor/customers?shop_id=${shopId}`, {
        headers: {
          'Authorization': `Bearer ${vendorToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (isMounted && data && Array.isArray(data.customers)) {
            setCustomers(data.customers);
          }
        })
        .catch(() => { });
    }
    return () => { isMounted = false; };
  }, [shopId, vendorToken]);

  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', phone: '', role: '' });

  const handleCategoryPhotoUpload = async (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target.result;
      const targetCat = featuredCategories.find(c => c.id === id);

      setFeaturedCategories(prev => prev.map(cat => cat.id === id ? { ...cat, image: imageData } : cat));

      try {
        await fetch(`${API_BASE_URL}/api/vendor/categories`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${vendorToken}`
          },
          body: JSON.stringify({
            shop_id: shopId,
            vendorEmail: profile.email,
            categoryId: id,
            title: targetCat?.title,
            image: imageData
          })
        });
        alert("✨ कैटेगरी फोटो सेव हो गई!");
      } catch (err) {}
    };
    reader.readAsDataURL(file);
  };

  const handleAddOffer = async (e) => {
    e.preventDefault();
    if (!newOffer.title || !newOffer.image) {
      alert("⚠️ हुकुम! ऑफर का नाम और फोटो दोनों भरें!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/vendor/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${vendorToken}`
        },
        body: JSON.stringify({
          shop_id: shopId,
          vendorEmail: profile.email,
          ...newOffer
        })
      });

      if (response.ok) {
        const savedOffer = await response.json();
        setSpecialOffers(prev => [savedOffer, ...prev]);
        setNewOffer({ title: '', discount: '', image: '' });
        alert("✨ नया ऑफर सफलतापूर्वक जोड़ दिया गया है!");
      }
    } catch (err) {
      alert("⚠️ ऑफर सेव करने में एरर आया!");
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const currentShopId = profile.shopId || localStorage.getItem('shopId') || generate16DigitShopId();

    if (!currentShopId) {
      alert("⚠️ हुकुम! शॉप आईडी (Store ID) दर्ज करना अनिवार्य है!");
      return;
    }

    setIsLoading(true);
    localStorage.setItem('vendorProfile', JSON.stringify({ ...profile, shopId: currentShopId }));
    localStorage.setItem('shopId', currentShopId);

    try {
      const response = await fetch(`${API_BASE_URL}/api/vendor/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${vendorToken}`
        },
        body: JSON.stringify({
          shop_id: currentShopId,
          ...profile,
          shopId: currentShopId
        })
      });

      if (response.ok) {
        alert("✨ दुकानदार की जानकारी और सेटिंग्स सफलतापूर्वक सेव हो गई हैं हुकुम!");
        fetchProductsFromDatabase(currentShopId);
        fetchOrdersFromDatabase(currentShopId);
      } else {
        alert("⚠️ स्थानीय रूप से डेटा सुरक्षित कर लिया गया है!");
      }
    } catch (err) {
      alert("⚠️ स्थानीय रूप से डेटा सुरक्षित कर लिया गया है!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);

          if (type === 'profile') {
            setProfile(prev => {
              const updated = { ...prev, profilePhoto: compressedDataUrl };
              localStorage.setItem('vendorProfile', JSON.stringify(updated));
              return updated;
            });
          } else if (type === 'product') {
            setNewProduct(prev => ({ ...prev, image: compressedDataUrl }));
          } else if (type === 'offer') {
            setNewOffer(prev => ({ ...prev, image: compressedDataUrl }));
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || newProduct.stock === '' || !newProduct.category || !newProduct.bio || !newProduct.image) {
      alert("⚠️ हुकुम! सभी फील्ड्स और प्रोडक्ट फोटो भरना अनिवार्य है!");
      return;
    }

    setIsLoading(true);
    const tempProduct = { id: editingId || Date.now(), shop_id: shopId, ...newProduct };

    try {
      const endpoint = editingId !== null ? `${API_BASE_URL}/api/vendor/products/${editingId}` : `${API_BASE_URL}/api/vendor/products`;
      const method = editingId !== null ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${vendorToken}`
        },
        body: JSON.stringify({ shop_id: shopId, ...newProduct })
      });

      if (response.ok) {
        alert(editingId !== null ? "✨ प्रोडक्ट सफलतापूर्वक अपडेट हो गया है हुकुम!" : "✨ प्रीमियम प्रोडक्ट जोड़ दिया गया है हुकुम!");
        setEditingId(null);
        setNewProduct({ name: '', price: '', stock: '', category: '', bio: '', image: '' });
        fetchProductsFromDatabase();
      } else {
        setProducts(prev => [tempProduct, ...prev.filter(p => p.id !== tempProduct.id)]);
        alert("⚠️ प्रोडक्ट जोड़ा गया है!");
        setNewProduct({ name: '', price: '', stock: '', category: '', bio: '', image: '' });
      }
    } catch (err) {
      setProducts(prev => [tempProduct, ...prev.filter(p => p.id !== tempProduct.id)]);
      alert("⚠️ प्रोडक्ट जोड़ा गया है!");
      setNewProduct({ name: '', price: '', stock: '', category: '', bio: '', image: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("क्या आप वाकई इस आइटम को डिलीट करना चाहते हैं हुकुम?")) {
      try {
        await fetch(`${API_BASE_URL}/api/vendor/products/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${vendorToken}`, 'Content-Type': 'application/json' }
        });
        fetchProductsFromDatabase();
      } catch (e) { }
      setProducts(prev => prev.filter(p => p.id !== id && p._id !== id));
    }
  };

  const handleEditClick = (product) => {
    setNewProduct(product);
    setEditingId(product.id || product._id);
    changeSection('inventory');
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.phone) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/vendor/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${vendorToken}` },
        body: JSON.stringify({ shop_id: shopId, ...newStaff })
      });
      if (res.ok) {
        alert("🧑‍💼 स्टाफ जोड़ दिया गया है हुकुम!");
        setNewStaff({ name: '', phone: '', role: '' });
        fetchStaffFromDatabase();
      }
    } catch (e) {
      alert("⚠️ स्टाफ जोड़ने में समस्या आई!");
    }
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm("क्या आप वाकई इस स्टाफ मेंबर को हटाना चाहते हैं हुकुम?")) {
      try {
        await fetch(`${API_BASE_URL}/api/vendor/staff/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${vendorToken}`, 'Content-Type': 'application/json' }
        });
        fetchStaffFromDatabase();
      } catch (e) { }
      setStaffList(prev => prev.filter(st => st.id !== id && st._id !== id && st.phone !== id));
    }
  };

  // Direct Chat Handler with AI Support & Application Owner Chat Integration
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!replyMsg) return;

    const userText = replyMsg;
    const timeNow = new Date().toLocaleTimeString();

    // Add user message immediately
    setChatMessages(prev => [...prev, { sender: "You", message: userText, time: timeNow }]);
    setReplyMsg('');

    if (chatMode === 'ai') {
      // AI Support Auto Reply Logic
      setTimeout(() => {
        let aiReply = "हुकुम, आपकी इस समस्या का समाधान डैशबोर्ड की सेटिंग्स या इन्वेंट्री टैब् में मिल जाएगा। कृपया अधिक जानकारी दें।";
        const lower = userText.toLowerCase();
        if (lower.includes('order') || lower.includes('आर्डर')) {
          aiReply = "आप 'ऑर्डर्स' टैब् में जाकर सभी नए ऑर्डर्स देख सकते हैं और उनका स्टेटस अपडेट कर सकते हैं।";
        } else if (lower.includes('product') || lower.includes('item') || lower.includes('समान')) {
          aiReply = "आप 'इन्वेंट्री' टैब् से नया प्रोडक्ट जोड़ सकते हैं या पुराना एडिट कर सकते हैं।";
        } else if (lower.includes('pincode') || lower.includes('पिनकोड')) {
          aiReply = "अब हमने आर्डर कार्ड्स में पिनकोड दिखना शुरू कर दिया है। यदि किसी आर्डर में नहीं दिख रहा, तो कस्टमर ने एड्रेस में पिनकोड नहीं भरा होगा।";
        }

        setChatMessages(prev => [...prev, { sender: "AI Assistant", message: aiReply, time: new Date().toLocaleTimeString() }]);
      }, 700);
    } else {
      // Owner Chat Mode (Sends to Database / Backend)
      fetch(`${API_BASE_URL}/api/vendor/chats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${vendorToken}` },
        body: JSON.stringify({ shop_id: shopId, sender: 'Vendor', message: userText })
      }).catch(() => {
        setChatMessages(prev => [...prev, { sender: "Owner Support", message: "आपका संदेश एप्लीकेशन ओनर तक पहुंचा दिया गया है। जल्द ही संपर्क किया जाएगा!", time: new Date().toLocaleTimeString() }]);
      });
    }
  };

  const handleLogoutClick = () => {
    if (window.confirm("🚪 क्या आप वाकई लॉगआउट करना चाहते हैं हुकुम?")) {
      localStorage.removeItem('vendorToken');
      localStorage.removeItem('vendorProfile');
      localStorage.removeItem('shopId');
      localStorage.removeItem('vendorActiveSection');
      if (setActiveTab) setActiveTab('register');
    }
  };

  if (!vendorToken) {
    if (setActiveTab) setActiveTab('register');
    return null;
  }

  const lowStockProducts = products.filter(p => Number(p.stock) > 0 && Number(p.stock) <= 5);
  const soldOutProducts = products.filter(p => Number(p.stock) <= 0);

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category?.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    (o.customer || '').toLowerCase().includes(orderSearch.toLowerCase()) ||
    String(o.phone || '').includes(orderSearch) ||
    String(o.id || '').includes(orderSearch) ||
    String(o.pincode || '').includes(orderSearch)
  );

  const BackButton = () => (
    <button
      onClick={() => changeSection('dashboard')}
      style={{
        background: '#241730',
        color: '#dfb15b',
        border: '1px solid #dfb15b',
        padding: '8px 14px',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '0.85rem',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
    >
      {t.backToDashboard}
    </button>
  );

  return (
    <div style={{
      background: '#0f0c14',
      minHeight: '100vh',
      padding: '15px',
      color: '#fff',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#1c1324',
        padding: '12px 15px',
        borderRadius: '10px',
        border: '1px solid #3d264d',
        marginBottom: '15px',
        gap: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #dfb15b', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f0c14', overflow: 'hidden', flexShrink: 0 }}>
            {profile.profilePhoto ? (
              <img src={profile.profilePhoto} alt="DP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '0.85rem', color: '#dfb15b', fontWeight: 'bold' }}>{(profile.shopName || "VS").substring(0, 2)}</span>
            )}
          </div>
          <div>
            <h2 style={{ color: '#dfb15b', margin: 0, fontSize: '1.05rem', letterSpacing: '0.5px' }}>👑 {profile.shopName || "Vendor Dashboard"}</h2>
            <p style={{ fontSize: '11px', color: '#c4b5d4', margin: '3px 0 0 0' }}>{t.welcome}, {profile.ownerName || "हुकुम"}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isLoading && <span style={{ fontSize: '0.75rem', color: '#dfb15b' }}>⏳ {t.saving}</span>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f0c14', padding: '5px 10px', borderRadius: '20px', border: '1px solid #3d264d', fontSize: '0.75rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#4CAF50' : '#ff6b6b', display: 'inline-block' }}></span>
            <span style={{ color: isOnline ? '#4CAF50' : '#ff6b6b', fontWeight: 'bold' }}>{isOnline ? t.liveSocket : t.offline}</span>
          </div>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, #a86232, #6b3a1d)', border: '1px solid #d48d5d', padding: '10px 15px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span>⚠️ <b>{t.lowStockAlert}</b> ({lowStockProducts.length})</span>
          <button onClick={() => changeSection('inventory')} style={{ background: '#fff', color: '#6b3a1d', border: 'none', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>{t.viewInventory}</button>
        </div>
      )}

      {/* Main Content Layout */}
      {activeSection === 'dashboard' ? (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
          {/* Navigation Sidebar */}
          <div style={{
            background: '#1c1324',
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #3d264d',
            width: '100%',
            maxWidth: isMobile ? '100%' : '260px',
            boxSizing: 'border-box',
            flexShrink: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li onClick={() => changeSection('dashboard')} style={navStyle(activeSection === 'dashboard')}>{t.dashboardOverview}</li>
              <li onClick={() => changeSection('profile')} style={navStyle(activeSection === 'profile')}>{t.profileInfo}</li>
              <li onClick={() => changeSection('inventory')} style={navStyle(activeSection === 'inventory')}>{t.productsTab} ({products.length})</li>
              <li onClick={() => changeSection('orders')} style={navStyle(activeSection === 'orders')}>{t.ordersTab} ({orders.length})</li>
              <li onClick={() => changeSection('customers')} style={navStyle(activeSection === 'customers')}>{t.customersTab} ({customers.length})</li>
              <li onClick={() => changeSection('marketing')} style={navStyle(activeSection === 'marketing')}>{t.marketingTab}</li>
              <li onClick={() => changeSection('staff')} style={navStyle(activeSection === 'staff')}>{t.staffTab} ({staffList.length})</li>
              <li onClick={() => changeSection('chat')} style={navStyle(activeSection === 'chat')}>{t.chatTab}</li>
              <li onClick={() => changeSection('settings')} style={navStyle(activeSection === 'settings')}>{t.settingsTab}</li>
            </ul>

            <div style={{ marginTop: '20px', borderTop: '1px solid #3d264d', paddingTop: '12px' }}>
              <button onClick={handleLogoutClick} style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, #a83232, #6b1d1d)', color: '#fff', border: '1px solid #d45d5d', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>{t.logout}</button>
            </div>
          </div>

          {/* Main Dashboard Stats */}
          <div style={{ background: '#1c1324', padding: '20px', borderRadius: '10px', border: '1px solid #3d264d', width: '100%', boxSizing: 'border-box', flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #3d264d', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ color: '#dfb15b', margin: 0, fontSize: '1.1rem' }}>{t.storeReports}</h3>
              <button onClick={exportToCSV} style={{ background: '#226b3e', color: '#fff', border: '1px solid #3fa865', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>{t.downloadExcel}</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '15px', marginTop: '20px' }}>
              <div style={{ background: '#0f0c14', padding: '15px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                <h4 style={{ color: '#dfb15b', margin: '0 0 8px 0', fontSize: '0.9rem' }}>💰 {t.totalEarnings}</h4>
                <p style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>₹{totalSalesRevenue.toLocaleString('en-IN')}</p>
              </div>
              <div style={{ background: '#0f0c14', padding: '15px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                <h4 style={{ color: '#dfb15b', margin: '0 0 8px 0', fontSize: '0.9rem' }}>📦 {t.totalOrders}</h4>
                <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>{totalItemsSold} Items</p>
              </div>
              <div style={{ background: '#0f0c14', padding: '15px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                <h4 style={{ color: '#dfb15b', margin: '0 0 8px 0', fontSize: '0.9rem' }}>👕 {t.totalProducts}</h4>
                <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>{products.length}</p>
              </div>
              <div style={{ background: '#0f0c14', padding: '15px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                <h4 style={{ color: '#dfb15b', margin: '0 0 8px 0', fontSize: '0.9rem' }}>🔴 {t.soldOutItems}</h4>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>{soldOutProducts.length} Items</p>
              </div>
            </div>

            <div style={{ marginTop: '25px', background: '#0f0c14', padding: '20px', borderRadius: '8px', border: '1px solid #dfb15b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h4 style={{ color: '#dfb15b', margin: '0 0 5px 0', fontSize: '1rem' }}>🏷️ {t.uniqueStoreCode}</h4>
                <p style={{ fontSize: '0.8rem', color: '#c4b5d4', margin: 0 }}>{t.uniqueStoreDesc}</p>
              </div>
              <div style={{ background: '#1c1324', border: '2px dashed #dfb15b', padding: '12px 25px', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.2rem', color: '#dfb15b', fontWeight: 'bold', letterSpacing: '2px', display: 'block' }}>{shopId || "N/A"}</span>
                <span style={{ fontSize: '9px', color: '#c4b5d4', marginTop: '2px', display: 'block' }}>Unique 16-Digit Store Code</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standalone Sub-page Views */
        <div style={{ background: '#1c1324', padding: '20px', borderRadius: '10px', border: '1px solid #3d264d', width: '100%', boxSizing: 'border-box' }}>
          <BackButton />

          {activeSection === 'profile' && (
            <div>
              <h3 style={{ color: '#dfb15b', borderBottom: '1px solid #3d264d', paddingBottom: '10px', fontSize: '1.1rem' }}>{t.profileInfo}</h3>
              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '13px', background: '#0f0c14', padding: '15px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                <p><b>{t.shopNameLabel}</b> {profile.shopName || "उपलब्ध नहीं"}</p>
                <p><b>{t.ownerNameLabel}</b> {profile.ownerName || "उपलब्ध नहीं"}</p>
                <p><b>{t.phoneLabel}</b> {profile.phone || "उपलब्ध नहीं"}</p>
                <p><b>ईमेल आईडी:</b> {profile.email || "उपलब्ध नहीं"}</p>
                <p><b>पता:</b> {profile.address || "Jodhpur"}, {profile.city}</p>
                <p><b>एक्टिव पेमेंट मोड:</b> {profile.paymentMethod || 'UPI'}</p>
              </div>
            </div>
          )}

          {activeSection === 'inventory' && (
            <div>
              <h3 style={{ color: '#dfb15b', borderBottom: '1px solid #3d264d', paddingBottom: '10px', fontSize: '1.1rem' }}>
                {editingId !== null ? t.editProduct : t.inventoryManagement}
              </h3>

              <form onSubmit={handleAddOrUpdateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', background: '#0f0c14', padding: '15px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                <input type="text" placeholder="Product Name *" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required style={inputStyle} />
                <input type="text" placeholder="Price (e.g. ₹5,000) *" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required style={inputStyle} />
                <input type="number" placeholder="Stock Quantity *" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} required style={inputStyle} />
                <input type="text" placeholder="Category *" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required style={inputStyle} />
                <textarea placeholder="Description *" value={newProduct.bio} onChange={(e) => setNewProduct({ ...newProduct, bio: e.target.value })} required style={{ ...inputStyle, height: '60px' }} />
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'product')} required={!newProduct.image} style={{ ...inputStyle, padding: '4px', cursor: 'pointer' }} />
                <button type="submit" style={buttonStyle}>{editingId !== null ? t.updateProdBtn : t.addProdBtn}</button>
              </form>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <h4 style={{ color: '#dfb15b', margin: 0, fontSize: '1rem' }}>Products List ({filteredProducts.length})</h4>
                <input type="text" placeholder={t.searchPlaceholder} value={productSearch} onChange={(e) => setProductSearch(e.target.value)} style={{ ...inputStyle, width: '240px', marginTop: 0 }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                {filteredProducts.map(p => (
                  <div key={p.id || p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f0c14', padding: '10px 12px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {p.image && <img src={p.image} alt="item" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />}
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>{p.name} - <span style={{ color: '#dfb15b' }}>{p.price}</span></div>
                        <div style={{ fontSize: '0.75rem', color: '#c4b5d4' }}>Stock: {p.stock}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => handleEditClick(p)} style={{ padding: '5px 10px', backgroundColor: '#dfb15b', color: '#0f0c14', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>{t.edit}</button>
                      <button onClick={() => handleDeleteProduct(p.id || p._id)} style={{ padding: '5px 10px', backgroundColor: '#a83232', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>{t.delete}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #3d264d', paddingBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ color: '#dfb15b', margin: 0, fontSize: '1.1rem' }}>{t.customerOrdersTitle}</h3>
                <input type="text" placeholder={t.searchOrderPlaceholder} value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} style={{ ...inputStyle, width: '180px', marginTop: 0, padding: '6px 10px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                {filteredOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#c4b5d4', padding: '20px' }}>{t.noOrders}</div>
                ) : (
                  filteredOrders.map((o, idx) => (
                    <div key={o.id || idx} style={{ backgroundColor: '#0f0c14', padding: '12px', borderRadius: '8px', border: '1px solid #3d264d', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>#{o.id} - {o.customer} (<span style={{ color: '#4CAF50' }}>₹{o.amount}</span>)</div>
                          <div style={{ fontSize: '0.8rem', color: '#c4b5d4', marginTop: '2px' }}>
                            📱  {o.phone} | 📍 {o.address} {o.pincode ? `| 📮 Pin: ${o.pincode}` : ''}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <select value={o.status || 'Order Placed'} onChange={(e) => handleUpdateOrderStatus(o, e.target.value)} style={{ background: '#1c1324', color: '#dfb15b', border: '1px solid #3d264d', borderRadius: '4px', padding: '5px', fontSize: '0.75rem' }}>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button onClick={() => sendWhatsAppConfirmation(o)} style={{ backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>{t.whatsappBtn}</button>
                        </div>
                      </div>

                      {/* Items Details Sub-box */}
                      {Array.isArray(o.items) && o.items.length > 0 && (
                        <div style={{ backgroundColor: '#161324', padding: '8px 12px', borderRadius: '6px', border: '1px solid #2b1f38' }}>
                          <div style={{ fontSize: '0.75rem', color: '#dfb15b', fontWeight: 'bold', marginBottom: '6px' }}>{t.itemsList}</div>
                          {o.items.map((it, i) => {
                            const itemImage = it.image || it.img || it.product_image || it.photo || '';
                            const itemName = it.name || it.title || 'Product';
                            const itemQty = it.qty || it.quantity || 1;
                            const itemPrice = it.price || 0;

                            return (
                              <div key={i} style={{ fontSize: '0.8rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  {itemImage ? (
                                    <img src={itemImage} alt={itemName} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #dfb15b' }} />
                                  ) : (
                                    <div style={{ width: '30px', height: '30px', borderRadius: '4px', background: '#241730', border: '1px solid #3d264d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#dfb15b' }}>📦</div>
                                  )}
                                  <span>• {itemName} (x{itemQty})</span>
                                </div>
                                <span>₹{itemPrice}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeSection === 'customers' && (
            <div>
              <h3 style={{ color: '#dfb15b', borderBottom: '1px solid #3d264d', paddingBottom: '10px', fontSize: '1.1rem' }}>{t.registeredCustomers}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px' }}>
                {customers.map((c, idx) => (
                  <div key={c.id || c._id || idx} style={{ backgroundColor: '#0f0c14', padding: '10px 15px', borderRadius: '8px', border: '1px solid #3d264d', color: '#fff', fontWeight: 'bold' }}>{c.name || c.username || c.phone || 'Customer'}</div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'marketing' && (
            <div>
              <h3 style={{ color: '#dfb15b', borderBottom: '1px solid #3d264d', paddingBottom: '10px', fontSize: '1.1rem' }}>{t.featuredCatTitle}</h3>
              <p style={{ fontSize: '0.8rem', color: '#c4b5d4' }}>{t.featuredCatDesc}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
                {featuredCategories.map(cat => (
                  <div key={cat.id} style={{ background: '#0f0c14', padding: '12px', borderRadius: '8px', border: '1px solid #dfb15b', textAlign: 'center' }}>
                    <div style={{ height: '120px', borderRadius: '6px', background: '#1c1324', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '8px' }}>
                      {cat.image ? (
                        <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{t.noImage}</span>
                      )}
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#dfb15b', marginBottom: '8px' }}>{cat.title}</div>
                    <input type="file" accept="image/*" onChange={(e) => handleCategoryPhotoUpload(cat.id, e)} style={{ ...inputStyle, padding: '3px', fontSize: '0.7rem' }} />
                  </div>
                ))}
              </div>

              <h3 style={{ color: '#dfb15b', borderBottom: '1px solid #3d264d', paddingBottom: '10px', fontSize: '1.1rem', marginTop: '30px' }}>{t.specialOffersTitle}</h3>
              <form onSubmit={handleAddOffer} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', background: '#0f0c14', padding: '15px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                <input type="text" placeholder="Offer Title (e.g. Festival Season Sale) *" value={newOffer.title} onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })} required style={inputStyle} />
                <input type="text" placeholder="Discount (e.g. Flat 30% OFF)" value={newOffer.discount} onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })} style={inputStyle} />
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'offer')} required={!newOffer.image} style={{ ...inputStyle, padding: '4px', cursor: 'pointer' }} />
                <button type="submit" style={buttonStyle}>{t.addOfferBtn}</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                {specialOffers.map(o => (
                  <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f0c14', padding: '10px 15px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {o.image && <img src={o.image} alt="offer" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />}
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>{o.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#dfb15b' }}>{o.discount}</div>
                      </div>
                    </div>
                    <button onClick={() => setSpecialOffers(prev => prev.filter(item => item.id !== o.id))} style={{ padding: '5px 10px', backgroundColor: '#a83232', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>{t.delete}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'staff' && (
            <div>
              <h3 style={{ color: '#dfb15b', borderBottom: '1px solid #3d264d', paddingBottom: '10px', fontSize: '1.1rem' }}>{t.staffManagement}</h3>
              <form onSubmit={handleAddStaff} style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', background: '#0f0c14', padding: '15px', borderRadius: '8px', border: '1px solid #3d264d' }}>
                <input type="text" placeholder="Staff Name *" value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} required style={{ ...inputStyle, flex: '1 1 150px' }} />
                <input type="text" placeholder="Phone *" value={newStaff.phone} onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })} required style={{ ...inputStyle, flex: '1 1 150px' }} />
                <button type="submit" style={{ ...buttonStyle, width: '100%', marginTop: '5px' }}>{t.addStaffBtn}</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px' }}>
                {staffList.map((st, idx) => (
                  <div key={st.id || st._id || st.phone || idx} style={{ backgroundColor: '#0f0c14', padding: '10px 15px', borderRadius: '8px', border: '1px solid #3d264d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>{st.name} - <span style={{ color: '#dfb15b' }}>{st.phone}</span></div>
                    <button onClick={() => handleDeleteStaff(st.id || st._id || st.phone)} style={{ padding: '5px 10px', backgroundColor: '#a83232', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>{t.delete}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'chat' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #3d264d', paddingBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ color: '#dfb15b', margin: 0, fontSize: '1.1rem' }}>{t.aiSupportOwnerChat}</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setChatMode('ai')} style={{ padding: '5px 10px', background: chatMode === 'ai' ? '#dfb15b' : '#241730', color: chatMode === 'ai' ? '#0f0c14' : '#fff', border: '1px solid #dfb15b', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>{t.aiSupportBtn}</button>
                  <button onClick={() => setChatMode('owner')} style={{ padding: '5px 10px', background: chatMode === 'owner' ? '#dfb15b' : '#241730', color: chatMode === 'owner' ? '#0f0c14' : '#fff', border: '1px solid #dfb15b', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>{t.talkToOwnerBtn}</button>
                </div>
              </div>

              <div style={{ backgroundColor: '#0f0c14', height: '220px', overflowY: 'auto', padding: '10px', borderRadius: '8px', border: '1px solid #3d264d', margin: '15px 0 10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} style={{ alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'You' ? '#dfb15b' : '#1c1324', color: msg.sender === 'You' ? '#0f0c14' : '#fff', padding: '6px 10px', borderRadius: '6px', maxWidth: '80%', fontSize: '0.8rem', border: '1px solid #3d264d' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.65rem', color: msg.sender === 'You' ? '#3d264d' : '#dfb15b' }}>{msg.sender}</div>
                    <div>{msg.message}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '6px' }}>
                <input type="text" placeholder={chatMode === 'ai' ? t.aiPlaceholder : t.ownerPlaceholder} value={replyMsg} onChange={(e) => setReplyMsg(e.target.value)} style={inputStyle} />
                <button type="submit" style={{ ...buttonStyle, padding: '8px 15px', marginTop: 0 }}>{t.send}</button>
              </form>
            </div>
          )}

          {activeSection === 'settings' && (
            <div style={{ width: '100%', boxSizing: 'border-box' }}>
              <h3 style={{ color: '#dfb15b', borderBottom: '1px solid #3d264d', paddingBottom: '10px', fontSize: '1.1rem' }}>
                {t.vendorRegistrationTitle}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <form onSubmit={handleSaveSettings} style={{ backgroundColor: '#0f0c14', padding: '20px', borderRadius: '8px', border: '1px solid #3d264d', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '0.85rem', color: '#c4b5d4' }}>
                    {t.shopNameLabel}
                    <input type="text" value={profile.shopName} onChange={(e) => setProfile({ ...profile, shopName: e.target.value })} placeholder="उदा. Tabahi Menswear" style={inputStyle} />
                  </label>

                  <label style={{ fontSize: '0.85rem', color: '#c4b5d4' }}>
                    {t.ownerNameLabel}
                    <input type="text" value={profile.ownerName} onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })} placeholder="अपना पूरा नाम दर्ज करें" style={inputStyle} />
                  </label>

                  <label style={{ fontSize: '0.85rem', color: '#c4b5d4' }}>
                    {t.phoneLabel}
                    <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="10 अंकों का मोबाइल नंबर" style={inputStyle} />
                  </label>

                  <label style={{ fontSize: '0.85rem', color: '#c4b5d4' }}>
                    {t.storeIdLabel}
                    <input type="text" readOnly value={profile.shopId} style={{ ...inputStyle, backgroundColor: '#2b1f38', cursor: 'not-allowed', color: '#dfb15b', fontWeight: 'bold' }} />
                  </label>

                  <label style={{ fontSize: '0.85rem', color: '#c4b5d4' }}>
                    {t.upiLabel}
                    <input type="text" value={profile.upiId} onChange={(e) => setProfile({ ...profile, upiId: e.target.value })} placeholder="yourname@paytm" style={inputStyle} />
                  </label>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '0.80rem', color: '#dfb15b' }}>{t.logoLabel}</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} style={{ ...inputStyle, padding: '5px', cursor: 'pointer' }} />
                  </div>

                  <button type="submit" style={{ ...buttonStyle, backgroundColor: '#dfb15b', color: '#0f0c14', marginTop: '10px' }}>
                    {t.saveRegisterBtn}
                  </button>
                </form>

                <div style={{ textAlign: 'center', backgroundColor: '#0f0c14', padding: '20px', borderRadius: '8px', border: '1px dashed #dfb15b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#dfb15b', marginBottom: '12px', fontWeight: 'bold' }}>
                    {t.scanQr} {profile.shopName || "Store"}
                  </div>

                  <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', display: 'inline-block' }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(window.location.origin + '/store?id=' + (profile.shopId || '123'))}`}
                      alt="Store QR"
                      style={{ width: '160px', height: '160px', display: 'block' }}
                    />
                  </div>

                  <div style={{ fontSize: '0.9rem', marginTop: '12px', color: '#fff', fontWeight: 'bold' }}>
                    {profile.shopName || "Store"}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#c4b5d4', marginTop: '4px' }}>
                    ID: {profile.shopId || "N/A"} | {t.owner}: {profile.ownerName || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}                 