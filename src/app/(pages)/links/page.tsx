"use client"
import React from 'react'
import ListLink from '@/components/link/ListLink'
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useLinkList } from "@/hooks/useLinkList";
import Details from '@/components/link/Details';
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
  <div className="flex flex-row gap-2">
    <ListLink  />
    <div className="flex-1 bg-accent">
      <Details></Details>
    </div>

  </div>
</div>


  )
}

export default Link