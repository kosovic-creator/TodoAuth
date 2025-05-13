'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignOut } from "@/components/sign-out";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

interface SidebarProps {
    session: { user?: { role?: string } }; // Adjust this type based on your session object structure
}
interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ session }) => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter(); // Next.js router

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const sidebar = document.getElementById("sidebar");
            if (sidebar && !sidebar.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <>
            {/* Toggle Button */}
            <button
                className="fixed top-4 left-4 z-50 bg-gray-700 text-white p-2 rounded"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? "" : "☰"}
            </button>

            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 transform ${
                    isVisible ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <div className="flex flex-col gap-4 pt-4">
                    <Link href="/" className="hover:underline p-4 ">
                        <h1 className="text-2xl font-bold"></h1>
                    </Link>
                    <Link
                        href="/todo"
                        className="hover:underline"
                        onClick={(e) => {
                            e.preventDefault(); // Sprečava defaultno ponašanje
                            router.push("/todo"); // Navigacija na /todo
                            router.refresh() // Osvježavanje stranice
                        }}
                    >
                        <h1 >Todo</h1>
                    </Link>
                    {session?.user?.role === "ADMIN" && (
                        <>
                            <Link href="/admin/users" className="hover:underline">
                                Admin
                            </Link>
                            <Link href="/admin/users/add" className="hover:underline">
                                Dodaj Korisnika
                            </Link>
                        </>
                    )}
                    <div className="flex gap-2">
                        <SignOut />
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;