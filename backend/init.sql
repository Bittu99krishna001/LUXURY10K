-- 1. Vendors Table
DROP TABLE IF EXISTS vendors CASCADE;

CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    shopname VARCHAR(255),
    ownername VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    category VARCHAR(255),
    address TEXT,
    state VARCHAR(100),
    city VARCHAR(100),
    pin VARCHAR(20),
    occupiername VARCHAR(255),
    natureofbusiness VARCHAR(255),
    otp VARCHAR(10),
    isverified BOOLEAN DEFAULT false
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    vendor_id INT REFERENCES vendors(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    total_amount NUMERIC(10, 2) NOT NULL,
    order_status VARCHAR(50) DEFAULT 'Pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL

-- 6. तेजी से सर्च और वेंडर फिल्टरिंग के लिए इंडेक्स बनाएं
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(product_name);
CREATE INDEX IF NOT EXISTS idx_vendors_email ON vendors(email);

--7. कार्ट या ऑर्डर्स को डेटाबेस में सेव करने की टेबल
CREATE TABLE IF NOT EXISTS customer_carts (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    cart_data JSONB NOT NULL, -- भारी से भारी लिस्ट या JSON डेटा यहाँ सुरक्षित रहेगा
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);