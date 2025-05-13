/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { SignOut } from "@/components/sign-out";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react"; // OVO JE BITNO

import { useState } from "react";

const Nav = () => {
    const { data: session, status } = useSession(); // OVO JE BITNO
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <header>
            <nav className="flex justify-between items-center w-full px-10 py-4 bg-black text-white">
                {/* <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white focus:outline-none">
                    ☰
                </button> */}
                {session ? <Link href="/todo"></Link> : null}
                <div className="flex gap-10">
                    {session ? (
                        <>
                            <p className=" p-1">korisnik: {session.user?.email ?? "Unknown"}</p>
                            <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} session={session} />

                        </>
                    ) : (
                        // <p className=" p-1">Niste prijavljeni</p>
                        < Link href="/sign-in">
                                Prijavi se
                        </Link>
                    )}
                </div>
            </nav>
            {session && <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} session={session} />}
        </header>
    );
};

export default Nav;
