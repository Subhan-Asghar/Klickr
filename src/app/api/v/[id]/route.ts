import { NextResponse,NextRequest } from "next/server";
import { db } from "@/db/db";
import {link} from "@/db/schema"
import { eq } from "drizzle-orm";
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) 
    {
    const {id}= await params
    const result = await db
    .select({ redirect: link.redirect })
    .from(link)
    .where(eq(link.id, id));

  if (result.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let url = result[0].redirect;

    if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  console.log("Redirecting to:", url);
  return NextResponse.redirect(url);
}