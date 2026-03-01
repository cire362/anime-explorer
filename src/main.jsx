import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'

import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

const queryClient = new QueryClient()

const RootElement = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootElement />
  </StrictMode>,
)
