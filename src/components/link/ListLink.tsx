import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLinkList } from "@/hooks/useLinkList";
import { useFetch } from "@/hooks/useFetch";
const ListLink = () => {
  const { data: list } = useLinkList();
  const {setId,refetch}=useFetch()
  return (
    <div className="h-[90vh] w-64 border rounded-lg bg-card flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-muted/30">
        <h2 className="text-lg font-semibold tracking-tight text-center">
          Links
        </h2>
      </div>

      {/* Scrollable List */}
      <ScrollArea className="flex-1 p-2 h-[calc(90vh-4rem)]">
        <div className="flex flex-col gap-1">
          {list?.map((item, idx) => (
            <div key={idx}>
              <div
                onClick={async() => {setId(item.id)
                  await refetch()
                }}
                className="w-full flex items-center justify-between cursor-pointer px-3 py-2 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <span className="truncate">{item.title}</span>
              </div>
              {idx < list.length - 1 && <Separator className="my-1" />}
            </div>
          ))}
          {!list?.length && (
            <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
              No links found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ListLink;
