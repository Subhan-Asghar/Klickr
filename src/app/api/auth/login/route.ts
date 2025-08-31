import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (existingUser.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const dbUser = existingUser[0];

    const isMatch = await bcrypt.compare(password, dbUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: dbUser.id, email: dbUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );


    const res = NextResponse.json({
      success: true,
      userId: dbUser.id,
    });

    res.cookies.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", details: String(err) },
      { status: 500 }
    );
  }
}
