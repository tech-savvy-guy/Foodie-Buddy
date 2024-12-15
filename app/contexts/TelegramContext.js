"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TelegramContext = createContext(null);

export const TelegramProvider = ({ children }) => {
  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      setWebApp(window.Telegram.WebApp);
    } else {
      console.error("Telegram WebApp object not available!");
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ webApp }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
