import React from 'react'
import { useGraph } from '@/hooks/use-graph'
const Graph = () => {
  const data=useGraph()
  console.log(data)
  return (
    <div>Graph</div>
  )
}

export default Graph