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
  import { MousePointerClick ,Plus,LayoutDashboard, Cable, FolderKanban, Link2  } from 'lucide-react';
  export function AppSidebar() {
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
                <SidebarMenuButton className="flex items-center gap-2">
                  <LayoutDashboard className="size-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2">
                  <Link2 className="size-4" />
                  <span>Links</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2">
                  <Plus className="size-4" />
                  <span>Create Link</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup >
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }