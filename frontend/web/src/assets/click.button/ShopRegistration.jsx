import React, { useState, useEffect } from 'react';

// 🌐 Multi-language Dictionary for Shop Registration
const shopRegTranslations = {
  English: {
    headerTitle: 'LUXURY STORE REGISTRATION SHOPS (Strict Security Secured)',
    formA: 'Form A (See Rule 3)',
    partI: 'PART - I',
    estName: 'Name of the Establishment:',
    category: 'Category of Establishment:',
    select: '--Select--',
    commercial: 'Commercial Establishment',
    shop: 'Shop',
    hotelRest: 'Hotel / Restaurant',
    address: 'Address:',
    addressPlaceholder: 'e.g., Mandir Street',
    state: 'State:',
    jodhpur: 'Jodhpur',
    rajasthan: 'Rajasthan',
    city: 'City:',
    cityPlaceholder: 'e.g., Jodhpur',
    mobile: 'Mobile (WhatsApp):',
    pin: 'Pin (6 Digits):',
    pinPlaceholder: 'e.g., 342001',
    email: 'Email (Strictly @gmail.com):',
    livePhoto: '📸 Live Shop Photo:',
    livePhotoDesc: 'Camera will open directly on your mobile, Hukum.',
    shopDetailsTitle: 'Details of the Shops/Establishment',
    occupierName: 'Name of the Occupier/Employer:',
    relativeName: "Father's/Husband's Name of Occupier:",
    father: 'Father',
    husband: 'Husband',
    natureOfBusiness: 'Nature of Business:',
    retailMenswear: 'Retail Apparel & Menswear',
    generalStore: 'General Store',
    continueBtn: 'Continue & Send Email OTP',
    cancelBtn: 'Cancel',
    processing: 'Processing...',
    emailOtpTitle: '📧 Email OTP Verification',
    emailOtpDesc: 'We have sent a 6-digit OTP to your Gmail ID, Hukum!',
    emailOtpPlaceholder: 'Enter 6-digit OTP',
    verifyEmailBtn: 'Verify Email OTP',
    resendEmailBtn: '🔄 Resend Email OTP',
    whatsappOtpTitle: '💬 WhatsApp OTP Verification',
    whatsappOtpDesc: 'OTP has been sent to your number',
    whatsappOtpPlaceholder: 'WhatsApp 6-digit OTP',
    verifyWhatsappBtn: 'Verify WhatsApp OTP',
    resendWhatsappBtn: '🔄 Resend WhatsApp OTP',
    pendingTitle: '⏳ 24 Hours Approval Pending, Hukum!',
    pendingDesc: 'Your credentials and database verification are safely processing.',
    checkStatusBtn: '🔄 Check Approval Status',
    verifying: 'Verifying...'
  },
  Hindi: {
    headerTitle: 'लक्जरी स्टोर रजिस्ट्रेशन शॉप्स (सख्त सुरक्षा सुरक्षित)',
    formA: 'फॉर्म ए (नियम 3 देखें)',
    partI: 'भाग - I',
    estName: 'प्रतिष्ठान का नाम:',
    category: 'प्रतिष्ठान की श्रेणी:',
    select: '--चुनें--',
    commercial: 'वाणिज्यिक प्रतिष्ठान',
    shop: 'दुकान',
    hotelRest: 'होटल / रेस्तरां',
    address: 'पता:',
    addressPlaceholder: 'जैसे: मंदिर स्ट्रीट',
    state: 'राज्य:',
    jodhpur: 'जोधपुर',
    rajasthan: 'राजस्थान',
    city: 'शहर:',
    cityPlaceholder: 'जैसे: जोधपुर',
    mobile: 'मोबाइल (व्हाट्सएप):',
    pin: 'पिन (6 अंक):',
    pinPlaceholder: 'जैसे: 342001',
    email: 'ईमेल (केवल @gmail.com):',
    livePhoto: '📸 दुकान की लाइव फोटो:',
    livePhotoDesc: 'मोबाइल से कैमरा डायरेक्ट खुलेगा हुकुम।',
    shopDetailsTitle: 'दुकानों/प्रतिष्ठान का विवरण',
    occupierName: 'अधिभोगी/नियोक्ता का नाम:',
    relativeName: 'अधिभोगी के पिता/पति का नाम:',
    father: 'पिता',
    husband: 'पति',
    natureOfBusiness: 'व्यवसाय की प्रकृति:',
    retailMenswear: 'रिटेल अपैरल एंड मेन्सवियर',
    generalStore: 'जनरल स्टोर',
    continueBtn: 'आगे बढ़ें और ईमेल ओटीपी भेजें',
    cancelBtn: 'रद्द करें',
    processing: 'प्रोसेस हो रहा है...',
    emailOtpTitle: '📧 ईमेल ओटीपी वेरिफिकेशन',
    emailOtpDesc: 'हमने आपकी जीमेल आईडी पर 6-अंकों का ओटीपी भेज दिया है हुकुम!',
    emailOtpPlaceholder: '6-अंकों का ओटीपी दर्ज करें',
    verifyEmailBtn: 'ईमेल ओटीपी वेरीफाई करें',
    resendEmailBtn: '🔄 ईमेल ओटीपी रीसेंड करें',
    whatsappOtpTitle: '💬 व्हाट्सएप ओटीपी वेरिफिकेशन',
    whatsappOtpDesc: 'आपके नंबर पर ओटीपी भेजा गया है हुकुम!',
    whatsappOtpPlaceholder: 'व्हाट्सएप 6-अंकों का ओटीपी',
    verifyWhatsappBtn: 'व्हाट्सएप ओटीपी वेरीफाई करें',
    resendWhatsappBtn: '🔄 व्हाट्सएप ओटीपी रीसेंड करें',
    pendingTitle: '⏳ 24 घंटे का अप्रूवल पेंडिंग है हुकुम!',
    pendingDesc: 'आपके क्रेडेंशियल्स और डेटाबेस वेरिफिकेशन सुरक्षित रूप से प्रोसेस हो रहे हैं।',
    checkStatusBtn: '🔄 अप्रूवल स्टेटस चेक करें',
    verifying: 'वेरीफाई हो रहा है...'
  },
  Tamil: {
    headerTitle: 'LUXURY STORE REGISTRATION SHOPS (Strict Security Secured)',
    formA: 'படிவம் A (விதி 3 ஐப் பார்க்கவும்)',
    partI: 'பகுதி - I',
    estName: 'நிறுவனத்தின் பெயர்:',
    category: 'நிறுவனத்தின் வகை:',
    select: '--தேர்ந்தெடு--',
    commercial: 'வணிக நிறுவனம்',
    shop: 'கடை',
    hotelRest: 'ஹோட்டல் / உணவகம்',
    address: 'முகவரி:',
    addressPlaceholder: 'எ.கா: மந்திர் தெரு',
    state: 'மாநிலம்:',
    jodhpur: 'ஜோத்பூர்',
    rajasthan: 'ராஜஸ்தான்',
    city: 'நகரம்:',
    cityPlaceholder: 'எ.கா: ஜோத்பூர்',
    mobile: 'மொபைல் (WhatsApp):',
    pin: 'பின் குறியீடு (6 இலக்கங்கள்):',
    pinPlaceholder: 'எ.கா: 342001',
    email: 'மின்னஞ்சல் (@gmail.com மட்டும்):',
    livePhoto: '📸 நேரலை கடை புகைப்படம்:',
    livePhotoDesc: 'உங்கள் மொபைலில் கேமரா நேரடியாக திறக்கும்.',
    shopDetailsTitle: 'கடைகள்/நிறுவனத்தின் விவரங்கள்',
    occupierName: 'உமையாளர்/வேலை வழங்குபவரின் பெயர்:',
    relativeName: 'தந்தை/கணவர் பெயர்:',
    father: 'தந்தை',
    husband: 'கணவர்',
    natureOfBusiness: 'வணிகத்தின் தன்மை:',
    retailMenswear: 'சில்லறை ஆடை மற்றும் ஆடவர் உடைகள்',
    generalStore: 'பொது அங்காடி',
    continueBtn: 'தொடர்ந்து மின்னஞ்சல் OTP அனுப்பவும்',
    cancelBtn: 'ரத்து செய்',
    processing: 'செயலாக்கத்தில் உள்ளது...',
    emailOtpTitle: '📧 மின்னஞ்சல் OTP சரிபார்ப்பு',
    emailOtpDesc: 'உங்கள் Gmail ஐடிக்கு 6 இலக்க OTP அனுப்பப்பட்டுள்ளது!',
    emailOtpPlaceholder: '6 இலக்க OTP ஐ உள்ளிடவும்',
    verifyEmailBtn: 'மின்னஞ்சல் OTP ஐ சரிபார்க்கவும்',
    resendEmailBtn: '🔄 மின்னஞ்சல் OTP ஐ மீண்டும் அனுப்புக',
    whatsappOtpTitle: '💬 WhatsApp OTP சரிபார்ப்பு',
    whatsappOtpDesc: 'உங்கள் எண்ணுக்கு OTP அனுப்பப்பட்டுள்ளது!',
    whatsappOtpPlaceholder: 'WhatsApp 6 இலக்க OTP',
    verifyWhatsappBtn: 'WhatsApp OTP ஐ சரிபார்க்கவும்',
    resendWhatsappBtn: '🔄 WhatsApp OTP ஐ மீண்டும் அனுப்புக',
    pendingTitle: '⏳ 24 மணிநேர ஒப்புதல் நிலுவையில் உள்ளது!',
    pendingDesc: 'உங்கள் நற்சான்றிதழ்கள் பாதுகாப்பாக செயலாக்கப்படுகின்றன.',
    checkStatusBtn: '🔄 ஒப்புதல் நிலையை சரிபார்க்கவும்',
    verifying: 'சரிபார்க்கிறது...'
  },
  Marathi: {
    headerTitle: 'LUXURY STORE REGISTRATION SHOPS (Strict Security Secured)',
    formA: 'फॉर्म ए (नियम 3 पहा)',
    partI: 'भाग - I',
    estName: 'स्थापनाचे नाव:',
    category: 'स्थापनेची श्रेणी:',
    select: '--निवडा--',
    commercial: 'व्यापारी संस्था',
    shop: 'दुकान',
    hotelRest: 'हॉटेल / रेस्टॉरंट',
    address: 'पत्ता:',
    addressPlaceholder: 'उदा: मंदीर स्ट्रीट',
    state: 'राज्य:',
    jodhpur: 'जोधपूर',
    rajasthan: 'राजस्थान',
    city: 'शहर:',
    cityPlaceholder: 'उदा: जोधपूर',
    mobile: 'मोबाईल (WhatsApp):',
    pin: 'पिन (6 अंक):',
    pinPlaceholder: 'उदा: 342001',
    email: 'ईमेल (फक्त @gmail.com):',
    livePhoto: '📸 दुकानाचा लाईव्ह फोटो:',
    livePhotoDesc: 'तुमच्या मोबाईलवर कॅमेरा थेट उघडेल.',
    shopDetailsTitle: 'दुकाने/स्थापनेचा तपशील',
    occupierName: 'मालक/नियोक्त्याचे नाव:',
    relativeName: 'वडिलांचे/पतीचे नाव:',
    father: 'वडील',
    husband: 'पती',
    natureOfBusiness: 'व्यवसायाचे स्वरूप:',
    retailMenswear: 'रिटेल अपारेल आणि मेन्सवेअर',
    generalStore: 'जनरल स्टोअर',
    continueBtn: 'पुढे जा आणि ईमेल OTP पाठवा',
    cancelBtn: 'रद्द करा',
    processing: 'प्रक्रिया सुरू आहे...',
    emailOtpTitle: '📧 ईमेल OTP पडताळणी',
    emailOtpDesc: 'आम्ही तुमच्या जिमेल आयडीवर 6 अंकी OTP पाठवला आहे!',
    emailOtpPlaceholder: '6 अंकी OTP प्रविष्ट करा',
    verifyEmailBtn: 'ईमेल OTP तपासा',
    resendEmailBtn: '🔄 ईमेल OTP पुन्हा पाठवा',
    whatsappOtpTitle: '💬 WhatsApp OTP पडताळणी',
    whatsappOtpDesc: 'तुमच्या नंबरवर OTP पाठवण्यात आला आहे!',
    whatsappOtpPlaceholder: 'WhatsApp 6 अंकी OTP',
    verifyWhatsappBtn: 'WhatsApp OTP तपासा',
    resendWhatsappBtn: '🔄 WhatsApp OTP पुन्हा पाठवा',
    pendingTitle: '⏳ 24 तास मंजुरी प्रलंबित आहे!',
    pendingDesc: 'तुमची क्रेडेन्शियल्स सुरक्षितपणे प्रक्रिया केली जात आहेत.',
    checkStatusBtn: '🔄 मंजुरी स्थिती तपासा',
    verifying: 'तपासत आहे...'
  },
  Bengali: {
    headerTitle: 'LUXURY STORE REGISTRATION SHOPS (Strict Security Secured)',
    formA: 'ফর্ম এ (বিধি ৩ দেখুন)',
    partI: 'অংশ - I',
    estName: 'প্রতিষ্ঠানের নাম:',
    category: 'প্রতিষ্ঠানের বিভাগ:',
    select: '--নির্বাচن করুন--',
    commercial: 'বাণিজ্যিক প্রতিষ্ঠান',
    shop: 'দোকান',
    hotelRest: 'হোটেল / রেস্তোরাঁ',
    address: 'ঠিকানা:',
    addressPlaceholder: 'যেমন: মন্দির স্ট্রিট',
    state: 'রাজ্য:',
    jodhpur: 'যোধপুর',
    rajasthan: 'রাজস্থান',
    city: 'শহর:',
    cityPlaceholder: 'যেমন: যোধপুর',
    mobile: 'মোবাইল (WhatsApp):',
    pin: 'পিন (৬ অঙ্ক):',
    pinPlaceholder: 'যেমন: 342001',
    email: 'ইমেল (শুধুমাত্র @gmail.com):',
    livePhoto: '📸 লাইভ শপ ছবি:',
    livePhotoDesc: 'আপনার মোবাইলে ক্যামেরা সরাসরি খুলবে।',
    shopDetailsTitle: 'দোকান/প্রতিষ্ঠানের বিবরণ',
    occupierName: 'দখলকারী/নিয়োগকর্তার নাম:',
    relativeName: 'পিতা/স্বামীর নাম:',
    father: 'পিতা',
    husband: 'স্বামী',
    natureOfBusiness: 'ব্যবসার প্রকৃতি:',
    retailMenswear: 'রিটেল অ্যাপারেল এবং মেনসওয়্যার',
    generalStore: 'জেনারেল স্টোর',
    continueBtn: 'চালিয়ে যান এবং ইমেল OTP পাঠান',
    cancelBtn: 'বাতিল করুন',
    processing: 'প্রক্রিয়াধীন...',
    emailOtpTitle: '📧 ইমেল OTP যাচাইকরণ',
    emailOtpDesc: 'আমরা আপনার জিমেইল আইডিতে একটি ৬-সংখ্যার OTP পাঠিয়েছি!',
    emailOtpPlaceholder: '৬-সংখ্যার OTP লিখুন',
    verifyEmailBtn: 'ইমেল OTP যাচাই করুন',
    resendEmailBtn: '🔄 ইমেল OTP পুনresend করুন',
    whatsappOtpTitle: '💬 WhatsApp OTP যাচাইকরণ',
    whatsappOtpDesc: 'আপনার নম্বরে OTP পাঠানো হয়েছে!',
    whatsappOtpPlaceholder: 'WhatsApp ৬-সংখ্যার OTP',
    verifyWhatsappBtn: 'WhatsApp OTP যাচাই করুন',
    resendWhatsappBtn: '🔄 WhatsApp OTP পুনresend করুন',
    pendingTitle: '⏳ ২৪ ঘন্টার অনুমোদন মুলতুবি আছে!',
    pendingDesc: 'আপনার শংসাপত্রগুলি নিরাপদে প্রক্রিয়া করা হচ্ছে।',
    checkStatusBtn: '🔄 অনুমোদনের অবস্থা পরীক্ষা করুন',
    verifying: 'যাচাই করা হচ্ছে...'
  },
  Telugu: {
    headerTitle: 'LUXURY STORE REGISTRATION SHOPS (Strict Security Secured)',
    formA: 'ఫారం A (రూల్ 3 చూడండి)',
    partI: 'భాగం - I',
    estName: 'సంస్థ పేరు:',
    category: 'సంస్థ వర్గం:',
    select: '--ఎంచుకోండి--',
    commercial: 'వాణిజ్య సంస్థ',
    shop: 'దుకాణం',
    hotelRest: 'హోటల్ / రెస్టారెంట్',
    address: 'చిరునామా:',
    addressPlaceholder: 'ఉదా: మందిర్ వీధి',
    state: 'రాష్ట్రం:',
    jodhpur: 'జోధ్‌పూర్',
    rajasthan: 'రాజస్థాన్',
    city: 'నగరం:',
    cityPlaceholder: 'ఉదా: జోధ్‌పూర్',
    mobile: 'మొబైల్ (WhatsApp):',
    pin: 'పిన్ (6 అంకెలు):',
    pinPlaceholder: 'ఉదా: 342001',
    email: 'ఇమెయిల్ (ఖచ్చితంగా @gmail.com):',
    livePhoto: '📸 లైవ్ షాప్ ఫోటో:',
    livePhotoDesc: 'మీ మొబైల్‌లో కెమెరా నేరుగా తెరవబడుతుంది.',
    shopDetailsTitle: 'దుకాణాలు/సంస్థ వివరాలు',
    occupierName: 'యజమాని పేరు:',
    relativeName: 'తండ్రి/భర్త పేరు:',
    father: 'తండ్రి',
    husband: 'భర్త',
    natureOfBusiness: 'వ్యాపార స్వభావం:',
    retailMenswear: 'రిటైల్ అపారెల్ & మెన్స్‌వేర్',
    generalStore: 'జనరల్ స్టోర్',
    continueBtn: 'కొనసాగించండి & ఇమెయిల్ OTP పంపండి',
    cancelBtn: 'రద్దు చేయి',
    processing: 'ప్రాసెస్ అవుతోంది...',
    emailOtpTitle: '📧 ఇమెయిల్ OTP ధృవీకరణ',
    emailOtpDesc: 'మేము మీ జిమెయిల్ ఐడీకి 6-అంకెల OTP పంపాము!',
    emailOtpPlaceholder: '6-అంకెల OTPని నమోదు చేయండి',
    verifyEmailBtn: 'ఇమెయిల్ OTPని ధృవీకరించండి',
    resendEmailBtn: '🔄 ఇమెయిల్ OTPని మళ్లీ పంపు',
    whatsappOtpTitle: '💬 WhatsApp OTP ధృవీకరణ',
    whatsappOtpDesc: 'మీ నంబర్‌కు OTP పంపబడింది!',
    whatsappOtpPlaceholder: 'WhatsApp 6-అంకెల OTP',
    verifyWhatsappBtn: 'WhatsApp OTPని ధృవీకరించండి',
    resendWhatsappBtn: '🔄 WhatsApp OTPని మళ్లీ పంపు',
    pendingTitle: '⏳ 24 గంటల ఆమోదం పెండింగ్‌లో ఉంది!',
    pendingDesc: 'మీ ఆధారాలు సురక్షితంగా ప్రాసెస్ చేయబడుతున్నాయి.',
    checkStatusBtn: '🔄 ఆమోద స్థితిని త검ించండి',
    verifying: 'ధృవీకరిస్తోంది...'
  },
  Kannada: {
    headerTitle: 'LUXURY STORE REGISTRATION SHOPS (Strict Security Secured)',
    formA: 'ಫಾರ್ಮ್ A (ನಿಯಮ 3 ನೋಡಿ)',
    partI: 'ಭಾಗ - I',
    estName: 'ಸ್ಥಾಪನೆಯ ಹೆಸರು:',
    category: 'ಸ್ಥಾಪನೆಯ ವರ್ಗ:',
    select: '--ಆಯ್ಕೆಮಾಡಿ--',
    commercial: 'ವಾಣಿಜ್ಯ ಸಂಸ್ಥೆ',
    shop: 'ಅಂಗಡಿ',
    hotelRest: 'ಹೋಟೆಲ್ / ರೆಸ್ಟೋರೆಂಟ್',
    address: 'ವಿಳಾಸ:',
    addressPlaceholder: 'ಉದಾ: ಮಂದಿರ ಬೀದಿ',
    state: 'ರಾಜ್ಯ:',
    jodhpur: 'ಜೋಧ್‌ಪುರ',
    rajasthan: 'ರಾಜಸ್ಥಾನ',
    city: 'ನಗರ:',
    cityPlaceholder: 'ಉದಾ: ಜೋಧ್‌ಪುರ',
    mobile: 'ಮೊಬೈಲ್ (WhatsApp):',
    pin: 'ಪಿನ್ (6 ಅಂಕಿಗಳು):',
    pinPlaceholder: 'ಉದಾ: 342001',
    email: 'ಇಮೇಲ್ (ಖಂಡಿತವಾಗಿ @gmail.com):',
    livePhoto: '📸 ಲೈವ್ ಅಂಗಡಿ ಫೋಟೋ:',
    livePhotoDesc: 'ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಲ್ಲಿ ಕ್ಯಾಮೆರಾ ನೇರವಾಗಿ ತೆರೆಯುತ್ತದೆ.',
    shopDetailsTitle: 'ಅಂಗಡಿಗಳು/ಸ್ಥಾಪನೆಯ ವಿವರಗಳು',
    occupierName: 'ಮಾಲೀಕರ ಹೆಸರು:',
    relativeName: 'ತಂದೆ/ಗಂಡನ ಹೆಸರು:',
    father: 'ತಂದೆ',
    husband: 'ಗಂಡ',
    natureOfBusiness: 'ವ್ಯವಹಾರದ ಸ್ವರೂಪ:',
    retailMenswear: 'ಚಿಲ್ಲರೆ ಉಡುಪುಗಳು',
    generalStore: 'ಸಾಮಾನ್ಯ ಅಂಗಡಿ',
    continueBtn: 'ಮುಂದುವರಿಸಿ ಮತ್ತು ಇಮೇಲ್ OTP ಕಳುಹಿಸಿ',
    cancelBtn: 'ರದ್ದುಗೊಳಿಸಿ',
    processing: 'ಪ್ರಕ್ರಿಯೆ ನಡೆಯುತ್ತಿದೆ...',
    emailOtpTitle: '📧 ಇಮೇಲ್ OTP ಪರಿಶೀಲನೆ',
    emailOtpDesc: 'ನಾವು ನಿಮ್ಮ ಜಿಮೇಲ್ ಐಡಿಗೆ 6-ಅಂಕಿಯ OTP ಕಳುಹಿಸಿದ್ದೇವೆ!',
    emailOtpPlaceholder: '6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ',
    verifyEmailBtn: 'ಇಮೇಲ್ OTP ಪರಿಶೀಲಿಸಿ',
    resendEmailBtn: '🔄 ಇಮೇಲ್ OTP ಮರುಕಳುಹಿಸಿ',
    whatsappOtpTitle: '💬 WhatsApp OTP ಪರಿಶೀಲನೆ',
    whatsappOtpDesc: 'ನಿಮ್ಮ ಸಂಖ್ಯೆಗೆ OTP ಕಳುಹಿಸಲಾಗಿದೆ!',
    whatsappOtpPlaceholder: 'WhatsApp 6-ಅಂಕಿಯ OTP',
    verifyWhatsappBtn: 'WhatsApp OTP ಪರಿಶೀಲಿಸಿ',
    resendWhatsappBtn: '🔄 WhatsApp OTP ಮರುಕಳುಹಿಸಿ',
    pendingTitle: '⏳ 24 ಗಂಟೆಗಳ ಅನುಮೋದನೆ ಬಾಕಿ ಇದೆ!',
    pendingDesc: 'ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ.',
    checkStatusBtn: '🔄 ಅನುಮೋದನೆ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ',
    verifying: 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...'
  },
  Malayalam: {
    headerTitle: 'LUXURY STORE REGISTRATION SHOPS (Strict Security Secured)',
    formA: 'ഫോം A (ചട്ടം 3 കാണുക)',
    partI: 'ഭാഗം - I',
    estName: 'സ്ഥാപനത്തിന്റെ പേര്:',
    category: 'സ്ഥാപന വിഭാഗം:',
    select: '--തിരഞ്ഞെടുക്കുക--',
    commercial: 'വാണിജ്യ സ്ഥാപനം',
    shop: 'കട',
    hotelRest: 'ഹോട്ടൽ / റെസ്റ്റോറന്റ്',
    address: 'വിലാസം:',
    addressPlaceholder: 'ഉദാ: മന്ദിർ തെരുവ്',
    state: 'സംസ്ഥാനം:',
    jodhpur: 'ജോധ്പൂർ',
    rajasthan: 'രാജസ്ഥാൻ',
    city: 'നഗരം:',
    cityPlaceholder: 'ഉദാ: ജോധ്പൂർ',
    mobile: 'മൊബൈൽ (WhatsApp):',
    pin: 'പിൻ (6 അക്കങ്ങൾ):',
    pinPlaceholder: 'ഉദാ: 342001',
    email: 'ഇമെയിൽ (കർശനമായി @gmail.com):',
    livePhoto: '📸 തത്സമയ കട ഫോട്ടോ:',
    livePhotoDesc: 'നിങ്ങളുടെ മൊബൈലിൽ ക്യാമറ നേരിട്ട് തുറക്കും.',
    shopDetailsTitle: 'കടകൾ/സ്ഥാപനത്തിന്റെ വിശദാംശങ്ങൾ',
    occupierName: 'ഉടമസ്ഥന്റെ പേര്:',
    relativeName: 'പിതാവിന്റെ/ഭർത്താവിന്റെ പേര്:',
    father: 'പിതാവ്',
    husband: 'ഭർത്താവ്',
    natureOfBusiness: 'ബിസിനസ്സ് സ്വഭാവം:',
    retailMenswear: 'റീട്ടെയിൽ അപ്പാരൽ & മെൻസ് വെയർ',
    generalStore: 'ജനറൽ സ്റ്റോർ',
    continueBtn: 'തുടർന്ന് ഇമെയിൽ OTP അയക്കുക',
    cancelBtn: 'റദ്ദാക്കുക',
    processing: 'പ്രോസസ്സ് ചെയ്യുന്നു...',
    emailOtpTitle: '📧 ഇമെയിൽ OTP സ്ഥിരീകരണം',
    emailOtpDesc: 'ഞങ്ങൾ നിങ്ങളുടെ ജിമെയിൽ ഐഡിയിലേക്ക് 6 അക്ക OTP അയച്ചിട്ടുണ്ട്!',
    emailOtpPlaceholder: '6 അക്ക OTP നൽകുക',
    verifyEmailBtn: 'ഇമെയിൽ OTP സ്ഥിരീകരിക്കുക',
    resendEmailBtn: '🔄 ഇമെയിൽ OTP വീണ്ടും അയക്കുക',
    whatsappOtpTitle: '💬 WhatsApp OTP സ്ഥിരീകരണം',
    whatsappOtpDesc: 'നിങ്ങളുടെ നമ്പറിലേക്ക് OTP അയച്ചിട്ടുണ്ട്!',
    whatsappOtpPlaceholder: 'WhatsApp 6 അക്ക OTP',
    verifyWhatsappBtn: 'WhatsApp OTP സ്ഥിരീകരിക്കുക',
    resendWhatsappBtn: '🔄 WhatsApp OTP വീണ്ടും അയക്കുക',
    pendingTitle: '⏳ 24 മണിക്കൂർ അനുമതി ബാക്കിയുണ്ട്!',
    pendingDesc: 'നിങ്ങളുടെ വിവരങ്ങൾ സുരക്ഷിതമായി പ്രോസസ്സ് ചെയ്യുന്നു.',
    checkStatusBtn: '🔄 അനുമതി നില പരിശോധിക്കുക',
    verifying: 'പരി검ിക്കുന്നു...'
  }
};

const ShopRegistration = ({ setActiveTab }) => {
    // 🌐 भाषा सिंक स्टेट
    const [currentLang, setCurrentLang] = useState(() => {
        return localStorage.getItem('appLanguage') || 'English';
    });
    const t = shopRegTranslations[currentLang] || shopRegTranslations.English;

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

    const [formData, setFormData] = useState({
        establishmentName: '',
        category: '',
        address: '',
        city: '',
        state: 'jodhpur',
        pin: '',
        countryCode: '+91',
        mobile: '',
        email: '',
        occupierName: '',
        occupierRelation: 'Father',
        occupierRelativeName: '',
        natureOfBusiness: '',
        password: 'Password123'
    });

    const [shopPhoto, setShopPhoto] = useState(null);

    const [step, setStep] = useState(() => {
        if (localStorage.getItem('vendorToken')) return 1;
        return parseInt(localStorage.getItem('reg_step')) || 1;
    });
    
    const [emailOtpInput, setEmailOtpInput] = useState('');
    const [whatsappOtpInput, setWhatsappOtpInput] = useState('');
    
    const [isPendingApproval, setIsPendingApproval] = useState(() => {
        if (localStorage.getItem('vendorToken')) return false;
        return localStorage.getItem('reg_pending') === 'true';
    });
    
    const [loading, setLoading] = useState(false);

    const [emailResendCount, setEmailResendCount] = useState(0);
    const [whatsappResendCount, setWhatsappResendCount] = useState(0);
    const maxResendLimit = 3;

    useEffect(() => {
        localStorage.setItem('reg_step', step);
    }, [step]);

    useEffect(() => {
        localStorage.setItem('reg_pending', isPendingApproval);
    }, [isPendingApproval]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setShopPhoto(e.target.files[0]);
        }
    };

    // डेटा को सुरक्षित LocalStorage में स्टोर करने का हेल्पिंग फ़ंक्शन
    const saveProfileToLocalStorage = () => {
        const profileToSave = {
            shopName: formData.establishmentName.trim(),
            establishmentName: formData.establishmentName.trim(),
            ownerName: formData.occupierName.trim(),
            occupierName: formData.occupierName.trim(),
            phone: formData.countryCode + formData.mobile.trim(),
            mobile: formData.mobile.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            state: formData.state,
            pin: formData.pin.trim(),
            category: formData.category || formData.natureOfBusiness
        };
        localStorage.setItem('vendorProfile', JSON.stringify(profileToSave));
    };

    const handleShopRegistrationSubmit = async (e) => {
        e.preventDefault();

        const savedUser = JSON.parse(localStorage.getItem('luxury_current_user') || '{}');
        const loggedInPhone = savedUser?.phone || savedUser?.mobile;

        const cleanMobile = formData.mobile.trim();
        const mobileRegex = /^\d{7,15}$/;
        if (!mobileRegex.test(cleanMobile)) {
            alert("सुरक्षा चेतावनी: कृपया सही मोबाइल नंबर दर्ज करें हुकुम!");
            return;
        }

        if (loggedInPhone) {
            const normalizedLoggedIn = loggedInPhone.replace(/^\+91/, '').trim();
            const normalizedForm = cleanMobile.replace(/^\+91/, '').trim();
            if (normalizedLoggedIn !== normalizedForm) {
                alert(`🚨 सुरक्षा त्रुटि: आप जिस नंबर से लॉगिन हैं (${loggedInPhone}), दुकान रजिस्ट्रेशन का मोबाइल नंबर वही होना चाहिए!`);
                return;
            }
        }

        const cleanEmail = formData.email.trim().toLowerCase();
        if (!cleanEmail.endsWith('@gmail.com')) {
            alert("सुरक्षा चेतावनी: केवल @gmail.com डोमेन वाली ईमेल आईडी ही मान्य है हुकुम!");
            return;
        }

        const pinRegex = /^\d{6}$/;
        if (!pinRegex.test(formData.pin.trim())) {
            alert("सुरक्षा चेतावनी: पिन कोड ठीक 6 अंकों का होना चाहिए हुकुम!");
            return;
        }

        if (!shopPhoto) {
            alert("सुरक्षा चेतावनी: दुकान की लाइव फोटो अपलोड करना अनिवार्य है हुकुम!");
            return;
        }

        setLoading(true);
        localStorage.setItem('reg_email', cleanEmail);

        // ✅ 1. फॉर्म सबमिट होते ही डेटा को LocalStorage में सेव कर दिया गया है
        saveProfileToLocalStorage();

        const fullPhoneNumber = formData.countryCode + cleanMobile;

        const dataPayload = new FormData();
        dataPayload.append('shopName', formData.establishmentName.trim());
        dataPayload.append('ownerName', formData.occupierName.trim());
        dataPayload.append('phone', fullPhoneNumber); 
        dataPayload.append('email', cleanEmail);
        dataPayload.append('password', formData.password);
        dataPayload.append('category', formData.category);
        dataPayload.append('address', formData.address.trim());
        dataPayload.append('state', formData.state);
        dataPayload.append('city', formData.city.trim());
        dataPayload.append('pin', formData.pin.trim());
        dataPayload.append('occupierName', formData.occupierName.trim());
        dataPayload.append('occupierRelation', formData.occupierRelation);
        dataPayload.append('occupierRelativeName', formData.occupierRelativeName.trim());
        dataPayload.append('natureOfBusiness', formData.natureOfBusiness);
        dataPayload.append('shopPhoto', shopPhoto);
        dataPayload.append('hiddenVibe', 'Instagram Attitude - Luxury Collection Jodhpur (Tabahi Menswear)');

        try {
            const response = await fetch('http://localhost:5001/api/vendors/register', {
                method: 'POST',
                body: dataPayload 
            });
            const textResponse = await response.text();
            let data;
            try {
                data = JSON.parse(textResponse);
            } catch (err) {
                console.error("JSON Parse Error:", textResponse);
                alert("सर्वर से गलत रिस्पॉन्स आ रहा है हुकुम! टर्मिनल चेक करें।");
                setLoading(false);
                return;
            }

            if (data.success) {
                alert(data.message); 
                setStep(2); 
            } else if (data.alreadyRegistered || (data.message && data.message.includes("रजिस्टर्ड"))) {
                alert(data.message);
                
                // 🔄 यदि ईमेल पहले से रजिस्टर्ड है, तो नया Email OTP भेजें
                try {
                    await fetch('http://localhost:5001/api/resend-email-otp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: cleanEmail })
                    });
                } catch (resendErr) {
                    console.error("Resend OTP Error:", resendErr);
                }

                setStep(2); // सीधे Email OTP दर्ज करने वाली स्क्रीन पर भेजें
            } else {
                alert(data.message || "रजिस्ट्रेशन विफल रहा!");
            }
        } catch (error) {
            console.error("कनेक्शन एरर:", error);
            alert("सर्वर से कनेक्ट नहीं हो पा रहा है हुकुम! (पोर्ट 5001 चेक करें)");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyEmailOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userEmail = formData.email || localStorage.getItem('reg_email');
        try {
            const response = await fetch('http://localhost:5001/api/verify-email-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, otp: emailOtpInput.trim() })
            });

            const data = await response.json();
            if (data.success) {
                alert("ईमेल OTP वेरीफाई हो गया! अब WhatsApp OTP दर्ज करें हुकुम।");
                setStep(3); 
            } else {
                alert(data.message || "गलत ईमेल OTP!");
            }
        } catch (error) {
            console.error("Email OTP एरर:", error);
            alert("ईमेल OTP वेरीफाई करने में दिक्कत आ रही है हुकुम!");
        } finally {
            setLoading(false);
        }
    };

    const handleResendEmailOtp = async () => {
        if (emailResendCount >= maxResendLimit) {
            alert("सुरक्षा चेतावनी: ईमेल OTP रीसेंड करने की अधिकतम सीमा समाप्त हो चुकी है हुकुम!");
            return;
        }

        const userEmail = formData.email || localStorage.getItem('reg_email');
        if (!userEmail) {
            alert("ईमेल आईडी नहीं मिली हुकुम! कृपया पुनः प्रयास करें।");
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/resend-email-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail })
            });

            const data = await response.json();
            if (data.success) {
                setEmailResendCount(prev => prev + 1);
                alert(`नया Email OTP भेज दिया गया है हुकुम! (शेष प्रयास: ${maxResendLimit - (emailResendCount + 1)})`);
            } else {
                alert(data.message || "ईमेल भेजने में असफल रहे!");
            }
        } catch (err) {
            console.error("Resend Email OTP Error:", err);
            alert("सर्वर से कनेक्ट नहीं हो पा रहा है हुकुम!");
        }
    };

    const handleVerifyWhatsappOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const fullPhoneNumber = formData.countryCode + formData.mobile.trim();
        try {
            const response = await fetch('http://localhost:5001/api/verify-whatsapp-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: fullPhoneNumber, otp: whatsappOtpInput.trim() })
            });

            const data = await response.json();
            if (data.success) {
                setIsPendingApproval(true);
            } else {
                alert(data.message || "गलत WhatsApp OTP!");
            }
        } catch (error) {
            console.error("WhatsApp OTP एरर:", error);
            alert("WhatsApp OTP वेरीफाई करने में दिक्कत आ रही है हुकुम!");
        } finally {
            setLoading(false);
        }
    };

    const handleResendWhatsappOtp = async () => {
        if (whatsappResendCount >= maxResendLimit) {
            alert("सुरक्षा चेतावनी: WhatsApp OTP रीसेंड करने की अधिकतम सीमा समाप्त हो चुकी है हुकुम!");
            return;
        }

        const fullPhoneNumber = formData.countryCode + formData.mobile.trim();
        try {
            const response = await fetch('http://localhost:5001/api/resend-whatsapp-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: fullPhoneNumber })
            });

            const data = await response.json();
            if (data.success) {
                setWhatsappResendCount(prev => prev + 1);
                alert(`नया WhatsApp OTP भेज दिया गया है हुकुम! (शेष प्रयास: ${maxResendLimit - (whatsappResendCount + 1)})`);
            } else {
                alert(data.message || "OTP भेजने में असफल रहे!");
            }
        } catch (err) {
            console.error("Resend WhatsApp OTP Error:", err);
            alert("सर्वर से कनेक्ट नहीं हो पा रहा है हुकुम!");
        }
    };

    const clearRegistrationStorage = () => {
        localStorage.removeItem('reg_step');
        localStorage.removeItem('reg_pending');
        localStorage.removeItem('reg_email');
        setStep(1);
        setIsPendingApproval(false);
    };

    if (isPendingApproval) {
        return (
            <div style={{ background: '#1a1226', padding: '40px', borderRadius: '8px', maxWidth: '500px', margin: '50px auto', color: '#fff', textAlign: 'center', border: '1px solid #4a2858', fontFamily: 'sans-serif' }}>
                <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>{t.pendingTitle}</h3>
                <p style={{ fontSize: '15px', color: '#bca6d4', lineHeight: '1.6' }}>
                    {t.pendingDesc}
                </p>
                <button 
                    onClick={async () => {
                        try {
                            const userEmail = formData.email || localStorage.getItem('reg_email');
                            const res = await fetch('http://localhost:5001/api/vendor/status', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: userEmail })
                            });
                            const data = await res.json();
                            if (data.success && data.isApproved) {
                                alert("बधाई हो हुकुम! आपका अकाउंट अप्रूव हो चुका है।");
                                localStorage.setItem('vendorToken', 'approved_vendor_token_' + Date.now());
                                localStorage.setItem('vendorEmail', formData.email || localStorage.getItem('reg_email'));
                                
                                // ✅ अप्रूवल मिलते ही डेटा LocalStorage में रिफ्रेश
                                saveProfileToLocalStorage();
                                
                                clearRegistrationStorage();
                                if (setActiveTab) setActiveTab('vendorDashboard');
                            } else {
                                alert("अभी एडमिन का अप्रूवल पेंडिंग है हुकुम!");
                            }
                        } catch (err) {
                            console.error(err);
                            alert("सर्वर से संपर्क नहीं हो पा रहा है!");
                        }
                    }}
                    style={{ marginTop: '20px', padding: '12px 25px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', width: '100%', marginBottom: '10px' }}
                >
                    {t.checkStatusBtn}
                </button>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div style={{ background: '#1a1226', padding: '30px', borderRadius: '8px', maxWidth: '420px', margin: '50px auto', color: '#fff', textAlign: 'center', border: '1px solid #4a2858', fontFamily: 'sans-serif' }}>
                <h3 style={{ color: '#f3e5ab' }}>{t.emailOtpTitle}</h3>
                <p style={{ fontSize: '13px', color: '#bca6d4', marginBottom: '20px' }}>
                    {t.emailOtpDesc}
                </p>
                <form onSubmit={handleVerifyEmailOtp}>
                    <input 
                        type="text" 
                        maxLength="6"
                        placeholder={t.emailOtpPlaceholder} 
                        value={emailOtpInput} 
                        onChange={(e) => setEmailOtpInput(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '12px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', textAlign: 'center', fontSize: '18px', boxSizing: 'border-box', marginBottom: '15px' }} 
                    />
                    <button type="submit" disabled={loading} style={{ padding: '12px 25px', background: '#d4af37', color: '#1a1226', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', width: '100%', marginBottom: '15px' }}>
                        {loading ? t.verifying : t.verifyEmailBtn}
                    </button>
                </form>
                <button type="button" onClick={handleResendEmailOtp} disabled={emailResendCount >= maxResendLimit} style={{ background: 'transparent', border: 'none', color: '#d4af37', cursor: 'pointer', textDecoration: 'underline' }}>
                    {t.resendEmailBtn} ({maxResendLimit - emailResendCount} बार शेष)
                </button>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div style={{ background: '#1a1226', padding: '30px', borderRadius: '8px', maxWidth: '420px', margin: '50px auto', color: '#fff', textAlign: 'center', border: '1px solid #4a2858', fontFamily: 'sans-serif' }}>
                <h3 style={{ color: '#f3e5ab' }}>{t.whatsappOtpTitle}</h3>
                <p style={{ fontSize: '13px', color: '#bca6d4', marginBottom: '20px' }}>
                    {t.whatsappOtpDesc} <b>{formData.countryCode} {formData.mobile}</b>
                </p>
                <form onSubmit={handleVerifyWhatsappOtp}>
                    <input 
                        type="text" 
                        maxLength="6"
                        placeholder={t.whatsappOtpPlaceholder} 
                        value={whatsappOtpInput} 
                        onChange={(e) => setWhatsappOtpInput(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '12px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', textAlign: 'center', fontSize: '18px', boxSizing: 'border-box', marginBottom: '15px' }} 
                    />
                    <button type="submit" disabled={loading} style={{ padding: '12px 25px', background: '#d4af37', color: '#1a1226', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', width: '100%', marginBottom: '15px' }}>
                        {loading ? t.verifying : t.verifyWhatsappBtn}
                    </button>
                </form>

                <div style={{ marginBottom: '10px' }}>
                    <button type="button" onClick={handleResendWhatsappOtp} disabled={whatsappResendCount >= maxResendLimit} style={{ background: 'transparent', border: 'none', color: '#d4af37', cursor: 'pointer', textDecoration: 'underline' }}>
                        {t.resendWhatsappBtn} ({maxResendLimit - whatsappResendCount} बार शेष)
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: '#1a1226', padding: '20px', borderRadius: '8px', maxWidth: '900px', margin: '20px auto', color: '#fff', fontFamily: 'sans-serif', border: '1px solid #4a2858' }}>
            <div style={{ background: '#5e4385', padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>
                {t.headerTitle}
            </div>
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#bca6d4', marginBottom: '20px' }}>
                {t.formA}
            </div>

            <form onSubmit={handleShopRegistrationSubmit}>
                <div style={{ background: '#4a2858', padding: '6px 12px', fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>
                    {t.partI}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '12px' }}>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.estName} <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" name="establishmentName" value={formData.establishmentName} onChange={handleChange} required style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.category} <span style={{ color: 'red' }}>*</span></label>
                        <select name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }}>
                            <option value="">{t.select}</option>
                            <option value="Commercial">{t.commercial}</option>
                            <option value="Shop">{t.shop}</option>
                            <option value="Hotel/Restaurant">{t.hotelRest}</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '12px' }}>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.address} <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder={t.addressPlaceholder} style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.state} <span style={{ color: 'red' }}>*</span></label>
                        <select name="state" value={formData.state} onChange={handleChange} style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }}>
                            <option value="jodhpur">{t.jodhpur}</option>
                            <option value="Rajasthan">{t.rajasthan}</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '12px' }}>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.city} <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder={t.cityPlaceholder} style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.mobile} <span style={{ color: 'red' }}>*</span></label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <select 
                                name="countryCode" 
                                value={formData.countryCode} 
                                onChange={handleChange} 
                                style={{ background: '#2c223b', border: '1px solid #5a4870', color: '#d4af37', padding: '8px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                <option value="+91">+91 (IN)</option>
                                <option value="+1">+1 (US)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+971">+971 (UAE)</option>
                                <option value="+61">+61 (AU)</option>
                                <option value="+49">+49 (DE)</option>
                            </select>
                            <input 
                                type="text" 
                                name="mobile" 
                                value={formData.mobile} 
                                onChange={handleChange} 
                                maxLength="12" 
                                required 
                                placeholder="मोबाइल नंबर" 
                                style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }} 
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '12px' }}>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.pin} <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" name="pin" value={formData.pin} onChange={handleChange} maxLength="6" required placeholder={t.pinPlaceholder} style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.email} <span style={{ color: 'red' }}>*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="example@gmail.com" style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }} />
                    </div>
                </div>

                <div style={{ marginBottom: '15px', background: '#2c223b', padding: '10px 12px', borderRadius: '4px', border: '1px dashed #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <label style={{ fontSize: '12px', color: '#f3e5ab', fontWeight: 'bold', display: 'block' }}>
                            {t.livePhoto} <span style={{ color: 'red' }}>*</span>
                        </label>
                        <span style={{ fontSize: '11px', color: '#bca6d4' }}>{t.livePhotoDesc}</span>
                    </div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment" 
                        onChange={handlePhotoChange} 
                        required 
                        style={{ color: '#fff', fontSize: '12px', width: 'auto' }} 
                    />
                </div>

                <div style={{ background: '#4a2858', padding: '6px 12px', fontSize: '14px', fontWeight: 'bold', margin: '20px 0 15px 0' }}>
                    {t.shopDetailsTitle}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '12px' }}>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.occupierName} <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" name="occupierName" value={formData.occupierName} onChange={handleChange} required style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.relativeName}</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select name="occupierRelation" value={formData.occupierRelation} onChange={handleChange} style={{ width: '35%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px' }}>
                                <option value="Father">{t.father}</option>
                                <option value="Husband">{t.husband}</option>
                            </select>
                            <input type="text" name="occupierRelativeName" value={formData.occupierRelativeName} onChange={handleChange} style={{ width: '65%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }} />
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{t.natureOfBusiness} <span style={{ color: 'red' }}>*</span></label>
                    <select name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleChange} required style={{ width: '100%', padding: '8px', background: '#2c223b', border: '1px solid #5a4870', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' }}>
                        <option value="">{t.select}</option>
                        <option value="Retail Apparel & Menswear">{t.retailMenswear}</option>
                        <option value="GeneralStore">{t.generalStore}</option>
                    </select>
                </div>

                <div style={{ textAlign: 'center', marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <button type="submit" disabled={loading} style={{ padding: '10px 25px', background: '#d4af37', color: '#1a1226', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {loading ? t.processing : t.continueBtn}
                    </button>
                    <button type="button" onClick={() => setActiveTab ? setActiveTab('home') : window.history.back()} style={{ padding: '10px 25px', background: '#4a4a4a', color: '#fff', border: '1px solid #666', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {t.cancelBtn}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShopRegistration;