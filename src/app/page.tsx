/* eslint-disable @typescript-eslint/no-unused-vars */
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
      {/* <TodoTable /> */}
    </>
  );
};

export default Page;
