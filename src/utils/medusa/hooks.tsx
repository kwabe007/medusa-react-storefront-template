import { useProducts } from 'medusa-react'
import { createContext, ReactNode, useContext } from "react";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

const ProductsContext = createContext<PricedProduct[] | undefined>(undefined);

export default function ProductsProvider({ children }: { children: ReactNode }) {
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
