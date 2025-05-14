"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";


const SignOut = () => {


  const handleSignOut = async () => {
  try {
    await signOut({ callbackUrl: "/sign-in" }); // NextAuth će te automatski preusmjeriti
    // Nema potrebe za router.push
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

  return (
    <div>
      <Link
        href="/sign-in"
        onClick={(e) => {
          e.preventDefault();
          handleSignOut();
        }}
      >
        Odjavi se
      </Link>
    </div>
  );
};

export { SignOut };
