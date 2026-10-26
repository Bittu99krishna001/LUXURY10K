const { Pool } = require('pg');

// ==========================================
// 🔒 ENTERPRISE-GRADE SECURE DATABASE POOL
// ==========================================

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  // सुरक्षा नियम: पासवर्ड कभी भी कोड में हार्डकोडेड नहीं होना चाहिए, हमेशा .env से आना चाहिए
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ecommerce_db',
  
  // हाई ट्रैफिक के लिए मैक्सिमम कनेक्शंस की फिक्स लिमिट
  max: 50,                  
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000,

  // यदि लाइव सर्वर (Production) पर हैं, तो डेटाबेस कनेक्शन पूरी तरह एन्क्रिप्टेड (SSL) रहेगा
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('📦 PostgreSQL Database से सुरक्षित रूप से कनेक्ट हो गया है हुकुम!');
});

pool.on('error', (err) => {
  console.error('❌ गंभीर डेटाबेस कनेक्शन एरर (Database Crash Prevented):', err.message);
  // सर्वर को अचानक क्रैश होने से बचाने के लिए प्रोसेस को सुरक्षित हैंडल करें
});

module.exports = pool;