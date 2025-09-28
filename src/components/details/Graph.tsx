import React from 'react'
import { useGraph } from '@/hooks/use-graph'
import { useState } from 'react'
import { BarChart, type BarChartEventProps } from "@/components/BarChart"

const Graph = () => {
  const {data,start,end,isLoading}=useGraph()
  const [value, setValue] = useState<BarChartEventProps | null>(null)
    console.log(data)
    if(isLoading){
      return (<>
        Loading
      </>)
    }

    function getDateRange(start: string, end: string) {
      const dates: string[] = []
      const current = new Date(start)
      const last = new Date(end)
    
      while (current <= last) {
        dates.push(new Date(current).toISOString().split("T")[0]) // YYYY-MM-DD
        current.setDate(current.getDate() + 1)
      }
      return dates
    }
    
    const fullDates = getDateRange(start!, end!)
    
    const lookup: Record<string, number> = {}
    data.result.forEach((item: { date: string; total: string }) => {
      lookup[item.date] = Number(item.total)
    })
    
    const chartData = fullDates.map((d) => ({
      date: new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      "Page Views": lookup[d] ?? 0,
    }))

  return (
  <>
     <BarChart
        className="h-64 "
        data={chartData}
        index="date"
        categories={["Page Views"]}
        colors={["blue"]}
        valueFormatter={(num: number) =>
          Intl.NumberFormat("en-US").format(num)
        }
        onValueChange={(v) => setValue(v)}
        yAxisWidth={60}
      />

      {value && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          {value?.x}: {value?.y}
        </p>
      )}
     
      </>


  )
}

export default Graph

