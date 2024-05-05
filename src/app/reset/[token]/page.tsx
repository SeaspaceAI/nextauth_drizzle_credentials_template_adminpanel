import ResetForm from "@/components/forms/auth/reset.component";
import { auth } from "@/lib/auth/auth";

export default async function Reset({ params }: { params: { token: string }}) {
  const token = params.token
  const session = await auth();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ResetForm token={token} session={session} />
    </div>
  );
}