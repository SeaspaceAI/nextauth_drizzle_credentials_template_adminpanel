import LoginRegister from "@/components/forms/auth/loginregister.component";
import { cookies } from "next/headers";

export default async function loginPage({}: {}) {
  
  cookies();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-xl">
        <LoginRegister />
      </div>
    </div>
  );
}
