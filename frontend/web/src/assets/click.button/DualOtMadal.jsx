import React, { useState } from 'react';

export default function DualOtpModal({ isOpen, email, onClose, onVerifySuccess }) {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (enteredOtp.length !== 6) {
      alert('हुकुम, कृपया पूरा 6-अंकों का OTP दर्ज करें!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: enteredOtp })
      });
      const data = await response.json();

      if (data.success) {
        alert('🎉 OTP सफलतापूर्वक वेरीफाई हो गया है हुकुम!');
        if (onVerifySuccess) onVerifySuccess(data.token);
        onClose();
      } else {
        alert(`❌ ${data.message || 'गलत OTP!'}`);
      }
    } catch (err) {
      console.error('OTP Verification Error:', err);
      alert('सर्वर से कनेक्ट नहीं हो पा रहा है हुकुम!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000,
      fontFamily: '"Segoe UI", sans-serif'
    }}>
      <div style={{
        backgroundColor: '#161310', color: '#f3e5ab', padding: '30px',
        borderRadius: '12px', width: '100%', maxWidth: '400px',
        border: '2px solid #d4af37', boxShadow: '0 5px 25px rgba(212,175,55,0.4)',
        textAlign: 'center', boxSizing: 'border-box'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#d4af37' }}>🛡️ Dual Security Verification</h3>
        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>
          सुरक्षा कारणों से आपके ईमेल <span style={{ color: '#fff', fontWeight: 'bold' }}>{email || 'registered email'}</span> पर भेजे गए 6-अंकों का OTP दर्ज करें:
        </p>

        <form onSubmit={handleVerify}>
          <input 
            type="text" 
            placeholder="------" 
            value={enteredOtp} 
            onChange={(e) => setEnteredOtp(e.target.value)} 
            maxLength="6"
            required 
            style={{ 
              width: '100%', 
              padding: '14px', 
              fontSize: '22px', 
              textAlign: 'center', 
              letterSpacing: '8px',
              backgroundColor: '#0c0a09',
              color: '#fff',
              border: '1px solid #443826',
              borderRadius: '6px',
              marginBottom: '20px',
              boxSizing: 'border-box'
            }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ 
                flex: 1, backgroundColor: '#33291a', color: '#f3e5ab', 
                border: 'none', padding: '12px', borderRadius: '6px', 
                fontWeight: 'bold', cursor: 'pointer' 
              }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                flex: 1, backgroundColor: '#d4af37', color: '#000', 
                border: 'none', padding: '12px', borderRadius: '6px', 
                fontWeight: 'bold', cursor: 'pointer' 
              }}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}