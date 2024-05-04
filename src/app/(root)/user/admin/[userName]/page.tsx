import AdminTabs from '@/components/admin/AdminTabs';
import { db } from '@/db';
import { groups, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import React from 'react'

type Props = {}

export default async function AdminPage({}: Props) {
  const usersArr = await db.select().from(users).leftJoin(groups, eq(users.groupId, groups.id))
  const groupsArr = await db.select().from(groups)
  return (
    <div className='w-full'>
      <AdminTabs users={usersArr} groups={groupsArr} />
    </div>
  )
}