import * as React from "react"
import { Moon, Sun} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ThemeButton = () => {
    const { setTheme } = useTheme()
    
  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size="icon" className="cursor-pointer">
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

  )
}

export default ThemeButton