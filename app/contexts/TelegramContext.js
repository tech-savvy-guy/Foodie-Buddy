"use client";

import React, { createContext, useEffect, useState, useContext } from 'react';

const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {
  const [telegram, setTelegram] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-web-app.js?56";
    script.async = true;

    script.onload = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        setTelegram(window.Telegram.WebApp);
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <TelegramContext.Provider value={telegram}>
      {children}
    </TelegramContext.Provider>
  );
};

// Custom hook to use Telegram Web App in any component
export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
};
