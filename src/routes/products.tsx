import ProductCard from '../components/ProductCard.tsx'
import { useLoadedProducts } from '../utils/medusa/hooks.tsx'

export default function ProductsRoute() {
  const products = useLoadedProducts()

  return (
    <div className="w-full p-4 my-8">
      <h1 className="text-center">Latest Arrivals</h1>
      <div className="grid grid-cols-1 gap-6 px-4 mt-8 md:px-12 lg:px-6 xl:px-4 xl:gap-6 2xl:px-24 2xl:gap-6 justify-items-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {products?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}