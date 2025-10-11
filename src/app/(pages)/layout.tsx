import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Geist, Geist_Mono } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Klickr",
  description: "Dashboard",
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <div className="flex flex-col h-screen flex-1 gap-1 ">
        <Navbar/>
        <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}
