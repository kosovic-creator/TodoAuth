"use client";

import { signOut } from "next-auth/react";
import Link from "next/link"; // Import Link from next/link
import { useRouter } from "next/navigation";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in'); // Redirect to the home page after signing out
  };
const router = useRouter();
  return (
    <div >
      <Link href="" onClick={(e) => { e.preventDefault(); handleSignOut(); }}>
        Odjavi se
      </Link>
    </div>
  );
};

export { SignOut };
