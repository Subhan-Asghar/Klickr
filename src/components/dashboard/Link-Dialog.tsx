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
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useLinkList } from "@/hooks/useLinkList"
import { Copy } from 'lucide-react';

type Props={
    Dialog_title:string,
    description:string,
    button_text:string,
    trigger: React.ReactNode,
    id?:string,
    submit:(title:string,link:string,active:boolean,id?:string)=>Promise<string|void>,
    refetch?:()=>void,
    default_value?:{
        title:string,
        link:string,
        checked:boolean
    },

}

export function LinkDialog({Dialog_title ,description,button_text,default_value,submit,trigger,id,refetch}:Props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [disable, setDisable] = useState<boolean>(false);
    const [active, setActive] = useState(true);
    const [open,setOpen]=useState<boolean>(false)
    const [urlopen,setUrlOpen]=useState<boolean>(false)
    const [url,setUrl]=useState<string>("")
    

    useEffect(() => {
      if (open) {
        setTitle(default_value?.title ?? "");
        setLink(default_value?.link ?? "");
        setActive(default_value?.checked ?? true);
      }
    }, [open]);
    const handleSubmit =async(e: React.FormEvent)=>{
      try{
        e.preventDefault() 
        setDisable(true)
        const result=await submit(title,link,active,id)
        if(result){
          setOpen(false)
          setUrl(result?? "")
          setUrlOpen(true)
        
        }
        refetch?.()
        setDisable(false)

      }catch{
        toast.error("Something went wrong")
        setDisable(false)
      }
       
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
        
          <DialogTrigger asChild className="cursor-pointer">
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="redirect">Redirect</Label>
                <Input
                  id="redirect"
                  name="redirect"
                  placeholder="https://www.example.com/"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
              <Switch id="active" 
            checked={active}
            onCheckedChange={setActive}
              />
              <Label htmlFor="active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={disable} type="submit">{button_text}</Button>
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
              <Button onClick={copyToClipboard}><Copy/></Button>
            </div>
          </div>
      </DialogContent>
      </Dialog>
    )}
    </>
      
    )
  }