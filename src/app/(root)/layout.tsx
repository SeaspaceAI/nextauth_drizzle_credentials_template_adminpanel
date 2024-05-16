import { auth } from '@/lib/auth/auth'
import { redirect } from 'next/navigation';
import React from 'react'
import { ReactNode } from 'react'
import Link from 'next/link';

export default async function Layout({children}: {children:ReactNode}) {
  const session = await auth();
  if(!session){
    redirect("/auth")
  }  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-5 sm:p-16 lg:p-24 bg-[#eeeeee]">
      <Link href={'/'} className='fixed top-6 left-0 px-4 py-2 mx-6 bg-slate-800 rounded-xl text-white'>Home</Link>
      {children}
    </main>
  )
}