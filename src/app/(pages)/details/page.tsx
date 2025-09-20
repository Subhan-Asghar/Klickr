"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
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
    <div>Details</div>
  )
}

export default Details