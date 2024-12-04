import products from './Products'
import ProductCard from './ProductCard'

export default function Main() {

  return (
    (<div
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>)
  );
}

