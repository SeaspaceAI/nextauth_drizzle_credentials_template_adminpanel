"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

type Props = {
  session: Session | null;
}

export function UsernameComponent({session}: Props) {
  return (
    <>
      <p>{session?.user?.name!}</p>
      <p>{session?.user?.email}</p>
    </>
  )
}

export function UsernamesubstringComponent({session}: Props) {
  return (
    <>
      <p>{session?.user?.name?.substring(0, 20)}</p>
    </>
  )
}
