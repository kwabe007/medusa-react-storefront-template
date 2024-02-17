import Medusa from '@medusajs/medusa-js'
import { QueryClient } from "@tanstack/query-core";

const MEDUSA_BACKEND_URL = 'http://localhost:9000'

const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })

const queryClient = new QueryClient()

export { medusaClient, MEDUSA_BACKEND_URL, queryClient }
