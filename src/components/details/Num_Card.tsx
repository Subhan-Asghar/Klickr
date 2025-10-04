import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NumberTicker } from '../ui/number-ticker'
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
        <NumberTicker className="text-6xl font-extrabold tracking-tight "
        value={num}
        />
      
    
      </CardContent>
    </Card>
  )
}

export default Num_Card
