"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router=useRouter()
  return (
  <>
  Home page
  <Button variant={"outline"} 
  onClick={()=>router.push("/dashboard")}
  >Dashboard</Button>
  </>
  );
}
