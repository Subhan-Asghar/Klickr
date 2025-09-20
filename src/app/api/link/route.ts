import { NextRequest, NextResponse } from "next/server";
import {db} from "@/db/db"
import {link} from "@/db/schema"
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest){
    try{
        const id=Number(req.headers.get("user-id"))
        const {title,redirect,active}=await req.json()
        const [result]=await db.insert(link).values({
            title:title,
            redirect:redirect,
            user_id:id,
            is_active:active
        }).returning({id:link.id})
        return NextResponse.json({
            message:"Link created successfully!",
            success:true,
            link:process.env.NEXT_PUBLIC_APP_URL+`api/v/${result.id}`
        })

    }
    catch{
        return NextResponse.json({
            message:"Internal Server Error",
            success:false
        })
    }
   
}

export async function GET(req:NextRequest){
    try{
        const id=Number(req.headers.get("user-id"))
        const data=await db.select().from(link).where(eq(link.user_id,id))
        return NextResponse.json({
            data:data,
            success:true,
        })
    }
    catch{
        return NextResponse.json({
            message:"Internal Server Error",
            success:false
        })
    }
   
}

export async function DELETE(req:NextRequest){
    try{
        const {id}=await req.json()
        await db.delete(link).where(eq(link.id,id))
    
        return NextResponse.json({
            message:"Link Deleted",
            success:true
        })
    }
    catch{
        
            return NextResponse.json({
                message:"Internal Server Error",
                success:false
            },{status:500})
    }
   
}



export async function PUT(req:NextRequest){
    try{
        // const id=Number(req.headers.get("user-id"))
        const {title,redirect,active,id}=await req.json()
        const [result]=await db.update(link).set({
            title:title,
            redirect:redirect,
            is_active:active
        }).where(eq(link.id,id)).returning({id:link.id})
        return NextResponse.json({
            message:"Link Updated successfully!",
            success:true,
            link:process.env.NEXT_PUBLIC_APP_URL+`api/v/${result.id}`
        })

    }
    catch{
        return NextResponse.json({
            message:"Internal Server Error",
            success:false
        },{status:500})
    }
   
}