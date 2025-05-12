

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
            <nav className="flex items-center justify-between bg-black text-white p-5">
                {session ? (
                    <>
                        <Link href="/admin/users" >
                            <h1>Admin</h1>
                        </Link>
                        <Link href="/admin/users/add" >Add</Link>
                        <p >Prijavili  ste se kao: {session.user?.name || "Unknown"}</p>
                        <div >
                            <SignOut />
                        </div>
                    </>
                ) : (
                    null
                )}
            </nav>
        </>
    )
}
