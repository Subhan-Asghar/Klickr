import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
type Props={
    Dialog_title:string,
    description:string,
    button_text:string,
    trigger: React.ReactNode,
    submit:(title:string,link:string)=>Promise<void>,
    default_value?:{
        title:string,
        link:string
    }

}

export function LinkDialog({Dialog_title ,description,button_text,default_value,submit,trigger}:Props) {
    const [title,setTitle]=useState<string>("")
    const [link,setLink]=useState<string>("")
    const [open,setOpen]=useState<boolean>(false)
    const ButtonSubmit=async()=>{
        await submit(title,link)
        setOpen(false)
    }
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogTrigger asChild>
           {trigger}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{Dialog_title}</DialogTitle>
              <DialogDescription>
              {description}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title:</Label>
                <Input id="title" name="title" placeholder="Title" defaultValue={default_value?.title}
                onChange={(e)=>setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="redirect">Redirect:</Label>
                <Input id="redirect" name="redirect" placeholder="https://www.example.com/" defaultValue={default_value?.link} 
                onChange={(e)=>setLink(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={ButtonSubmit} type="submit">{button_text}</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    )
  }