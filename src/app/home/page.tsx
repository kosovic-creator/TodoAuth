
'use client'
import { HomeIcon } from 'lucide-react'
import React from 'react'
import { useUser } from "../context/UserContext";
import { Button } from '@/components/ui/button';


export default function Home() {
   const { user, setUser } = useUser();
  return (
    <div>
      <Button onClick={()=>setUser({ id: "1", name: "John Doe" })}>Context</Button>
      <HomeIcon className="w-6 h-6 text-blue-500" />
      <h1 className="text-2xl font-bold">Dobrodošli na našu aplikaciju!</h1>
      {user ? JSON.stringify(user) : "No user logged in"}
    </div>
  )
}
