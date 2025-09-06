import { NextRequest, NextResponse} from "next/server";
import { db } from "@/db/db";
import { click } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET( req: NextRequest,
{ params }: { params: Promise<{ id: string }> }){
    try{
        const {id}= await params
    const data=await db.select().from(click).where(eq(click.link_id,id))
    return NextResponse.json({
        success:true,
        data:data
    },{status:200})

    }catch(err){
        console.log(err)
        return NextResponse.json({
            err:err,
            message:"Internal Server Error"
        },{status:500})
    }
    

}