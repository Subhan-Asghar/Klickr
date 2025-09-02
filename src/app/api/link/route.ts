import { NextRequest, NextResponse } from "next/server";
import {db} from "@/db/db"
import {link} from "@/db/schema"
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest){
    try{
        const id=Number(req.headers.get("user-id"))
        const {title,redirect}=await req.json()
        await db.insert(link).values({
            title:title,
            redirect:redirect,
            user_id:id
        })
        return NextResponse.json({
            message:"Link Added",
            success:true
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