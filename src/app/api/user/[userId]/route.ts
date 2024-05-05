import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

export async function PUT(req: Request, {params}:{params:{userId:string}}){
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({message: "You are not logged in"}, {status:401});
    }
    
    const body = await req.json()
    const { name, email, role, phone, group } = body;

    console.log(body)

    if(!name){
      return NextResponse.json({message: "Missing required fields!"}, {status:400})
    }

    console.log("params.userId: ", params.userId)

    try {
      await db
        .update(users)
        .set({
          name: name,
          email: email,
          role: role, 
          phone: phone,
          groupId: group
        })
        .where(eq(users.id, params.userId))
    } catch (error) {
      console.log(error)
    }

    return NextResponse.json({message: "User successfully updated"}, {status:200})

  } catch (error) {
    return NextResponse.json({message: "Internal error"}, {status: 500})
  }
}

export async function DELETE(req: Request, {params}:{params:{userId:string}}){
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({message: "You are not logged in"}, {status:401});
    }

    if (session.user.role != "admin") {
      return NextResponse.json({message: "Something went wrong"}, {status:401});
    }


    await db
      .delete(users)
      .where(eq(users.id, params.userId));

    return NextResponse.json({message: "User successfully deleted"}, {status:200})

  } catch (error) {
    return NextResponse.json({message: "Internal error"}, {status: 500})
  }
}
