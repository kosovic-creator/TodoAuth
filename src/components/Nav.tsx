/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from "next/link";
import { useSession } from "next-auth/react"; // Koristi useSession za autentifikaciju
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const Nav = () => {
    const { data: session, status } = useSession(); // Dohvata sesiju
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State za sidebar

    return (
        <header>
            <nav className="flex justify-between items-center w-full px-10 py-8 bg-black text-white">
                {/* Link ka /todo ako je korisnik prijavljen */}
                {session ? <Link href="/todo">Početna</Link> : null}
                <div className="flex gap-10">
                    {session ? (
                        <>
                            {/* Prikazuje email korisnika */}
                            <p className="p-1">Korisnik: {session.user?.email ?? "Unknown"}</p>
                            {/* Sidebar komponenta */}
                            <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} session={session} />
                        </>
                    ) : (
                            // Ako korisnik nije prijavljen, prikaži opciju za prijavu
                            // <Link href="/sign-in" className="p-1">
                            //     Prijavi se
                            // </Link>
                            null
                    )}
                </div>
            </nav>
            {/* Sidebar komponenta */}
            {session && <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} session={session} />}
        </header>
    );
};

export default Nav;
