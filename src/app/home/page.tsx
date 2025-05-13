import { HomeIcon } from 'lucide-react'
import React from 'react'

export default function Home() {
  return (
    <div>
      <HomeIcon className="w-6 h-6 text-blue-500" />
      <h1 className="text-2xl font-bold">Dobrodošli na našu aplikaciju!</h1>
    </div>
  )
}
