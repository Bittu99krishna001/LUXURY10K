const axios = require('axios');

const sendSMS = async (phone, otp, storeName) => {
  try {
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'q',
      message: `Namaste Hukum! Aapke ${storeName} portal ka secure OTP hai: ${otp}. Kripya ise kisi ke sath share na karein.`,
      language: 'english',
      flash: 0,
      numbers: phone,
    }, {
      headers: {
        'authorization': 'YAHAN_APNI_FAST2SMS_API_KEY_DALEN', // यहाँ अपनी कमर्शियल API Key डालें
        'Content-Type': 'application/json'
      }
    });

    if (response.data.return) {
      console.log(`📱 [LUXURYSTORE CPaaS]: ${phone} पर सफलतापूर्वक SMS भेज दिया गया है!`);
    } else {
      console.log(`⚠️ [CPaaS Warning]:`, response.data.message);
    }
  } catch (error) {
    console.error(`❌ [CPaaS Error]:`, error.message);
  }
};

module.exports = sendSMS;