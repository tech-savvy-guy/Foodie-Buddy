'use client'

import { useCart } from '../contexts/CartContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'
import { PrinterIcon, HomeIcon } from 'lucide-react'

export default function Receipt() {
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + tax

  const handlePrint = () => {
    window.print()
  }

  const handleReturnHome = () => {
    clearCart()
    router.push('/')
  }

  if (cart.length === 0) {
    return (
      <Card className="card-receipt w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">No recent purchase</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Your cart is empty. There's no receipt to display.</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={() => router.push('/')}>
            <HomeIcon className="mr-2 h-4 w-4" /> Return to Home
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 space-y-2">
          <Separator className="separator" />
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator className="separator" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between no-print">
        <Button variant="outline" onClick={handlePrint}>
          <PrinterIcon className="mr-2 h-4 w-4" /> Print Receipt
        </Button>
        <Button onClick={handleReturnHome}>
          <HomeIcon className="mr-2 h-4 w-4" /> Return to Home
        </Button>
      </CardFooter>
    </Card>
  )
}
