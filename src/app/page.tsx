/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import ReloadWindows from "@/components/Reload";
import { useUser } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";

type Session = {
  user?: {
    email?: string;
    role?: string;
  };
};

const Page = () => {
  const [session, setSession] = useState<Session | null>(null);
 const { user, setUser } = useUser();
  useEffect(() => {
    // Simulacija poziva API-ja za autentifikaciju
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session"); // Pretpostavljeni API endpoint
        const data = await res.json();
        setSession(data);
      } catch (error) {
        console.error("Greška prilikom učitavanja sesije:", error);
        setSession(null);
      }
    };

    fetchSession();
  }, []);

  if (!session) {
    return <div>Učitavanje...</div>;
  }

  return (
    <>
      <div>Korisnik je {session.user?.email ?? "Unknown"}</div>
      <div className="text-center mt-8">
        <ReloadWindows />
      </div>
       <div>
      <Button onClick={()=>setUser({ id: "1", name: session.user?.email ?? "Unknown" })}>Context</Button>


      {user ? JSON.stringify(user) : "No user logged in"}
    </div>
    </>
  );
};

export default Page;
