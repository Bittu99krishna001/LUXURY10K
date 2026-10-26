import React, { useState, useEffect } from 'react';

// 🌐 Multi-language Dictionary for Order History
const orderTranslations = {
  English: {
    orderHistoryTitle: '📦 My Order History',
    home: '⬅️ Home',
    loading: 'Orders loading...',
    emptyTitle: 'Your Order History is Empty!',
    size: 'Size',
    qty: 'Qty',
    otherProducts: 'Other Products',
    orderCancelledDesc: '❌ This order has been cancelled.',
    downloadInvoice: '📄 DOWNLOAD INVOICE',
    cancelOrder: '❌ Cancel Order',
    cancelling: 'Cancelling...',
    removeFromHistory: '🗑️ Remove from History',
    confirmCancel: 'Do you really want to cancel this order, Hukum?',
    cancelledAlert: 'Order has been cancelled.',
    cancelFailed: 'Failed to cancel order.',
    serverError: 'Server Error!',
    removeConfirm: 'Do you want to remove this cancelled order from history?',
    statusConfirmed: 'Order Confirmed',
    statusPacked: 'Picked Up by Courier',
    statusTransit: 'In Transit',
    statusOutForDelivery: 'Out for Delivery',
    statusDelivered: 'Delivered',
    subtitleConfirmed: 'Your order has been placed successfully',
    subtitlePacked: 'Item packed and handed over to logistics',
    subtitleTransit: 'On the way to destination city',
    subtitleOutForDelivery: 'Courier partner is delivering today',
    subtitleDelivered: 'Package delivered successfully'
  },
  Hindi: {
    orderHistoryTitle: '📦 मेरी ऑर्डर हिस्ट्री',
    home: '⬅️ होम',
    loading: 'ऑर्डर लोड हो रहे हैं...',
    emptyTitle: 'आपकी ऑर्डर हिस्ट्री खाली है!',
    size: 'साइज़',
    qty: 'मात्रा',
    otherProducts: 'अन्य प्रोडक्ट्स',
    orderCancelledDesc: '❌ यह ऑर्डर कैंसिल कर दिया गया है।',
    downloadInvoice: '📄 इनवॉइस डाउनलोड करें',
    cancelOrder: '❌ ऑर्डर कैंसिल करें',
    cancelling: 'रद्द हो रहा है...',
    removeFromHistory: '🗑️ हिस्ट्री से हटाएं',
    confirmCancel: 'क्या आप वाकई इस ऑर्डर को कैंसिल करना चाहते हैं हुकुम?',
    cancelledAlert: 'ऑर्डर कैंसिल कर दिया गया है।',
    cancelFailed: 'ऑर्डर कैंसिल करने में असफल।',
    serverError: 'सर्वर एरर!',
    removeConfirm: 'इस कैंसिल ऑर्डर को हिस्ट्री से हटाना चाहते हैं?',
    statusConfirmed: 'ऑर्डर कन्फर्म हुआ',
    statusPacked: 'कूरियर द्वारा उठाया गया',
    statusTransit: 'मार्ग में है',
    statusOutForDelivery: 'डिलीवरी के लिए निकला',
    statusDelivered: 'डिलीवर हो गया',
    subtitleConfirmed: 'आपका ऑर्डर सफलतापूर्वक दे दिया गया है',
    subtitlePacked: 'सामान पैक किया गया और लॉजिस्टिक्स को सौंपा गया',
    subtitleTransit: 'गंतव्य शहर के रास्ते में है',
    subtitleOutForDelivery: 'कूरियर पार्टनर आज डिलीवरी कर रहा है',
    subtitleDelivered: 'पैकेज सफलतापूर्वक डिलीवर हो गया'
  },
  Tamil: {
    orderHistoryTitle: '📦 எனது ஆர்டர் வரலாறு',
    home: '⬅️ முகப்பு',
    loading: 'ஆர்டர்கள் ஏற்றப்படுகின்றன...',
    emptyTitle: 'உங்கள் ஆர்டர் வரலாறு காலியாக உள்ளது!',
    size: 'அளவு',
    qty: 'அளவு',
    otherProducts: 'இதர தயாரிப்புகள்',
    orderCancelledDesc: '❌ இந்த ஆர்டர் ரத்து செய்யப்பட்டது.',
    downloadInvoice: '📄 இன்வாய்ஸ் பதிவிறக்கம்',
    cancelOrder: '❌ ஆர்டரை ரத்து செய்',
    cancelling: 'ரத்து செய்யப்படுகிறது...',
    removeFromHistory: '🗑️ வரலாற்றிலிருந்து நீக்கு',
    confirmCancel: 'இந்த ஆர்டரை நிச்சயமாக ரத்து செய்ய விரும்புகிறீர்களா?',
    cancelledAlert: 'ஆர்டர் ரத்து செய்யப்பட்டது.',
    cancelFailed: 'ரத்து செய்ய முடியவில்லை.',
    serverError: 'சர்வர் பிழை!',
    removeConfirm: 'வரலாற்றிலிருந்து நீக்க விரும்புகிறீர்களா?',
    statusConfirmed: 'ஆர்டர் உறுதிசெய்யப்பட்டது',
    statusPacked: 'பேக் செய்யப்பட்டது',
    statusTransit: 'வழியில் உள்ளது',
    statusOutForDelivery: 'டெலிவரிக்கு வந்துள்ளது',
    statusDelivered: 'டெலிவரி செய்யப்பட்டது',
    subtitleConfirmed: 'ஆர்டர் வெற்றிகரமாக செய்யப்பட்டது',
    subtitlePacked: 'லாஜிஸ்டிக்ஸிடம் ஒப்படைக்கப்பட்டது',
    subtitleTransit: 'நகரத்தை நோக்கிச் செல்கிறது',
    subtitleOutForDelivery: 'இன்று விநியோகிக்கப்படும்',
    subtitleDelivered: 'வெற்றிகரமாக விநியோகிக்கப்பட்டது'
  },
  Marathi: {
    orderHistoryTitle: '📦 माझी ऑर्डर हिस्ट्री',
    home: '⬅️ होम',
    loading: 'ऑर्डर लोड होत आहेत...',
    emptyTitle: 'तुमची ऑर्डर हिस्ट्री रिकामी आहे!',
    size: 'आकार',
    qty: 'प्रमाण',
    otherProducts: 'इतर उत्पादने',
    orderCancelledDesc: '❌ ही ऑर्डर रद्द करण्यात आली आहे.',
    downloadInvoice: '📄 इनव्हॉइस डाउनलोड करा',
    cancelOrder: '❌ ऑर्डर रद्द करा',
    cancelling: 'रद्द होत आहे...',
    removeFromHistory: '🗑️ हिस्ट्रीमधून हटवा',
    confirmCancel: 'तुम्हाला खरोखर ही ऑर्डर रद्द करायची आहे का?',
    cancelledAlert: 'ऑर्डर रद्द करण्यात आली आहे.',
    cancelFailed: 'ऑर्डर रद्द करण्यात अयशस्वी.',
    serverError: 'सर्व्हर त्रुटी!',
    removeConfirm: 'ही रद्द केलेली ऑर्डर हिस्ट्रीमधून हटवायची आहे का?',
    statusConfirmed: 'ऑर्डर निश्चित झाली',
    statusPacked: 'पॅक केले',
    statusTransit: 'मार्गावर आहे',
    statusOutForDelivery: 'डिलिव्हरीसाठी बाहेर',
    statusDelivered: 'डिलिव्हर झाले',
    subtitleConfirmed: 'तुमची ऑर्डर यशस्वीरीत्या नोंदवली गेली',
    subtitlePacked: 'लॉजिस्टिककडे सुपूर्द केले',
    subtitleTransit: 'गंतव्य शहराच्या मार्गावर',
    subtitleOutForDelivery: 'आज डिलिव्हरी होईल',
    subtitleDelivered: 'यशस्वीरीत्या डिलिव्हरी झाली'
  },
  Bengali: {
    orderHistoryTitle: '📦 আমার অর্ডার ইতিহাস',
    home: '⬅️ হোম',
    loading: 'অর্ডার লোড হচ্ছে...',
    emptyTitle: 'আপনার অর্ডার ইতিহাস খালি!',
    size: 'সাইজ',
    qty: 'পরিমাণ',
    otherProducts: 'অন্যান্য পণ্য',
    orderCancelledDesc: '❌ এই অর্ডারটি বাতিল করা হয়েছে।',
    downloadInvoice: '📄 ইনভয়েস ডাউনলোড করুন',
    cancelOrder: '❌ অর্ডার বাতিল করুন',
    cancelling: 'বাতিল হচ্ছে...',
    removeFromHistory: '🗑️ ইতিহাস থেকে সরান',
    confirmCancel: 'আপনি কি সত্যিই এই অর্ডারটি বাতিল করতে চান?',
    cancelledAlert: 'অর্ডার বাতিল করা হয়েছে।',
    cancelFailed: 'অর্ডার বাতিল করতে ব্যর্থ।',
    serverError: 'সার্ভার ত্রুটি!',
    removeConfirm: 'ইতিহাস থেকে এই বাতিল অর্ডার সরাতে চান?',
    statusConfirmed: 'অর্ডার নিশ্চিত হয়েছে',
    statusPacked: 'প্যাক করা হয়েছে',
    statusTransit: 'পথে আছে',
    statusOutForDelivery: 'ডেলিভারির জন্য বের হয়েছে',
    statusDelivered: 'ডেলিভারি সম্পন্ন',
    subtitleConfirmed: 'আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে',
    subtitlePacked: 'লজিস্টিক্সে হস্তান্তর করা হয়েছে',
    subtitleTransit: 'গন্তব্য শহরের পথে',
    subtitleOutForDelivery: 'আজই ডেলিভারি করা হবে',
    subtitleDelivered: 'প্যাকেজ সফলভাবে ডেলিভারি করা হয়েছে'
  },
  Telugu: {
    orderHistoryTitle: '📦 నా ఆర్డర్ హిస్టరీ',
    home: '⬅️ హోమ్',
    loading: 'ఆర్డర్లు లోడ్ అవుతున్నాయి...',
    emptyTitle: 'మీ ఆర్డర్ హిస్టరీ ఖాళీగా ఉంది!',
    size: 'సైజు',
    qty: 'పరిమాణం',
    otherProducts: 'ఇతర ఉత్పత్తులు',
    orderCancelledDesc: '❌ ఈ ఆర్డర్ రద్దు చేయబడింది.',
    downloadInvoice: '📄 ఇన్‌వాయిస్ డౌన్‌లోడ్',
    cancelOrder: '❌ ఆర్డర్ రద్దు చేయి',
    cancelling: 'రద్దు అవుతోంది...',
    removeFromHistory: '🗑️ హిస్టరీ నుండి తొలగించు',
    confirmCancel: 'మీరు నిజంగా ఈ ఆర్డర్‌ను రద్దు చేయాలనుకుంటున్నారా?',
    cancelledAlert: 'ఆర్డర్ రద్దు చేయబడింది.',
    cancelFailed: 'ఆర్డర్ రద్దు విఫలమైంది.',
    serverError: 'సర్వర్ లోపం!',
    removeConfirm: 'హిస్టరీ నుండి రద్దు చేసిన ఆర్డర్‌ను తొలగించాలా?',
    statusConfirmed: 'ఆర్డర్ ధృవీకరించబడింది',
    statusPacked: 'ప్యాక్ చేయబడింది',
    statusTransit: 'రవాణాలో ఉంది',
    statusOutForDelivery: 'డెలివరీకి బయలుదేరింది',
    statusDelivered: 'డెలివరీ చేయబడింది',
    subtitleConfirmed: 'మీ ఆర్డర్ విజయవంతంగా ఉంచబడింది',
    subtitlePacked: 'లాజిస్టిక్స్‌కు అందజేశారు',
    subtitleTransit: 'గమ్యస్థాన నగరానికి మార్గంలో ఉంది',
    subtitleOutForDelivery: 'ఈరోజే డెలివరీ చేయబడుతుంది',
    subtitleDelivered: 'ప్యాకేజీ విజయవంతంగా డెలివరీ చేయబడింది'
  },
  Kannada: {
    orderHistoryTitle: '📦 ನನ್ನ ಆರ್ಡರ್ ಇತಿಹಾಸ',
    home: '⬅️ ಮುಖಪುಟ',
    loading: 'ಆರ್ಡರ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    emptyTitle: 'ನಿಮ್ಮ ಆರ್ಡರ್ ಇತಿಹಾಸ ಖಾಲಿಯಾಗಿದೆ!',
    size: 'ಗಾತ್ರ',
    qty: 'ಪ್ರಮಾಣ',
    otherProducts: 'ಇತರ ಉತ್ಪನ್ನಗಳು',
    orderCancelledDesc: '❌ ಈ ಆರ್ಡರ್ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.',
    downloadInvoice: '📄 ಇನ್‌ವಾಯ್ಸ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    cancelOrder: '❌ ಆರ್ಡರ್ ರದ್ದುಮಾಡಿ',
    cancelling: 'ರದ್ದಾಗುತ್ತಿದೆ...',
    removeFromHistory: '🗑️ ಇತಿಹಾಸದಿಂದ ತೆಗೆದುಹಾಕಿ',
    confirmCancel: 'ನೀವು ನಿಜವಾಗಿಯೂ ಈ ಆರ್ಡರ್ ರದ್ದುಗೊಳಿಸಲು ಬಯಸುತ್ತೀರಾ?',
    cancelledAlert: 'ಆರ್ಡರ್ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.',
    cancelFailed: 'ಆರ್ಡರ್ ರದ್ದುಗೊಳಿಸಲು ವಿಫಲವಾಗಿದೆ.',
    serverError: 'ಸರ್ವರ್ ದೋಷ!',
    removeConfirm: 'ಇತಿಹಾಸದಿಂದ ರದ್ದಾದ ಆರ್ಡರ್ ತೆಗೆದುಹಾಕಬೇಕೇ?',
    statusConfirmed: 'ಆರ್ಡರ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ',
    statusPacked: 'ಪ್ಯಾಕ್ ಮಾಡಲಾಗಿದೆ',
    statusTransit: 'ಮಾರ್ಗದಲ್ಲಿದೆ',
    statusOutForDelivery: 'ಡೆಲಿವರಿಗೆ ಹೊರಟಿದೆ',
    statusDelivered: 'ಡೆಲಿವರಿ ಮಾಡಲಾಗಿದೆ',
    subtitleConfirmed: 'ನಿಮ್ಮ ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ',
    subtitlePacked: 'ಲಾಜಿಸ್ಟಿಕ್ಸ್‌ಗೆ ಹಸ್ತಾಂತರಿಸಲಾಗಿದೆ',
    subtitleTransit: 'ತಲುಪುವ ನಗರದ ಮಾರ್ಗದಲ್ಲಿದೆ',
    subtitleOutForDelivery: 'ಇಂದೇ ಡೆಲಿವರಿ ಮಾಡಲಾಗುತ್ತದೆ',
    subtitleDelivered: 'ಪ್ಯಾಕೇಜ್ ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿಸಲಾಗಿದೆ'
  },
  Malayalam: {
    orderHistoryTitle: '📦 എന്റെ ഓർഡർ ഹിസ്റ്ററി',
    home: '⬅️ ഹോം',
    loading: 'ഓർഡറുകൾ ലോഡുചെയ്യുന്നു...',
    emptyTitle: 'നിങ്ങളുടെ ഓർഡർ ഹിസ്റ്ററി ശൂന്യമാണ്!',
    size: 'സൈസ്',
    qty: 'അളവ്',
    otherProducts: 'മറ്റ് ഉൽപ്പന്നങ്ങൾ',
    orderCancelledDesc: '❌ ഈ ഓർഡർ റദ്ദാക്കി.',
    downloadInvoice: '📄 ഇൻവോയ്സ് ഡൗൺലോഡ് ചെയ്യുക',
    cancelOrder: '❌ ഓർഡർ റദ്ദാക്കുക',
    cancelling: 'റദ്ദാക്കുന്നു...',
    removeFromHistory: '🗑️ ഹിസ്റ്ററിയിൽ നിന്ന് നീക്കുക',
    confirmCancel: 'ഈ ഓർഡർ റദ്ദാക്കാൻ നിങ്ങൾ ഉറപ്പാണോ?',
    cancelledAlert: 'ഓർഡർ റദ്ദാക്കി.',
    cancelFailed: 'ഓർഡർ റദ്ദാക്കുന്നതിൽ പരാജയപ്പെട്ടു.',
    serverError: 'സർവർ പിശക്!',
    removeConfirm: 'ഹിസ്റ്ററിയിൽ നിന്ന് നീക്കം ചെയ്യണോ?',
    statusConfirmed: 'ഓർഡർ സ്ഥിരീകരിച്ചു',
    statusPacked: 'പാക്ക് ചെയ്തു',
    statusTransit: 'വഴിയിലാണ്',
    statusOutForDelivery: 'ഡെലിവറിക്ക് ഇറങ്ങി',
    statusDelivered: 'ഡെലിവർ ചെയ്തു',
    subtitleConfirmed: 'ഓർഡർ വിജയകരമായി നൽകി',
    subtitlePacked: 'ലോജിസ്റ്റിക്‌സിന് കൈമാറി',
    subtitleTransit: 'ലക്ഷ്യസ്ഥാനത്തേക്ക് പോകുന്നു',
    subtitleOutForDelivery: 'ഇന്ന് ഡെലിവറി ചെയ്യും',
    subtitleDelivered: 'പാക്കേജ് വിജയകരമായി എത്തിച്ചു'
  }
};

const OrderHistory = ({ userEmail, setActiveTab, authToken }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // 🌐 भाषा सिंक स्टेट
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'English';
  });

  const t = orderTranslations[currentLang] || orderTranslations.English;

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

  const BACKEND = 'http://localhost:5001';

  const fetchOrders = async () => {
    try {
      const activeEmail = userEmail || localStorage.getItem('customerEmail') || localStorage.getItem('userEmail') || '';
      if (!activeEmail) return;

      const response = await fetch(`${BACKEND}/api/user-orders?email=${encodeURIComponent(activeEmail)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken || ''}`
        }
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Order history fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userEmail, authToken]);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  // Order Cancel Logic
  const handleCancelOrder = async (e, orderId, databaseId) => {
    e.stopPropagation();
    if (cancellingId) return;
    if (!window.confirm(t.confirmCancel)) return;

    const targetId = databaseId || orderId;
    setCancellingId(orderId);

    try {
      const response = await fetch(`${BACKEND}/api/cancel-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken || ''}`
        },
        body: JSON.stringify({ orderId: targetId })
      });
      
      const data = await response.json();
      if (data.success) {
        alert(t.cancelledAlert);
        // State update for quick response
        setOrders(prevOrders => prevOrders.filter(o => (o.order_id || o.orderId || o.id || o._id) !== targetId));
      } else {
        alert(data.message || t.cancelFailed);
      }
    } catch (err) {
      console.error("Cancel order error:", err);
      alert(t.serverError);
    } finally {
      setCancellingId(null);
    }
  };

  // Option to manually remove cancelled order card from history view
  const handleRemoveFromHistory = (e, targetId) => {
    e.stopPropagation();
    if (window.confirm(t.removeConfirm)) {
      setOrders(prevOrders => prevOrders.filter(o => (o.order_id || o.orderId || o.id || o._id) !== targetId));
    }
  };

  const handleDownloadInvoice = (e, order) => {
    e.stopPropagation();
    const printWindow = window.open('', '_blank');
    let parsedItems = order.items;
    if (typeof parsedItems === 'string') {
      try { parsedItems = JSON.parse(parsedItems); } catch (e) { parsedItems = []; }
    }

    let calculatedTotal = order.total_amount || order.totalAmount || 0;
    const itemsHtml = Array.isArray(parsedItems) ? parsedItems.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #333;">${item.name || item.title || 'Luxury Product'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #333; text-align: center;">${item.qty || item.quantity || 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #333; text-align: right;">₹${item.price || 0}</td>
      </tr>
    `).join('') : '';

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${order.order_id || order.orderId || order.id}</title>
          <style>
            body { font-family: 'Georgia', serif; padding: 30px; background: #0c0b0a; color: #d4af37; }
            .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 15px; margin-bottom: 25px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; color: #fff; }
            th { background-color: #1a1714; padding: 10px; border-bottom: 2px solid #d4af37; text-align: left; color: #d4af37; }
            .total { text-align: right; font-size: 1.3rem; font-weight: bold; margin-top: 25px; color: #ffd700; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; letter-spacing: 2px;">LUXURY STORE JODHPUR</h1>
            <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #aaa;">Official Purchase Invoice</p>
          </div>
          <div style="color: #ccc; margin-bottom: 20px;">
            <p><strong>Order ID:</strong> #${order.order_id || order.orderId || order.id}</p>
            <p><strong>Date:</strong> ${new Date(order.created_at || order.date).toLocaleString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div class="total">Total Paid: ₹${calculatedTotal}</div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const getStepIndex = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('pack')) return 1;
    if (s.includes('ship')) return 2;
    if (s.includes('out') || s.includes('delivery')) return 3;
    if (s.includes('deliver')) return 4;
    if (s.includes('cancel')) return -1;
    return 0; 
  };

  const trackingSteps = [
    { title: t.statusConfirmed, subtitle: t.subtitleConfirmed },
    { title: t.statusPacked, subtitle: t.subtitlePacked },
    { title: t.statusTransit, subtitle: t.subtitleTransit },
    { title: t.statusOutForDelivery, subtitle: t.subtitleOutForDelivery },
    { title: t.statusDelivered, subtitle: t.subtitleDelivered }
  ];

  return (
    <div style={{ padding: '20px 15px', backgroundColor: '#0c0b0a', minHeight: '100vh', color: '#fff', boxSizing: 'border-box', fontFamily: "'Poppins', sans-serif", width: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #2a2215', paddingBottom: '15px', maxWidth: '900px', margin: '0 auto 25px auto' }}>
        <h2 style={{ color: '#d4af37', margin: 0, fontSize: '1.4rem', letterSpacing: '1px' }}>{t.orderHistoryTitle}</h2>
        <button onClick={() => setActiveTab('home')} style={{ background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)', border: 'none', color: '#000', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', boxShadow: '0 2px 10px rgba(212, 175, 55, 0.3)' }}>
          {t.home}
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#d4af37', marginTop: '50px' }}>{t.loading}</p>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '60px', color: '#888' }}>
          <p style={{ fontSize: '3.5rem', margin: 0 }}>🛍️</p>
          <p style={{ fontSize: '1.1rem', color: '#aaa' }}>{t.emptyTitle}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
          {orders.map((order, idx) => {
            const currentOrderId = order.order_id || order.orderId || order.id || `ORD-${idx}`;
            const databaseId = order._id || order.id || order.order_id;
            const currentStatus = order.status || 'Order Confirmed';
            const stepIdx = getStepIndex(currentStatus);
            const isCancelled = stepIdx === -1;
            const isDelivered = stepIdx === 4; // Check if order delivered
            const canCancel = !isCancelled && (stepIdx === 0);
            const isExpanded = expandedOrderId === currentOrderId;

            let orderItems = [];
            if (typeof order.items === 'string') {
              try {
                orderItems = JSON.parse(order.items);
              } catch (e) {
                // If stored as simple text string e.g., "Product A (x1)"
                orderItems = [{ name: order.items, qty: 1, price: order.total_amount || 0 }];
              }
            } else if (Array.isArray(order.items)) {
              orderItems = order.items;
            }

            const firstItem = Array.isArray(orderItems) && orderItems.length > 0 ? orderItems[0] : {};

            let calculatedTotal = order.total_amount || order.totalAmount;
            if (!calculatedTotal || Number(calculatedTotal) === 0) {
              if (Array.isArray(orderItems)) {
                calculatedTotal = orderItems.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.qty || item.quantity || 1)), 0);
              }
            }

            const productName = firstItem.name || firstItem.title || firstItem.productName || (typeof order.items === 'string' ? order.items : 'Luxury Product');
            const productSize = firstItem.size && String(firstItem.size).toLowerCase() !== 'free size' ? `${t.size}: ${firstItem.size} • ` : '';
            const productQty = `${t.qty}: ${firstItem.qty || firstItem.quantity || 1}`;
            const productImage = firstItem.image || firstItem.img || firstItem.imageUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500';
            
            return (
              <div 
                key={currentOrderId} 
                onClick={() => toggleExpand(currentOrderId)}
                style={{ 
                  backgroundColor: '#141210', 
                  border: isExpanded ? '1px solid #d4af37' : '1px solid #282117', 
                  borderRadius: '12px', 
                  padding: '16px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isExpanded ? '0 8px 25px rgba(0, 0, 0, 0.6), 0 0 10px rgba(212, 175, 55, 0.15)' : 'none'
                }}
              >
                {/* 🔹 COMPACT PRIMARY VIEW */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                  
                  {/* Left: Product Image */}
                  <img 
                    src={productImage} 
                    alt="product" 
                    style={{ width: '75px', height: '75px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #332a1d', flexShrink: 0 }}
                  />

                  {/* Middle: Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#fff', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {productName}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#999', marginBottom: '6px' }}>
                      {productSize}{productQty}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '3px 8px', 
                        borderRadius: '4px', 
                        fontWeight: '600',
                        backgroundColor: isCancelled ? 'rgba(255, 107, 107, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                        color: isCancelled ? '#ff6b6b' : '#ffd700',
                        border: isCancelled ? '1px solid rgba(255, 107, 107, 0.3)' : '1px solid rgba(212, 175, 55, 0.3)'
                      }}>
                        {currentStatus.toUpperCase()}
                      </span>
                      <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1rem' }}>
                        ₹{calculatedTotal}
                      </span>
                    </div>
                  </div>

                  {/* Right: Expand Arrow */}
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1c1813', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.3s' }}>
                    ❯
                  </div>
                </div>

                {/* 🔹 EXPANDED VIEW */}
                {isExpanded && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #231d14' }} onClick={(e) => e.stopPropagation()}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888', marginBottom: '18px', paddingBottom: '8px', borderBottom: '1px dashed #231d14' }}>
                      <span>ORDER ID: <strong style={{ color: '#ccc' }}>#{currentOrderId}</strong></span>
                      <span>DATE: <strong style={{ color: '#ccc' }}>{new Date(order.created_at || order.date).toLocaleDateString()}</strong></span>
                    </div>

                    {/* Additional Items */}
                    {Array.isArray(orderItems) && orderItems.length > 1 && (
                      <div style={{ background: '#0e0c0a', padding: '12px', borderRadius: '8px', marginBottom: '18px', border: '1px solid #221c13' }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: '#d4af37', fontWeight: 'bold' }}>{t.otherProducts} ({orderItems.length - 1}):</p>
                        {orderItems.slice(1).map((item, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#bbb', marginBottom: '4px' }}>
                            <span>{item.name || item.title || 'Product'} (x{item.qty || 1})</span>
                            <span style={{ color: '#ffd700' }}>₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tracking Steps */}
                    {!isCancelled ? (
                      <div style={{ margin: '20px 0', padding: '15px 10px', backgroundColor: '#090807', borderRadius: '10px', border: '1px solid #221c13' }}>
                        <div style={{ position: 'relative', paddingLeft: '25px' }}>
                          {trackingSteps.map((step, sIdx) => {
                            const isCompleted = sIdx <= stepIdx;
                            const isLast = sIdx === trackingSteps.length - 1;

                            return (
                              <div key={sIdx} style={{ position: 'relative', paddingBottom: isLast ? '0' : '22px' }}>
                                {!isLast && (
                                  <div style={{
                                    position: 'absolute',
                                    left: '-16px',
                                    top: '12px',
                                    bottom: '0',
                                    width: '2px',
                                    backgroundColor: sIdx < stepIdx ? '#d4af37' : '#262018'
                                  }} />
                                )}
                                <div style={{
                                  position: 'absolute',
                                  left: '-22px',
                                  top: '2px',
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '50%',
                                  backgroundColor: isCompleted ? '#ffd700' : '#141210',
                                  border: isCompleted ? '3px solid #090807' : '2px solid #443828',
                                  boxShadow: isCompleted ? '0 0 8px rgba(255, 215, 0, 0.6)' : 'none'
                                }} />
                                <div>
                                  <div style={{ fontSize: '0.88rem', fontWeight: isCompleted ? 'bold' : '500', color: isCompleted ? '#ffd700' : '#666' }}>
                                    {step.title}
                                  </div>
                                  <div style={{ fontSize: '0.75rem', color: isCompleted ? '#aaa' : '#444', marginTop: '2px' }}>
                                    {step.subtitle}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: '12px', backgroundColor: 'rgba(255, 107, 107, 0.08)', border: '1px solid rgba(255, 107, 107, 0.3)', borderRadius: '8px', textAlign: 'center', color: '#ff6b6b', fontSize: '0.85rem', marginBottom: '15px' }}>
                        {t.orderCancelledDesc}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end', marginTop: '15px', flexWrap: 'wrap' }}>
                      
                      {/* Invoice button: Sirf Delivery hone par dikhega */}
                      {isDelivered && (
                        <button 
                          onClick={(e) => handleDownloadInvoice(e, order)}
                          style={{ background: '#1c1712', border: '1px solid #d4af37', color: '#d4af37', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 'bold' }}
                        >
                          {t.downloadInvoice}
                        </button>
                      )}

                      {/* Chhota Cancel Button */}
                      {canCancel && (
                        <button 
                          onClick={(e) => handleCancelOrder(e, currentOrderId, databaseId)}
                          disabled={cancellingId === currentOrderId}
                          style={{ background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                        >
                          {cancellingId === currentOrderId ? t.cancelling : t.cancelOrder}
                        </button>
                      )}

                      {/* Remove from history button for cancelled orders */}
                      {isCancelled && (
                        <button 
                          onClick={(e) => handleRemoveFromHistory(e, databaseId || currentOrderId)}
                          style={{ background: '#201010', border: '1px solid #552222', color: '#aaa', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          {t.removeFromHistory}
                        </button>
                      )}

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;