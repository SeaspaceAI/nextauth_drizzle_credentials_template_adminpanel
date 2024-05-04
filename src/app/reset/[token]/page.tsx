import ResetForm from "@/components/forms/auth/reset.component";

export default function Reset({ params }: { params: { token: string }}) {

  const token = params.token

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ResetForm token={token} />
    </div>
  );
}