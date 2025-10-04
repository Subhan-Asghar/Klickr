import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/db";
import { click, link } from "@/db/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";

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

  const total_link = (
    await db.select().from(link).where(eq(link.user_id, user_id))
  ).length;
  let average_click = 0;
  if (total_link) {
    average_click = Math.floor(result[0].total / total_link);
  }
  return NextResponse.json({ result, countryStats, total_link, average_click });
}

export async function POST(req: NextRequest) {
  try {
    const { start, end } = await req.json();
    const user_id = Number(req.headers.get("user-id"));
    const result = await db
      .select({
        date: sql`DATE(${click.time})`,
        total: sql<number>`COUNT(*)`,
      })
      .from(link)
      .innerJoin(click, eq(click.link_id, link.id))
      .where(
        and(
          eq(link.user_id, user_id),
          gte(click.time, new Date(start)),
          lte(click.time, new Date(end))
        )
      )
      .groupBy(sql`DATE(${click.time})`)
      .orderBy(sql`DATE(${click.time})`);
    return NextResponse.json({
      result,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
