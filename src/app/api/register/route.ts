import { NextResponse } from "next/server";
import { db } from "@/db";
import validator from "validator";
import bcrypt from "bcryptjs";
import { createActivationToken } from "@/lib/utils/tokens";
import sendMail from "@/lib/utils/sendMail";
import { activateTemplateEmail } from "@/emailTemplates/activate";
import { users } from "@/db/schema";
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
    const { first_name, last_name, email, phone, password, role, group } = req;

    if (!first_name || !last_name || !email  || !password) {
      return NextResponse.json({ message: "Please fill in all fields." }, {status: 400});
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({ message: "Please Add a valid email address." }, {status: 400});
    }

    const user = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .then(res => res[0] ?? null)

    if (user) {
      return NextResponse.json({ message: "This email address already exists." }, {status: 400});
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be atleast 6 characters." }, {status: 400});
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    
    const newuser  = await db
      .insert(users)
      .values({
        name: `${first_name + " " + last_name}`,
        email: email,
        password: cryptedPassword,
        phone: phone,
        role: role,
        groupId: group
      }).returning().then((res) => res[0] ?? null);
    
    const activation_token = createActivationToken({
      id: newuser.id.toString(),
    });
    
    const url = `${process.env.NEXTAUTH_URL}/activate/${activation_token}`;

    await sendMail(
      newuser.email as string,
      newuser.name,
      "",
      url,
      "Activate your account",
      activateTemplateEmail
    );

    return NextResponse.json({ message: "Register success! Email has been sent."});
  
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message })
  }
}
