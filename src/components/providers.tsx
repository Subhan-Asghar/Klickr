'use client'

import { QueryClientProvider ,QueryClient} from '@tanstack/react-query'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { useState } from 'react'


export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
      }))

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors position="bottom-center" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}