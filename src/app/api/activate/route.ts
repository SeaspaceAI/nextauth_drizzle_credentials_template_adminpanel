import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { db } from '@/db';
import jwt from "jsonwebtoken";
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const { ACTIVATION_TOKEN_SECRET } = process.env;

interface UserToken {
  id: string;
}

export async function PUT(request: NextRequest){
  try {
    const req = await request.json()
    const { token } = req;
    
    const userToken = jwt.verify(token, ACTIVATION_TOKEN_SECRET!) as UserToken;
      
    const userDb = await db.query.users.findFirst({
      where: eq(users.id, userToken.id)
    })
  
    if (!userDb) {
      return NextResponse.json({ message: "This account no longer exist." }, { status: 400 });
    }
  
    if(userDb.emailVerified){
      return NextResponse.json({ message: "Email address already verified." }, { status: 400 })
    }

    await db
      .update(users)
      .set({emailVerified: new Date()})
      .where(eq(users.id, userDb.id))
  
    return NextResponse.json({ message: "Your account has been successfully verified." }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 })
  }
}