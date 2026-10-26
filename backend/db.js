const { Pool } = require('pg');
const mongoose = require('mongoose');
const dns = require('dns'); // केवल एक बार यहाँ रहेगा

// Google DNS सेट करें
dns.setServers(['8.8.8.8', '8.8.4.4']);

// 1. PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'ecommerce_db',
  password: 'Bunty@986',
  port: 5433,
});

pool.connect()
  .then(() => console.log('📦 PostgreSQL Database Table Connected & Verified!'))
  .catch(err => console.error('❌ PostgreSQL Error:', err.message));

// 2. MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      serverSelectionTimeoutMS: 15000
    });
    console.log('🍃 MongoDB successfully connected via Wi-Fi!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
};

connectDB();

module.exports = pool;