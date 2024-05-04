"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

interface ISlideButtonProps {
  type: "submit" | "reset" | "button";
  text: string;
  disabled: boolean;
}

interface ISocialButtonProps {
  id: string;
  text: string;
  csrfToken: string | undefined;
}

export const LoginButton = () => {
  return (
    <button onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register">
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = ({name}:{name:string}) => {
  return <Link href={`/user/${name}`}>Profile</Link>;
};

export const AuthButton: React.FunctionComponent<ISlideButtonProps> = (props) => {

  const { type, text, disabled } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className="relative w-full inline-flex items-center justify-center px-8 py-4 mt-4 overflow-hidden font-medium bg-blue-500 transition duration-300 ease-out border-2 rounded-md group"
    >
      {disabled ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          <span className="absolute flex items-center justify-center w-full h-full text-white">
            {text}
          </span>
        </>
      )}
    </button>
  );
};

export const SocialButton: React.FunctionComponent<ISocialButtonProps> = (props) => {
  
  const { id, text, csrfToken } = props;

  return (
    <form method="post" action={`/api/auth/signin/${id}`}>
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <button
        className="bg-red-500 mb-2 py-2 flex justify-center items-center gap-2 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
        type="button"
        onClick={() => signIn(id)}
      >
        <FaGoogle />
        {text}
      </button>
    </form>
  );
};

