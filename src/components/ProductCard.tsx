import { Link } from '@remix-run/react'
import notFound from '~/assets/images/not-found-bg.jpg'
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import { formatVariantPrice, useRegion } from 'medusa-react'

interface ProductCardProps {
  product: PricedProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const variant = product.variants[0]
  const { region } = useRegion('reg_01HP4J8TFMCP4FTVCY1BF8Z5Q8')

  return (
    <section className="overflow-hidden bg-white rounded-lg shadow:md hover:shadow-lg w-80">
      <Link to={`/products/${product.id}`}>
        <ImageOrPlaceholder
          className="w-80"
          src={product.thumbnail}
          alt={product.title ?? 'Product'}
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-700 hover:underline">{product.title}</h3>
          {region && (
              <p className="font-semibold text-teal-600">
                {formatVariantPrice({
                  variant, // ProductVariant
                  region, // Region
                })}
              </p>
          )}
        </div>
      </Link>
    </section>
  )
}

interface ImageOrPlaceholderProps {
  src: string | null | undefined
  alt: string
  className?: string
}

function ImageOrPlaceholder({ src, alt, className }: ImageOrPlaceholderProps) {
  if (src) {
    return <img className={className} src={src} alt={alt} />
  }
  return (
    <img className={className} src={notFound} alt={alt}>
      <p>Not found</p>
    </img>
  )
}
