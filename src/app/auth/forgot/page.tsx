import ForgotForm from "@/components/forms/auth/forgot.component";
import { auth } from "@/lib/auth/auth";

export default async function forgotPage() {
  const session = await auth();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-xl">
        <ForgotForm session={session} />
      </div>
    </div>
  );
}