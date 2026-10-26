import React, { useState } from 'react';

const VendorLogin = () => {
    // यहाँ 'name' और 'phone' सीधे बैकएंड के हिसाब से सेट किए गए हैं हुकुम
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // रजिस्ट्रेशन के लिए हैंडलर
    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch('http://localhost:5001/api/customers/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message || 'रजिस्ट्रेशन सफल! आपके ईमेल पर OTP भेज दिया गया है हुकुम!');
                console.log('Registration Success:', result);
            } else {
                setError(result.message || 'रजिस्ट्रेशन फेल हो गया');
            }
        } catch (err) {
            console.error('Connection Error:', err);
            setError('सर्वर से कनेक्ट नहीं हो पा रहा है! सुनिश्चित करें कि backend/server.js चालू है।');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>वेंडर रजिस्ट्रेशन (OTP अलर्ट)</h2>
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="पूरा नाम (Name)" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="मोबाइल नंबर (जैसे 8949128806)" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="ईमेल आईडी" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="पासवर्ड" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 15px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', width: '100%' }}>
                    रजिस्टर करें और OTP भेजें
                </button>
            </form>
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default VendorLogin;