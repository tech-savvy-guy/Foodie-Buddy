'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Cart from './Cart'
import SearchDrawer from './SearchDrawer'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [currentDateTime, setCurrentDateTime] = useState('')

  const [isLargeDevice, setIsLargeDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth >= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString();
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className={`font-bold text-foreground ${isLargeDevice ? 'text-2xl' : 'text-xl'}`}>
          Foodie Buddy Cafe
        </Link>
        {pathname !== '/receipt' ? (
          <div className="flex items-center space-x-4">
            <SearchDrawer />
            <Cart />
          </div>
        ) : (
          <div className={`text-foreground ${isLargeDevice ? '' : 'text-xs'}`}>
            {currentDateTime}
          </div>
        )}
      </div>
    </header>
  )
}

