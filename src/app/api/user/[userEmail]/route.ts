import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";


export async function POST(req: Request, {params}:{params:{userEmail:string}}){
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({message: "You are not logged in"}, {status:401});
    }
    
    const body = await req.json()
    const { name } = body.values;

    if(!name){
      return NextResponse.json({message: "Missing required fields!"}, {status:400})
    }

    await db
      .update(users)
      .set({
        name: name
      })
      .where(eq(users.email, params.userEmail))

    return NextResponse.json({message: "User name successfully updated"}, {status:200})

  } catch (error) {
    return NextResponse.json({message: "Internal error"}, {status: 500})
  }
}
