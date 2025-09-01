"use client"
import * as React from "react"
import { Moon, Sun, User, LogOut, CreditCard } from "lucide-react"
import { useTheme } from "next-themes"
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
const Navbar = () => {
  const router=useRouter()
  const { setTheme } = useTheme()
  
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
              <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
