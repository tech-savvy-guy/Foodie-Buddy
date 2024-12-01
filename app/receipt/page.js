import Receipt from '../components/Receipt'

export default function ReceiptPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Purchase Receipt</h1>
      <Receipt />
    </div>
  )
}

