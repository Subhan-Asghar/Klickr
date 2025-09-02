"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Home() {
  const router=useRouter()
  const get=async()=>{
    const res=await axios.get("/api/link")
    console.log(res.data)
  }
  return (
  <>
  Home page
  <Button variant={"outline"} 
  onClick={()=>router.push("/dashboard")}
  >Dashboard</Button>
  <Button onClick={get} variant={"default"}>Link</Button>
  </>
  );
}
