import { useEffect } from 'react';
import { useTelegram } from '../contexts/TelegramContext';

const SomeComponent = () => {
  const telegram = useTelegram();

  useEffect(() => {
    if (telegram) {
      console.log('Telegram Web App is ready:', telegram);
      // You can now use telegram.WebApp API here
    }
  }, [telegram]);

  return (
    <div>
      <h1>Foodie Buddy Cafe</h1>
      {/* You can interact with the Telegram Web App API here */}
    </div>
  );
};

export default SomeComponent;
