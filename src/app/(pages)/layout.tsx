import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/Sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">{children}</main>
      </SidebarProvider>
    </div>
  )
}
