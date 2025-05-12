

import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import Link from "next/link";
type Session = {
    user?: {
        email?: string;
        name?: string;
        role?: string;
    };
};

export default async function Nav() {
    const session = (await auth()) as Session | null;
    return (
        <>
            <header className="flex   bg-black text-white">

                {session ? (
                    <>
                    <Link href="/admin/users" className="p-4 pl-3">Korisnici</Link>
                    <Link href="/admin/users/add" className="p-4 pl-3">Add</Link>
                        <p className=" p-4 pl-3">Prijavili  ste se kao: {session.user?.name || "Unknown"}</p>
                        <div className="absolute right-0 p-4">
                            <SignOut />
                        </div>
                    </>
                ) : (
                    null
                )}

            </header>
        </>
    )
}
