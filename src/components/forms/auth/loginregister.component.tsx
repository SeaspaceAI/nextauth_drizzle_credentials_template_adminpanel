"use client"
import React, { useEffect } from 'react'
import RegisterForm from './register.component'
import LoginForm from './login.component'
import { useState } from 'react'
import { SocialButton } from "@/components/buttons/buttons.component";
import { getCsrfToken, getProviders } from 'next-auth/react'

export default function LoginRegister() {

  const callbackUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL
  const [ show, setShow ] = useState<boolean>(true)

  const [csrfToken, setCsrfToken] = useState("");
  const [providers, setProviders] = useState<any>();
  const [providerObject, setProviderObject] = useState<any>();


  useEffect(() => {
    getCsrfToken().then(setCsrfToken);
    getProviders().then(setProviders).then((res) => {
      if(res != null){
        setProviderObject(Object.values(providers!))
      }
    });
  }, []);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        {show ? "Sign in" : "Sign up"}
      </h2>

      <p className="text-center text-sm text-gray-600 mt-2">
        {show ? "You do not have an account?" : "You already have an account?"}&nbsp;
        <button onClick={() => setShow(!show)} className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">{show ? "Sign up" : "Sign in"}</button>
      </p>

      {show ? (
          <LoginForm callbackUrl={callbackUrl} csrfToken={csrfToken} />
        ) : (
          <RegisterForm />
      )}

      {providerObject && (
        <>
          <div className="w-full flex items-center justify-between px-12">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
            <div className="w-full h-[1px] bg-gray-300"></div>
          </div>

          <div className="mt-3 w-full px-12">
            {providerObject.map((provider: any) => {
              if (provider.type != "credentials"){
                return (
                  <SocialButton
                    key={provider.id}
                    id={provider.id}
                    text={
                      show
                        ? `Sign in with ${provider.name}`
                        : `Sign up with ${provider.name}`
                    }
                    csrfToken={csrfToken}
                  />
                );
              };
            })}
          </div>
        </>
      )}
    </div>
  )
}