
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";

type Session = {
  user?: {
    email?: string;
    role?: string;
  };
};
import { redirect } from "next/navigation";
import TodoTable from "./todo/page";
// import TodoTable from "./todo/page";

const Page = async () => {
  const session = (await auth()) as Session | null;
  if (!session) {
    redirect("/sign-in");

  }
  if (session?.user?.role === "ADMIN") {
    console.log("User is an admin");
  }
  return (
    <>
      <TodoTable/>

      <SignOut />
    </>
  );
};

export default Page;
