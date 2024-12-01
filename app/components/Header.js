import Link from 'next/link'
import Cart from './Cart'
import SearchDrawer from './SearchDrawer'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-foreground">
          Foodie Buddy Cafe
        </Link>
        <div className="flex items-center space-x-4">
          <SearchDrawer />
          <Cart />
        </div>
      </div>
    </header>
  )
}

