import { NextResponse,NextRequest } from "next/server";
import { db } from "@/db/db";
import {link,click} from "@/db/schema"
import { eq } from "drizzle-orm";
import axios from "axios";
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }) 
    {
    const {id}= await params
    const result = await db
    .select({ redirect: link.redirect,
      active:link.is_active
     })
    .from(link)
    .where(eq(link.id, id));

  if (result.length === 0 || !result[0].active) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
    
  // GEt the ip address
  const ip =
  req.headers.get("x-vercel-forwarded-for") || 
  req.headers.get("x-forwarded-for")?.split(",")[0] ||
  "Unknown";

  // Fetch details
  const res=await axios.get(`http://ip-api.com/json/${ip}`)
  const data=res.data

  // Database insert
  if(ip!="unknown" && ip!="::1"){
    await db.insert(click).values({
      link_id:id,
      ip:ip,
      country:data.country,
      lat:data.lat,
      lon:data.lon
    })
  
  }

  const url = result[0].redirect;
  return NextResponse.redirect(url);
}