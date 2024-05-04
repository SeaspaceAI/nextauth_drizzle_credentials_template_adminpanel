import { LoginButton, LogoutButton, ProfileButton } from "@/components/buttons/buttons.component";
import { UsernameComponent } from "@/components/user/username.component";
import { auth } from '@/lib/auth/auth';

export default async function Home() {

  const session = await auth();

  return (
    <div className="flex flex-col gap-4 items-center">
      <UsernameComponent session={session}/>
      <div className="flex gap-4">
        <LogoutButton />
        <ProfileButton name={session?.user?.name!} />
      </div>
    </div>
  );
}
