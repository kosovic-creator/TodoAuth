/* eslint-disable @typescript-eslint/no-unused-vars */
import ReloadWindows from "@/components/Reload";
import { auth } from "@/lib/auth";

type Session = {
  user?: {
    email?: string;
    role?: string;
  };
};
import { redirect } from "next/navigation";
import Link from "next/link";
const Page = async () => {
  const session = (await auth()) as Session | null;
  // if (!session) {
  //   redirect("/sign-in");

  // }
  // if (session?.user?.role === "ADMIN") {
  //   console.log("User is an admin");
  // }
  // if (session) {
  //   redirect("/todo");
  // } else {
  //   redirect("/sign-in");
  // }

  return (
    <>
      <div>Korisnik je {session?.user?.email ?? "Unknown"}</div>
      <div className="text-center mt-8">
        <ReloadWindows />
      </div>
    </>
  );
};

export default Page;
