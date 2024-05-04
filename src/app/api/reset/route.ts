import { db } from "@/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const { RESET_TOKEN_SECRET } = process.env;

interface UserToken {
  id: string;
}

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const { token, password } = req;

    const userToken = jwt.verify(token, RESET_TOKEN_SECRET!) as UserToken;

    const userDb = await db.select()
      .from(users)
      .where(eq(users.id, userToken.id))
      .then(res => res[0] ?? null)

    if (!userDb) {
      return NextResponse.json({ message: "This account no longer exist." }, { status: 400 });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    await db
      .update(users)
      .set({password:cryptedPassword})
      .where(eq(users.id, userToken.id))

    return NextResponse.json({message: "Your account password has been successfully updated." }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
