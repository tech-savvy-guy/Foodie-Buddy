import './globals.css';
import Script from 'next/script'
import { Rubik } from 'next/font/google';
import Header from './components/Header';
import { CartProvider } from './contexts/CartContext';
import { TelegramProvider } from './contexts/TelegramContext';
import TelegramScriptLoader from './components/TelegramScriptLoader';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata = {
  title: 'Foodie Buddy Cafe',
  description: 'Satisfying your hunger, one bite at a time!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-background text-foreground`}>
      <TelegramScriptLoader />
        <TelegramProvider>
          <CartProvider>
            <div className="max-w-6xl mx-auto px-4">
              <Header />
              <main className="py-8">
                {children}
              </main>
            </div>
          </CartProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
