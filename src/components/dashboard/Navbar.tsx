"use client"
import * as React from "react"
import { User, LogOut, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import  {SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import ThemeButton from "../ui/theme-toggle"
const Navbar = () => {
  const router=useRouter()
  
  
  const Logout=async()=>{
    try{
      await axios.delete("/api/auth/login")
      router.push("/login")
    }catch{
      toast.error("Something went wrong")
    }
    

  }

  return (
    <div className="h-14 bg-background rounded-lg mt-2 border flex justify-between items-center px-4 shadow-lg">
      <div className="flex items-center">
      <SidebarTrigger />
      <p className="font-semibold p-2 ">Klickr</p>
      </div>
    
      <div className="flex items-center gap-2">
        <ThemeButton/>
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" /> Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={Logout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar
