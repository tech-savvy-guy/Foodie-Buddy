'use client'

import { Plus, Minus } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

import { useCart } from '../contexts/CartContext'
import { useTelegram } from "../contexts/TelegramContext";


export default function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart } = useCart()
  const [loading, setLoading] = useState(true)
  const playerRef = useRef(null)

  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0

  const webApp = useTelegram();

  useEffect(() => {
    if (webApp) {
      console.log("Telegram WebApp Details:", {
        initData: webApp.initData,
        version: webApp.version,
        platform: webApp.platform,
      });
    }
  }, [webApp]);

  useEffect(() => {
    if (!document.querySelector('script[src="/js/tgs-player.js"]')) {
      const script = document.createElement('script')
      script.src = "/js/tgs-player.js"
      script.async = true
      script.onload = () => console.log("Lottie Player script loaded successfully.")
      script.onerror = () => console.error("Failed to load Lottie Player script.")
      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    const player = playerRef.current
    if (player) {
      const onReady = () => setLoading(false)
      player.addEventListener('ready', onReady)
      return () => player.removeEventListener('ready', onReady)
    }
  }, [])

  const handleAdd = () => {
    if (quantity === 0 && playerRef.current) {
      playerRef.current.stop()
      playerRef.current.play()
    }
    addToCart(product)
  }

  const handleRemove = () => {
    if (quantity > 0) {
      removeFromCart(product.id)
    }
  }

  return (
    <Card className="flex flex-col h-full transition-shadow hover:shadow-md overflow-hidden">
      <CardContent className="flex flex-col h-full p-3">
        {loading ? (
          <Skeleton className="h-5 w-3/4 mb-2" />
        ) : (
          <h3 className="text-base font-semibold mb-2 truncate">{product.name}</h3>
        )}

        <div className="relative mb-2 aspect-square">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {loading && (
              <Skeleton
                className="absolute inset-0 w-3/4 h-3/4 rounded-full"
                style={{ margin: 'auto' }}
              />
            )}
            <tgs-player
              mode="normal"
              src={product.image}
              style={{ width: '75%', height: '75%' }}
              ref={playerRef}
            ></tgs-player>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t">
          {loading ? (
            <>
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-9 w-24" />
            </>
          ) : (
            <>
              <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
              {quantity === 0 ? (
                <Button onClick={handleAdd} size="sm" className="text-xs">Add to Cart</Button>
              ) : (
                <div className="flex items-center space-x-1">
                  <Button size="icon" variant="outline" onClick={handleRemove} className="h-9 w-9">
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="w-6 text-center text-sm">{quantity}</span>
                  <Button size="icon" variant="outline" onClick={handleAdd} className="h-9 w-9">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
