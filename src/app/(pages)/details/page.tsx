"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import Num_Card from '@/components/details/Num_Card'
import Country_Card from '@/components/details/Country_Card'
import Detail_Card from '@/components/details/Detail_Card'
import { useDetails } from '@/hooks/useDetails'
const Details = () => {
    const {data,isLoading}=useDetails()
    console.log(data)
      if(isLoading){
        return <>
        <div className="flex justify-center items-center h-full rounded-lg border shadow-lg bg-background">
        <Spinner variant="circle"></Spinner>
        </div>
        </>
      }
  return (
    <div className="flex flex-col h-full  bg-background  rounded-lg border shadow-lg overflow-y-auto">
    <div className="flex justify-center flex-wrap gap-6 w-full p-4">
  <Num_Card title="Total Clicks" num={data.totalClicks}/>
  <Num_Card title="Unique Visitors" num={data.uniqueCount} />
  <Country_Card title='Countries' data={data.countryStats}/>
<Detail_Card title='Details' data={data.info}/>
</div>
      <div>
        <h1>Name IS Subhan </h1>
      </div>
  </div>
  
  )
}

export default Details