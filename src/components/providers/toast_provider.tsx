"use client";

import { Toaster } from "react-hot-toast";

type Props = {
  children?: React.ReactNode;
};

export const ToastProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 6000,
          },
        }}
      />
    </>
  )
}