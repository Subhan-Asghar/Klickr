import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"

export const useDetails=()=>{
    const param=useSearchParams()
        const id=param.get("id")
        const {data,isLoading,refetch}=useQuery({
            queryKey:["details",id],
            queryFn:async()=>{
                const res= await axios.get(`/api/click/${id}`)
                return res.data.data?? []
            },
            enabled: !!id
        })
        return{data,isLoading,refetch}
}