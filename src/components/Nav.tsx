

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

            <nav className="flex items-center justify-between bg-gray-800 p-5">

                {session ? (
                    <>
                        <div className="text-white flex-auto">
                        <Link href="/admin/users" className="text-white text-lg font-bold">
                            <h1>Admin</h1>
                        </Link>
                        <div>
                        <Link href="/admin/users/add" className="p-4 pl-3">Add</Link>
                        </div>


                        </div>

                        <p className=" p-4 pl-3">Prijavili  ste se kao: {session.user?.name || "Unknown"}</p>
                        <div className="absolute right-0 p-4 text-white">
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
