const { Client } = require('pg');
const Typesense = require('typesense');

// 1. टाइपसेंस क्लाइंट सेटअप
const typesense = new Typesense.Client({
  nodes: [{
    host: 'localhost',
    port: '8108',
    protocol: 'http',
  }],
  apiKey: 'xyz', // आपकी टाइपसेंस API की (Key)
  connectionTimeoutSeconds: 2
});


// 2. पोस्टग्रे-एसक्यूएल क्लाइंट सेटअप
const pgClient = new Client({
  user: 'postgres',
  host: 'host.docker.internal', // या '127.0.0.1' की जगह यह लिखें
  database: 'ecommerce_db', // यहाँ अपने असली डेटाबेस का नाम लिखें
  password: 'Bunty@986',          // यहाँ अपना असली Postgres पासवर्ड लिखें
  port: 5432,
});

async function syncData() {
  await pgClient.connect();

  // 3. टाइपसेंस में प्रोडक्ट्स का स्ट्रक्चर (Schema) बनाएं
  const schema = {
    name: 'products',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string', optional: true },
      { name: 'price', type: 'float' },
      { name: 'category', type: 'string', facet: true }
    ]
  };

  try {
    await typesense.collections('products').delete();
  } catch (err) {
    // पुराना कलेक्शन नहीं था, इसे छोड़ दें
  }

  await typesense.collections().create(schema);
  console.log('टाइपसेंस में प्रोडक्ट्स का कलेक्शन बन गया है!');

  // 4. PostgreSQL से सभी प्रोडक्ट्स निकालें
  const res = await pgClient.query('SELECT id::text, title, description, price, category FROM products');
  const products = res.rows;

  // 5. प्रोडक्ट्स को टाइपसेंस में भेजें (Sync करें)
  if (products.length > 0) {
    await typesense.collections('products').documents().import(products, { action: 'upsert' });
    console.log(`${products.length} प्रोडक्ट्स सफलतापूर्वक टाइपसेंस में सिंक हो गए हैं!`);
  } else {
    console.log('PostgreSQL में कोई प्रोडक्ट नहीं मिला।');
  }

  await pgClient.end();
}

syncData().catch(console.error);