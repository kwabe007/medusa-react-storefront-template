import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.tsx'
import LandingRoute from './routes/landing.tsx'
import ProductsRoute from './routes/products.tsx'
import { MedusaProvider } from 'medusa-react'
import { MEDUSA_BACKEND_URL, medusaClient, queryClient } from './utils/medusa/medusa.ts'
import ProductsProvider from "./utils/medusa/hooks.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <LandingRoute /> },
      { path: 'products', element: <ProductsProvider><ProductsRoute /></ProductsProvider> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{ client: queryClient }}
      medusaClient={medusaClient}
    >
      <RouterProvider router={router} />
    </MedusaProvider>
  </React.StrictMode>
)
