import React from 'react'
import Link from 'next/link'
import UpdateUserForm from '@/components/forms/user/updateuser.component';
import { auth } from '@/lib/auth/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';

type Props = {}

export default async function AccountPage({}: Props) {
  const session = await auth();
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, session?.user?.email!))
    .then((res:User[]) => res[0] ?? null)

  return (
    <div className='w-full max-w-xl flex flex-col gap-10'>
      <div>
        <div className='w-full border-b border-b-gray-500 mb-2'>
          <p className='text-xl font-bold'>Email</p>
        </div>
        <p>{user?.email}</p>
      </div>

      <div>
        <div className='w-full border-b border-b-gray-500 mb-2'>
          <p className='text-xl font-bold'>User name</p>
        </div>
        <UpdateUserForm user={user} />
      </div>


      {session?.user?.provider === "credentials" && (
        <div>
          <Link href="/reset" className="text-blue-600 underline">
            Reset password
          </Link>
        </div>
      )}
    </div>
  )
}
