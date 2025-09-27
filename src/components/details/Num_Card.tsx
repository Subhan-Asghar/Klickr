import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  title: string,
  num:number
}

const Num_Card = ({ title,num}: Props) => {
  return (
    <Card className=" w-72 h-48">
      <CardHeader>
        <CardTitle className="font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className='h-full flex justify-center'>
        <div className="text-6xl font-extrabold tracking-tight ">
        {num}
        </div>
    
      </CardContent>
    </Card>
  )
}

export default Num_Card
