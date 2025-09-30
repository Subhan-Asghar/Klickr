import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGraph=()=>{
    const params=useSearchParams()
    const id=params.get("id")
    const start=params.get("start")
    const end=params.get("end")
    const {data,isLoading,refetch}=useQuery({
        queryKey:["graph",start,end,id],
        queryFn:async ()=>{
            const res=await axios.post(`/api/click/${id}/graph`,{
                start:start,
                 end:end
            })
            return res.data
        },
        enabled: !!id
    })
    return {data,isLoading,refetch,start,end}
}