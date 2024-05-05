import { NextResponse } from "next/server";
import { db } from "@/db";
import { groups, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

export async function PUT(req: Request, {params}:{params:{groupId:string}}){
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({message: "You are not logged in"}, {status:401});
    }

    if (session.user.role != "admin") {
      return NextResponse.json({message: "Something went wrong"}, {status:401});
    }
    
    const body = await req.json()
    const { group_name } = body;

    if(!group_name){
      return NextResponse.json({message: "Missing required fields!"}, {status:400})
    }

    await db
      .update(groups)
      .set({
        group_name: group_name,
      })
      .where(eq(groups.id, params.groupId))

    return NextResponse.json({message: "Group successfully updated"}, {status:200})

  } catch (error) {
    return NextResponse.json({message: "Internal error"}, {status: 500})
  }
}

export async function DELETE(req: Request, {params}:{params:{groupId:string}}){
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({message: "You are not logged in"}, {status:401});
    }

    if (session.user.role != "admin") {
      return NextResponse.json({message: "Something went wrong"}, {status:401});
    }

    try {
      await db
        .delete(groups)
        .where(eq(groups.id, params.groupId));

    } catch (error) {
      return NextResponse.json({message: "Delete users from the group before deleting the group"}, {status: 500})
    }

    return NextResponse.json({message: "Group successfully deleted"}, {status:200})

  } catch (error) {
    return NextResponse.json({message: "Internal error"}, {status: 500})
  }
}
