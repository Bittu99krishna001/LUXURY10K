import React, { useState, useEffect } from 'react';
import Home from './assets/click.button/home';
import Minu from './assets/click.button/menu';
import Wishlist from './assets/click.button/wishlist';
import Account from './assets/click.button/account';
import VendorDashboard from './assets/click.button/VendorDashboard';
import ShopRegistration from './assets/click.button/ShopRegistration';
import AdminDashboard from './AdminDashboard'; 
import DualOtpModal from './assets/click.button/DualOtMadal';    
import OrderHistory from './assets/click.button/OrderHistory';
import Login from './assets/click.button/logincasmer';
import { io } from "socket.io-client";
import { LanguageProvider } from './LanguageContext';

// 🛒 कार्ट कंपोनेंट को बाहरी फाइल से इंपोर्ट किया गया
import Cart, { AddDeliveryAddress } from './assets/click.button/cart';

const BACKEND = 'http://localhost:5001'; 

// 🌐 Multi-language Dictionary for Main App (Buy Now और चेकआउट के सभी शब्दों के साथ)
const appTranslations = {
  English: {
    home: 'Home',
    cart: 'Cart',
    wishlist: 'Wishlist',
    account: 'Account',
    storeName: 'LUXURY STORE',
    aiHdPremium: 'AI HD PREMIUM',
    itemName: 'Item Name',
    priceAmount: 'Price Amount',
    share: 'Share',
    addToCartBtn: '🛒 Add to Cart',
    buyNowBtn: '⚡ Buy Now',
    similarItems: '✨ Similar Items You May Like',
    backToHome: '← Back to Home',
    reviewOrder: 'REVIEW YOUR ORDER',
    paymentMethod: 'PAYMENT METHOD',
    step1: 'STEP 1/2',
    step2: 'STEP 2/2',
    continueBtn: 'Continue',
    placeOrder: 'Place Order ⚡',
    authSuccess: '🔐 Authentication Successful, Hukum!',
    linkCopied: 'Link copied to clipboard!',
    soldBy: 'Sold by:',
    size: 'Size:',
    qty: 'Qty:',
    changeBtn: 'Change',
    priceDetails: 'Price Details',
    productPrice: 'Product Price',
    totalDiscounts: 'Total Discounts',
    gstAdded: 'GST (5% Added to Commission)',
    orderTotal: 'Order Total',
    selectPayment: 'Select payment method',
    cod: 'Cash on Delivery',
    payOnline: 'Pay Online (PhonePe / UPI)',
    onlineDiscountNote: 'Save ₹13 extra with online payment',
    amountToPay: 'Amount To Pay',
    offBadge: 'OFF on this order (Database Secured)'
  },
  Hindi: {
    home: 'होम',
    cart: 'कार्ट',
    wishlist: 'विशलिस्ट',
    account: 'अकाउंट',
    storeName: 'लक्जरी स्टोर',
    aiHdPremium: 'AI HD प्रीमियम',
    itemName: 'आइटम का नाम',
    priceAmount: 'कीमत राशि',
    share: 'शेयर',
    addToCartBtn: '🛒 कार्ट में जोड़ें',
    buyNowBtn: '⚡ तुरंत खरीदें',
    similarItems: '✨ आपके पसंद के मिलते-जुलते प्रोडक्ट्स',
    backToHome: '← होम पर वापस जाएं',
    reviewOrder: 'अपने आर्डर की समीक्षा करें',
    paymentMethod: 'भुगतान का तरीका',
    step1: 'स्टेप 1/2',
    step2: 'स्टेप 2/2',
    continueBtn: 'आगे बढ़ें',
    placeOrder: 'आर्डर कंफर्म करें ⚡',
    authSuccess: '🔐 प्रमाणीकरण सफल रहा हुकुम!',
    linkCopied: 'लिंक कॉपी कर लिया गया है!',
    soldBy: 'विक्रेता (Sold by):',
    size: 'साइज:',
    qty: 'मात्रा (Qty):',
    changeBtn: 'बदलें',
    priceDetails: 'प्राइस डिटेल्स',
    productPrice: 'प्रोडक्ट मूल्य',
    totalDiscounts: 'कुल छूट',
    gstAdded: 'जीएसटी (5% कमीशन में जुड़ा)',
    orderTotal: 'कुल आर्डर राशि',
    selectPayment: 'भुगतान का तरीका चुनें',
    cod: 'कैश ऑन डिलीवरी',
    payOnline: 'ऑनलाइन भुगतान करें (PhonePe / UPI)',
    onlineDiscountNote: 'ऑनलाइन भुगतान पर ₹13 की अतिरिक्त बचत',
    amountToPay: 'भुगतान करने योग्य राशि',
    offBadge: 'इस आर्डर पर छूट (डेटाबेस सुरक्षित)'
  },
  Tamil: {
    home: 'முகப்பு',
    cart: 'கார்ட்',
    wishlist: 'விருப்பப்பட்டியல்',
    account: 'கணக்கு',
    storeName: 'லக்ஸரி ஸ்டோர்',
    aiHdPremium: 'AI HD பிரீமியம்',
    itemName: 'பொருள் பெயர்',
    priceAmount: 'விலை விவரம்',
    share: 'பகிர்',
    addToCartBtn: '🛒 கார்ட்டில் சேர்',
    buyNowBtn: '⚡ இப்போது வாங்கு',
    similarItems: '✨ உனக்குப் பிடித்த ஒத்த பொருட்கள்',
    backToHome: '← முகப்பிற்குத் திரும்பு',
    reviewOrder: 'ஆர்டரை மதிப்பாய்வு செய்யவும்',
    paymentMethod: 'கட்டணம் செலுத்தும் முறை',
    step1: 'படி 1/2',
    step2: 'படி 2/2',
    continueBtn: 'தொடரவும்',
    placeOrder: 'ஆர்டரை வைக்கவும் ⚡',
    authSuccess: '🔐 அங்கீகாரம் வெற்றி!',
    linkCopied: 'இணைப்பு நகலெடுக்கப்பட்டது!',
    soldBy: 'விற்பனையாளர்:',
    size: 'அளவு:',
    qty: 'அளவு (Qty):',
    changeBtn: 'மாற்று',
    priceDetails: 'விலை விவரங்கள்',
    productPrice: 'தயாரிப்பு விலை',
    totalDiscounts: 'மொத்த தள்ளுபடி',
    gstAdded: 'GST (5%)',
    orderTotal: 'ஆர்டர் மொத்தம்',
    selectPayment: 'கட்டண முறையைத் தேர்ந்தெடுக்கவும்',
    cod: 'டெலிவரியில் ரொக்கம்',
    payOnline: 'ஆன்லைனில் செலுத்தவும்',
    onlineDiscountNote: 'ஆன்லைன் கட்டணம் மூலம் ₹13 சேமிக்கவும்',
    amountToPay: ' செலுத்த வேண்டிய தொகை',
    offBadge: 'தள்ளுபடி'
  },
  Marathi: {
    home: 'होम',
    cart: 'कार्ट',
    wishlist: 'विशलिस्ट',
    account: 'खाते',
    storeName: 'लक्झरी स्टोअर',
    aiHdPremium: 'AI HD प्रीमियम',
    itemName: 'आयटमचे नाव',
    priceAmount: 'किंमत रक्कम',
    share: 'शेअर करा',
    addToCartBtn: '🛒 कार्टमध्ये जोडा',
    buyNowBtn: '⚡ आत्ताच खरेदी करा',
    similarItems: '✨ तुम्हाला आवडू शकणाऱ्या वस्तू',
    backToHome: '← होमवर परत जा',
    reviewOrder: 'ऑर्डर तपासा',
    paymentMethod: 'पेमेंट पद्धत',
    step1: 'पायरी 1/2',
    step2: 'पायरी 2/2',
    continueBtn: 'पुढे जा',
    placeOrder: 'ऑर्डर कन्फर्म करा ⚡',
    authSuccess: '🔐 प्रमाणीकरण यशस्वी झाले हुकुम!',
    linkCopied: 'लिंक कॉपी केली आहे!',
    soldBy: 'विक्रेता:',
    size: 'आकार:',
    qty: 'नग:',
    changeBtn: 'बदला',
    priceDetails: 'किंमत तपशील',
    productPrice: 'उत्पादन किंमत',
    totalDiscounts: 'एकूण सूट',
    gstAdded: 'जीएसटी (५%)',
    orderTotal: 'एकूण ऑर्डर',
    selectPayment: 'पेमेंट पद्धत निवडा',
    cod: 'कॅश ऑन डिलिव्हरी',
    payOnline: 'ऑनलाइन पेमेंट करा',
    onlineDiscountNote: 'ऑनलाइन पेमेंटवर ₹13 वाचवा',
    amountToPay: 'देવાની रक्कम',
    offBadge: 'सूट'
  },
  Bengali: {
    home: 'হোম',
    cart: 'কার্ট',
    wishlist: 'উইশলিস্ট',
    account: 'অ্যাকাউন্ট',
    storeName: 'লাক্সারি স্টোর',
    aiHdPremium: 'AI HD প্রিমিয়াম',
    itemName: 'আইটেমের নাম',
    priceAmount: 'মূল্যের পরিমাণ',
    share: 'শেয়ার',
    addToCartBtn: '🛒 কার্টে যোগ করুন',
    buyNowBtn: '⚡ এখনই কিনুন',
    similarItems: '✨ আপনার পছন্দের অন্যান্য পণ্য',
    backToHome: '← হোমে ফিরে যান',
    reviewOrder: 'অর্ডার পর্যালোচনা করুন',
    paymentMethod: 'পেমেন্ট পদ্ধতি',
    step1: 'ধাপ ১/২',
    step2: 'ধাপ ২/২',
    continueBtn: 'চালিয়ে যান',
    placeOrder: 'অর্ডার নিশ্চিত করুন ⚡',
    authSuccess: '🔐 প্রমাণীকরণ সফল হয়েছে!',
    linkCopied: 'লিংক কপি করা হয়েছে!',
    soldBy: 'বিক্রেতা:',
    size: 'সাইজ:',
    qty: 'পরিমাণ:',
    changeBtn: 'পরিবর্তন',
    priceDetails: 'মূল্যের বিবরণ',
    productPrice: 'পণ্যের মূল্য',
    totalDiscounts: 'মোট ছাড়',
    gstAdded: 'জিএসটি (৫%)',
    orderTotal: 'মোট অর্ডার',
    selectPayment: 'পেমেন্ট পদ্ধতি বেছে নিন',
    cod: 'ক্যাশ অন ডেলিভারি',
    payOnline: 'অনলাইনে পেমেন্ট করুন',
    onlineDiscountNote: 'অনলাইন পেমেন্টে ₹১৩ সাশ্রয় করুন',
    amountToPay: 'প্রদেয় পরিমাণ',
    offBadge: 'ছাড়'
  },
  Telugu: {
    home: 'హోమ్',
    cart: 'కార్ట్',
    wishlist: 'విష్‌లిస్ట్',
    account: 'ఖాతా',
    storeName: 'లగ్జరీ స్టోర్',
    aiHdPremium: 'AI HD ప్రీమియం',
    itemName: 'వస్తువు పేరు',
    priceAmount: 'ధర మొత్తం',
    share: 'షేర్ చేయండి',
    addToCartBtn: '🛒 కార్ట్‌కి జోడించు',
    buyNowBtn: '⚡ ఇప్పుడే కొనుగోలు చేయండి',
    similarItems: '✨ మీకు నచ్చే ఇతర ఉత్పత్తులు',
    backToHome: '← హోమ్‌కి తిరిగి వెళ్లు',
    reviewOrder: 'ఆర్డర్‌ని సమీక్షించండి',
    paymentMethod: 'చెల్లింపు పద్ధతి',
    step1: 'స్టెప్ 1/2',
    step2: 'స్టెప్ 2/2',
    continueBtn: 'కొనసాగించు',
    placeOrder: 'ఆర్డర్ ఉంచండి ⚡',
    authSuccess: '🔐 ఆథెంటికేషన్ విజయవంతమైంది!',
    linkCopied: 'లింక్ కాపీ చేయబడింది!',
    soldBy: 'విక్రేత:',
    size: 'సైజ్:',
    qty: 'పరిమాణం:',
    changeBtn: 'మార్చు',
    priceDetails: 'ధర వివరాలు',
    productPrice: 'ఉత్పత్తి ధర',
    totalDiscounts: 'మొత్తం తగ్గింపు',
    gstAdded: 'GST (5%)',
    orderTotal: 'ఆర్డర్ మొత్తం',
    selectPayment: 'చెల్లింపు పద్ధతిని ఎంచుకోండి',
    cod: 'క్యాష్ ఆన్ డెలివరీ',
    payOnline: 'ఆన్‌లైన్‌లో చెల్లించండి',
    onlineDiscountNote: 'ఆన్‌లైన్ చెల్లింపుపై ₹13 ఆదా చేయండి',
    amountToPay: 'చెల్లించవలసిన మొత్తం',
    offBadge: 'తగ్గింపు'
  },
  Kannada: {
    home: 'ಮುಖಪುಟ',
    cart: 'ಕಾರ್ಟ್',
    wishlist: 'ಇಷ್ಟಪಟ್ಟಿ',
    account: 'ಖಾತೆ',
    storeName: 'ಲಕ್ಸುರಿ ಸ್ಟೋರ್',
    aiHdPremium: 'AI HD ಪ್ರೀಮಿಯಂ',
    itemName: 'ವಸ್ತುವಿನ ಹೆಸರು',
    priceAmount: 'ಬೆಲೆ ಮೊತ್ತ',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    addToCartBtn: '🛒 ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    buyNowBtn: '⚡ ಈಗಲೇ ಖರೀದಿಸಿ',
    similarItems: '✨ ನೀವು ಇಷ್ಟಪಡುವಂತಹುದೇ ವಸ್ತುಗಳು',
    backToHome: '← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    reviewOrder: 'ಆರ್ಡರ್ ಪರಿಶೀಲಿಸಿ',
    paymentMethod: 'ಪಾವತಿ ವಿಧಾನ',
    step1: 'ಹಂತ 1/2',
    step2: 'ಹಂತ 2/2',
    continueBtn: 'ಮುಂದುವರಿಸಿ',
    placeOrder: 'ಆರ್ಡರ್ ಖಚಿತಪಡಿಸಿ ⚡',
    authSuccess: '🔐 ದೃಢೀಕರಣ ಯಶಸ್ವಿಯಾಗಿದೆ!',
    linkCopied: 'ಲಿಂಕ್ ಅನ್ನು ನಕಲಿಸಲಾಗಿದೆ!',
    soldBy: 'ಮಾರಾಟಗಾರರು:',
    size: 'ಗಾತ್ರ:',
    qty: 'ಪ್ರಮಾಣ:',
    changeBtn: 'ಬದಲಾಯಿಸಿ',
    priceDetails: 'ಬೆಲೆ ವಿವರಗಳು',
    productPrice: 'ಉತ್ಪನ್ನ ಬೆಲೆ',
    totalDiscounts: 'ಒಟ್ಟು ರಿಯಾಯಿತಿ',
    gstAdded: 'GST (5%)',
    orderTotal: 'ಒಟ್ಟು ಆರ್ಡರ್',
    selectPayment: 'ಪಾವತಿ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    cod: 'ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ',
    payOnline: 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪಾವತಿಸಿ',
    onlineDiscountNote: 'ಆನ್‌ಲೈನ್ ಪಾವತಿಯೊಂದಿಗೆ ₹13 ಉಳಿಸಿ',
    amountToPay: 'ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ',
    offBadge: 'ರಿಯಾಯಿತಿ'
  },
  Malayalam: {
    home: 'ഹോം',
    cart: 'കാർട്ട്',
    wishlist: 'വിഷ്‌ലിസ്റ്റ്',
    account: 'അക്കൗണ്ട്',
    storeName: 'ലക്സറി സ്റ്റോർ',
    aiHdPremium: 'AI HD പ്രീമിയം',
    itemName: 'ഇനത്തിന്റെ പേര്',
    priceAmount: 'വില തുക',
    share: 'പങ്കുവെക്കുക',
    addToCartBtn: '🛒 കാർട്ടിലേക്ക് ചേർക്കുക',
    buyNowBtn: '⚡ ഇപ്പോൾ വാങ്ങുക',
    similarItems: '✨ സമാനമായ ഉൽപ്പന്നങ്ങൾ',
    backToHome: '← ഹോമിലേക്ക് മടങ്ങുക',
    reviewOrder: 'ഓർഡർ പരിശോധിക്കുക',
    paymentMethod: 'പേയ്മെന്റ് രീതി',
    step1: 'സ്റ്റെപ്പ് 1/2',
    step2: 'സ്റ്റെപ്പ് 2/2',
    continueBtn: 'തുടരുക',
    placeOrder: 'ഓർഡർ നൽകുക ⚡',
    authSuccess: '🔐 വിജയകരമായി പൂർത്തിയായി!',
    linkCopied: 'ലിങ്ക് പകർത്തப்பட்டது!',
    soldBy: 'വിൽപന:',
    size: 'വലുപ്പം:',
    qty: 'എണ്ണം:',
    changeBtn: 'മാറ്റുക',
    priceDetails: 'വില விவரങ്ങൾ',
    productPrice: 'ഉൽപ്പന്ന വില',
    totalDiscounts: 'ആകെ കിഴിവ്',
    gstAdded: 'ജി.എസ്‌.ടി (5%)',
    orderTotal: 'ആകെ തുക',
    selectPayment: 'പേയ്മെന്റ് രീതി തിരഞ്ഞെടുക്കുക',
    cod: 'ക്യാഷ് ഓൺ ഡെലിവറി',
    payOnline: 'ഓൺലൈനായി പണമടയ്ക്കുക',
    onlineDiscountNote: 'ഓൺലൈൻ പേയ്മെന്റിൽ ₹13 ലാഭിക്കുക',
    amountToPay: 'അടയ്ക്കേണ്ട തുക',
    offBadge: 'കിഴിവ്'
  }
};

// ==========================================
// 🏠 मुख्य लक्जरी होम कंपोनेंट
// ==========================================
function LuxuryHomePerfectWidth() {
  // 🌐 भाषा सिंक स्टेट
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'English';
  });
  const t = appTranslations[currentLang] || appTranslations.English;

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

  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ⚡ केवल Buy Now से खरीदे जाने वाले सिंगल आइटम के लिए स्टेट्स
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [buyNowStep, setBuyNowStep] = useState(1); // Step 1: Summary/Address, Step 2: Payment Method
  const [directQty, setDirectQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' या 'online'
  const [showAddressForm, setShowAddressForm] = useState(false); // 🔑 एड्रेस फॉर्म खोलने के लिए स्टेट

  const [userName, setUserName] = useState('bunty');
  const [userEmail] = useState('bunty@luxury.com');
  
  const [activeUser, setActiveUser] = useState(() => {
    const savedUser = localStorage.getItem('customerProfile');
    return savedUser ? JSON.parse(savedUser) : { name: 'bunty', email: 'bunty@luxury.com', phone: '8949128806', token: 'active_user_token' };
  });

  const [userAvatar, setUserAvatar] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: 'bunty',
    phone: '8949128806',
    address: 'School, Lawaran, Kaga Road, Jodhpur, Rajasthan'
  });

  // 🛒 कार्ट को localStorage से सुरक्षित रूप से लोड करना
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('luxury_cart_data');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });

  // 🤍 विशलिस्ट को localStorage से सुरक्षित रूप से लोड करना
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('luxury_wishlist_data');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (e) {
      return [];
    }
  });

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpEmail] = useState('');

  useEffect(() => {
    async function fetchCartFromDatabase() {
      const activeEmail = activeUser?.email || userEmail;
      if (!activeEmail) return;
      try {
        const response = await fetch(`${BACKEND}/api/get-heavy-data/${activeEmail}`);
        const result = await response.json();
        if (result.success && Array.isArray(result.cartData) && result.cartData.length > 0) {
          setCart(result.cartData);
          localStorage.setItem('luxury_cart_data', JSON.stringify(result.cartData));
        }
      } catch (error) {
        console.error("❌ डेटाबेस से कार्ट फेच करने में एरर:", error);
      }
    }
    fetchCartFromDatabase();
  }, [userEmail, activeUser]);

  const updateWishlistDB = async (newList) => {
    setWishlist(newList);
    localStorage.setItem('luxury_wishlist_data', JSON.stringify(newList));
    try {
      const token = activeUser?.email || userEmail || 'guest';
      await fetch(`${BACKEND}/api/wishlist`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user: token, wishlist: newList })
      });
    } catch (err) {
      console.warn('DB sync pending...');
    }
  };

  const handleRemoveFromWishlist = (targetKey) => {
    const updatedList = wishlist.filter(i => (i.id || i._id || i.uniqueKey) !== targetKey);
    updateWishlistDB(updatedList);
  };

  useEffect(() => {
    async function fetchWishlistFromDB() {
      try {
        const token = activeUser?.email || userEmail || 'guest';
        const res = await fetch(`${BACKEND}/api/wishlist?user=${token}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setWishlist(data);
            localStorage.setItem('luxury_wishlist_data', JSON.stringify(data));
          }
        }
      } catch (err) {
        console.warn('Could not load wishlist from DB');
      }
    }
    fetchWishlistFromDB();
  }, [userEmail, activeUser]);

  const handleAddToWishlist = (item, index) => {
    const itemId = item.id || item._id || `item_${index}`;
    const exists = wishlist.find((i, idx) => (i.id || i._id || i.uniqueKey || `item_${idx}`) === itemId);
    
    let updatedList;
    if (exists) {
      updatedList = wishlist.filter((i, idx) => (i.id || i._id || i.uniqueKey || `item_${idx}`) !== itemId);
      alert('Removed from Wishlist');
    } else {
      const itemWithUniqueId = { ...item, uniqueKey: itemId };
      updatedList = [...wishlist, itemWithUniqueId];
      alert('Added to Wishlist! ❤️');
    }
    updateWishlistDB(updatedList);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setActiveTab('adminDashboard');
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isUserLoggedIn = true; 

  const [allProducts, setAllProducts] = useState([]);

  const fetchProductsByPage = async (pageNumber = 1) => {
    try {
      const response = await fetch(`${BACKEND}/api/products?page=${pageNumber}&limit=12`);
      const data = await response.json();
      if (data.success && data.products && data.products.length > 0) {
        setAllProducts(data.products); 
      } else {
        setAllProducts([
          { _id: 'v1', id: 'v1', title: "Luxury Collection Premium Shirt", price: "₹1,299", rating: "4.8", reviews: "45", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500", isPremiumVendor: true },
          { _id: 'v2', id: 'v2', title: "Tabahi Menswear Designer Polo", price: "₹999", rating: "4.7", reviews: "88", img: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500", isPremiumVendor: true },
          { _id: 'v3', id: 'v3', title: "Royal Golden Watch Collection", price: "₹2,499", rating: "4.9", reviews: "120", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500", isPremiumVendor: true },
          { _id: 'v4', id: 'v4', title: "Executive Luxury Sunglasses", price: "₹799", rating: "4.5", reviews: "34", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500", isPremiumVendor: true }
        ]);
      }
    } catch (err) {
      console.error("Error fetching real products:", err);
      setAllProducts([
        { _id: 'v1', id: 'v1', title: "Luxury Collection Premium Shirt", price: "₹1,299", rating: "4.8", reviews: "45", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500", isPremiumVendor: true },
        { _id: 'v2', id: 'v2', title: "Tabahi Menswear Designer Polo", price: "₹999", rating: "4.7", reviews: "88", img: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500", isPremiumVendor: true }
      ]);
    }
  };

  useEffect(() => {
    fetchProductsByPage(1);
  }, []);

  const [bannerImage] = useState("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80");
  const [storeOfferText] = useState(" all itam 👍");

  const categories = [
    { title: "MEN'S SHIRTS", img : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&q=80" },
    { title: "MEN'S WATCHES", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80" },
    { title: "MEN'S SUNGLASSES", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&q=80" },
    { title: "LUXURY SHOES", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80" },
  ];

  const handleSelectProduct = (item) => {
    setSelectedProduct(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveCartToDatabase = async (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('luxury_cart_data', JSON.stringify(updatedCart));
    try {
      const activeEmail = activeUser?.email || userEmail;
      await fetch(`${BACKEND}/api/save-heavy-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: activeEmail, cartData: updatedCart })
      });
    } catch (error) {
      console.error("❌ डेटाबेस सेव एरर:", error);
    }
  };

  const handleAddToCart = async (item) => {
    let updatedCart;
    const itemId = item.id || item._id;
    const existing = cart.find(cartItem => (cartItem.id || cartItem._id) === itemId);
    if (existing) {
      updatedCart = cart.map(cartItem => 
        (cartItem.id || cartItem._id) === itemId ? { ...cartItem, qty: (cartItem.qty || 1) + 1 } : cartItem
      );
    } else {
      updatedCart = [...cart, { ...item, qty: 1 }];
    }

    await saveCartToDatabase(updatedCart);
    alert(`✨ "${item.title || item.name}" has been added to your cart! 🛒`);
  };

  // ⚡ Buy Now बटन दबाने पर कार्ट खोले बिना डायरेक्ट चेकआउट स्क्रीन पर ले जाना
  const handleStartBuyNow = (item) => {
    setBuyNowItem(item);
    setDirectQty(1);
    setBuyNowStep(1);
    setSelectedProduct(null);
  };

  // 🎯 प्राइस कैलकुलेशन (Cart वाले लॉजिक से पूरी तरह मैच करता हुआ)
  const getCalculatedPrice = () => {
    if (!buyNowItem) return { productPriceTotal: 0, totalDiscounts: 0, gstAmount: 0, orderTotal: 0, onlinePayDiscount: 0, finalAmountToPay: 0 };
    
    const rawPrice = buyNowItem.price ? Number(String(buyNowItem.price).replace(/[^0-9]/g, '')) : 184;
    const productPriceTotal = rawPrice * directQty;
    const totalDiscounts = 12 * directQty; 
    const subTotalAfterDiscount = productPriceTotal - totalDiscounts;
    const gstAmount = Math.round(subTotalAfterDiscount * 0.05);
    const orderTotal = subTotalAfterDiscount + gstAmount;
    const onlinePayDiscount = paymentMethod === 'online' ? 13 : 0;
    const finalAmountToPay = orderTotal - onlinePayDiscount;

    return { productPriceTotal, totalDiscounts, gstAmount, orderTotal, onlinePayDiscount, finalAmountToPay };
  };

  const priceDetails = getCalculatedPrice();

  // ⚡ डायरेक्ट ऑर्डर प्लेस करने का फ़ंक्शन (कार्ट जैसा ही एडवांस बैकएंड सिंक)
  const handlePlaceDirectOrder = async () => {
    if (!buyNowItem) return;
    
    const activeEmail = activeUser?.email || localStorage.getItem('customerEmail') || 'bunty@luxury.com';
    const authToken = localStorage.getItem('customerToken') || activeUser?.token || '';
    const detectedShopId = buyNowItem.shop_id || buyNowItem.shopId || 'SHOP123';

    const formattedItem = {
      ...buyNowItem,
      id: buyNowItem.id || buyNowItem._id,
      shop_id: detectedShopId,
      name: buyNowItem.title || buyNowItem.name || 'Luxury Item',
      price: buyNowItem.price || '₹184',
      qty: directQty
    };
  
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const orderData = {
      orderId: orderId,
      shop_id: String(detectedShopId),
      userEmail: activeEmail,
      email: activeEmail,
      items: [formattedItem],
      totalAmount: priceDetails.finalAmountToPay,
      gstCollected: priceDetails.gstAmount,
      paymentMode: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Pay Online',
      customer: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address
      },
      customerInfo: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address
      },
      date: new Date().toLocaleString(),
      status: 'Order Placed',
      vendorEmail: buyNowItem.vendorEmail || 'owner@luxury.in'
    };

    try {
      const response = await fetch(`${BACKEND}/api/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          shop_id: String(detectedShopId),
          customerEmail: orderData.userEmail,
          email: orderData.userEmail,
          phone: customerInfo.phone,
          customerInfo: orderData.customerInfo,
          items: [formattedItem],
          totalAmount: priceDetails.finalAmountToPay,
          shippingAddress: customerInfo.address,
          vendorEmail: orderData.vendorEmail,
          orderId: orderData.orderId,
          paymentMode: orderData.paymentMode,
          status: 'Order Placed'
        })
      });

      await fetch(`${BACKEND}/api/save-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      
      if (result.success || response.ok) {
        alert(`🎉 Order Placed Successfully, Hukum!\nOrder ID: ${orderId}\nShop ID: ${detectedShopId}\nSaved in Database & sent to Vendor! 📦`);
        setBuyNowItem(null);
        setActiveTab('orderHistory');
      } else {
        alert('❌ Order saving failed on database.');
      }
    } catch (err) {
      console.error("Database order error:", err);
      alert('❌ Server connection error while placing order.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#0c0b0a',
      color: '#d4af37',
      fontFamily: '"Cinzel", "Times New Roman", serif',
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      backgroundImage: 'radial-gradient(circle at center, #1c1815 0%, #0c0b0a 100%)',
      paddingBottom: '120px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        backgroundColor: '#12100e',
        boxSizing: 'border-box'
      }}>  
        <div onClick={() => setIsMenuOpen(true)} style={{ fontSize: '1.5rem', cursor: 'pointer', color: '#d4af37' }}>
          ☰
        </div>
        
        <div onClick={() => { setActiveTab('home'); setSelectedProduct(null); setBuyNowItem(null); setShowAddressForm(false); }} style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#d4af37', letterSpacing: '2px', cursor: 'pointer' }}>
          {t.storeName}
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div 
            onClick={() => { setActiveTab('account'); setSelectedProduct(null); setBuyNowItem(null); setShowAddressForm(false); }} 
            style={{ 
              width: '35px', height: '35px', borderRadius: '50%', border: '2px solid #d4af37', 
              overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#221e18'
            }}
            title="Go to Account"
          >
            {activeUser && (activeUser.profile_image || activeUser.avatar || userAvatar) ? (
              <img 
                src={activeUser.profile_image || activeUser.avatar || userAvatar} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <span style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '0.9rem' }}>
                {userName ? userName.charAt(0).toUpperCase() : 'B'}
              </span>
            )}
          </div>
          <div onClick={() => { setActiveTab('cart'); setSelectedProduct(null); setBuyNowItem(null); setShowAddressForm(false); }} style={{ position: 'relative', cursor: 'pointer', fontSize: '1.4rem' }}>
            🛒
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-10px', backgroundColor: '#ffd700', color: '#000', borderRadius: '50%', fontSize: '0.7rem', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {cart.length}
              </span>
            )}
          </div>  
        </div>  
      </div>

      {/* 🔑 यदि Buy Now में एड्रेस चेंज करना हो, तो कार्ट वाला 'AddDeliveryAddress' कंपोनेंट यहाँ भी खुल जाएगा */}
      {showAddressForm ? (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <AddDeliveryAddress 
            customerInfo={customerInfo} 
            setCustomerInfo={setCustomerInfo} 
            onBack={() => setShowAddressForm(false)} 
          />
        </div>
      ) : buyNowItem ? (
        /* 🎯 डायरेक्ट Buy Now चेकआउट स्क्रीन (अब पूरी तरह भाषा के अनुसार अनुवादित) */
        <div style={{ width: '100%', maxWidth: '500px', margin: '20px auto', padding: '15px', boxSizing: 'border-box', fontFamily: '"Cinzel", serif' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px 15px', borderRadius: '8px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => buyNowStep === 2 ? setBuyNowStep(1) : setBuyNowItem(null)} style={{ background: 'none', border: 'none', color: '#d4af37', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>‹</button>
              <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#ffd700' }}>
                {buyNowStep === 1 ? t.reviewOrder : t.paymentMethod}
              </h2>
            </div>
            <span style={{ backgroundColor: '#221e18', color: '#ffd700', padding: '4px 12px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #d4af37' }}>
              {buyNowStep === 1 ? t.step1 : t.step2}
            </span>
          </div>

          <div style={{ backgroundColor: '#1c1815', color: '#68e1d5', padding: '10px 15px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center', border: '1px solid rgba(104, 225, 213, 0.3)' }}>
            🎉 ₹{priceDetails.totalDiscounts} {t.offBadge}
          </div>

          {buyNowStep === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px', borderRadius: '8px', display: 'flex', gap: '12px' }}>
                <img 
                  src={buyNowItem.img || buyNowItem.image || "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500"} 
                  alt={buyNowItem.title || buyNowItem.name} 
                  style={{ width: '75px', height: '75px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #33291a' }} 
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>{buyNowItem.title || buyNowItem.name}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ffd700' }}>
                    {buyNowItem.price || "₹184"}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{t.size} Free Size &nbsp;|&nbsp; {t.qty} 
                    <button onClick={() => setDirectQty(prev => Math.max(1, prev - 1))} style={{ margin: '0 5px', padding: '0 5px', background: '#222', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}>-</button>
                    <b style={{ color: '#fff' }}>{directQty}</b>
                    <button onClick={() => setDirectQty(prev => prev + 1)} style={{ margin: '0 5px', padding: '0 5px', background: '#222', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '10px 15px', borderRadius: '8px', fontSize: '0.8rem', color: '#aaa' }}>
                {t.soldBy} <b style={{ color: '#ffd700' }}>Luxury Store & Vendor (Jodhpur)</b>
              </div>

              {/* 🔑 Address Box और Change बटन */}
              <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px 15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>{customerInfo.name} &bull; <span style={{ color: '#aaa', fontWeight: 'normal' }}>{customerInfo.phone}</span></div>
                    <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '3px' }}>{customerInfo.address}</div>
                  </div>
                  <button onClick={() => setShowAddressForm(true)} style={{ backgroundColor: '#221e18', border: '1px solid #d4af37', color: '#ffd700', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.changeBtn}
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px 15px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: '#ffd700' }}>{t.priceDetails} ({directQty} Item)</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#aaa', marginBottom: '5px' }}>
                  <span>{t.productPrice}</span>
                  <span>+₹{priceDetails.productPriceTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#68e1d5', marginBottom: '5px' }}>
                  <span>{t.totalDiscounts}</span>
                  <span>-₹{priceDetails.totalDiscounts}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ffd700', marginBottom: '8px', borderBottom: '1px solid #33291a', paddingBottom: '8px' }}>
                  <span>{t.gstAdded}</span>
                  <span>+₹{priceDetails.gstAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>
                  <span>{t.orderTotal}</span>
                  <span style={{ color: '#ffd700' }}>₹{priceDetails.orderTotal}</span>
                </div>
              </div>

              <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#12100e', borderTop: '1px solid #d4af37', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1001 }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffd700' }}>₹{priceDetails.orderTotal} <span style={{ fontSize: '0.75rem', color: '#68e1d5', backgroundColor: '#1c1815', padding: '2px 6px', borderRadius: '4px', border: '1px solid #68e1d5' }}>₹{priceDetails.totalDiscounts} OFF</span></div>
                </div>
                <button onClick={() => setBuyNowStep(2)} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', borderRadius: '6px', padding: '10px 30px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>
                  {t.continueBtn}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ffd700' }}>{t.selectPayment}</div>

              <div onClick={() => setPaymentMethod('cod')} style={{ backgroundColor: '#161310', padding: '15px', borderRadius: '8px', border: paymentMethod === 'cod' ? '2px solid #ffd700' : '1px solid #33291a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>₹{priceDetails.orderTotal} &nbsp; <span style={{ fontWeight: 'normal', color: '#aaa' }}>{t.cod}</span> 💵</div>
                </div>
                <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
              </div>

              <div onClick={() => setPaymentMethod('online')} style={{ backgroundColor: '#161310', padding: '15px', borderRadius: '8px', border: paymentMethod === 'online' ? '2px solid #ffd700' : '1px solid #33291a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#777', textDecoration: 'line-through' }}>₹{priceDetails.orderTotal}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>₹{priceDetails.finalAmountToPay} &nbsp; <span style={{ color: '#68e1d5' }}>{t.payOnline} 📱</span></div>
                  <div style={{ fontSize: '0.75rem', color: '#68e1d5', backgroundColor: '#1c1815', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px', border: '1px solid rgba(104, 225, 213, 0.3)' }}>{t.onlineDiscountNote}</div>
                </div>
                <input type="radio" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
              </div>

              <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px 15px', borderRadius: '8px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#aaa', marginBottom: '5px' }}>
                  <span>{t.orderTotal}</span>
                  <span>₹{priceDetails.orderTotal}</span>
                </div>
                {paymentMethod === 'online' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#68e1d5', marginBottom: '5px' }}>
                    <span>Online Payment Discount</span>
                    <span>-₹13</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', borderTop: '1px solid #33291a', paddingTop: '8px', marginTop: '5px' }}>
                  <span>{t.amountToPay}</span>
                  <span style={{ color: '#ffd700' }}>₹{priceDetails.finalAmountToPay}</span>
                </div>
              </div>

              <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#12100e', borderTop: '1px solid #d4af37', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1001 }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffd700' }}>₹{priceDetails.finalAmountToPay}</div>
                </div>
                <button onClick={handlePlaceDirectOrder} style={{ backgroundColor: '#ffd700', color: '#000', border: 'none', borderRadius: '6px', padding: '12px 35px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }}>
                  {t.placeOrder}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'logincasmer' ? (
        <Login 
          setCurrentTab={setActiveTab} 
          setIsLoggedIn={(val) => {}}
          setProfile={(profileData) => {
            if (profileData) {
              setActiveUser(profileData);
              setUserName(profileData.name || 'bunty');
              setCustomerInfo(prev => ({
                ...prev,
                name: profileData.name || 'bunty',
                phone: profileData.phone || prev.phone
              }));
            }
          }}
          setCurrentUser={(user) => {
            if (user) {
              setActiveUser(user);
              setUserName(user.name || 'bunty');
              setActiveTab('home');
            }
          }} 
        />
      ) : selectedProduct ? (
        <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box', maxWidth: '650px', margin: '0 auto' }}>
          <button 
            onClick={() => setSelectedProduct(null)} 
            style={{ backgroundColor: 'transparent', color: '#d4af37', border: '1px solid #d4af37', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', marginBottom: '15px', fontWeight: 'bold', fontSize: '0.85rem' }}
          >
            {t.backToHome}
          </button>
          
          {/* 🖼️ High-Quality AI Enhanced Product Card */}
          <div style={{ 
            backgroundColor: '#161310', 
            border: '1.5px solid #d4af37', 
            borderRadius: '14px', 
            padding: '12px', 
            marginBottom: '15px', 
            boxSizing: 'border-box',
            boxShadow: '0 8px 30px rgba(212,175,55,0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
              transform: 'skewX(-20deg)',
              animation: 'shimmer 3s infinite',
              pointerEvents: 'none',
              zIndex: 3
            }} />

            <div style={{ 
              width: '100%', 
              height: '360px', 
              borderRadius: '10px', 
              overflow: 'hidden', 
              position: 'relative',
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(212,175,55,0.3)'
            }}>
              <span style={{ 
                position: 'absolute', top: '12px', right: '12px', 
                background: 'linear-gradient(135deg, #ffd700, #ffaa00)', color: '#000', fontSize: '0.7rem', 
                padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', zIndex: 4,
                fontFamily: '"Cinzel", serif', boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}>
                {t.aiHdPremium}
              </span>
              <img 
                src={selectedProduct.img || selectedProduct.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200"} 
                alt={selectedProduct.title || selectedProduct.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'contrast(1.05) saturate(1.05)' }} 
              />
            </div>

            {/* 📊 Item Name, Price, Wishlist & Share Section */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '15px', 
              padding: '0 5px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '160px' }}>
                <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                  {selectedProduct.title || selectedProduct.name || 'Luxury Item'}
                </span>
                <span style={{ color: '#aaa', fontSize: '0.75rem', marginTop: '2px' }}>{t.itemName}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#221e18', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.4)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.41 11.58L12.42 2.59C12.05 2.22 11.55 2 11.03 2H4C2.9 2 2 2.9 2 4V11.03C2 11.55 2.22 12.05 2.59 12.42L11.58 21.41C12.37 22.2 13.63 22.2 14.41 21.41L21.41 14.41C22.2 13.63 22.2 12.37 21.41 11.58ZM6.5 8C5.67 8 5 7.33 5 6.5C5 5.67 5.67 5 6.5 5C7.33 5 8 5.67 8 6.5C8 7.33 7.33 8 6.5 8Z"/>
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#ffd700', fontSize: '0.95rem', fontWeight: 'bold' }}>
                    {selectedProduct.price || "₹199"}
                  </span>
                  <span style={{ color: '#888', fontSize: '0.65rem' }}>{t.priceAmount}</span>
                </div>
              </div>

              <div 
                onClick={() => handleAddToWishlist(selectedProduct, 0)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', background: '#221e18', padding: '6px 10px', borderRadius: '8px', border: '1px solid #33291a' }}
              >
                <span style={{ fontSize: '1.1rem' }}>❤️</span>
                <span style={{ color: '#fff', fontSize: '0.7rem', marginTop: '2px' }}>{t.wishlist}</span>
              </div>

              <div 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: selectedProduct.title, url: window.location.href }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert(t.linkCopied);
                  }
                }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', background: '#221e18', padding: '6px 10px', borderRadius: '8px', border: '1px solid #33291a' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                <span style={{ color: '#fff', fontSize: '0.7rem', marginTop: '2px' }}>{t.share}</span>
              </div>
            </div>

            <div style={{ 
              marginTop: '15px', 
              backgroundColor: '#1c1815', 
              border: '1px solid #33291a', 
              borderRadius: '6px', 
              padding: '8px', 
              textAlign: 'center', 
              color: '#d4af37', 
              fontSize: '0.85rem' 
            }}>
              {storeOfferText}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
            <button onClick={() => handleAddToCart(selectedProduct)} style={{ flex: 1, backgroundColor: '#222', color: '#d4af37', border: '1px solid #d4af37', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}>
              {t.addToCartBtn}
            </button>
            <button onClick={() => handleStartBuyNow(selectedProduct)} style={{ flex: 1, backgroundColor: '#ffd700', color: '#000', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}>
              {t.buyNowBtn}
            </button>
          </div>

          {/* 🔍 Similar Items Section */}
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#ffd700', fontSize: '1.1rem', marginBottom: '12px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '6px' }}>
              {t.similarItems}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {allProducts.filter(p => (p.id || p._id) !== (selectedProduct.id || selectedProduct._id)).slice(0, 4).map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleSelectProduct(item)}
                  style={{ 
                    backgroundColor: '#161310', 
                    border: '1px solid #33291a', 
                    borderRadius: '8px', 
                    padding: '10px', 
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <img 
                    src={item.img || item.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500"} 
                    alt={item.title || item.name} 
                    style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px' }} 
                  />
                  <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title || item.name}
                  </div>
                  <div style={{ color: '#ffd700', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {item.price || "₹999"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        activeTab === 'home' && (
          <Home 
            products={allProducts} 
            onSelectProduct={handleSelectProduct} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            bannerImage={bannerImage} 
            storeOfferText={storeOfferText} 
            categories={categories}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
            setCurrentTab={setActiveTab} 
          />
        )
      )}

      {activeTab === 'cart' && (
        <Cart 
          setActiveTab={setActiveTab} 
          cartItems={cart} 
          setCartItems={setCart} 
          userEmail={activeUser?.email || userEmail} 
          customerInfo={customerInfo} 
          setCustomerInfo={setCustomerInfo} 
          BACKEND={BACKEND}
        />
      )}
      
      {activeTab === 'wishlist' && (
        <Wishlist 
          setActiveTab={setActiveTab} 
          wishlistItems={wishlist} 
          onRemoveFromWishlist={handleRemoveFromWishlist} 
          onAddToCart={handleAddToCart} 
        />
      )}

      {activeTab === 'account' && <Account setActiveTab={setActiveTab} isUserLoggedIn={isUserLoggedIn} />}
      {activeTab === 'register' && <ShopRegistration setActiveTab={setActiveTab} />}
      {activeTab === 'shopRegistration' && <ShopRegistration setActiveTab={setActiveTab} />}
      {activeTab === 'adminDashboard' && <AdminDashboard />}
      {activeTab === 'vendorDashboard' && <VendorDashboard setActiveTab={setActiveTab} />}
      {activeTab === 'orderHistory' && (
        <OrderHistory 
          setActiveTab={setActiveTab} 
          userEmail={activeUser?.email || localStorage.getItem('customerEmail') || userEmail} 
          authToken={localStorage.getItem('customerToken') || activeUser?.token}
        />
      )}
         
      <Minu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} setActiveTab={setActiveTab} />

      <DualOtpModal 
        isOpen={isOtpModalOpen} 
        email={otpEmail} 
        onClose={() => setIsOtpModalOpen(false)} 
        onVerifySuccess={() => {
          alert(t.authSuccess);
          setActiveTab('vendorDashboard');
        }}
      />

      {/* बॉटम नेविगेशन बार */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%',
        backgroundColor: '#0c0b0a', borderTop: '1px solid #d4af37',
        display: 'flex', justifyContent: 'space-around', padding: '15px 0',
        fontSize: '0.95rem', zIndex: 1000, boxShadow: '0 -5px 25px rgba(0,0,0,0.9)', boxSizing: 'border-box'
      }}>
        <div onClick={() => { setActiveTab('home'); setSelectedProduct(null); setBuyNowItem(null); setShowAddressForm(false); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'home' && !selectedProduct && !buyNowItem && !showAddressForm ? '#d4af37' : '#777' }}>
          <div style={{ fontSize: '1rem' }}>🏠</div>{t.home}
        </div>
        <div onClick={() => { setActiveTab('cart'); setSelectedProduct(null); setBuyNowItem(null); setShowAddressForm(false); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'cart' ? '#d4af37' : '#777' }}>
          <div style={{ fontSize: '1rem' }}>🛒</div>{t.cart}
        </div>
        <div onClick={() => { setActiveTab('wishlist'); setSelectedProduct(null); setBuyNowItem(null); setShowAddressForm(false); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'wishlist' ? '#d4af37' : '#777' }}>
          <div style={{ fontSize: '1rem' }}>🤍</div>{t.wishlist}
        </div>
        <div onClick={() => { setActiveTab('account'); setSelectedProduct(null); setBuyNowItem(null); setShowAddressForm(false); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'account' ? '#d4af37' : '#777' }}>
          <div style={{ fontSize: '1rem' }}>👤</div>{t.account}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🚀 मुख्य App कंपोनेंट
// ==========================================
export default function App() {
  useEffect(() => {
    const socket = io("http://localhost:5001", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true
    });

    socket.on("connect", () => {
      console.log("⚡ Connected to Socket Server with ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.warn("⚠️ Socket connection error:", err.message);
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <LanguageProvider>
      <LuxuryHomePerfectWidth />
    </LanguageProvider>
  );
}