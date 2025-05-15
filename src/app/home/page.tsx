
'use client'
import { HomeIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button';
import { useGlobalContext } from '../context/GlobalContext';


export default function Home() {
const { user, setUser } = useGlobalContext();;
  return (
    <div>
      <Button onClick={()=>setUser('ana')}>Context</Button>
      <HomeIcon className="w-6 h-6 text-blue-500" />
      <h1 className="text-2xl font-bold">Dobrodošli na našu aplikaciju!</h1>
      {user}
    </div>
  )
}
