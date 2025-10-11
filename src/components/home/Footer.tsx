import React from "react";
import { House,Github,Linkedin,Twitter } from 'lucide-react';
import { Button } from "../ui/button";
import Link from "next/link";
 

const Footer = () => {
    const links = [
        {
          title: "Home",
          icon: (
            <House className="h-full w-full" />
          ),
          href: "#home",
        },
     
        {
          title: "Linkedin",
          icon: (
            <Linkedin className="h-full w-full" />
          ),
          href: "#",
        },
     
        {
          title: "Twitter",
          icon: (
            <Twitter className="h-full w-full" />
          ),
          href: "#",
        },
        {
          title: "GitHub",
          icon: (
            <Github className="h-full w-full" />
          ),
          href: "#",
        },
      ];
  return (
    <footer className="flex flex-col items-center justify-between w-full py-10 border-t ">
    <div className="text-center mb-10 px-4">
      <h4 className="text-xl font-semibold tracking-tight ">
        Empowering You to Take Control of Every Link
      </h4>
      <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
        A smarter way to manage, analyze, and optimize your links — built for creators, teams, and businesses that value data and control.
      </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-row justify-center items-center ">
        {    links.map((link,i)=>(
          <Link key={i} href={link.href}>
          <Button variant={"ghost"} size={"icon"} className="cursor-pointer " >
              {link.icon}
          </Button>
          </Link>
          
))}
    
      </div>
      <div className="mt-8 text-xs text-muted-foreground">
      © {new Date().getFullYear()} Klickr. All rights reserved.
    </div>
    </div>

   
  </footer>
    
  )
}

export default Footer