import axios from "axios";
import { toast } from "sonner";
import React, { useState } from 'react'
import { useLinkList } from "@/hooks/useLinkList";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";

const DeleteLink = ({id,trigger,func}:{id:string,trigger:React.ReactNode,func?:()=>void}) => {
    const {refetch}=useLinkList()
    const [open, setOpen] = useState(false);
    const deleteLink=async(id:string)=>{
        try{
           const res= axios.delete(`/api/link`,{
            data:{id}
          })
            toast.promise(res,{
            success:"Link Deleted",
            loading:"Deleting the link...",
            error:"Something went wrong "
            })
            await res
            refetch()
            func?.()
            setOpen(false); 

        }
        catch{
            toast.error("Something went wrong")
        }
    }
  return (
    <>
<AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="cursor-pointer">
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
      <AlertDialogHeader>
      <AlertDialogTitle>Delete Link?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the link and remove it from your list.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <Button variant={"destructive"}  onClick={() => deleteLink(id)}>Delete</Button>
    </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

export default DeleteLink

