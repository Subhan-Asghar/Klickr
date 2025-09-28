import { NextRequest,NextResponse } from "next/server";
import { db } from "@/db/db";
import { click } from "@/db/schema";
import { sql ,eq,and,gte,lte} from "drizzle-orm";

export async function POST(req:NextRequest,
    { params }: { params: Promise<{ id: string }> }){
    try{
        const {id}=await params
        const {start,end}=await req.json()
        // const user_id=Number(req.headers.get("user-id"))
        const result = await db.select({
            date:sql`DATE(${click.time})`,
            total:sql<number>`COUNT(*)`
        }).from(click).where(and(eq(click.link_id,id),
        gte(click.time, new Date(start)),  
        lte(click.time, new Date(end))   
    ))
        .groupBy(sql`DATE(${click.time})`)
        .orderBy(sql`DATE(${click.time})`);
        return NextResponse.json({
            result
        })
    }
    catch{
        return NextResponse.json({
            message:"Internal Server Error"
        },{status:500})
    }
   
    
}