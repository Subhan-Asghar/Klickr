import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { useRouter,useSearchParams } from "next/navigation"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Calendar22() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const router=useRouter()
  const param=useSearchParams()
  const id=param.get("id")

  function toUTCMidnightISO(date: Date) {
    const utcDate = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ))
    return utcDate.toISOString()
  }

  return (
    <div className="flex flex-col gap-3 ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              if (!date) return; 
              const selected=new Date(date)
              const nextweek=new Date(selected)
              nextweek.setDate(selected.getDate() +6)
              // const start = selected.toString().split("(")[0]
              // const end = nextweek.toString().split("(")[0]
              const start = toUTCMidnightISO(selected)
              const end = toUTCMidnightISO(nextweek)
            
              const params=new URLSearchParams()
              if(id){
                params.set("id",id as string)
              }
              params.set("start",start)
              params.set("end",end)
              setOpen(false)
              router.push(`?${params.toString()}`)

            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
