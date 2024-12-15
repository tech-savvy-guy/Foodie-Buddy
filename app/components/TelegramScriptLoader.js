// TelegramScriptLoader.js
"use client";

import { useEffect, useState } from "react";

const TelegramScriptLoader = () => {
  const [isTelegramReady, setTelegramReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js?56";
    script.async = true;

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        setTelegramReady(true); // Mark Telegram as ready
        console.log("Telegram WebApp object:", window.Telegram.WebApp);
      } else {
        console.error("Telegram WebApp object not available!");
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (!isTelegramReady) {
    return <div>Loading Telegram WebApp...</div>;
  }

  return null; // Script is loaded, proceed with the app
};

export default TelegramScriptLoader;
