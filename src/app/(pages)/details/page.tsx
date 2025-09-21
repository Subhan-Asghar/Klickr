"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import Num_Card from '@/components/details/Num_Card'
const Details = () => {
    const param=useSearchParams()
    const id=param.get("id")
    const {data,isLoading}=useQuery({
        queryKey:["details",id],
        queryFn:async()=>{
            const res= await axios.get(`/api/click/${id}`)
            return res
        }
    })
    console.log(data)
      if(isLoading){
        return <>
        <div className="flex justify-center items-center h-[90vh] mt-1 rounded-lg border shadow-lg bg-background">
        <Spinner variant="circle"></Spinner>
        </div>
        </>
      }
  return (
    <div className="flex flex-col h-[90vh] bg-background mt-1 rounded-lg border shadow-lg overflow-hidden">
    <div className="flex flex-wrap justify-center gap-6 w-full p-4">
  <Num_Card title="Total Clicks" />
  <Num_Card title="Unique Visitors" />
  <Num_Card title="Top Countries" />
  <Num_Card title="Details" />
</div>
      <div>
        <h1>Name IS Subhan </h1>
      </div>
  </div>
  
  )
}

export default Details