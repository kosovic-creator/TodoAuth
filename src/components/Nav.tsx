

import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";


const Nav = async () => {
    const session = (await auth());
    return (
        <header>
            <nav className="flex justify-between items-center w-full px-10 py-4 bg-black text-white">
                <Link href="/"><HomeIcon /></Link>
                {session ? <Link href="/todo">Podsjetnik</Link> : null}
                <div className="flex gap-10">
                    {session ? (
                        <>
                            <p className=" p-1">korisnik: {session.user?.email ?? "Unknown"}</p>

                            {session?.user?.role == "ADMIN" && (
                                <Link href="/admin/users">Admin</Link>
                            )}
                            <SignOut />
                        </>
                    ) : (
                        <p className=" p-1">Niste prijavljeni</p>
                    )}
                </div>
            </nav>
        </header>

    );
}
export default Nav;
