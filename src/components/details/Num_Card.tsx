import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  title: string
}

const Num_Card = ({ title }: Props) => {
  return (
    <Card className=" w-64 h-48">
      <CardHeader>
        <CardTitle className="font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  )
}

export default Num_Card
