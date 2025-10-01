import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export const useDashboard=()=>{
    const {data,isLoading,refetch}=useQuery({
        queryKey:["dashboard"],
        queryFn:async ()=>{
            const res =await axios.get("/api/dashboard")
            return res.data
        }
    })
    return{data,isLoading,refetch}
}