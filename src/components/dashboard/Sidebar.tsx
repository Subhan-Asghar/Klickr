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
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { useMutation } from "@tanstack/react-query";
  export function AppSidebar() {
    const router=useRouter()

    const {mutateAsync:CreateLink}=useMutation({
      mutationFn:({ title, redirect }: { title: string, redirect: string }) => {  
      return axios.post("/api/link", { title, redirect})
      }
      
    })

     
    const submit=async(title:string,link:string)=>{
      const data={
       title:title,
       redirect:link
      }
      const res=CreateLink(data)
      toast.promise(res, {
        loading: "Creating the link",
        success: "Link is Created",
        error: "Failed to create link"
      })
     await res
     }
    

   
    return (
      <Sidebar collapsible="icon" variant="floating">
          <SidebarHeader >
        <Button variant={"outline"}>
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