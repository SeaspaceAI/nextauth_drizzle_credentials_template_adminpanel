import AdminTabs from '@/components/admin/AdminTabs';
import { db } from '@/db/index';
import { groups, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import React from 'react'

type Props = {}

export default async function AdminPage({}: Props) {
  const usersArr = await db.query.users.findMany({
    with: {
      group: true
    }
  })
  const groupsArr = await db.query.groups.findMany()
  return (
    <div className='w-full'>
      <AdminTabs users={usersArr} groups={groupsArr} />
    </div>
  )
}