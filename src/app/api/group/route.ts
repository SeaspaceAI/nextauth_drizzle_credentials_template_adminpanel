import { NextResponse } from "next/server";
import { db } from "@/db";
import { groups } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

export async function POST(request: Request){
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({message: "You are not logged in"}, {status:401});
    }
    
    if (session.user.role != "admin") {
      return NextResponse.json({message: "Something went wrong"}, {status:401});
    }

    const req = await request.json()
    const { group_name } = req;

    if (!group_name) {
      return NextResponse.json({ message: "Please fill in all fields." }, {status: 400});
    }

    const group = await db.select()
      .from(groups)
      .where(eq(groups.group_name, group_name))
      .then(res => res[0] ?? null)

    if (group) {
      return NextResponse.json({ message: "This group already exists." }, {status: 400});
    }
    
    await db
      .insert(groups)
      .values({
        group_name: group_name,
      })
      .returning()
      .then((res) => res[0] ?? null);

    return NextResponse.json({ message: "New group successfully added"});
  
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message })
  }
}
