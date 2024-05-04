import { NextResponse } from "next/server";
import { db } from "@/db";
import validator from "validator";
import bcrypt from "bcryptjs";
import { createActivationToken } from "@/lib/utils/tokens";
import sendMail from "@/lib/utils/sendMail";
import { activateTemplateEmail } from "@/emailTemplates/activate";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request){

  try {

    const req = await request.json()
    const { first_name, last_name, email, phone, password } = req;

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

    return NextResponse.json({ message: "Register success! Please activate your account to start."});
  
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message })
  }
}
