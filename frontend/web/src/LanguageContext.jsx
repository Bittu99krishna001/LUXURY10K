import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

// केंद्रीय भाषा डिक्शनरी: सभी स्क्रीन इसी एक स्रोत से अनुवाद लें।
// नए स्क्रीन/टेक्स्ट जोड़ते समय दोनों भाषाओं में समान key जोड़ें।
export const translations = {
  English: {
    hello: 'HELLO', manageAccount: 'MANAGE ACCOUNT', home: 'Home', cart: 'Cart',
    wishlist: 'Wishlist', account: 'Account', search: 'Search products...',
    addToCart: 'Add to Cart', buyNow: 'Buy Now', login: 'Login', logout: 'Logout',
    orderHistory: 'Order History', placeOrder: 'Place Order',
    selectPayment: 'Select payment method', cashOnDelivery: 'Cash on Delivery',
    noProducts: 'No products available, Hukum!',
  },
  Hindi: {
    hello: 'नमस्ते', manageAccount: 'खाता प्रबंधित करें', home: 'होम', cart: 'कार्ट',
    wishlist: 'विशलिस्ट', account: 'खाता', search: 'प्रोडक्ट खोजें...',
    addToCart: 'कार्ट में जोड़ें', buyNow: 'अभी खरीदें', login: 'लॉगिन', logout: 'लॉगआउट',
    orderHistory: 'ऑर्डर हिस्ट्री', placeOrder: 'ऑर्डर करें',
    selectPayment: 'भुगतान का तरीका चुनें', cashOnDelivery: 'कैश ऑन डिलीवरी',
    noProducts: 'कोई प्रोडक्ट उपलब्ध नहीं है हुकुम!',
  },
};

const LANGUAGE_STORAGE_KEY = 'appLanguage';
const LEGACY_LANGUAGE_STORAGE_KEY = 'preferred_language';
const normalizeLanguage = (language) => {
  const value = String(language || '').toLowerCase();
  return value === 'hi' || value === 'hindi' ? 'Hindi' : 'English';
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window === 'undefined') return 'English';
    return normalizeLanguage(
      localStorage.getItem(LANGUAGE_STORAGE_KEY) ||
      localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY) || 'English'
    );
  });

  const changeLanguage = useCallback((language) => {
    const normalized = normalizeLanguage(language);
    setCurrentLang(normalized);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
      localStorage.setItem(LEGACY_LANGUAGE_STORAGE_KEY, normalized === 'Hindi' ? 'hi' : 'en');
      // पुराने और नए दोनों event names समर्थित रखें ताकि मौजूदा कोड न टूटे।
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: normalized }));
      window.dispatchEvent(new CustomEvent('languageChange', { detail: normalized === 'Hindi' ? 'hi' : 'en' }));
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const syncLanguage = (event) => {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) ||
        localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY);
      const incoming = event?.detail || stored || 'English';
      setCurrentLang(normalizeLanguage(incoming));
    };
    window.addEventListener('languageChanged', syncLanguage);
    window.addEventListener('languageChange', syncLanguage);
    window.addEventListener('storage', syncLanguage);
    return () => {
      window.removeEventListener('languageChanged', syncLanguage);
      window.removeEventListener('languageChange', syncLanguage);
      window.removeEventListener('storage', syncLanguage);
    };
  }, []);

  const t = translations[currentLang] || translations.English;
  const translate = (key) => t[key] ?? translations.English[key] ?? key;

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, t, translate, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
