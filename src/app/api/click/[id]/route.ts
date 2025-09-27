import { NextRequest, NextResponse} from "next/server";
import { db } from "@/db/db";
import { click, link } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";


export async function GET( req: NextRequest,
{ params }: { params: Promise<{ id: string }> }){
    try{
        const {id}= await params
        const user_id=Number(req.headers.get("user-id"))
        const info =await db.select().from(link).where(eq(link.id,id))
        
        if(!info.length || info[0].user_id!= user_id){
          return NextResponse.redirect("/dashboard");
        }
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
        
      const uniqueCount = await db
  .select({
    count: sql<number>`COUNT(DISTINCT ${click.ip})`,
  })
  .from(click);

   

      return NextResponse.json({
        success: true,
        data: {
          totalClicks,
          countryStats,
          uniqueCount:uniqueCount[0].count,
          info:info[0]
        },
      });
    }catch(err){
    
        return NextResponse.json({
            err:err,
            message:"Internal Server Error"
        },{status:500})
    }
    

}