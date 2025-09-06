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
import { toast } from "sonner"
import { useLinkList } from "@/hooks/useLinkList"

type Props={
    Dialog_title:string,
    description:string,
    button_text:string,
    trigger: React.ReactNode,
    submit:(title:string,link:string)=>Promise<string|void>,
    default_value?:{
        title:string,
        link:string
    }

}

export function LinkDialog({Dialog_title ,description,button_text,default_value,submit,trigger}:Props) {
    const [title,setTitle]=useState<string>("")
    const [link,setLink]=useState<string>("")
    const [open,setOpen]=useState<boolean>(false)
    const [urlopen,setUrlOpen]=useState<boolean>(false)
    const [url,setUrl]=useState<string>("")
    const {refetch}=useLinkList()
    const handleSubmit =async(e: React.FormEvent)=>{
        e.preventDefault() 
        const result=await submit(title,link)
        if(result){
          setOpen(false)
          setUrl(result?? "")
          setUrlOpen(true)
        
        }
        refetch()
    }
    const copyToClipboard = async () => {
      if (url) {
        await navigator.clipboard.writeText(url)
        toast.success("Link Copied")
      }
    }
    return (
    <>
    <Dialog open={open}  onOpenChange={setOpen}>
        
          <DialogTrigger asChild>
           {trigger}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{Dialog_title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title:</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  defaultValue={default_value?.title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="redirect">Redirect:</Label>
                <Input
                  id="redirect"
                  name="redirect"
                  placeholder="https://www.example.com/"
                  defaultValue={default_value?.link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{button_text}</Button>
            </DialogFooter>
          </form>
        
      </DialogContent>
    </Dialog>

    {url && (
      <Dialog open={urlopen} onOpenChange={setUrlOpen}>

      <DialogContent className="sm:max-w-[425px] ">
      <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>URL </DialogTitle>
              <DialogDescription>Your short link is ready </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Input value={url} readOnly />
              <Button onClick={copyToClipboard}>Copy</Button>
            </div>
          </div>
      </DialogContent>
      </Dialog>
    )}
    </>
      
    )
  }