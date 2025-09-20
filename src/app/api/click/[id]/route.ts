import { NextRequest, NextResponse} from "next/server";
import { db } from "@/db/db";
import { click } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";


export async function GET( req: NextRequest,
{ params }: { params: Promise<{ id: string }> }){
    try{
        const {id}= await params
        
        const clicks = await db
        .select()
        .from(click)
        .where(eq(click.link_id, id));
  
      const countryStats = await db
        .select({
          country: click.country,
          total: sql<number>`COUNT(*)`,
        })
        .from(click)
        .where(eq(click.link_id, id))
        .groupBy(click.country);
  
      const totalClicks = clicks.length;
  
      return NextResponse.json({
        success: true,
        data: {
          totalClicks,
          countryStats,
        },
      });
    }catch(err){
    
        return NextResponse.json({
            err:err,
            message:"Internal Server Error"
        },{status:500})
    }
    

}