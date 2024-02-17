import { useState } from 'react'
import { ProductProvider, useLoadedProduct } from '../utils/medusa/hooks.tsx'
import { useLoaderData } from 'react-router-typesafe'
import { LoaderFunctionArgs } from 'react-router-dom'
import { getParamOr400 } from '../utils/router.ts'
import { BiShoppingBag } from 'react-icons/bi'
import { formatVariantPrice } from 'medusa-react'
import { ProductImageOrFallback } from '../components/ProductImageOrFallback.tsx'

export function productLoader({ params }: LoaderFunctionArgs) {
  return getParamOr400(params, 'productId')
}

export default function ProductRoute() {
  const productId = useLoaderData<typeof productLoader>()

  return (
    <ProductProvider productId={productId}>
      <Content />
    </ProductProvider>
  )
}

export function Content() {
  const { product, region } = useLoadedProduct()
  const [variant, setVariant] = useState(product.variants[0])
  const [image, setImage] = useState(product.images?.[0])
  const [quantity, setQuantity] = useState(1)

  const handleVariantChange = (index: number) => {
    setVariant(product.variants[index])
    setQuantity(1)
  }

  function increaseQuantity() {
    if (variant.inventory_quantity && quantity < variant.inventory_quantity) {
      setQuantity(quantity + 1)
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleImageChange = (imageId: string) => {
    setImage(product.images?.find((img) => img.id === imageId))
  }

  return (
    <div className="w-full">
      <div className="grid items-center md:grid-cols-2">
        <div>
          <ProductImageOrFallback className="w-full rounded-lg" src={image?.url} alt={product.title} />
          {product.images && product.images.length > 1 && (
            <div className="flex justify-center p-4 space-x-2">
              {product.images.map((imageItem) => (
                <img
                  className={`w-16 border-2 rounded-lg ${
                    imageItem.id === image?.id ? 'border-teal-400' : null
                  }`}
                  key={imageItem.id}
                  src={imageItem.url}
                  alt={product.title ?? 'Product'}
                  onClick={() => handleImageChange(imageItem.id)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col px-16 py-4 space-y-8">
          <h1>{product.title} </h1>
          <p className="font-semibold text-teal-600">
            {formatVariantPrice({
              variant,
              region,
            })}
          </p>
          <div>
            <p className="font-semibold">Select Size</p>
            <div className="grid grid-cols-3 gap-2 mt-2 md:grid-cols-2 xl:grid-cols-4">
              {product.variants.map((variantItem, index) => (
                <button
                  key={variantItem.id}
                  className={`px-2 py-1 mr-2 text-sm hover:brightness-90 ${
                    variantItem.id === variant.id
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                  onClick={() => handleVariantChange(index)}
                >
                  {variantItem.title}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold">Select Quantity</p>
            <div className="flex items-center px-4 mt-2 space-x-4">
              <button
                className="px-4 py-2 hover:shadow-sm hover:text-teal-500 hover:font-bold"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="px-4 py-2 hover:shadow-sm hover:text-teal-500 hover:font-bold"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <button className="inline-flex items-center px-4 py-2 font-semibold text-gray-200 bg-gray-700 rounded hover:text-white hover:bg-gray-900">
              <BiShoppingBag className="mr-2 text-lg" /> <span>Add to Cart</span>
            </button>
          </div>
          <div>
            <p className="font-semibold">Product Description</p>
            <hr className="w-2/3 mt-2 border-t-2 border-gray-300" />
            <p className="mt-4 text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
