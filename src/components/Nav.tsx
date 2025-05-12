/* eslint-disable @typescript-eslint/no-unused-vars */


// import { SignOut } from "@/components/sign-out";
// import { auth } from "@/lib/auth";
// import Link from "next/link";
// type Session = {
//     user?: {
//         email?: string;
//         name?: string;
//         role?: string;
//     };
// };

// export default async function Nav() {
//     const session = (await auth()) as Session | null;
//     return (
//         <>
//             <nav className="flex items-center justify-between bg-black text-white p-5">
//                 {session ? (
//                     <div>
//                         <Link href="/admin/users" >
//                             <h1>Admin</h1>
//                         </Link>
//                         <Link href="/admin/users/add" >Add</Link>
//                         <p >Prijavili  ste se kao: {session.user?.name || "Unknown"}</p>
//                         <div >
//                             <SignOut />
//                         </div>
//                     </div>
//                 ) : (
//                     // <div>
//                     //     <Link href="/admin/users" >
//                     //         <h1>Admin</h1>
//                     //     </Link>
//                     //     <Link href="/admin/users/add" >Add</Link>
//                         <p >Niste prijavljeni</p>
//                     //     <Link href="/sign-in" >
//                     //         <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">Prijavi se</button>
//                     //     </Link>
//                     //     <Link href="/sign-up" >
//                     //         <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">Registruj se</button>
//                     //     </Link>
//                     //     <Link href="/sign-out" >
//                     //         <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">Odjavi se</button>
//                     //     </Link>

//                     // </div>
//                 )}
//             </nav>
//         </>
//     )
// }

// Removed unused import as it caused an error

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
