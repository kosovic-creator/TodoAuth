"use client";

import { signOut } from "next-auth/react";
import Link from "next/link"; // Import Link from next/link

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div >
      <Link href="/" onClick={(e) => { e.preventDefault(); handleSignOut(); }}>
        Odjavi se
      </Link>
    </div>
  );
};

export { SignOut };
