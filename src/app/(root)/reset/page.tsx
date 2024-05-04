import ForgotFormInternal from '@/components/forms/auth/forgotInternal.component';
import { auth } from '@/lib/auth/auth';
import React from 'react'

type Props = {}

export default async function ResetPasswordPage({}: Props) {
  const session = await auth();
  return (
    <div className='w-full flex justify-center'>
      <ForgotFormInternal session={session} didChangePass={session?.user.firstPasswordChange}/>
    </div>
  )
}