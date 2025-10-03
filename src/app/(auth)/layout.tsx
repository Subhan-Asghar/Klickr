import type { Metadata } from "next"

import { Geist, Geist_Mono } from "next/font/google"
import Auth_Nav from "@/components/auth/Auth_Nav"
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
  description: "Authentication",
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    
        <div className="flex flex-col h-screen flex-1 ">
        <Auth_Nav/>
        <main className="flex-1">{children}</main>
        </div>
    </div>
  )
}
