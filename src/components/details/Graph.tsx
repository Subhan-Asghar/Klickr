import React from 'react'
import { useState } from 'react'
import { BarChart, type BarChartEventProps } from "@/components/BarChart"

type Props={
  start:string | null,
  end:string | null,
  data:{date:string,total:string}[],
}
const Graph = ({start,end,data,}:Props) => {
  const [value, setValue] = useState<BarChartEventProps | null>(null)


  function getDateRange(start: string, end: string) {
    const dates: string[] = []
    const current = new Date(start)
    const last = new Date(end)
  
    while (current <= last) {
      const d = current.toISOString().split("T")[0]
      dates.push(d)
      current.setDate(current.getDate() + 1)
    }
  
    return dates
  }
  
  const fullDates = getDateRange(start!, end!)
  
  const lookup: Record<string, number> = {}
  data.forEach((item: { date: string; total: string }) => {
    lookup[item.date] = Number(item.total)
  })
  
  const chartData = fullDates.map((d) => {
    const dateObj = new Date(d) 
    return {
      date: dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // 👈 user's local tz
      }),
      "Total Clicks": lookup[d] ?? 0,
    }
  })

  return (
  <>
 
     <BarChart
        className="h-64 "
        data={chartData}
        index="date"
        categories={["Total Clicks"]}
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

