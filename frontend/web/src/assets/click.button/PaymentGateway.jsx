import React, { useState } from 'react';

export default function PaymentGateway({ profile, orderAmount, itemName, onPaymentSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('upi_intent');
  const [transactionRef, setTransactionRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // आपकी पर्सनल UPI ID और दुकान का नाम (डैशबोर्ड प्रोफाइल से या डिफॉल्ट)
  const personalUpiId = profile?.upiId || "luxurystore@pay";
  const shopName = profile?.shopName || "Luxury Collection Jodhpur";

  // सिर्फ नंबर या क्लीन अमाउंट निकालने के लिए (जैसे "₹15,000" से "15000")
  const cleanAmount = typeof orderAmount === 'string' 
    ? orderAmount.replace(/[^0-9]/g, '') 
    : orderAmount || "0";

  // UPI Intent लिंक (Google Pay, PhonePe, Paytm सीधे खोलने के लिए)
  const upiIntentUrl = `upi://pay?pa=${personalUpiId}&pn=${encodeURIComponent(shopName)}&am=${cleanAmount}&cu=INR&tn=${encodeURIComponent('Payment for ' + itemName)}`;

  // QR Code जनरेटर (आपके पर्सनल UPI ID का डायनेमिक QR)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiIntentUrl)}`;

  // UTR / Transaction Reference को सुरक्षित रूप से सैनिटाइज करने के लिए
  const handleRefChange = (e) => {
    const sanitized = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // केवल अल्फा-न्यून्यूरिक कैरेक्टर्स की अनुमति
    setTransactionRef(sanitized);
  };

  const handleVerifyPayment = (e) => {
    e.preventDefault();
    
    if (!transactionRef.trim() || transactionRef.length < 8) {
      alert("⚠️ हुकुम! कृपया कम से कम 8 अंकों का सही UTR / Transaction Reference Number दर्ज करें!");
      return;
    }

    setIsProcessing(true);
    
    // यहाँ पेमेंट वेरीफाई करने की प्रक्रिया सिमुलेट हो रही है (इसे आप अपने बैकएंड API से जोड़ सकते हैं)
    setTimeout(() => {
      setIsProcessing(false);
      alert("✅ पेमेंट का UTR सफलतापूर्वक दर्ज हो गया है हुकुम!");
      if (onPaymentSuccess) {
        onPaymentSuccess({
          method: selectedMethod,
          refId: transactionRef,
          amount: orderAmount,
          status: "Paid"
        });
      }
    }, 1200);
  };

  return (
    <div style={{
      background: '#1a1226',
      border: '1px solid #d4af37',
      borderRadius: '8px',
      padding: '20px',
      color: '#fff',
      maxWidth: '400px',
      margin: '0 auto',
      fontFamily: 'sans-serif',
      boxSizing: 'box-sizing'
    }}>
      <h3 style={{ color: '#d4af37', textAlign: 'center', marginTop: 0 }}>
        👑 Secure Personal Checkout
      </h3>
      
      <div style={{ background: '#2c223b', padding: '12px', borderRadius: '6px', marginBottom: '15px', border: '1px solid #5a4870' }}>
        <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><b>Item:</b> {itemName}</p>
        <p style={{ margin: '4px 0', fontSize: '1rem', color: '#4CAF50' }}><b>Total Amount:</b> {orderAmount}</p>
        <p style={{ margin: '4px 0', fontSize: '0.8rem', color: '#bca6d4' }}><b>Direct to Owner UPI:</b> {personalUpiId}</p>
      </div>

      {/* Payment Method Selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button 
          onClick={() => setSelectedMethod('upi_intent')}
          style={tabBtnStyle(selectedMethod === 'upi_intent')}
        >
          📱 UPI Apps (GPay/PhonePe)
        </button>
        <button 
          onClick={() => setSelectedMethod('qr_code')}
          style={tabBtnStyle(selectedMethod === 'qr_code')}
        >
          📷 Scan QR
        </button>
      </div>

      {/* Option 1: Direct UPI App Button (Mobile Friendly) */}
      {selectedMethod === 'upi_intent' && (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <p style={{ fontSize: '0.85rem', color: '#bca6d4', marginBottom: '10px' }}>
            नीचे दिए गए बटन पर क्लिक करके सीधे अपने फोन के UPI ऐप से भुगतान करें:
          </p>
          <a 
            href={upiIntentUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              backgroundColor: '#25D366',
              color: '#fff',
              padding: '12px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.95rem'
            }}
          >
            🚀 Pay {orderAmount} Now via UPI
          </a>
        </div>
      )}

      {/* Option 2: QR Code Scan */}
      {selectedMethod === 'qr_code' && (
        <div style={{ textAlign: 'center', marginBottom: '15px', background: '#fff', padding: '12px', borderRadius: '6px' }}>
          <img src={qrCodeUrl} alt="Personal UPI QR" style={{ width: '160px', height: '160px', display: 'block', margin: '0 auto' }} />
          <p style={{ fontSize: '0.75rem', color: '#333', marginTop: '6px', fontWeight: 'bold' }}>Scan with any UPI App (Direct to {shopName})</p>
        </div>
      )}

      {/* Manual UTR / Reference Verification Form */}
      <form onSubmit={handleVerifyPayment} style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #5a4870', paddingTop: '15px' }}>
        <label style={{ fontSize: '0.8rem', color: '#d4af37' }}>
          पेमेंट करने के बाद UTR / Ref Number यहाँ दर्ज करें:
        </label>
        <input 
          type="text" 
          placeholder="e.g. 432156789012" 
          value={transactionRef}
          onChange={handleRefChange}
          required
          style={{
            padding: '10px',
            backgroundColor: '#2c223b',
            border: '1px solid #5a4870',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          disabled={isProcessing}
          style={{
            padding: '10px',
            backgroundColor: '#d4af37',
            color: '#1a1226',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {isProcessing ? "Verifying..." : "Confirm & Submit Payment"}
        </button>
      </form>
    </div>
  );
}

const tabBtnStyle = (isActive) => ({
  flex: 1,
  padding: '8px',
  backgroundColor: isActive ? '#4a2858' : '#2c223b',
  color: isActive ? '#f3e5ab' : '#fff',
  border: isActive ? '1px solid #d4af37' : '1px solid #5a4870',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.75rem',
  fontWeight: 'bold'
});