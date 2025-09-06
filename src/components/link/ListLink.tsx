import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useLinkList } from "@/hooks/useLinkList";
const ListLink = () => {
  const {data:list,}=useLinkList()

  return (
    <div className="h-[82vh] w-60 border shadow-sm bg-background flex flex-col">
  
    <div className="p-2 border-b">
      <h2 className="text-lg text-center pl-6 font-semibold tracking-tight">Links</h2>
    </div>

    {/* Scrollable List */}
    <ScrollArea className="h-[calc(80vh-4rem)] p-2 ">
      <div className="flex flex-col">
        {list?.map((item, idx) => (
          <div key={idx}>
            <div
              onClick={() => console.log(item.redirect)}
              className="flex items-center justify-between px-2 py-1 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <span className="">{item.title}</span>
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
