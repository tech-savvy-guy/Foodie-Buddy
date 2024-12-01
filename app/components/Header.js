'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Cart from './Cart'
import SearchDrawer from './SearchDrawer'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [currentDateTime, setCurrentDateTime] = useState('')

  useEffect(() => {
    const now = new Date()
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const formattedDateTime = now.toLocaleString(undefined, options)
    setCurrentDateTime(formattedDateTime)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-foreground">
          Foodie Buddy Cafe
        </Link>
        {pathname !== '/receipt' ? (
          <div className="flex items-center space-x-4">
            <SearchDrawer />
            <Cart />
          </div>
        ) : (
          <div className="text-foreground text-sm">
            {currentDateTime}
          </div>
        )}
      </div>
    </header>
  )
}

