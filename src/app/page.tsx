import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";

type Session = {
  user?: {
    email?: string;
    role?: string;
  };
};
import { redirect } from "next/navigation";

const Page = async () => {
  const session = (await auth()) as Session | null;
  if (!session) {
    redirect("/sign-in");
    return null;
  }
  if (session?.user?.role === "ADMIN") {
    console.log( "User is an admin");
  }
  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium">{session.user?.email}</p>
      </div>

      <SignOut />
    </>
  );
};

export default Page;
