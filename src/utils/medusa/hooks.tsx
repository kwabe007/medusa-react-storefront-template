import { useProduct, useProducts, useRegion } from 'medusa-react'
import { createContext, ReactNode, useContext } from 'react'
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import { Region } from "@medusajs/medusa";

const ProductsContext = createContext<PricedProduct[] | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const { products, isLoading, isError } = useProducts()

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (isError) {
    return <div className="text-center">Error loading products</div>
  }

  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>
}

export function useLoadedProducts() {
  const products = useContext(ProductsContext)
  if (products === undefined) {
    throw new Error('useLoadedProducts must be used within a ProductsProvider')
  }
  return products
}


const ProductContext = createContext<{ product: PricedProduct, region: Region } | undefined>(undefined)

interface ProductProviderProps {
  productId: string
  children?: ReactNode
}

export function ProductProvider({ productId, children }: ProductProviderProps) {
  const { product, isLoading, isError } = useProduct(productId)
  const { region, isLoading: isRegionLoading, isError: isRegionError } = useRegion('reg_01HP4J8TFMCP4FTVCY1BF8Z5Q8')

  if (isLoading || isRegionLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (isError || isRegionError) {
    return <div className="text-center">Error loading product</div>
  }

  if (!product) {
    return <div className="text-center">Product not found</div>
  }

  if (!region) {
    return <div className="text-center">Region not found</div>
  }

  return <ProductContext.Provider value={{ product, region }}>{children}</ProductContext.Provider>
}

export function useLoadedProduct() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useLoadedProduct must be used within a ProductProvider')
  }
  return context
}
