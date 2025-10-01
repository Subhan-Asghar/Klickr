import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/db";
import { click, link } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const user_id = Number(req.headers.get("user-id"));

  const result = await db
    .select({
      total: sql<number>`Count(*)`,
      unique: sql<number>`COUNT(DISTINCT ${click.ip})`,
    })
    .from(link)
    .innerJoin(click, eq(link.id, click.link_id))
    .where(eq(link.user_id, user_id));

  const countryStats = await db
    .select({
      country: click.country,
      total: sql<number>`Count(*)`,
    })
    .from(link)
    .innerJoin(click, eq(link.id, click.link_id))
    .where(eq(link.user_id, user_id))
    .groupBy(click.country);

    const total_link=(await db.select().from(link).where(eq(link.user_id,user_id))).length
  return NextResponse.json({ result, countryStats,
    total_link
   });
}
