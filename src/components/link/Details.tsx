import React from 'react'
import { useFetch } from '@/hooks/useFetch'
const Details = () => {
    const {data}=useFetch()
    console.log(data, "The data is ")
  return (
    <div>{data}</div>
  )
}

export default Details