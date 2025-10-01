import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useDash_Graph=()=>{
    const params=useSearchParams()
    const start=params.get("start")
    const end=params.get("end")
    const {data,isLoading,refetch,isFetching}=useQuery({
        queryKey:["graph",start,end],
        queryFn:async ()=>{
            const res=await axios.post(`/api/dashboard`,{
                start:start,
                 end:end
            })
            return res.data
        },
    })
    return {data,isLoading,refetch,start,end,isFetching}
}