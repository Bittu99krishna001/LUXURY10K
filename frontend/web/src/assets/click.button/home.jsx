import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo
} from 'react';

// 🌐 Dynamic Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// 🖼️ Lightweight SVG fallback
const FALLBACK_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'><rect width='100%' height='100%' fill='%23130f1c'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23dfb15b' font-size='14'>Luxury Store</text></svg>";

const MAX_SEARCH_LENGTH = 100;
const MAX_BANNER_TEXT_LENGTH = 300;
const MAX_BANNER_URL_LENGTH = 2048;

// 🌐 Multi-language Dictionary (सभी 8 भाषाएं - सम्पूर्ण टेक्स्ट सपोर्ट)
const TRANSLATIONS = {
  English: {
    searchPlaceholder: "Search products, brands or categories...",
    freeShipping: "🚚 Free Shipping Above ₹999",
    fastDelivery: "Fast & Reliable Delivery",
    originalProducts: "🛡️ 100% Original Products",
    brandGuarantee: "Brand Guarantee",
    easyReturns: "🔄 Easy Returns & Exchange",
    hassleFree: "Hassle Free",
    exclusive: "EXCLUSIVE COLLECTION",
    heroTitle: "PREMIUM MEN'S FASHION",
    shopNow: "SHOP NOW ➔",
    luxuryBrands: "Luxury Brands",
    topPicks: "TOP PICKS FOR YOU",
    bestDeals: "👑 Best Deals for You",
    viewAll: "View All ➔",
    popularCategories: "🔥 Popular Categories",
    outOfStock: "OUT OF STOCK",
    soldOut: "SOLD OUT",
    addToCart: "🛒 ADD TO CART",
    adding: "ADDING...",
    home: "Home",
    categories: "Categories",
    wishlist: "Wishlist",
    cart: "Cart",
    account: "Account",
    securePayments: "Secure Payments",
    safe100: "100% Safe",
    support247: "24/7 Support",
    hereWeAre: "We're Here",
    premiumQuality: "Premium Quality",
    trustedMillions: "Trusted by Millions",
    days25: "2-5 Days"
  },
  Hindi: {
    searchPlaceholder: "प्रोडक्ट्स, ब्रांड्स या कैटेगरी खोजें...",
    freeShipping: "🚚 ₹999 से ऊपर मुफ्त शिपिंग",
    fastDelivery: "तेज़ और सुरक्षित डिलीवरी",
    originalProducts: "🛡️ 100% ओरिजिनल प्रोडक्ट्स",
    brandGuarantee: "ब्रांड की गारंटी",
    easyReturns: "🔄 आसान रिटर्न और एक्सचेंज",
    hassleFree: "बिना किसी परेशानी के",
    exclusive: "विशेष कलेक्शन",
    heroTitle: "प्रीमियम पुरुषों का फैशन",
    shopNow: "अभी खरीदें ➔",
    luxuryBrands: "लक्ज़री ब्रांड्स",
    topPicks: "आपके लिए खास पसंद",
    bestDeals: "👑 आपके लिए बेहतरीन डील्स",
    viewAll: "सभी देखें ➔",
    popularCategories: "🔥 लोकप्रिय श्रेणियां",
    outOfStock: "स्टॉक समाप्त",
    soldOut: "बिक गया",
    addToCart: "🛒 कार्ट में डालें",
    adding: "जोड़ा जा रहा है...",
    home: "होम",
    categories: "कैटेगरी",
    wishlist: "विशलिस्ट",
    cart: "कार्ट",
    account: "अकाउंट",
    securePayments: "सुरक्षित भुगतान",
    safe100: "100% सुरक्षित",
    support247: "24/7 सहायता",
    hereWeAre: "हम यहाँ हैं",
    premiumQuality: "प्रीमियम गुणवत्ता",
    trustedMillions: "लाखों द्वारा भरोसेमंद",
    days25: "२-५ दिन"
  },
  Tamil: {
    searchPlaceholder: "தயார்பொருட்கள், பிராண்டுகள் அல்லது வகைகளைத் தேடுங்கள்...",
    freeShipping: "🚚 ₹999க்கு மேல் இலவச ஷிப்பிங்",
    fastDelivery: "விரைவான டெலிவரி",
    originalProducts: "🛡️ 100% உண்மையான பொருட்கள்",
    brandGuarantee: "பிராண்ட் உத்தரவாதம்",
    easyReturns: "🔄 எளிதான ரிட்டர்ன்ஸ்",
    hassleFree: "சிக்கல் இல்லாதது",
    exclusive: "பிரத்யேக சேகரிப்பு",
    heroTitle: "பிரீமியம் ஆண்கள் பேஷன்",
    shopNow: "இப்போது வாங்குங்கள் ➔",
    luxuryBrands: "லக்சரி பிராண்டுகள்",
    topPicks: "உங்களுக்காக தேர்ந்தெடுக்கப்பட்டவை",
    bestDeals: "👑 சிறந்த சலுகைகள்",
    viewAll: "அனைத்தையும் காண்க ➔",
    popularCategories: "🔥 பிரபலமான வகைகள்",
    outOfStock: "ஸ்டாக் இல்லை",
    soldOut: "விற்றுவிட்டது",
    addToCart: "🛒 கார்ட்டில் சேர்",
    adding: "சேர்க்கிறது...",
    home: "முகப்பு",
    categories: "வகைகள்",
    wishlist: "விருப்பப்பட்டியல்",
    cart: "கார்ட்",
    account: "கணக்கு",
    securePayments: "பாதுகாப்பான கட்டணம்",
    safe100: "100% பாதுகாப்பானது",
    support247: "24/7 உதவி",
    hereWeAre: "நாங்கள் இருக்கிறோம்",
    premiumQuality: "பிரீமியம் தரம்",
    trustedMillions: "மக்களின் நம்பிக்கை",
    days25: "2-5 நாட்கள்"
  },
  Marathi: {
    searchPlaceholder: "उत्पादने, ब्रँड किंवा श्रेणी शोधा...",
    freeShipping: "🚚 ₹999 पेक्षा जास्त मोफत शिपिंग",
    fastDelivery: "जलद आणि विश्वसनीय डिलिव्हरी",
    originalProducts: "🛡️ 100% अस्सल उत्पादने",
    brandGuarantee: "ब्रँड हमी",
    easyReturns: "🔄 सुलभ परतावा आणि बदल",
    hassleFree: "कोणत्याही त्रासाशिवाय",
    exclusive: "खास संग्रह",
    heroTitle: "उत्कृष्ट पुरुषांची फॅशन",
    shopNow: "आता खरेदी करा ➔",
    luxuryBrands: "लക്झरी ब्रँड्स",
    topPicks: "तुमच्यासाठी खास पसंती",
    bestDeals: "👑 सर्वोत्तम डील्स",
    viewAll: "सर्व पहा ➔",
    popularCategories: "🔥 लोकप्रिय श्रेणी",
    outOfStock: "स्टॉक संपला",
    soldOut: "विकले गेले",
    addToCart: "🛒 कार्टमध्ये टाका",
    adding: "जोडत आहे...",
    home: "होम",
    categories: "श्रेणी",
    wishlist: "विशलिस्ट",
    cart: "कार्ट",
    account: "खाते",
    securePayments: "सुरक्षित पेमेंट",
    safe100: "100% सुरक्षित",
    support247: "24/7 मदत",
    hereWeAre: "आम्ही उपलब्ध आहोत",
    premiumQuality: "उत्कृष्ट गुणवत्ता",
    trustedMillions: "लोकांचा विश्वास",
    days25: "२-५ दिवस"
  },
  Bengali: {
    searchPlaceholder: "পণ্য, ব্র্যান্ড বা ক্যাটাগরি খুঁজুন...",
    freeShipping: "🚚 ৯৯৯ টাকার উপরে ফ্রি শিপিং",
    fastDelivery: "দ্রুত ও নিরাপদ ডেলিভারি",
    originalProducts: "🛡️ ১০০% আসল পণ্য",
    brandGuarantee: "ব্র্যান্ড গ্যারান্টি",
    easyReturns: "🔄 সহজ রিটার্ন ও এক্সচেঞ্জ",
    hassleFree: "ঝামেলা মুক্ত",
    exclusive: "এক্সক্লুসিভ কালেকশন",
    heroTitle: "প্রিমিয়াম মেনস ফ্যাশন",
    shopNow: "এখনই কিনুন ➔",
    luxuryBrands: "লাক্সারি ব্র্যান্ডস",
    topPicks: "আপনার জন্য সেরা পছন্দ",
    bestDeals: "👑 সেরা ডিলসমূহ",
    viewAll: "সব দেখুন ➔",
    popularCategories: "🔥 জনপ্রিয় ক্যাটাগরি",
    outOfStock: "স্টক শেষ",
    soldOut: "বিক্রি হয়ে গেছে",
    addToCart: "🛒 কার্টে যোগ করুন",
    adding: "যোগ করা হচ্ছে...",
    home: "হোম",
    categories: "ক্যাটাগরি",
    wishlist: "পছন্দের তালিকা",
    cart: "কার্ট",
    account: "অ্যাকাউন্ট",
    securePayments: "নিরাপদ পেমেন্ট",
    safe100: "১০০% নিরাপদ",
    support247: "২৪/৭ সহায়তা",
    hereWeAre: "আমরা আছি",
    premiumQuality: "প্রিমিয়াম গুণমান",
    trustedMillions: "লক্ষ লক্ষ মানুষের বিশ্বাস",
    days25: "২-৫ দিন"
  },
  Telugu: {
    searchPlaceholder: "ఉత్పత్తులు, బ్రాండ్‌లు లేదా వర్గాలను వెతకండి...",
    freeShipping: "🚚 ₹999 పైన ఉచిత షిప్పింగ్",
    fastDelivery: "వేగవంతమైన డెలివరీ",
    originalProducts: "🛡️ 100% అసలైన ఉత్పత్తులు",
    brandGuarantee: "బ్రాండ్ గ్యారెంటీ",
    easyReturns: "🔄 సులభమైన రిటర్న్స్",
    hassleFree: "సమస్య లేనిది",
    exclusive: "ప్రత్యేకమైన సేకరణ",
    heroTitle: "ప్రీమియం మెన్స్ ఫ్యాషన్",
    shopNow: "ఇప్పుడే కొనండి ➔",
    luxuryBrands: "లగ్జరీ బ్రాండ్స్",
    topPicks: "మీ కోసం ప్రత్యేక ఎంపికలు",
    bestDeals: "👑 ఉత్తమ ఆఫర్లు",
    viewAll: "అన్నీ చూడండి ➔",
    popularCategories: "🔥 ప్రముఖ వర్గాలు",
    outOfStock: "స్టాక్ లేదు",
    soldOut: "అమ్మడైంది",
    addToCart: "🛒 కార్ట్‌కి జోడించు",
    adding: "జోడిస్తోంది...",
    home: "హోమ్",
    categories: "వర్గాలు",
    wishlist: "విష్‌లిస్ట్",
    cart: "కార్ట్",
    account: "ఖాతా",
    securePayments: "సురక్షిత చెల్లింపులు",
    safe100: "100% సురక్షితం",
    support247: "24/7 మద్దతు",
    hereWeAre: "మేమున్నాము",
    premiumQuality: "అధిక నాణ్యత",
    trustedMillions: "ప్రజల నమ్మకం",
    days25: "2-5 రోజులు"
  },
  Kannada: {
    searchPlaceholder: "ಉತ್ಪನ್ನಗಳು, ಬ್ರ್ಯಾಂಡ್‌ಗಳು ಅಥವಾ ವರ್ಗಗಳನ್ನು ಹುಡುಕಿ...",
    freeShipping: "🚚 ₹999 ಮೇಲ್ಪಟ್ಟ ಆದೇಶಗಳಿಗೆ ಉಚಿತ ಶಿಪ್ಪಿಂಗ್",
    fastDelivery: "ವೇಗದ ವಿತರಣೆ",
    originalProducts: "🛡️ 100% ಅಸಲಿ ಉತ್ಪನ್ನಗಳು",
    brandGuarantee: "ಬ್ರ್ಯಾಂಡ್ ಖಾತರಿ",
    easyReturns: "🔄 ಸುಲಭ ರಿಟರ್ನ್ಸ್",
    hassleFree: "ಯಾವುದೇ ತೊಂದರೆಯಿಲ್ಲದೆ",
    exclusive: "ವಿಶೇಷ ಸಂಗ್ರಹ",
    heroTitle: "ಪ್ರೀಮಿಯಂ ಪುರುಷರ ಫ್ಯಾಷನ್",
    shopNow: "ಈಗ ಖರೀದಿಸಿ ➔",
    luxuryBrands: "ಲಕ್ಸುರಿ ಬ್ರ್ಯಾಂಡ್ಸ್",
    topPicks: "ನಿಮಗಾಗಿ ಆಯ್ಕೆಗಳು",
    bestDeals: "👑 ಅತ್ಯುತ್ತಮ ಕೊಡುಗೆಗಳು",
    viewAll: "ಎಲ್ಲವನ್ನು ವೀಕ್ಷಿಸಿ ➔",
    popularCategories: "🔥 ಜನಪ್ರಿಯ ವರ್ಗಗಳು",
    outOfStock: "ಸ್ಟಾಕ್ ಇಲ್ಲ",
    soldOut: "ಖಾಲಿಯಾಗಿದೆ",
    addToCart: "🛒 ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
    adding: "ಸೇರಿಸಲಾಗುತ್ತಿದೆ...",
    home: "ಮುಖಪುಟ",
    categories: "ವರ್ಗಗಳು",
    wishlist: "ಇಷ್ಟಪಟ್ಟಿ",
    cart: "ಕಾರ್ಟ್",
    account: "ಖಾತೆ",
    securePayments: "ಸುರಕ್ಷಿತ ಪಾವತಿ",
    safe100: "100% ಸುರಕ್ಷಿತ",
    support247: "24/7 ಬೆಂಬಲ",
    hereWeAre: "ನಾವು ಇಲ್ಲಿದ್ದೇವೆ",
    premiumQuality: "ಉತ್ತಮ ಗುಣಮಟ್ಟ",
    trustedMillions: "ಜನರ ನಂಬಿಕೆ",
    days25: "2-5 ದಿನಗಳು"
  },
  Malayalam: {
    searchPlaceholder: "ഉൽപ്പന്നങ്ങളോ ബ്രാൻഡുകളോ തിരയുക...",
    freeShipping: "🚚 ₹999-ൽ കൂടുതൽ സൗജന്യ ഷിപ്പിംഗ്",
    fastDelivery: "വേഗത്തിലുള്ള ഡെലിവറി",
    originalProducts: "🛡️ 100% യഥാർത്ഥ ഉൽപ്പന്നങ്ങൾ",
    brandGuarantee: "ബ്രാൻഡ് ഗ്യാരണ്ടി",
    easyReturns: "🔄 എളുപ്പമുള്ള റിട്ടേണുകൾ",
    hassleFree: "ബുദ്ധിമുട്ടില്ലാതെ",
    exclusive: "എക്സ്ക്ലൂസീവ് ശേഖരം",
    heroTitle: "പ്രീമിയം മെൻസ് ഫാഷൻ",
    shopNow: "ഇപ്പോൾ വാങ്ങുക ➔",
    luxuryBrands: "ലക്സറി ബ്രാൻഡുകൾ",
    topPicks: "നിങ്ങൾക്കായുള്ള തിരഞ്ഞെടുപ്പുകൾ",
    bestDeals: "👑 മികച്ച ഡീലുകൾ",
    viewAll: "എല്ലാം കാണുക ➔",
    popularCategories: "🔥 ജനപ്രിയ വിഭാഗങ്ങൾ",
    outOfStock: "സ്റ്റോക്കില്ല",
    soldOut: "വിറ്റുപോയി",
    addToCart: "🛒 കാർട്ടിലേക്ക് ചേർക്കുക",
    adding: "ചേർക്കുന്നു...",
    home: "ഹോം",
    categories: "വിഭാഗങ്ങൾ",
    wishlist: "വിഷ്‌ലിസ്റ്റ്",
    cart: "കാർട്ട്",
    account: "അക്കൗണ്ട്",
    securePayments: "സുരക്ഷിത പേയ്മെന്റ്",
    safe100: "100% സുരക്ഷിതം",
    support247: "24/7 പിന്തുണ",
    hereWeAre: "ഞങ്ങൾ കൂടെയുണ്ട്",
    premiumQuality: "പ്രീമിയം ഗുണനിലവാരം",
    trustedMillions: "ലക്ഷക്കണക്കിന് ആളുകളുടെ വിശ്വാസം",
    days25: "2-5 ദിവസം"
  }
};

export default function Home({
  products = [],
  onSelectProduct,
  searchQuery = '',
  setSearchQuery,
  bannerImage = '',
  setBannerImage,
  storeOfferText = '',
  setStoreOfferText,
  categories: propCategories = [],
  onAddToCart,
  onAddToWishlist,
  wishlist = [],
  setCurrentTab,
  currentUser = null
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [newBannerInput, setNewBannerInput] = useState(bannerImage || '');
  const [newOfferInput, setNewOfferInput] = useState(storeOfferText || '');
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery || '');
  const [toastMessage, setToastMessage] = useState('');

  const [dynamicOffers, setDynamicOffers] = useState([]);
  const [dynamicCategories, setDynamicCategories] = useState([]);

  const [promotionalLoading, setPromotionalLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [savingBanner, setSavingBanner] = useState(false);
  const [cartLoadingId, setCartLoadingId] = useState(null);

  // 🌟 ऑटो-स्लाइडर बैनर (प्रत्येक 5 सेकंड में ऑटो-चेंज लॉजिक)
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    { tag: TRANSLATIONS.English.exclusive, title: TRANSLATIONS.English.heroTitle, subtitle: "Style | Comfort | Confidence" },
    { tag: "SPECIAL FESTIVE DEAL", title: "ROYAL WEDDING COLLECTION", subtitle: "Flat 40% OFF on Sherwanis & Suits" },
    { tag: "NEW ARRIVALS", title: "LUXURY FOOTWEAR & WATCHES", subtitle: "Step out in absolute elegance" }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  // 🌐 भाषा सिंक स्टेट (Account पेज से जुड़ी हुई)
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      return localStorage.getItem('appLanguage') || 'English';
    } catch {
      return 'English';
    }
  });

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['English'];

  const searchRef = useRef(null);
  const toastTimerRef = useRef(null);

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

  // ---------------------------------------------------------
  // Toast
  // ---------------------------------------------------------

  const showToast = useCallback((msg) => {
    setToastMessage(String(msg || ''));

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToastMessage('');
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  // ---------------------------------------------------------
  // Current User
  // ---------------------------------------------------------

  const [activeUser, setActiveUser] = useState(() => {
    try {
      if (currentUser) {
        return currentUser;
      }

      const savedUser =
        localStorage.getItem('luxury_current_user') ||
        localStorage.getItem('customerProfile');

      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('User state error:', error);
      return currentUser || null;
    }
  });

  useEffect(() => {
    setActiveUser(currentUser || null);

    try {
      if (currentUser) {
        localStorage.setItem(
          'luxury_current_user',
          JSON.stringify(currentUser)
        );
      } else {
        localStorage.removeItem('luxury_current_user');
      }
    } catch (error) {
      console.error('localStorage sync error:', error);
    }
  }, [currentUser]);

  const isVendorOwner =
    activeUser?.isVendor === true ||
    activeUser?.role === 'vendor';

  const activeVendorEmail =
    typeof activeUser?.email === 'string'
      ? activeUser.email.trim()
      : typeof activeUser?.vendorEmail === 'string'
        ? activeUser.vendorEmail.trim()
        : '';

  // ---------------------------------------------------------
  // Safe API helper
  // ---------------------------------------------------------

  const getCustomerToken = useCallback(() => {
    try {
      return localStorage.getItem('customerToken') || '';
    } catch {
      return '';
    }
  }, []);

  const authenticatedHeaders = useCallback(
    (includeJson = false) => {
      const headers = {};

      if (includeJson) {
        headers['Content-Type'] = 'application/json';
      }

      const token = getCustomerToken();

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return headers;
    },
    [getCustomerToken]
  );

  const handleUnauthorized = useCallback(() => {
    try {
      localStorage.removeItem('customerToken');
      localStorage.removeItem('luxury_current_user');
      localStorage.removeItem('customerProfile');
    } catch (error) {
      console.error('Session cleanup error:', error);
    }

    setActiveUser(null);

    showToast('आपका सेशन समाप्त हो गया है। दोबारा लॉगिन करें।');

    if (typeof setCurrentTab === 'function') {
      setCurrentTab('logincasmer');
    }
  }, [setCurrentTab, showToast]);

  // ---------------------------------------------------------
  // Authentication Guard
  // ---------------------------------------------------------

  const checkUserLoggedInOrRedirect = useCallback(() => {
    const token = getCustomerToken();

    if (!token) {
      showToast('🚨 कृपया आगे बढ़ने के लिए लॉगिन करें!');

      if (typeof setCurrentTab === 'function') {
        setCurrentTab('logincasmer');
      }

      return false;
    }

    return true;
  }, [getCustomerToken, setCurrentTab, showToast]);

  // ---------------------------------------------------------
  // Promotional Data
  // ---------------------------------------------------------

  useEffect(() => {
    const controller = new AbortController();

    const fetchPromotionalData = async () => {
      if (!API_BASE_URL) return;

      setPromotionalLoading(true);

      try {
        let shopId = '';

        try {
          shopId = localStorage.getItem('shopId') || '';
        } catch {
          shopId = '';
        }

        const query = new URLSearchParams();

        if (shopId) {
          query.set('shop_id', shopId);
        }

        if (activeVendorEmail) {
          query.set('vendorEmail', activeVendorEmail);
        }

        const offersUrl =
          `${API_BASE_URL}/api/vendor/offers` +
          (query.toString() ? `?${query.toString()}` : '');

        const categoriesUrl =
          `${API_BASE_URL}/api/vendor/categories` +
          (query.toString() ? `?${query.toString()}` : '');

        const [offersRes, catRes] = await Promise.all([
          fetch(offersUrl, {
            method: 'GET',
            headers: authenticatedHeaders(false),
            credentials: 'include',
            signal: controller.signal
          }),
          fetch(categoriesUrl, {
            method: 'GET',
            headers: authenticatedHeaders(false),
            credentials: 'include',
            signal: controller.signal
          })
        ]);

        if (offersRes.status === 401 || catRes.status === 401) {
          handleUnauthorized();
          return;
        }

        if (offersRes.ok) {
          const offersData = await offersRes.json();

          if (!controller.signal.aborted) {
            setDynamicOffers(
              Array.isArray(offersData) ? offersData : []
            );
          }
        } else {
          setDynamicOffers([]);
        }

        if (catRes.ok) {
          const catData = await catRes.json();

          if (!controller.signal.aborted) {
            setDynamicCategories(
              Array.isArray(catData) ? catData : []
            );
          }
        } else {
          setDynamicCategories([]);
        }
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error(
            'Promotional data fetch error:',
            error
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setPromotionalLoading(false);
        }
      }
    };

    fetchPromotionalData();

    return () => {
      controller.abort();
    };
  }, [
    activeVendorEmail,
    authenticatedHeaders,
    handleUnauthorized
  ]);

  // ---------------------------------------------------------
  // Click outside search
  // ---------------------------------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  // ---------------------------------------------------------
  // Search debounce
  // ---------------------------------------------------------

  useEffect(() => {
    const safeSearch = String(searchQuery || '').slice(
      0,
      MAX_SEARCH_LENGTH
    );

    const handler = setTimeout(() => {
      setDebouncedSearch(safeSearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // ---------------------------------------------------------
  // Banner Fetch
  // ---------------------------------------------------------

  useEffect(() => {
    const controller = new AbortController();

    const fetchStoreBanner = async () => {
      if (!API_BASE_URL) return;

      setBannerLoading(true);

      try {
        const query = new URLSearchParams();

        if (activeVendorEmail) {
          query.set(
            'vendorEmail',
            activeVendorEmail
          );
        }

        const response = await fetch(
          `${API_BASE_URL}/api/store-banner?${query.toString()}`,
          {
            method: 'GET',
            headers: authenticatedHeaders(false),
            credentials: 'include',
            signal: controller.signal
          }
        );

        if (response.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (
          !controller.signal.aborted &&
          data?.success &&
          data?.banner
        ) {
          const imageUrl =
            typeof data.banner.imageUrl === 'string'
              ? data.banner.imageUrl
              : '';

          const offerText =
            typeof data.banner.offerText === 'string'
              ? data.banner.offerText
              : '';

          if (setBannerImage) {
            setBannerImage(imageUrl);
          }

          if (setStoreOfferText) {
            setStoreOfferText(offerText);
          }
        }
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error(
            'Banner loading error:',
            error
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setBannerLoading(false);
        }
      }
    };

    fetchStoreBanner();

    return () => {
      controller.abort();
    };
  }, [
    activeVendorEmail,
    authenticatedHeaders,
    handleUnauthorized,
    setBannerImage,
    setStoreOfferText
  ]);

  // ---------------------------------------------------------
  // Banner Input Sync
  // ---------------------------------------------------------

  useEffect(() => {
    setNewBannerInput(
      typeof bannerImage === 'string'
        ? bannerImage
        : ''
    );

    setNewOfferInput(
      typeof storeOfferText === 'string'
        ? storeOfferText
        : ''
    );
  }, [bannerImage, storeOfferText]);

  // ---------------------------------------------------------
  // Product Search
  // ---------------------------------------------------------

  const safeProducts = useMemo(() => {
    return Array.isArray(products)
      ? products
      : [];
  }, [products]);

  const normalizedSearch = useMemo(() => {
    return String(debouncedSearch || '')
      .trim()
      .toLowerCase();
  }, [debouncedSearch]);

  const filteredProducts = useMemo(() => {
    if (!normalizedSearch) {
      return safeProducts;
    }

    return safeProducts.filter((item) => {
      const searchableText = [
        item?.title,
        item?.name,
        item?.brand,
        item?.category,
        item?.color,
        item?.description,
        ...(Array.isArray(item?.tags)
          ? item.tags
          : [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(
        normalizedSearch
      );
    });
  }, [safeProducts, normalizedSearch]);

  const displayProducts =
    normalizedSearch === ''
      ? safeProducts
      : filteredProducts;

  // ---------------------------------------------------------
  // Protected Actions
  // ---------------------------------------------------------

  const handleProtectedAction = useCallback(
    (actionType, item, event = null) => {
      if (event) {
        event.stopPropagation();
      }

      if (!checkUserLoggedInOrRedirect()) {
        return;
      }

      if (
        actionType === 'view' &&
        onSelectProduct
      ) {
        onSelectProduct(item);
      }

      if (
        actionType === 'wishlist' &&
        onAddToWishlist
      ) {
        onAddToWishlist(item);
        showToast(
          '❤️ विशलिस्ट में अपडेट किया गया'
        );
      }

      setShowSuggestions(false);
    },
    [
      checkUserLoggedInOrRedirect,
      onSelectProduct,
      onAddToWishlist,
      showToast
    ]
  );

  // ---------------------------------------------------------
  // Add To Cart
  // ---------------------------------------------------------

  const handleAddToCartSecure = useCallback(
    async (item, event = null) => {
      if (event) {
        event.stopPropagation();
      }

      if (!checkUserLoggedInOrRedirect()) {
        return;
      }

      const itemId =
        item?._id ||
        item?.id ||
        '';

      if (!itemId) {
        showToast(
          '⚠️ Product ID उपलब्ध नहीं है।'
        );
        return;
      }

      if (cartLoadingId === itemId) {
        return;
      }

      const stock =
        item?.stock !== undefined
          ? Number(item.stock)
          : null;

      if (
        stock !== null &&
        Number.isFinite(stock) &&
        stock <= 0
      ) {
        showToast(
          '⚠️ यह product अभी out of stock है।'
        );
        return;
      }

      const itemPrice = Number(item?.price);

      if (
        !Number.isFinite(itemPrice) ||
        itemPrice < 0
      ) {
        showToast(
          '⚠️ Product price सही नहीं है।'
        );
        return;
      }

      const itemQuantity = 1;

      setCartLoadingId(itemId);

      try {
        if (!API_BASE_URL) {
          if (onAddToCart) {
            onAddToCart({
              ...item,
              quantity: itemQuantity
            });
          }

          showToast(
            '🛒 आइटम कार्ट में जोड़ा गया!'
          );

          return;
        }

        const token = getCustomerToken();

        if (!token) {
          handleUnauthorized();
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/api/cart`,
          {
            method: 'POST',
            headers: {
              ...authenticatedHeaders(true)
            },
            credentials: 'include',
            body: JSON.stringify({
              productId: String(itemId),
              quantity: itemQuantity
            })
          }
        );

        if (response.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!response.ok) {
          let errorMessage =
            'Cart में item add नहीं हो पाया।';

          try {
            const errorData =
              await response.json();

            if (
              typeof errorData?.message ===
              'string'
            ) {
              errorMessage =
                errorData.message;
            }
          } catch {
            // Ignore invalid JSON
          }

          showToast(`⚠️ ${errorMessage}`);
          return;
        }

        if (onAddToCart) {
          onAddToCart({
            ...item,
            quantity: itemQuantity
          });
        }

        showToast(
          '🛒 आइटम कार्ट में जोड़ा गया!'
        );
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error(
            'Cart error:',
            error
          );
        }

        showToast(
          '⚠️ Network error. कृपया दोबारा कोशिश करें।'
        );
      } finally {
        setCartLoadingId(null);
      }
    },
    [
      checkUserLoggedInOrRedirect,
      cartLoadingId,
      getCustomerToken,
      authenticatedHeaders,
      handleUnauthorized,
      onAddToCart,
      showToast
    ]
  );

  // ---------------------------------------------------------
  // Image Search
  // ---------------------------------------------------------

  const handleImageSearch = useCallback(
    (e) => {
      if (!checkUserLoggedInOrRedirect()) {
        return;
      }

      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp'
      ];

      if (!allowedTypes.includes(file.type)) {
        showToast(
          '⚠️ केवल JPG, PNG या WEBP image allowed है।'
        );
        e.target.value = '';
        return;
      }

      const MAX_IMAGE_SIZE =
        5 * 1024 * 1024;

      if (file.size > MAX_IMAGE_SIZE) {
        showToast(
          '⚠️ Image 5MB से छोटी होनी चाहिए।'
        );
        e.target.value = '';
        return;
      }

      showToast(
        `📸 ${file.name} select हुई।`
      );

      e.target.value = '';
    },
    [
      checkUserLoggedInOrRedirect,
      showToast
    ]
  );

  // ---------------------------------------------------------
  // Banner Validation
  // ---------------------------------------------------------

  const isValidHttpUrl = useCallback(
    (value) => {
      if (!value) return true;

      try {
        const url = new URL(value);

        return (
          url.protocol === 'https:' ||
          url.protocol === 'http:'
        );
      } catch {
        return false;
      }
    },
    []
  );

  // ---------------------------------------------------------
  // Save Banner
  // ---------------------------------------------------------

  const handleSaveBanner = useCallback(
    async () => {
      if (!checkUserLoggedInOrRedirect()) {
        return;
      }

      if (!isVendorOwner) {
        showToast(
          '🚫 Vendor permission required.'
        );
        return;
      }

      const cleanImageUrl =
        String(newBannerInput || '')
          .trim()
          .slice(0, MAX_BANNER_URL_LENGTH);

      const cleanOfferText =
        String(newOfferInput || '')
          .trim()
          .slice(
            0,
            MAX_BANNER_TEXT_LENGTH
          );

      if (
        cleanImageUrl &&
        !isValidHttpUrl(cleanImageUrl)
      ) {
        showToast(
          '⚠️ Banner URL सही नहीं है।'
        );
        return;
      }

      if (!API_BASE_URL) {
        if (setBannerImage) {
          setBannerImage(cleanImageUrl);
        }

        if (setStoreOfferText) {
          setStoreOfferText(
            cleanOfferText
          );
        }

        setIsEditingBanner(false);

        showToast(
          '✨ बैनर अपडेट हो गया!'
        );

        return;
      }

      const token = getCustomerToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      setSavingBanner(true);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/store-banner`,
          {
            method: 'POST',
            headers: {
              ...authenticatedHeaders(true)
            },
            credentials: 'include',
            body: JSON.stringify({
              imageUrl: cleanImageUrl,
              offerText: cleanOfferText
            })
          }
        );

        if (response.status === 401) {
          handleUnauthorized();
          return;
        }

        if (response.status === 403) {
          showToast(
            '🚫 आपको banner edit करने की permission नहीं है।'
          );
          return;
        }

        if (!response.ok) {
          showToast(
            '⚠️ Banner save नहीं हो पाया।'
          );
          return;
        }

        if (setBannerImage) {
          setBannerImage(cleanImageUrl);
        }

        if (setStoreOfferText) {
          setStoreOfferText(
            cleanOfferText
          );
        }

        setIsEditingBanner(false);

        showToast(
          '✨ बैनर अपडेट हो गया!'
        );
      } catch (error) {
        console.error(
          'Banner save error:',
          error
        );

        showToast(
          '⚠️ Network error. Banner save नहीं हुआ।'
        );
      } finally {
        setSavingBanner(false);
      }
    },
    [
      checkUserLoggedInOrRedirect,
      isVendorOwner,
      newBannerInput,
      newOfferInput,
      isValidHttpUrl,
      API_BASE_URL,
      getCustomerToken,
      authenticatedHeaders,
      handleUnauthorized,
      setBannerImage,
      setStoreOfferText,
      showToast
    ]
  );

  // ---------------------------------------------------------
  // Product Card
  // ---------------------------------------------------------

  const renderProductCard = (
    item,
    index
  ) => {
    const itemId =
      item?._id ||
      item?.id ||
      `item_${index}`;

    const itemTitle =
      item?.title ||
      item?.name ||
      'Product';

    const isLiked =
      Array.isArray(wishlist) &&
      wishlist.some((w) => {
        const wishId =
          w?._id ||
          w?.id ||
          w?.productId;

        const wishTitle =
          w?.title ||
          w?.name;

        if (wishId && itemId) {
          return (
            String(wishId) ===
            String(itemId)
          );
        }

        return (
          wishTitle &&
          itemTitle &&
          wishTitle === itemTitle
        );
      });

    const rawPrice =
      item?.price !== undefined
        ? item.price
        : 0;

    const numericPrice =
      Number(rawPrice);

    const formattedPrice =
      String(rawPrice).startsWith('₹')
        ? rawPrice
        : `₹${
            Number.isFinite(
              numericPrice
            )
              ? numericPrice
              : 0
          }`;

    const stock =
      item?.stock !== undefined
        ? Number(item.stock)
        : null;

    const isOutOfStock =
      stock !== null &&
      Number.isFinite(stock) &&
      stock <= 0;

    const isCartLoading =
      cartLoadingId === itemId;

    return (
      <div
        key={itemId}
        className="product-card"
        onClick={() =>
          handleProtectedAction(
            'view',
            item
          )
        }
      >
        <span className="discount-tag">
          {item?.tag || '-40%'}
        </span>

        <button
          type="button"
          className="wishlist-btn"
          aria-label={
            isLiked
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
          onClick={(e) =>
            handleProtectedAction(
              'wishlist',
              item,
              e
            )
          }
        >
          {isLiked ? '💖' : '♡'}
        </button>

        <img
          src={
            item?.img ||
            item?.image ||
            FALLBACK_SVG
          }
          alt={itemTitle}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (
              e.currentTarget.src !==
              FALLBACK_SVG
            ) {
              e.currentTarget.src =
                FALLBACK_SVG;
            }
          }}
        />

        <div className="prod-details">
          <h4>{itemTitle}</h4>
          <p className="rating">
            ⭐ {item?.rating || '4.8'}
          </p>

          <div className="price-row">
            <span className="current-price">
              {formattedPrice}
            </span>
            <span className="old-price">
              {item?.oldPrice || '₹2,499'}
            </span>
          </div>

          {/* 🔴 स्टॉक समाप्त होने पर 'SOLD OUT' मैसेज */}
          {isOutOfStock && (
            <div
              style={{
                color: '#ff4d4d',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}
            >
              {t.outOfStock}
            </div>
          )}

          <button
            type="button"
            className="add-to-cart-btn"
            disabled={
              isOutOfStock ||
              isCartLoading
            }
            style={{
              opacity: isOutOfStock ? 0.6 : 1,
              cursor: isOutOfStock ? 'not-allowed' : 'pointer'
            }}
            onClick={(e) =>
              handleAddToCartSecure(
                item,
                e
              )
            }
          >
            {isCartLoading
              ? t.adding
              : isOutOfStock
                ? t.soldOut
                : t.addToCart}
          </button>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------
  // Product Chunks
  // ---------------------------------------------------------

  const productChunks = useMemo(() => {
    const chunks = [];

    for (
      let i = 0;
      i < displayProducts.length;
      i += 8
    ) {
      chunks.push(
        displayProducts.slice(
          i,
          i + 8
        )
      );
    }

    return chunks;
  }, [displayProducts]);

  // ---------------------------------------------------------
  // Categories
  // ---------------------------------------------------------

  const finalCategoriesList =
    dynamicCategories.length > 0
      ? dynamicCategories
      : Array.isArray(propCategories) &&
        propCategories.length > 0
        ? propCategories
        : [
            { name: "Men's Fashion", img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=150" },
            { name: "Women's Fashion", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
            { name: "Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150" },
            { name: "Watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150" },
            { name: "Sunglasses", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=150" },
            { name: "Beauty & Grooming", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150" },
            { name: "Home & Living", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150" },
            { name: "Bags & Accessories", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=150" }
          ];

  const popularGridCategories = [
    { name: "Men's Shirts", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200" },
    { name: "Jeans", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200" },
    { name: "Dresses", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200" },
    { name: "Jackets", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200" },
    { name: "Sneakers", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200" },
    { name: "Sunglasses", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200" },
    { name: "Watches", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200" },
    { name: "Bags", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200" }
  ];

  // ---------------------------------------------------------
  // JSX
  // ---------------------------------------------------------

  return (
    <div className="luxury-home-container">
      <style>{`
     body { background-color: #0b080f; margin: 0; color: #fff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; overflow-x: hidden; }
        .luxury-home-container { width: 100%; box-sizing: border-box; padding-bottom: 90px; max-width: 1500px; margin: 0 auto; overflow-x: hidden; }

        /* 🔥 Smooth Auto-Scrolling Marquee Announcement Bar */
        .announcement-bar-container { background: linear-gradient(90deg, #16121f, #221831); border-bottom: 1px solid #2a1d3d; overflow: hidden; white-space: nowrap; padding: 10px 0; position: relative; width: 100%; box-sizing: border-box; }
        .marquee-track { display: inline-block; animation: marqueeScroll 22s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-item { display: inline-block; padding: 0 40px; font-size: 0.8rem; color: #dfb15b; font-weight: 500; }
        .marquee-item small { color: #aaa; display: inline; margin-left: 6px; }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Navbar - Premium & Centered */
        .main-navbar { display: flex; justify-content: center; align-items: center; padding: 18px 20px; background: linear-gradient(180deg, #161122, #100b18); border-bottom: 1px solid #35254a; box-shadow: 0 6px 25px rgba(0,0,0,0.6); width: 100%; box-sizing: border-box; }
        
        /* 🔥 Extra Large & Premium Search Bar */
        .nav-search { display: flex; align-items: center; background: radial-gradient(circle at center, #181226, #09070d); border: 2px solid #dfb15b; border-radius: 40px; padding: 12px 28px; width: 90%; max-width: 900px; box-shadow: inset 0 3px 10px rgba(0,0,0,0.9), 0 0 20px rgba(223, 177, 91, 0.3); transition: all 0.3s ease; box-sizing: border-box; }
        .nav-search:hover, .nav-search:focus-within { border-color: #f3c66f; box-shadow: inset 0 3px 10px rgba(0,0,0,0.9), 0 0 25px rgba(223, 177, 91, 0.5); }
        .nav-search input { background: transparent; border: none; color: #fff; outline: none; width: 100%; font-size: 1.1rem; letter-spacing: 0.5px; }
        .nav-search input::placeholder { color: #aaa; }
        .search-icon-btn { background: none; border: none; cursor: pointer; font-size: 1.25rem; margin-left: 12px; transition: transform 0.2s; }
        .search-icon-btn:hover { transform: scale(1.15); }

        /* Hero Banner */
        .hero-banner-section { position: relative; background: linear-gradient(135deg, #1a1423, #0b080f); margin: 20px; border-radius: 16px; padding: 40px; border: 1.5px solid #dfb15b; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 10px 30px rgba(223, 177, 91, 0.15); overflow: hidden; box-sizing: border-box; }
        .exclusive-tag { background: #dfb15b; color: #000; padding: 5px 12px; font-size: 0.75rem; font-weight: bold; border-radius: 4px; letter-spacing: 1px; }
        .hero-content h2 { font-size: 2.4rem; color: #dfb15b; margin: 12px 0; font-family: serif; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        .hero-content p { color: #ccc; font-size: 0.95rem; margin-bottom: 20px; letter-spacing: 0.5px; }
        .shop-now-btn { background: linear-gradient(135deg, #dfb15b, #c59b3d); color: #000; border: none; padding: 12px 25px; font-weight: bold; border-radius: 8px; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(223, 177, 91, 0.3); }
        .shop-now-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(223, 177, 91, 0.5); }
        
        .hero-right-badge { text-align: center; background: rgba(19, 15, 28, 0.9); padding: 25px 30px; border: 1px solid #dfb15b; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.8); }
        .hero-right-badge h3 { color: #dfb15b; margin: 8px 0 0 0; font-size: 1.2rem; }
        .hero-right-badge p { font-size: 0.65rem; color: #aaa; margin: 0; letter-spacing: 1px; }
        
        .carousel-arrow { position: absolute; background: rgba(0,0,0,0.7); color: #dfb15b; border: 1px solid #dfb15b; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 10; transition: 0.2s; }
        .carousel-arrow:hover { background: #dfb15b; color: #000; }
        .carousel-arrow.left { left: 15px; }
        .carousel-arrow.right { right: 15px; }
        .carousel-dots { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
        .dot { width: 8px; height: 8px; background: #555; border-radius: 50%; transition: 0.3s; cursor: pointer; }
        .dot.active { background: #dfb15b; width: 22px; border-radius: 4px; }

        /* Category Circles */
        .category-circles { display: flex; justify-content: space-between; padding: 15px 20px; overflow-x: auto; gap: 20px; scrollbar-width: none; box-sizing: border-box; width: 100%; }
        .category-circles::-webkit-scrollbar { display: none; }
        .cat-item { display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; flex-shrink: 0; text-align: center; transition: 0.3s; }
        .cat-item:hover { transform: translateY(-3px); }
        .cat-circle { width: 85px; height: 85px; border-radius: 50%; border: 2px solid #dfb15b; overflow: hidden; padding: 3px; background: linear-gradient(135deg, #1c1428, #0b080f); box-shadow: 0 6px 15px rgba(223, 177, 91, 0.2); }
        .cat-circle img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .cat-item span { font-size: 0.75rem; color: #dfb15b; font-weight: 500; }

        /* Trust Bar */
        .trust-bar { display: flex; justify-content: space-around; background: linear-gradient(90deg, #130f1c, #1a1423); margin: 20px; padding: 18px; border-radius: 12px; border: 1px solid #2a1d3d; box-shadow: 0 5px 15px rgba(0,0,0,0.5); box-sizing: border-box; }
        .trust-box { display: flex; align-items: center; gap: 12px; font-size: 1.6rem; }
        .trust-box h4 { font-size: 0.9rem; margin: 0; color: #fff; font-weight: 600; }
        .trust-box p { font-size: 0.72rem; margin: 0; color: #aaa; }

        /* Products Section */
        .products-section { padding: 15px 20px; box-sizing: border-box; width: 100%; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .section-header h3 { color: #dfb15b; margin: 0; font-size: 1.3rem; letter-spacing: 0.5px; }
        .section-header a { color: #dfb15b; text-decoration: none; font-size: 0.85rem; font-weight: bold; transition: 0.2s; }
        .section-header a:hover { text-decoration: underline; }
        
        .custom-products-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; width: 100%; margin-bottom: 30px; box-sizing: border-box; }
        
        /* 🔥 Ultra-Luxurious Product Card */
        .product-card { background: linear-gradient(145deg, #16121f, #0f0b17); border: 1.5px solid #3a2b4e; border-radius: 14px; overflow: hidden; position: relative; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(0,0,0,0.6); display: flex; flex-direction: column; justify-content: space-between; padding: 12px; cursor: pointer; text-align: center; box-sizing: border-box; }
        .product-card:hover { transform: translateY(-5px); border-color: #dfb15b; box-shadow: 0 12px 35px rgba(223, 177, 91, 0.25); }
        
        .discount-tag { position: absolute; top: 12px; left: 12px; background: #dfb15b; color: #000; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 6px; z-index: 2; box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
        .wishlist-btn { position: absolute; top: 12px; right: 12px; background: rgba(15, 11, 23, 0.7); backdrop-filter: blur(5px); border: 1px solid #4a3863; color: #fff; font-size: 1.1rem; cursor: pointer; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; z-index: 2; transition: 0.2s; }
        .wishlist-btn:hover { background: #dfb15b; color: #000; border-color: #dfb15b; }
        
        .product-card img { 
          width: 100%; 
          height: 200px; 
          object-fit: cover; 
          object-position: center; 
          border-radius: 10px; 
          background: #0f0d0b; 
          border: 1.5px solid #dfb15b; 
          margin-bottom: 10px; 
          transition: 0.4s; 
          image-rendering: -webkit-optimize-contrast; 
        }
        
        .prod-details { padding: 4px; display: flex; flex-direction: column; align-items: center; }
        .prod-details h4 { font-size: 0.95rem; margin: 0 0 6px 0; color: #e0c880; font-weight: 600; min-height: 38px; display: flex; align-items: center; justify-content: center; }
        .rating { font-size: 0.8rem; color: #ffc107; margin: 0 0 8px 0; font-weight: bold; }
        
        .price-row { display: flex; gap: 10px; align-items: baseline; justify-content: center; margin-bottom: 12px; }
        .current-price { font-size: 1.1rem; font-weight: bold; color: #ffd700; letter-spacing: 0.5px; }
        .old-price { font-size: 0.85rem; color: #888; text-decoration: line-through; }
        
        .add-to-cart-btn { width: 100%; background: linear-gradient(135deg, #dfb15b, #c59b3d); color: #000; border: none; padding: 9px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 0.8rem; transition: 0.2s; box-shadow: 0 4px 12px rgba(223, 177, 91, 0.2); }
        .add-to-cart-btn:hover { background: #f3c66f; box-shadow: 0 6px 18px rgba(223, 177, 91, 0.4); }

        /* Promo Split Banners */
        .promo-split-banners { display: flex; gap: 20px; padding: 20px; box-sizing: border-box; width: 100%; }
        .promo-card { flex: 1; padding: 35px; border-radius: 14px; border: 1.5px solid #dfb15b; background-size: cover; background-position: center; box-shadow: 0 8px 25px rgba(0,0,0,0.6); position: relative; overflow: hidden; }
        .promo-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4)); z-index: 1; }
        .promo-text { position: relative; z-index: 2; }
        .promo-card.men { background-image: url('https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600'); }
        .promo-card.women { background-image: url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600'); }
        .promo-text h4 { color: #dfb15b; margin: 0; font-size: 0.8rem; letter-spacing: 1px; font-weight: bold; }
        .promo-text h2 { font-size: 1.8rem; margin: 8px 0; color: #fff; font-family: serif; }
        .promo-text p { font-size: 0.85rem; color: #ccc; margin-bottom: 18px; }
        .promo-btn { background: #dfb15b; color: #000; border: none; padding: 8px 16px; font-size: 0.8rem; font-weight: bold; border-radius: 6px; cursor: pointer; transition: 0.2s; }
        .promo-btn:hover { background: #fff; }

        /* Popular Categories Bottom Grid */
        .custom-category-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; width: 100%; margin-bottom: 40px; box-sizing: border-box; }
        .bottom-cat-card { background: #161310; border: 1.5px solid #d4af37; border-radius: 12px; padding: 10px; text-align: center; cursor: pointer; transition: 0.3s; box-sizing: border-box; }
        .bottom-cat-card:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(223, 177, 91, 0.2); }
        .bottom-cat-card img { width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; }
        .bottom-cat-card span { font-size: 0.85rem; color: #e0c880; font-weight: bold; }

        /* Bottom Nav */
        .bottom-nav { position: fixed; bottom: 0; left: 0; width: 100%; background: #130f1c; display: flex; justify-content: space-around; padding: 10px 0; border-top: 1px solid #2a1d3d; z-index: 1000; box-shadow: 0 -4px 20px rgba(0,0,0,0.8); box-sizing: border-box; }
        .nav-tab { background: none; border: none; color: #888; font-size: 0.75rem; text-align: center; cursor: pointer; position: relative; transition: 0.2s; }
        .nav-tab.active { color: #dfb15b; font-weight: bold; }
        .btm-badge { position: absolute; top: -2px; right: 2px; background: #dfb15b; color: #000; font-size: 0.6rem; padding: 1px 5px; border-radius: 50%; font-weight: bold; }

        /* 📱 मोबाइल रिस्पॉन्सिव फिक्स */
        @media screen and (max-width: 768px) {
          .custom-products-grid, .custom-category-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 10px !important;
          }
          .promo-split-banners { flex-direction: column; }
          .nav-search { width: 95%; padding: 10px 18px; }
          .hero-banner-section { flex-direction: column; text-align: center; gap: 20px; padding: 30px 20px; margin: 10px; }
          .trust-bar { flex-direction: column; gap: 15px; margin: 10px; align-items: flex-start; }
          .luxury-home-container { padding-left: 5px; padding-right: 5px; }
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            backgroundColor: '#d4af37',
            color: '#000',
            padding: '12px 24px',
            borderRadius: '10px',
            fontWeight: 'bold',
            zIndex: 9999,
            boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Top Auto-Scrolling Marquee Announcement Bar */}
      <div className="announcement-bar-container">
        <div className="marquee-track">
          <span className="marquee-item">{t.freeShipping} <small>| {t.fastDelivery}</small></span>
          <span className="marquee-item">{t.originalProducts} <small>| {t.brandGuarantee}</small></span>
          <span className="marquee-item">{t.easyReturns} <small>| {t.hassleFree}</small></span>
          <span className="marquee-item">{t.freeShipping} <small>| {t.fastDelivery}</small></span>
          <span className="marquee-item">{t.originalProducts} <small>| {t.brandGuarantee}</small></span>
          <span className="marquee-item">{t.easyReturns} <small>| {t.hassleFree}</small></span>
        </div>
      </div>

      {/* Main Navbar - Premium Search Bar with Camera & Search Icon */}
      <header className="main-navbar">
        <div className="nav-search" ref={searchRef}>
          <input 
            type="text" 
            maxLength={MAX_SEARCH_LENGTH}
            placeholder={t.searchPlaceholder} 
            value={searchQuery || ''}
            onChange={(e) => {
              const value = e.target.value.slice(0, MAX_SEARCH_LENGTH);
              if (setSearchQuery) setSearchQuery(value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          <label className="search-icon-btn" title="Search by image">
            📷
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageSearch}
              style={{ display: 'none' }}
            />
          </label>
          <button type="button" className="search-icon-btn" onClick={() => setShowSuggestions(true)}>🔍</button>
        </div>
      </header>

      {/* Suggestions Dropdown */}
      {showSuggestions && searchQuery.trim() !== '' && (
        <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', zIndex: 1000 }}>
          <div style={{ position: 'absolute', top: '5px', left: '20px', right: '20px', backgroundColor: '#161310', border: '1.5px solid #d4af37', borderRadius: '14px', maxHeight: '280px', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.slice(0, 20).map((item, index) => (
                <div
                  key={item?._id || item?.id || `suggestion-${index}`}
                  onClick={(e) => handleProtectedAction('view', item, e)}
                  style={{ padding: '12px 18px', borderBottom: '1px solid #33291a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', color: '#fff' }}
                >
                  <img src={item?.img || item?.image || FALLBACK_SVG} alt="" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#e0c880', fontSize: '1rem' }}>{item?.title || item?.name || 'Product'}</div>
                    <div style={{ fontSize: '0.9rem', color: '#ffd700' }}>₹{Number(item?.price) || 0}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '18px', color: '#ffd700', textAlign: 'center' }}>⚠️ No matching items found.</div>
            )}
          </div>
        </div>
      )}

      {/* Main Banner / Vendor Control */}
      <div style={{ margin: '20px' }}>
        {isVendorOwner && (
          <div style={{ background: '#251c10', padding: '10px 15px', borderBottom: '1px solid #d4af37', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', borderRadius: '8px 8px 0 0' }}>
            <span style={{ color: '#ffd700', fontSize: '0.85rem', fontWeight: 'bold' }}>🏪 Store Owner Control</span>
            <button type="button" onClick={() => setIsEditingBanner((prev) => !prev)} style={{ background: '#d4af37', color: '#000', border: 'none', padding: '5px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              {isEditingBanner ? 'Close' : 'Edit Banner/Story ✍️'}
            </button>
          </div>
        )}

        {isEditingBanner ? (
          <div style={{ padding: '20px', background: '#1c1710', borderRadius: '8px', border: '1px solid #d4af37' }}>
            <label style={{ color: '#e0c880', display: 'block', marginBottom: '5px' }}>Banner Image URL:</label>
            <input
              type="url"
              maxLength={MAX_BANNER_URL_LENGTH}
              value={newBannerInput}
              onChange={(e) => setNewBannerInput(e.target.value)}
              style={{ width: '100%', padding: '8px', background: '#110e0a', border: '1px solid #d4af37', color: '#fff', borderRadius: '4px', marginBottom: '12px', boxSizing: 'border-box' }}
            />
            <label style={{ color: '#e0c880', display: 'block', marginBottom: '5px' }}>Offer / Story Text:</label>
            <input
              type="text"
              maxLength={MAX_BANNER_TEXT_LENGTH}
              value={newOfferInput}
              onChange={(e) => setNewOfferInput(e.target.value)}
              style={{ width: '100%', padding: '8px', background: '#110e0a', border: '1px solid #d4af37', color: '#fff', borderRadius: '4px', marginBottom: '15px', boxSizing: 'border-box' }}
            />
            <button type="button" disabled={savingBanner} onClick={handleSaveBanner} style={{ width: '100%', background: savingBanner ? '#777' : '#d4af37', color: savingBanner ? '#ccc' : '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: savingBanner ? 'not-allowed' : 'pointer' }}>
              {savingBanner ? 'Publishing...' : 'Publish Banner ✨'}
            </button>
          </div>
        ) : null}
      </div>

      {/* 🌟 ऑटो-स्लाइडर हीरो बैनर (प्रत्येक 5 सेकंड में ऑटो-चेंज एवं मैन्युअल बटन) */}
      <section className="hero-banner-section">
        <button type="button" className="carousel-arrow left" onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}>❮</button>
        <div className="hero-content">
          <span className="exclusive-tag">{heroSlides[currentSlide].tag}</span>
          <h2>{heroSlides[currentSlide].title}</h2>
          <p>{storeOfferText || heroSlides[currentSlide].subtitle}</p>
          <button type="button" className="shop-now-btn">{t.shopNow}</button>
        </div>
        <div className="hero-right-badge">
          <span className="crown">👑</span>
          <h3>{t.luxuryBrands}</h3>
          <p>{t.topPicks}</p>
        </div>
        <button type="button" className="carousel-arrow right" onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}>❯</button>
        <div className="carousel-dots">
          {heroSlides.map((_, idx) => (
            <span key={idx} className={`dot ${currentSlide === idx ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)}></span>
          ))}
        </div>
      </section>

      {/* Category Circular Grid */}
      <section className="category-circles">
        {finalCategoriesList.slice(0, 8).map((cat, idx) => (
          <div className="cat-item" key={cat?._id || cat?.id || idx} onClick={() => setSearchQuery && setSearchQuery(cat?.title || cat?.name || '')}>
            <div className="cat-circle">
              <img src={cat?.img || cat?.image || FALLBACK_SVG} alt={cat?.title || cat?.name || 'Category'} />
            </div>
            <span>{cat?.title || cat?.name || 'Category'} ➔</span>
          </div>
        ))}
      </section>

      {/* 🌐 पूरी तरह से भाषा अनूदित ट्रस्ट बार */}
      <section className="trust-bar">
        <div className="trust-box">🚚 <div><h4>{t.fastDelivery}</h4><p>{t.days25}</p></div></div>
        <div className="trust-box">🛡️ <div><h4>{t.securePayments}</h4><p>{t.safe100}</p></div></div>
        <div className="trust-box">🎧 <div><h4>{t.support247}</h4><p>{t.hereWeAre}</p></div></div>
        <div className="trust-box">⭐ <div><h4>{t.premiumQuality}</h4><p>{t.trustedMillions}</p></div></div>
      </section>

      {/* Best Deals for You Section */}
      <section className="products-section">
        <div className="section-header">
          <h3>{t.bestDeals}</h3>
          <a href="#viewall" onClick={(e) => e.preventDefault()}>{t.viewAll}</a>
        </div>

        {promotionalLoading && productChunks.length === 0 ? (
          <div style={{ color: '#ffd700', textAlign: 'center', padding: '40px 0' }}>⏳ Loading...</div>
        ) : productChunks.length > 0 ? (
          productChunks.map((chunk, chunkIndex) => (
            <React.Fragment key={`chunk-${chunkIndex}`}>
              <div className="custom-products-grid">
                {chunk.map((item, index) => renderProductCard(item, index))}
              </div>
            </React.Fragment>
          ))
        ) : (
          <div style={{ color: '#ffd700', textAlign: 'center', padding: '40px 0' }}>कोई प्रोडक्ट उपलब्ध नहीं है हुकुम!</div>
        )}
      </section>

      {/* Promo Split Banners */}
      <section className="promo-split-banners">
        <div className="promo-card men">
          <div className="promo-text">
            <h4>MEN'S FASHION</h4>
            <h2>UP TO 50% OFF</h2>
            <p>New Arrivals | Limited Time</p>
            <button type="button" className="promo-btn">{t.shopNow}</button>
          </div>
        </div>
        <div className="promo-card women">
          <div className="promo-text">
            <h4>WOMEN'S FASHION</h4>
            <h2>UP TO 50% OFF</h2>
            <p>Trendy Styles | Premium Brands</p>
            <button type="button" className="promo-btn">{t.shopNow}</button>
          </div>
        </div>
      </section>

      {/* Popular Categories Grid Section */}
      <section className="products-section">
        <div className="section-header">
          <h3>{t.popularCategories}</h3>
          <a href="#viewall" onClick={(e) => e.preventDefault()}>{t.viewAll}</a>
        </div>
        <div className="custom-category-grid">
          {popularGridCategories.map((cat, idx) => (
            <div className="bottom-cat-card" key={`pop-cat-${idx}`} onClick={() => setSearchQuery && setSearchQuery(cat.name)}>
              <img src={cat.img} alt={cat.name} />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Sticky Navigation Bar */}
      <nav className="bottom-nav">
        <button type="button" className="nav-tab active" onClick={() => setCurrentTab && setCurrentTab('home')}>🏠<br/>{t.home}</button>
        <button type="button" className="nav-tab" onClick={() => setCurrentTab && setCurrentTab('categories')}>🛍️<br/>{t.categories}</button>
        <button type="button" className="nav-tab" onClick={() => setCurrentTab && setCurrentTab('wishlist')}>♡<br/>{t.wishlist}</button>
        <button type="button" className="nav-tab" onClick={() => setCurrentTab && setCurrentTab('cart')}>🛒<br/>{t.cart} <span className="btm-badge">3</span></button>
        <button type="button" className="nav-tab" onClick={() => setCurrentTab && setCurrentTab('account')}>👤<br/>{t.account}</button>
      </nav>
    </div>
  );
}