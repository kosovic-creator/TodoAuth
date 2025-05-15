/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'
import { HomeIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button';
import { useGlobalContext } from '../context/GlobalContext';


export default function Home() {
const { user, setUser } = useGlobalContext();
  return (
    <div>


      {user}
    </div>
  )
}
