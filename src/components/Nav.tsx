

import Link from "next/link";
 import {  HomeIcon } from "lucide-react";
 import { SignOut } from "@/components/sign-out";
 import { auth } from "@/lib/auth";


const Nav = async () => {
    const session = (await auth()) ;
  return (
    <header  >
      <nav  className="flex justify-between items-center w-full px-10 py-4 bg-black text-white">
       <Link href="/"><HomeIcon/></Link>
      {/* {session ? <Link href="/todo">Podsjetnik</Link> : null}
        <div className="flex gap-10">
          {session?.user.role == "ADMIN" && (
            <Link href="/CreateUser">Dodaj Korisnika</Link>
          )} */}
          {session ? (
            <>
              <p className=" p-1">korisnik: {session.user?.name ?? "Unknown"}</p>
              <SignOut />
            </>
          ) : (
           <p className=" p-1">Niste prijavljeni</p>
          )}
      </nav>
    </header>
  );
};
export default Nav;
