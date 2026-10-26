import React, { useState, useEffect } from 'react';

// 🌐 Multi-language Dictionary for Wishlist
const wishlistTranslations = {
  English: {
    backToHome: '← Back to Home',
    wishlistTitle: 'MY WISHLIST',
    emptyTitle: 'Your Wishlist is Empty',
    emptyDesc: 'Explore our luxury collection and save your favorite items here for later.',
    discoverProducts: 'DISCOVER PRODUCTS',
    addToCart: 'Add to Cart'
  },
  Hindi: {
    backToHome: '← होम पर वापस जाएं',
    wishlistTitle: 'मेरी विशलिस्ट',
    emptyTitle: 'आपकी विशलिस्ट खाली है',
    emptyDesc: 'हमारे लक्जरी कलेक्शन को एक्सप्लोर करें और अपने पसंदीदा आइटम बाद के लिए यहाँ सेव करें।',
    discoverProducts: 'उत्पाद खोजें',
    addToCart: 'कार्ट में जोड़ें'
  },
  Tamil: {
    backToHome: '← முகப்பிற்குத் திரும்பு',
    wishlistTitle: 'எனது விருப்பப்பட்டியல்',
    emptyTitle: 'உங்கள் விருப்பப்பட்டியல் காலியாக உள்ளது',
    emptyDesc: 'எங்கள் லக்ஸரி தயாரிப்புகளை ஆராய்ந்து உங்கள் விருப்பமானவற்றை சேமிக்கவும்.',
    discoverProducts: 'தயாரிப்புகளைக் கண்டறியவும்',
    addToCart: 'கார்ட்டில் சேர்'
  },
  Marathi: {
    backToHome: '← होमवर परत जा',
    wishlistTitle: 'माझी विशलिस्ट',
    emptyTitle: 'तुमची विशलिस्ट रिकामी आहे',
    emptyDesc: 'आमचे लक्झरी कलेक्शन पहा आणि तुमचे आवडते आयटम येथे सेव्ह करा.',
    discoverProducts: 'उत्पादने शोधा',
    addToCart: 'कार्टमध्ये जोडा'
  },
  Bengali: {
    backToHome: '← হোমে ফিরে যান',
    wishlistTitle: 'আমার উইশলিস্ট',
    emptyTitle: 'আপনার উইশলিস্ট খালি আছে',
    emptyDesc: 'আমাদের লাক্সারি কালেকশন দেখুন এবং আপনার পছন্দের জিনিসগুলি এখানে সেভ করুন।',
    discoverProducts: 'পণ্য খুঁজুন',
    addToCart: 'কার্টে যোগ করুন'
  },
  Telugu: {
    backToHome: '← హోమ్‌కి తిరిగి వెళ్లు',
    wishlistTitle: 'నా విష్‌లిస్ట్',
    emptyTitle: 'మీ విష్‌లిస్ట్ ఖాళీగా ఉంది',
    emptyDesc: 'మా లగ్జరీ కలెక్షన్‌ను అన్వేషించండి మరియు మీకు నచ్చిన వాటిని ఇక్కడ సేవ్ చేయండి.',
    discoverProducts: 'ఉత్పత్తులను కనుగొనండి',
    addToCart: 'కార్ట్‌కి జోడించు'
  },
  Kannada: {
    backToHome: '← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    wishlistTitle: 'ನನ್ನ ಇಷ್ಟಪಟ್ಟಿ',
    emptyTitle: 'ನಿಮ್ಮ ಇಷ್ಟಪಟ್ಟಿ ಖಾಲಿಯಾಗಿದೆ',
    emptyDesc: 'ನಮ್ಮ ಲಕ್ಸುರಿ ಉತ್ಪನ್ನಗಳನ್ನು ನೋಡಿ ನಿಮ್ಮ ನೆಚ್ಚಿನ ವಸ್ತುಗಳನ್ನು ಇಲ್ಲಿ ಉಳಿಸಿ.',
    discoverProducts: 'ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ',
    addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ'
  },
  Malayalam: {
    backToHome: '← ഹോമിലേക്ക് മടങ്ങുക',
    wishlistTitle: 'എന്റെ വിഷ്‌ലിസ്റ്റ്',
    emptyTitle: 'നിങ്ങളുടെ വിഷ്‌ലിസ്റ്റ് ശൂന്യമാണ്',
    emptyDesc: 'ഞങ്ങളുടെ ലക്സറി ഉൽപ്പന്നങ്ങൾ കണ്ട് നിങ്ങളുടെ പ്രിയപ്പെട്ടവ ഇവിടെ സേവ് ചെയ്യുക.',
    discoverProducts: 'ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തുക',
    addToCart: 'കാർട്ടിലേക്ക് ചേർക്കുക'
  }
};

export default function Wishlist({ setActiveTab, wishlistItems = [], onRemoveFromWishlist, onAddToCart }) {
  // 🌐 भाषा सिंक स्टेट
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('appLanguage') || 'English';
  });

  const t = wishlistTranslations[currentLang] || wishlistTranslations.English;

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

  return (
    <div style={{ backgroundColor: '#0c0a09', color: '#f3e5ab', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif', paddingBottom: '100px' }}>
      
      {/* बैक टू होम लिंक */}
      <span 
        onClick={() => setActiveTab('home')} 
        style={{ color: '#d4af37', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-block', marginBottom: '15px', fontWeight: 'bold' }}>
        {t.backToHome}
      </span>

      {/* विशलिस्ट हेडिंग */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#d4af37', letterSpacing: '2px', fontSize: '1.5rem', margin: '0 0 5px 0' }}>{t.wishlistTitle}</h2>
        <div style={{ width: '50px', height: '2px', backgroundColor: '#d4af37', margin: '0 auto' }}></div>
      </div>

      {/* यदि विशलिस्ट खाली है */}
      {(!wishlistItems || wishlistItems.length === 0) ? (
        <div style={{ 
          backgroundColor: '#161310', 
          border: '1px solid #33291a', 
          borderRadius: '16px', 
          padding: '40px 20px', 
          textAlign: 'center', 
          maxWidth: '500px', 
          margin: '0 auto 30px auto',
          boxShadow: '0 8px 25px rgba(0,0,0,0.6)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#d4af37' }}>🤍</div>
          <h3 style={{ color: '#f3e5ab', fontSize: '1.2rem', marginBottom: '8px' }}>{t.emptyTitle}</h3>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '25px', lineHeight: '1.5' }}>
            {t.emptyDesc}
          </p>
          <button 
            onClick={() => setActiveTab('home')} 
            style={{ 
              backgroundColor: '#d4af37', 
              color: '#000', 
              border: 'none', 
              padding: '12px 30px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(212,175,55,0.3)'
            }}>
            {t.discoverProducts}
          </button>
        </div>
      ) : (
        /* यदि विशलिस्ट में सामान है */
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {wishlistItems.map((item, index) => {
            const itemId = item.id || item._id || item.uniqueKey || index;
            const itemName = item.title || item.name;
            const itemImg = item.img || item.image;

            return (
              <div key={itemId} style={{ backgroundColor: '#161310', border: '1px solid #33291a', borderRadius: '10px', padding: '12px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <img src={itemImg} alt="" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#f3e5ab' }}>{itemName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#d4af37', marginTop: '4px' }}>{item.price || "₹184"}</div>
                </div>
                
                {/* Add to Cart Button (कार्ट में जोड़ते ही विशलिस्ट से भी हट जाएगा) */}
                <button 
                  onClick={() => {
                    if (typeof onAddToCart === 'function') {
                      onAddToCart(item);
                    }
                    if (typeof onRemoveFromWishlist === 'function') {
                      onRemoveFromWishlist(itemId);
                    }
                  }} 
                  style={{ backgroundColor: '#d4af37', border: 'none', color: '#000', padding: '8px 12px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 'bold' }}>
                  {t.addToCart}
                </button>
                
                {/* Cross (✕) Delete Button */}
                <button 
                  onClick={() => {
                    if (typeof onRemoveFromWishlist === 'function') {
                      onRemoveFromWishlist(itemId);
                    }
                  }} 
                  style={{ backgroundColor: 'transparent', border: '1px solid #e53e3e', color: '#e53e3e', padding: '8px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}