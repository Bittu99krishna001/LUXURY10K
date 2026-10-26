const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'apka.email@gmail.com', // अपनी असली जीमेल आईडी डालें
    pass: 'apka_app_password'     // जीमेल का App Password डालें
  }
});

const sendEmail = async (email, ownerName, otp, storeName) => {
  try {
    const mailOptions = {
      from: '"LUXURYSTORE Security" <apka.email@gmail.com>',
      to: email,
      subject: `👑 ${storeName} - Secure Verification OTP`,
      text: `नमस्ते ${ownerName} हुकुम,\n\n${storeName} पोर्टल पर आपका स्वागत है!\nआपका सिक्योर रजिस्ट्रेशन OTP है: ${otp}\n\nयह कोड पूरी तरह सुरक्षित है।`
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 [LUXURYSTORE Email]: ${email} पर सफलतापूर्वक ईमेल भेज दिया गया है!`);
  } catch (error) {
    console.error(`❌ [Email Error]:`, error.message);
  }
};

module.exports = sendEmail;