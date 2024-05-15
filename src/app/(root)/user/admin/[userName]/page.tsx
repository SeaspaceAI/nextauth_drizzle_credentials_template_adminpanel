import AdminTabs from '@/components/admin/AdminTabs';
import { db } from '@/db/index';
import { groups, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import React from 'react'

type Props = {}

export default async function AdminPage({}: Props) {
  const usersArr = await db.select().from(users).leftJoin(groups, eq(users.groupId, groups.id))
  const usersbok = await db.query.users.findMany({
    with: {
      group: true
    }
  })
  const user = await db.query.users.findFirst({
    where: eq(users.id, usersArr[0].user.id),
    with: {
      group: true
    }
  })
  console.log("user: ", user)
  console.log("userbok: ", usersbok)
  console.log("usersArr: ", usersArr)
  const groupsArr = await db.select().from(groups)
  return (
    <div className='w-full'>
      <AdminTabs users={usersArr} groups={groupsArr} />
    </div>
  )
}