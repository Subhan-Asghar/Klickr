import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useLinkList=()=>{
    const func=async()=>{
        const res=await axios.get("/api/link")
        return res.data.data
      }
      const {data,isLoading,refetch}=useQuery({
        queryKey:["getlist"],
        queryFn:func
      })

      return {data,isLoading,refetch}
}