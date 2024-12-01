'use client'

import { useRef } from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useCart } from '../contexts/CartContext'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Plus, Minus } from 'lucide-react'

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useCart()
  const closeRef = useRef(null)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const router = useRouter()

  const [isLargeDevice, setIsLargeDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAdd = (product) => {
    addToCart(product)
  }

  const handleRemove = (productId) => {
    removeFromCart(productId)
  }

  const handleCheckout = () => {
    closeRef.current?.click()
    router.push('/receipt')
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative w-10 h-10">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="fixed inset-x-0 bottom-0 h-[75vh] w-full max-w-[72rem] mx-auto rounded-t-xl">
        <div className="w-full h-full max-w-[72rem] mx-auto flex flex-col">
          <DrawerHeader className="text-center px-4">
            <DrawerTitle className="text-xl">Your Cart</DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground mt-1">
              Review your items before checkout
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="flex-grow px-4">
            <div className="space-y-4 pr-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <tgs-player
                      src={item.image}
                      autoplay
                      className="w-12 h-12"
                    ></tgs-player>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="icon" variant="outline" onClick={() => handleRemove(item.id)} className="h-6 w-6">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-4 text-center text-xs">{item.quantity}</span>
                    <Button size="icon" variant="outline" onClick={() => handleAdd(item)} className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {cart.length === 0 && (
            <div className="flex items-center justify-center w-full h-full flex-grow">
              <tgs-player
                autoplay
                loop
                mode="normal"
                src='/empty.tgs'
                style={{
                  width: isLargeDevice ? '350px' : '250px',
                  height: isLargeDevice ? '350px' : '250px',
                }}
              ></tgs-player>
            </div>
          )}
          <DrawerFooter className="px-4 mt-auto">
            {cart.length !== 0 && (
              <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-100">
                <span className="text-sm">Total</span>
                <span className="text-base font-semibold">${total.toFixed(2)}</span>
              </div>
            )}
            {cart.length !== 0 && (
              <Button className="w-full h-10 text-sm font-medium" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            )}
            <DrawerClose ref={closeRef} asChild>
              <Button variant={cart.length !== 0 ? "outline" : "default"} className="w-full h-10 text-sm font-medium">
                Continue Shopping
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
