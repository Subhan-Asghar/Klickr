import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
export const useFetch=()=>{
    const [id,setId]=useState<string>("")
    const func=async()=>{
        console.log(id)
        const res=await axios.get(`/api/click/${id}`)
        return res.data
    }
    const{data,isLoading,refetch}=useQuery({
        queryKey:["click",id],
        queryFn:func,
        enabled:!!id
    })
    return {data,isLoading,refetch,setId}
}