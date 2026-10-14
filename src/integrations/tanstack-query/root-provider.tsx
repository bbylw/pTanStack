import { QueryClient } from '@tanstack/react-query'

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
      },
    },
  })

  return {
    queryClient,
  }
}

export default function TanstackQueryProvider() {}
