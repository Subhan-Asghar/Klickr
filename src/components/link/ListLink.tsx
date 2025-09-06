import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import axios from "axios";
const ListLink = () => {
  const func=async()=>{
    const res=await axios.get("/api/link")
    return res.data.data
  }
  const {data:list,isLoading}=useQuery({
    queryKey:["getlist"],
    queryFn:func
  })

  if(isLoading){
    return <>
    <div className="flex justify-center items-center h-screen">
    <Spinner variant="circle"></Spinner>
    </div>
    </>
  }
  console.log(list)
  return (
    <div className="h-[80vh] border shadow-sm bg-background mt-2 flex-1">
  
    <div className="p-2 border-b">
      <h2 className="text-xl pl-6 font-semibold tracking-tight">My Links</h2>
    </div>

    {/* Scrollable List */}
    <ScrollArea className="h-[calc(80vh-4rem)] p-2">
      <div className="flex flex-col">
        {list?.map((item, idx) => (
          <div key={idx}>
            <div
              onClick={() => console.log(item.redirect)}
              className="flex items-center justify-between px-4 py-2 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <span className="font-medium">{item.title}</span>
            </div>
            {idx < list.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  </div>
  );
};

export default ListLink;
