"use client"
import React from 'react'
import ListLink from '@/components/link/ListLink'
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useLinkList } from "@/hooks/useLinkList";
const Link = () => {
   const {isLoading}=useLinkList()

   if(isLoading){
    return <>
    <div className="flex justify-center items-center h-[90vh]">
    <Spinner variant="circle"></Spinner>
    </div>
    </>
  }

  return (
<div className="flex flex-col h-[90vh] bg-background mt-1 rounded-lg border shadow-lg">
  <div className="h-14 flex flex-col justify-center px-4 border-b pb-2">
    <h1 className="text-2xl font-semibold tracking-tight">Links</h1>
    <p className="text-sm text-muted-foreground">
      Overview of all your created links with performance insights.
    </p>
  </div>
  <div className="flex flex-row gap-2">
    <ListLink  />
    <div className="flex-1 bg-accent"></div>
  </div>
</div>


  )
}

export default Link