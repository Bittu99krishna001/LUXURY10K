import React, { useState, useEffect } from 'react';

// 🌐 Multi-language Dictionary for Cart & Address
const cartTranslations = {
  English: {
    addDeliveryAddress: 'ADD DELIVERY ADDRESS',
    name: 'Name *',
    contactNumber: 'Contact Number *',
    getAddress: '📍 Get Address',
    enterAddress: '✏️ ENTER ADDRESS',
    pincode: 'Pincode *',
    city: 'City *',
    state: 'State *',
    houseNo: 'House no./ Building Name *',
    roadName: 'Road Name / Area / Colony *',
    saveAndContinue: 'Save Address and Continue',
    reviewOrder: 'REVIEW YOUR ORDER',
    paymentMethod: 'PAYMENT METHOD',
    emptyCart: 'Empty Cart',
    cartEmptyTitle: 'Your cart is empty',
    cartEmptyDesc: 'Just relax, let us help you find some first-class luxury products',
    startShopping: 'Start Shopping',
    soldBy: 'Sold by:',
    change: 'Change',
    priceDetails: 'Price Details',
    item: 'Item',
    productPrice: 'Product Price',
    totalDiscounts: 'Total Discounts',
    gstAdded: 'GST (5% Added to Commission)',
    orderTotal: 'Order Total',
    continue: 'Continue',
    selectPayment: 'Select payment method',
    cod: 'Cash on Delivery',
    payOnline: 'Pay Online (PhonePe / UPI)',
    saveExtra: 'Save ₹13 extra with online payment',
    amountToPay: 'Amount To Pay',
    placeOrder: 'Place Order ⚡'
  },
  Hindi: {
    addDeliveryAddress: 'डिलीवरी का पता जोड़ें',
    name: 'नाम *',
    contactNumber: 'संपर्क नंबर *',
    getAddress: '📍 पता प्राप्त करें',
    enterAddress: '✏️ पता दर्ज करें',
    pincode: 'पिनकोड *',
    city: 'शहर *',
    state: 'राज्य *',
    houseNo: 'मकान नंबर / बिल्डिंग का नाम *',
    roadName: 'रोड का नाम / क्षेत्र / कॉलोनी *',
    saveAndContinue: 'पता सहेजें और आगे बढ़ें',
    reviewOrder: 'अपने ऑर्डर की समीक्षा करें',
    paymentMethod: 'भुगतान का तरीका',
    emptyCart: 'खाली कार्ट',
    cartEmptyTitle: 'आपका कार्ट खाली है',
    cartEmptyDesc: 'आराम करें, हम आपको कुछ बेहतरीन लक्जरी उत्पाद खोजने में मदद करते हैं',
    startShopping: 'खरीदारी शुरू करें',
    soldBy: 'विक्रेता:',
    change: 'बदलें',
    priceDetails: 'मूल्य विवरण',
    item: 'आइटम',
    productPrice: 'उत्पाद मूल्य',
    totalDiscounts: 'कुल छूट',
    gstAdded: 'जीएसटी (कमीशन में 5% जोड़ा गया)',
    orderTotal: 'ऑर्डर कुल',
    continue: 'आगे बढ़ें',
    selectPayment: 'भुगतान का तरीका चुनें',
    cod: 'कैश ऑन डिलीवरी',
    payOnline: 'ऑनलाइन भुगतान करें (फोनपे / यूपीआई)',
    saveExtra: 'ऑनलाइन भुगतान के साथ ₹13 अतिरिक्त बचाएं',
    amountToPay: 'भुगतान करने योग्य राशि',
    placeOrder: 'ऑर्डर दें ⚡'
  },
  Tamil: {
    addDeliveryAddress: 'டெலிவரி முகவரியைச் சேர்க்கவும்',
    name: 'பெயர் *',
    contactNumber: 'தொடர்பு எண் *',
    getAddress: '📍 முகவரியைப் பெறுக',
    enterAddress: '✏️ முகவரியை உள்ளிடவும்',
    pincode: 'பின்கோடு *',
    city: 'நகரம் *',
    state: 'மாநிலம் *',
    houseNo: 'வீட்டு எண் / கட்டிடத்தின் பெயர் *',
    roadName: 'சாலை பெயர் / பகுதி *',
    saveAndContinue: 'முகவரியைச் சேமித்து தொடரவும்',
    reviewOrder: 'உங்கள் ஆர்டரை மதிப்பாய்வு செய்யவும்',
    paymentMethod: 'பেমென்ட் முறை',
    emptyCart: 'வெற்று கார்ட்',
    cartEmptyTitle: 'உங்கள் கார்ட் காலியாக உள்ளது',
    cartEmptyDesc: 'சிறந்த லக்ஸரி தயாரிப்புகளைக் கண்டறிய நாங்கள் உதவுகிறோம்',
    startShopping: 'ஷாப்பிங்கைத் தொடங்குங்கள்',
    soldBy: 'விற்பனையாளர்:',
    change: 'மாற்று',
    priceDetails: 'விலை விவரங்கள்',
    item: 'பொருள்',
    productPrice: 'தயாரிப்பு விலை',
    totalDiscounts: 'மொத்த தள்ளுபடி',
    gstAdded: 'GST (கமிஷனில் 5% சேர்க்கப்பட்டுள்ளது)',
    orderTotal: 'ஆர்டர் மொத்தம்',
    continue: 'தொடரவும்',
    selectPayment: 'பেমென்ட் முறையைத் தேர்ந்தெடுக்கவும்',
    cod: 'கேஷ் ஆன் டெலிவரி',
    payOnline: 'ஆன்லைனில் செலுத்தவும்',
    saveExtra: 'ஆன்லைன் மூலம் ₹13 சேமிக்கவும்',
    amountToPay: ' செலுத்த வேண்டிய தொகை',
    placeOrder: 'ஆர்டரை வைக்கவும் ⚡'
  },
  Marathi: {
    addDeliveryAddress: 'डिलिव्हरी पत्ता जोडा',
    name: 'नाव *',
    contactNumber: 'संपर्क क्रमांक *',
    getAddress: '📍 पत्ता मिळवा',
    enterAddress: '✏️ पत्ता प्रविष्ट करा',
    pincode: 'पिनकोड *',
    city: 'शहर *',
    state: 'राज्य *',
    houseNo: 'घर क्र. / बिल्डिंगचे नाव *',
    roadName: 'रस्त्याचे नाव / परिसर *',
    saveAndContinue: 'पत्ता जतन करा आणि पुढे जा',
    reviewOrder: 'तुमच्या ऑर्डरचे पुनरावलोकन करा',
    paymentMethod: 'पेमेंट पद्धत',
    emptyCart: 'रिकामी कार्ट',
    cartEmptyTitle: 'तुमची कार्ट रिकामी आहे',
    cartEmptyDesc: 'काही उत्कृष्ट लक्झरी उत्पादने शोधण्यात आम्ही तुम्हाला मदत करतो',
    startShopping: 'खरेदी सुरू करा',
    soldBy: 'विक्रेता:',
    change: 'बदला',
    priceDetails: 'किंमत तपशील',
    item: 'आयटम',
    productPrice: 'उत्पादनाची किंमत',
    totalDiscounts: 'एकूण सवलत',
    gstAdded: 'जीएसटी (कमिशनमध्ये ५% जोडले)',
    orderTotal: 'ऑर्डर एकूण',
    continue: 'सुरू ठेवा',
    selectPayment: 'पेमेंट पद्धत निवडा',
    cod: 'कॅश ऑन डिलिव्हरी',
    payOnline: 'ऑनलाइन पेमेंट करा',
    saveExtra: 'ऑनलाइन पेमेंटसह ₹13 वाचवा',
    amountToPay: 'देण्याची रक्कम',
    placeOrder: 'ऑर्डर द्या ⚡'
  },
  Bengali: {
    addDeliveryAddress: 'ডেলিভারি ঠিকানা যোগ করুন',
    name: 'নাম *',
    contactNumber: 'যোগাযোগের নম্বর *',
    getAddress: '📍 ঠিকানা পান',
    enterAddress: '✏️ ঠিকানা লিখুন',
    pincode: 'পিনকোড *',
    city: 'শহর *',
    state: 'রাজ্য *',
    houseNo: 'বাড়ি নং / বিল্ডিং নাম *',
    roadName: 'রাস্তার নাম / এলাকা *',
    saveAndContinue: 'ঠিকানা সংরক্ষণ করুন এবং চালিয়ে যান',
    reviewOrder: 'আপনার অর্ডার পর্যালোচনা করুন',
    paymentMethod: 'পেমেন্ট পদ্ধতি',
    emptyCart: 'খালি কার্ট',
    cartEmptyTitle: 'আপনার কার্ট খালি আছে',
    cartEmptyDesc: 'কিছু চমৎকার লাক্সারি পণ্য খুঁজে পেতে আমরা আপনাকে সাহায্য করি',
    startShopping: 'কেনাকাটা শুরু করুন',
    soldBy: 'বিক্রেতা:',
    change: 'পরিবর্তন',
    priceDetails: 'মূল্য বিবরণ',
    item: 'আইটেম',
    productPrice: 'পণ্যের মূল্য',
    totalDiscounts: 'মোট ছাড়',
    gstAdded: 'জিএসটি (কমিশনে ৫% যোগ করা হয়েছে)',
    orderTotal: 'অর্ডার মোট',
    continue: 'চালিয়ে যান',
    selectPayment: 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
    cod: 'ক্যাশ অন ডেলিভারি',
    payOnline: 'অনলাইন পেমেন্ট করুন',
    saveExtra: 'অনলাইন পেমেন্টে ₹১৩ বাঁচান',
    amountToPay: 'পরিশোধ করার পরিমাণ',
    placeOrder: 'অর্ডার করুন ⚡'
  },
  Telugu: {
    addDeliveryAddress: 'డెలివరీ చిరునామాను జోడించండి',
    name: 'పేరు *',
    contactNumber: 'సంప్రదింపు నంబర్ *',
    getAddress: '📍 చిరునామాను పొందండి',
    enterAddress: '✏️ చిరునామాను నమోదు చేయండి',
    pincode: 'పిన్‌కోడ్ *',
    city: 'నగరం *',
    state: 'రాష్ట్రం *',
    houseNo: 'ఇంటి నంబరు / భవనం పేరు *',
    roadName: 'రోడ్డు పేరు / ప్రాంతం *',
    saveAndContinue: 'చిరునామాను సేవ్ చేసి కొనసాగించండి',
    reviewOrder: 'మీ ఆర్డర్‌ను సమీక్షించండి',
    paymentMethod: 'చెల్లింపు పద్ధతి',
    emptyCart: 'ఖాళీ కార్ట్',
    cartEmptyTitle: 'మీ కార్ట్ ఖాళీగా ఉంది',
    cartEmptyDesc: 'కొన్ని మొదటి తరగతి లగ్జరీ ఉత్పత్తులను కనుగొనడంలో మేము మీకు సహాయం చేస్తాము',
    startShopping: 'షాపింగ్ ప్రారంభించండి',
    soldBy: 'అమ్మకందారుడు:',
    change: 'మార్చు',
    priceDetails: 'ధర వివరాలు',
    item: 'అంశం',
    productPrice: 'ఉత్పత్తి ధర',
    totalDiscounts: 'మొత్తం తగ్గింపులు',
    gstAdded: 'జిఎస్‌టి జోడించబడింది',
    orderTotal: 'ఆర్డర్ మొత్తం',
    continue: 'కొనసాగించండి',
    selectPayment: 'చెల్లింపు పద్ధతిని ఎంచుకోండి',
    cod: 'క్యాష్ ఆన్ డెలివరీ',
    payOnline: 'ఆన్‌లైన్‌లో చెల్లించండి',
    saveExtra: 'ఆన్‌లైన్ చెల్లింపుతో ₹13 ఆదా చేయండి',
    amountToPay: 'చెల్లించాల్సిన మొత్తం',
    placeOrder: 'ఆర్డర్ ఉంచండి ⚡'
  },
  Kannada: {
    addDeliveryAddress: 'ವಿಳಾಸವನ್ನು ಸೇರಿಸಿ',
    name: 'ಹೆಸರು *',
    contactNumber: 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ *',
    getAddress: '📍 ವಿಳಾಸ ಪಡೆಯಿರಿ',
    enterAddress: '✏️ ವಿಳಾಸ ನಮूदಿಸಿ',
    pincode: 'ಪಿನ್‌ಕೋಡ್ *',
    city: 'ನಗರ *',
    state: 'ರಾಜ್ಯ *',
    houseNo: 'ಮನೆ ನಂ / ಕಟ್ಟಡದ ಹೆಸರು *',
    roadName: 'ರಸ್ತೆಯ ಹೆಸರು / ಪ್ರದೇಶ *',
    saveAndContinue: 'ವಿಳಾಸ ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ',
    reviewOrder: 'ನಿಮ್ಮ ಆರ್ಡರ್ ಪರಿಶೀಲಿಸಿ',
    paymentMethod: 'ಪಾವತಿ ವಿಧಾನ',
    emptyCart: 'ಖಾಲಿ ಕಾರ್ಟ್',
    cartEmptyTitle: 'ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ',
    cartEmptyDesc: 'ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಲಕ್ಸುರಿ ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಲು ನಾವು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ',
    startShopping: 'ಶಾಪಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    soldBy: 'ಮಾರಾಟಗಾರರು:',
    change: 'ಬದಲಾಯಿಸಿ',
    priceDetails: 'ಬೆಲೆ ವಿವರಗಳು',
    item: 'ಐಟಂ',
    productPrice: 'ಉತ್ಪನ್ನ ಬೆಲೆ',
    totalDiscounts: 'ಒಟ್ಟು ರಿಯಾಯಿತಿಗಳು',
    gstAdded: 'ಜಿಎಸ್‌ಟಿ ಸೇರಿಸಲಾಗಿದೆ',
    orderTotal: 'ಆರ್ಡರ್ ಒಟ್ಟು',
    continue: 'ಮುಂದುವರಿಸಿ',
    selectPayment: 'ಪಾವತಿ ವಿಧಾನ ಆಯ್ಕೆಮಾಡಿ',
    cod: 'ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ',
    payOnline: 'ಆನ್‌ಲೈನ್ ಪಾವತಿ',
    saveExtra: 'ಆನ್‌ಲೈನ್ ಪಾವತಿಯೊಂದಿಗೆ ₹13 ಉಳಿಸಿ',
    amountToPay: 'ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ',
    placeOrder: 'ಆರ್ಡರ್ ಮಾಡಿ ⚡'
  },
  Malayalam: {
    addDeliveryAddress: 'വിലാസം ചേർക്കുക',
    name: 'പേര് *',
    contactNumber: 'ഫോൺ നമ്പർ *',
    getAddress: '📍 വിലാസം നേടുക',
    enterAddress: '✏️ വിലാസം നൽകുക',
    pincode: 'പിൻകോഡ് *',
    city: 'നഗരം *',
    state: 'സംസ്ഥാനം *',
    houseNo: 'വീട്ടു നമ്പർ / കെട്ടിടത്തിന്റെ പേര് *',
    roadName: 'റോഡിന്റെ പേര് / പ്രദേശം *',
    saveAndContinue: 'വിലാസം സേവ് ചെയ്ത് തുടരുക',
    reviewOrder: 'ഓർഡർ പരിശോധിക്കുക',
    paymentMethod: 'പേയ്മെന്റ് രീതി',
    emptyCart: 'ശൂന്യമായ കാർട്ട്',
    cartEmptyTitle: 'നിങ്ങളുടെ കാർട്ട് കാലിയാണ്',
    cartEmptyDesc: 'മികച്ച ലക്സറി ഉൽപ്പന്നങ്ങൾ കണ്ടെത്താൻ ഞങ്ങൾ നിങ്ങളെ സഹായിക്കാം',
    startShopping: 'ഷോപ്പിംഗ് ആരംഭിക്കുക',
    soldBy: 'വിൽപ്പനക്കാരൻ:',
    change: 'മാറ്റുക',
    priceDetails: 'വില விவரங்கள்',
    item: 'ഐറ്റം',
    productPrice: 'ഉൽപ്പന്ന വില',
    totalDiscounts: 'ആകെ കിഴിവ്',
    gstAdded: 'GST ചേർത്തു',
    orderTotal: 'ഓർഡർ ആകെ',
    continue: 'തുടരുക',
    selectPayment: 'പേയ്മെന്റ് രീതി തിരഞ്ഞെടുക്കുക',
    cod: 'ക്യാഷ് ഓൺ ഡെലിവറി',
    payOnline: 'ഓൺലൈൻ പേയ്മെന്റ്',
    saveExtra: 'ഓൺലൈൻ പേയ്മെന്റിൽ ₹13 ലാഭിക്കുക',
    amountToPay: "തുക നൽകേണ്ടത്",
    placeOrder: "ഓർഡർ നൽകുക ⚡" 
  }
};

// Delivery Address Component
export function AddDeliveryAddress({ customerInfo, setCustomerInfo, onBack }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'English';
  });
  const t = cartTranslations[currentLang] || cartTranslations.English;

  // भाषा बदलने को तुरंत सिंक करने के लिए कस्टम इवेंट लिसनर
  useEffect(() => {
    const handleLangChange = (event) => {
      const savedLang = event.detail || localStorage.getItem('appLanguage') || 'English';
      setCurrentLang(savedLang);
    };
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const [formData, setFormData] = useState({
    name: customerInfo?.name || '',
    phone: customerInfo?.phone || '',
    pincode: '',
    city: '',
    state: '',
    house: '',
    road: ''
  });

  const [activeField, setActiveField] = useState('phone');
  const [showFullForm, setShowFullForm] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = () => {
    const fullAddr = `${formData.house ? formData.house + ', ' : ''}${formData.road ? formData.road + ', ' : ''}${formData.city ? formData.city + ', ' : ''}${formData.state} - ${formData.pincode}`;
    setCustomerInfo({
      name: formData.name || 'User',
      phone: formData.phone || '',
      address: fullAddr.trim() || customerInfo.address
    });
    onBack();
  };

  return (
    <div style={{ backgroundColor: '#ebecf4', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', backgroundColor: '#fff', gap: '12px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#2d3748', padding: 0 }}>‹</button>
        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2d3748', letterSpacing: '0.5px' }}>{t.addDeliveryAddress}</span>
      </div>

      <div style={{ height: '3px', backgroundColor: '#e2e8f0', width: '100%' }}>
        <div style={{ height: '100%', width: showFullForm ? '100%' : '50%', backgroundColor: '#4c6ef5', transition: 'width 0.3s' }}></div>
      </div>

      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1, borderBottom: activeField === 'name' ? '2px solid #911181' : '1px solid #cbd5e0', paddingBottom: '4px' }}>
              <label style={{ fontSize: '0.72rem', color: activeField === 'name' ? '#911181' : '#718096', display: 'block' }}>{t.name}</label>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                <input type="text" value={formData.name} onFocus={() => setActiveField('name')} onChange={(e) => handleChange('name', e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', fontWeight: '500' }} />
                {formData.name && <span style={{ color: '#718096', fontSize: '0.85rem' }}>✓</span>}
              </div>
            </div>

            <div style={{ flex: 1, borderBottom: activeField === 'phone' ? '2px solid #911181' : '1px solid #cbd5e0', paddingBottom: '4px' }}>
              <label style={{ fontSize: '0.72rem', color: activeField === 'phone' ? '#911181' : '#718096', display: 'block' }}>{t.contactNumber}</label>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#1a202c', marginRight: '4px' }}>+91</span>
                <input type="text" value={formData.phone} onFocus={() => setActiveField('phone')} onChange={(e) => handleChange('phone', e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', fontWeight: '500' }} />
              </div>
            </div>
          </div>
        </div>

        {!showFullForm ? (
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <button 
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(() => {
                    setFormData(prev => ({ ...prev, city: 'Jodhpur', state: 'Rajasthan', pincode: '342001' }));
                    setShowFullForm(true);
                  });
                }
              }} 
              style={{ width: '100%', backgroundColor: '#2d3142', color: '#fff', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              {t.getAddress}
            </button>
            <button 
              onClick={() => setShowFullForm(true)} 
              style={{ background: 'none', border: 'none', color: '#911181', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {t.enterAddress}
            </button>
          </div>
        ) : (
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ borderBottom: activeField === 'pincode' ? '2px solid #911181' : '1px solid #cbd5e0', paddingBottom: '4px' }}>
              <label style={{ fontSize: '0.72rem', color: activeField === 'pincode' ? '#911181' : '#718096', display: 'block' }}>{t.pincode}</label>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                <input type="text" value={formData.pincode} onFocus={() => setActiveField('pincode')} onChange={(e) => handleChange('pincode', e.target.value)} placeholder="342001" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', fontWeight: '500' }} />
                {formData.pincode ? <span style={{ color: '#718096', fontSize: '0.85rem' }}>✓</span> : <span style={{ color: '#911181' }}>🔊</span>}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, borderBottom: activeField === 'city' ? '2px solid #911181' : '1px solid #cbd5e0', paddingBottom: '4px' }}>
                <label style={{ fontSize: '0.72rem', color: activeField === 'city' ? '#911181' : '#718096', display: 'block' }}>{t.city}</label>
                <input type="text" value={formData.city} onFocus={() => setActiveField('city')} onChange={(e) => handleChange('city', e.target.value)} placeholder="Jodhpur" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', fontWeight: '500', marginTop: '2px' }} />
              </div>
              <div style={{ flex: 1, borderBottom: activeField === 'state' ? '2px solid #911181' : '1px solid #cbd5e0', paddingBottom: '4px' }}>
                <label style={{ fontSize: '0.72rem', color: activeField === 'state' ? '#911181' : '#718096', display: 'block' }}>{t.state}</label>
                <select value={formData.state} onFocus={() => setActiveField('state')} onChange={(e) => handleChange('state', e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', fontWeight: '500', backgroundColor: 'transparent', marginTop: '2px' }}>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>
            </div>

            <div style={{ borderBottom: activeField === 'house' ? '2px solid #911181' : '1px solid #cbd5e0', paddingBottom: '4px' }}>
              <label style={{ fontSize: '0.72rem', color: activeField === 'house' ? '#911181' : '#718096', display: 'block' }}>{t.houseNo}</label>
              <input type="text" value={formData.house} onFocus={() => setActiveField('house')} onChange={(e) => handleChange('house', e.target.value)} placeholder="Hem Bhawan" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', fontWeight: '500', marginTop: '2px' }} />
            </div>

            <div style={{ borderBottom: activeField === 'road' ? '2px solid #911181' : '1px solid #cbd5e0', paddingBottom: '4px' }}>
              <label style={{ fontSize: '0.72rem', color: activeField === 'road' ? '#911181' : '#718096', display: 'block' }}>{t.roadName}</label>
              <input type="text" value={formData.road} onFocus={() => setActiveField('road')} onChange={(e) => handleChange('road', e.target.value)} placeholder="Damodar Colony, Mahamandir Road, Jodhpur" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', fontWeight: '500', marginTop: '2px' }} />
            </div>
          </div>
        )}
      </div>

      {showFullForm && (
        <div style={{ padding: '12px 16px', backgroundColor: '#ebecf4' }}>
          <button onClick={handleSaveAddress} style={{ width: '100%', padding: '14px', border: 'none', borderRadius: '6px', backgroundColor: '#911181', color: '#fff', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }}>
            {t.saveAndContinue}
          </button>
        </div>
      )}
    </div>
  );
}

// Main Cart Component
export default function Cart({ setActiveTab, cartItems = [], setCartItems, userEmail, customerInfo, setCustomerInfo, BACKEND = 'http://localhost:5001' }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'English';
  });
  const t = cartTranslations[currentLang] || cartTranslations.English;

  // भाषा बदलने को तुरंत सिंक करने के लिए कस्टम इवेंट लिसनर
  useEffect(() => {
    const handleLangChange = (event) => {
      const savedLang = event.detail || localStorage.getItem('appLanguage') || 'English';
      setCurrentLang(savedLang);
    };
    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showAddressForm, setShowAddressForm] = useState(false);

  const updateQty = async (id, delta) => {
    const updated = cartItems.map(item => {
      const itemId = item.id || item._id;
      if (itemId === id) {
        const newQty = (item.qty || 1) + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean);

    setCartItems(updated);
    localStorage.setItem('luxury_cart_data', JSON.stringify(updated));
    
    if (userEmail) {
      try {
        await fetch(`${BACKEND}/api/save-heavy-data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail, cartData: updated })
        });
      } catch (err) {
        console.error("Database sync error:", err);
      }
    }
  };

  const removeItem = async (id) => {
    const updated = cartItems.filter(item => (item.id || item._id) !== id);
    setCartItems(updated);
    localStorage.setItem('luxury_cart_data', JSON.stringify(updated));

    if (userEmail) {
      try {
        await fetch(`${BACKEND}/api/save-heavy-data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail, cartData: updated })
        });
      } catch (err) {
        console.error("Database sync error:", err);
      }
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const productPriceTotal = cartItems.reduce((acc, item) => {
    const rawPrice = item.price ? Number(String(item.price).replace(/[^0-9]/g, '')) : 184;
    return acc + (rawPrice * (item.qty || 1));
  }, 0);
  
  const totalDiscounts = 12 * totalItems; 
  const subTotalAfterDiscount = productPriceTotal - totalDiscounts;
  const gstAmount = Math.round(subTotalAfterDiscount * 0.05);
  const orderTotal = subTotalAfterDiscount + gstAmount;
  const onlinePayDiscount = paymentMethod === 'online' ? 13 : 0;
  const finalAmountToPay = orderTotal - onlinePayDiscount;

  const handlePlaceOrder = async () => {
    const activeEmail = userEmail || localStorage.getItem('customerEmail') || 'bunty@luxury.com';
    const authToken = localStorage.getItem('customerToken') || '';

    const detectedShopId = cartItems[0]?.shop_id || cartItems[0]?.shopId || 'SHOP123';

    const formattedItems = cartItems.map(item => ({
      ...item,
      id: item.id || item._id,
      shop_id: item.shop_id || item.shopId || detectedShopId,
      name: item.title || item.name || 'Luxury Item',
      price: item.price || '₹184',
      qty: item.qty || 1
    }));

    const orderData = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      shop_id: String(detectedShopId),
      userEmail: activeEmail,
      email: activeEmail,
      items: formattedItems,
      totalAmount: finalAmountToPay,
      gstCollected: gstAmount,
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
      vendorEmail: cartItems[0]?.vendorEmail || 'owner@luxury.in'
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
          items: formattedItems,
          totalAmount: finalAmountToPay,
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
        if (activeEmail) {
          await fetch(`${BACKEND}/api/save-heavy-data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: activeEmail, cartData: [] })
          });
        }

        alert(`🎉 Order Placed Successfully, Hukum!\nOrder ID: ${orderData.orderId}\nShop ID: ${detectedShopId}\nSaved in Database & sent to Vendor! 📦`);

        setCartItems([]);
        localStorage.removeItem('luxury_cart_data');
        setActiveTab('orders');
      } else {
        alert('❌ Order saving failed on database.');
      }
    } catch (err) {
      console.error("Database order error:", err);
      alert('❌ Server connection error while placing order.');
    }
  };

  if (showAddressForm) {
    return <AddDeliveryAddress customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} onBack={() => setShowAddressForm(false)} />;
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: '#0c0b0a', color: '#d4af37', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: '"Cinzel", serif', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20px', right: '30px', backgroundColor: '#1c1815', border: '1px solid #d4af37', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', color: '#ffd700' }}>
          STEP 1/2
        </div>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: 'bold', marginBottom: '10px' }}>{t.emptyCart}</div>
          <div style={{ width: '220px', height: '220px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#161310', borderRadius: '50%', border: '2px dashed #d4af37' }}>
            <span style={{ fontSize: '3rem' }}>🛒</span>
          </div>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>{t.cartEmptyTitle}</h2>
        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '25px', textAlign: 'center' }}>{t.cartEmptyDesc}</p>
        <button 
          onClick={() => setActiveTab('home')} 
          style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', borderRadius: '25px', padding: '12px 35px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)' }}
        >
          {t.startShopping}
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0c0b0a', color: '#d4af37', minHeight: '100vh', padding: '15px', fontFamily: '"Cinzel", serif', paddingBottom: '90px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px 15px', borderRadius: '8px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => step === 2 ? setStep(1) : setActiveTab('home')} style={{ background: 'none', border: 'none', color: '#d4af37', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>‹</button>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#ffd700' }}>
            {step === 1 ? t.reviewOrder : t.paymentMethod}
          </h2>
        </div>
        <span style={{ backgroundColor: '#221e18', color: '#ffd700', padding: '4px 12px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #d4af37' }}>
          {step === 1 ? 'STEP 1/2' : 'STEP 2/2'}
        </span>
      </div>

      <div style={{ backgroundColor: '#1c1815', color: '#68e1d5', padding: '10px 15px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center', border: '1px solid rgba(104, 225, 213, 0.3)' }}>
        🎉 ₹{totalDiscounts} OFF on this order (Database Secured)
      </div>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {cartItems.map((item, index) => {
            const itemId = item.id || item._id;
            return (
              <div key={`${itemId || 'cart'}_${index}`} style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px', borderRadius: '8px', display: 'flex', gap: '12px' }}>
                <img 
                  src={item.img || item.image || "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500"} 
                  alt={item.title || item.name} 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500"; }}
                  style={{ width: '75px', height: '75px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #33291a' }} 
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>{item.title || item.name}</span>
                    <span onClick={() => removeItem(itemId)} style={{ cursor: 'pointer', color: '#e53e3e', fontWeight: 'bold', fontSize: '0.9rem' }}>✕</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ffd700' }}>
                    {item.price || "₹184"}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#aaa' }}>Size: Free Size &nbsp;|&nbsp; Qty: 
                    <button onClick={() => updateQty(itemId, -1)} style={{ margin: '0 5px', padding: '0 5px', background: '#222', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}>-</button>
                    <b style={{ color: '#fff' }}>{item.qty || 1}</b>
                    <button onClick={() => updateQty(itemId, 1)} style={{ margin: '0 5px', padding: '0 5px', background: '#222', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '10px 15px', borderRadius: '8px', fontSize: '0.8rem', color: '#aaa' }}>
            {t.soldBy} <b style={{ color: '#ffd700' }}>Luxury Store & Vendor (Jodhpur)</b>
          </div>

          <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px 15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>{customerInfo.name} &bull; <span style={{ color: '#aaa', fontWeight: 'normal' }}>{customerInfo.phone}</span></div>
                <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '3px' }}>{customerInfo.address}</div>
              </div>
              <button onClick={() => setShowAddressForm(true)} style={{ backgroundColor: '#221e18', border: '1px solid #d4af37', color: '#ffd700', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                {t.change}
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px 15px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: '#ffd700' }}>{t.priceDetails} ({totalItems} {t.item})</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#aaa', marginBottom: '5px' }}>
              <span>{t.productPrice}</span>
              <span>+₹{productPriceTotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#68e1d5', marginBottom: '5px' }}>
              <span>{t.totalDiscounts}</span>
              <span>-₹{totalDiscounts}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ffd700', marginBottom: '8px', borderBottom: '1px solid #33291a', paddingBottom: '8px' }}>
              <span>{t.gstAdded}</span>
              <span>+₹{gstAmount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>
              <span>{t.orderTotal}</span>
              <span style={{ color: '#ffd700' }}>₹{orderTotal}</span>
            </div>
          </div>

          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#12100e', borderTop: '1px solid #d4af37', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1001 }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffd700' }}>₹{orderTotal} <span style={{ fontSize: '0.75rem', color: '#68e1d5', backgroundColor: '#1c1815', padding: '2px 6px', borderRadius: '4px', border: '1px solid #68e1d5' }}>₹{totalDiscounts} OFF</span></div>
            </div>
            <button onClick={() => setStep(2)} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', borderRadius: '6px', padding: '10px 30px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>
              {t.continue}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ffd700' }}>{t.selectPayment}</div>

          <div onClick={() => setPaymentMethod('cod')} style={{ backgroundColor: '#161310', padding: '15px', borderRadius: '8px', border: paymentMethod === 'cod' ? '2px solid #ffd700' : '1px solid #33291a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>₹{orderTotal} &nbsp; <span style={{ fontWeight: 'normal', color: '#aaa' }}>{t.cod}</span> 💵</div>
            </div>
            <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
          </div>

          <div onClick={() => setPaymentMethod('online')} style={{ backgroundColor: '#161310', padding: '15px', borderRadius: '8px', border: paymentMethod === 'online' ? '2px solid #ffd700' : '1px solid #33291a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#777', textDecoration: 'line-through' }}>₹{orderTotal}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>₹{finalAmountToPay} &nbsp; <span style={{ color: '#68e1d5' }}>{t.payOnline} 📱</span></div>
              <div style={{ fontSize: '0.75rem', color: '#68e1d5', backgroundColor: '#1c1815', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px', border: '1px solid rgba(104, 225, 213, 0.3)' }}>{t.saveExtra}</div>
            </div>
            <input type="radio" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
          </div>

          <div style={{ backgroundColor: '#161310', border: '1px solid #33291a', padding: '12px 15px', borderRadius: '8px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#aaa', marginBottom: '5px' }}>
              <span>{t.orderTotal}</span>
              <span>₹{orderTotal}</span>
            </div>
            {paymentMethod === 'online' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#68e1d5', marginBottom: '5px' }}>
                <span>Online Payment Discount</span>
                <span>-₹13</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', borderTop: '1px solid #33291a', paddingTop: '8px', marginTop: '5px' }}>
              <span>{t.amountToPay}</span>
              <span style={{ color: '#ffd700' }}>₹{finalAmountToPay}</span>
            </div>
          </div>

          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#12100e', borderTop: '1px solid #d4af37', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1001 }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffd700' }}>₹{finalAmountToPay}</div>
            </div>
            <button onClick={handlePlaceOrder} style={{ backgroundColor: '#ffd700', color: '#000', border: 'none', borderRadius: '6px', padding: '12px 35px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }}>
              {t.placeOrder}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}