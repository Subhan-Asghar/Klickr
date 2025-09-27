import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '../ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
  type props={
    trigger:React.ReactNode,
    data:{country:string,total:number}[]
  }

const Country_List = ({trigger,data}:props) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
    {trigger}
    </DialogTrigger>
    <DialogContent className="flex w-90 flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
      
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Countries
          </DialogTitle>
          <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          <DialogDescription asChild>
            <div className="p-6">
                {data.map((d,i)=>(
                     <div key={i} >
                     <div className="flex justify-between px-2 pb-2 text-primary font-semibold"> 
                         <h3 className="">{d.country}</h3>
                     <span className="">{d.total}</span></div>
                     
            
                   </div>
                ))}
            </div>
          </DialogDescription>
          <DialogFooter className="px-6 pb-6 sm:justify-start">
            <DialogClose asChild>
              <Button size={"sm"} type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size={"sm"} type="button">Okay</Button>
            </DialogClose>
          </DialogFooter>
          </ScrollArea>
        </DialogHeader>
     
    </DialogContent>
  </Dialog>
  )
}

export default Country_List