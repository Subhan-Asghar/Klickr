"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import { Button } from "../ui/button";
  import { MousePointerClick ,Plus,LayoutDashboard, Link2  } from 'lucide-react';
  import { LinkDialog } from "./Link-Dialog";
  import { toast } from "sonner";
  import axios from "axios";
  import { useRouter } from "next/navigation";
  import { useMutation } from "@tanstack/react-query";
import { useLinkList } from "@/hooks/useLinkList";
  export function AppSidebar() {
    const router=useRouter()
    const {refetch}=useLinkList()
    const {mutateAsync:CreateLink}=useMutation({
      mutationFn:async({ title, redirect,active }: { title: string, redirect: string ,active:boolean}) => {  
      const res=await axios.post("/api/link", { title, redirect,active})
      return res.data
      }
      
    })

     
    const submit=async(title:string,link:string,active:boolean)=>{
      const data={
       title:title,
       redirect:link,
       active:active
      }
      const res=CreateLink(data)
      toast.promise(res, {
        loading: "Creating the link...",
        success: "Link created!",
        error: "Failed to create link"
      })
     const result=await res
     return result.link
     }
    

   
    return (
      <Sidebar collapsible="icon" variant="floating">
          <SidebarHeader >
        <Button variant={"outline"} onClick={()=>router.push("/")}>
        <MousePointerClick className="size-5"/>
          <span className=" font-semibold group-data-[collapsible=icon]:hidden">
            Klickr
          </span>
        </Button>
    
      </SidebarHeader>
        <SidebarContent>
          <SidebarGroup >
          <SidebarGroupContent>
          <SidebarMenu>
          <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 "
                onClick={()=>router.push("/dashboard")}
                >
                  <LayoutDashboard className="size-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                
                <SidebarMenuButton className="flex items-center gap-2"
                onClick={()=>router.push("/links")}
                >
                  <Link2 className="size-4" />
                  <span>Links</span>
                </SidebarMenuButton>
    
               
              </SidebarMenuItem>
              <SidebarMenuItem>
                <LinkDialog
                trigger={<SidebarMenuButton className="flex items-center gap-2">
                  <Plus className="size-4" />
                  <span>Create Link</span>
                </SidebarMenuButton>}
                button_text={"Create"}
                description="Create a new link that you can modify later"
                Dialog_title="Create Link"
                submit={submit}
                refetch={refetch}
                />
                
              </SidebarMenuItem>
          </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup >
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }