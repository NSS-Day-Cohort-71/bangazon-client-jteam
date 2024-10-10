import '../global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppWrapper } from '../context/state'  // Keep the existing context wrapper

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

export default function Bangazon({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        {getLayout(<Component {...pageProps} />)}
      </AppWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}