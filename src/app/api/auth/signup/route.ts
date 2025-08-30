import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    const mailValid = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.email, email));

    if (mailValid.length > 0) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const [newUser] = await db
      .insert(user)
      .values({ name, email, password: hashed })
      .returning({ id: user.id });


    const token = jwt.sign(
      { id: newUser.id, email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" } 
    );

    
    const res = NextResponse.json({ success: true, userId: newUser.id });
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
