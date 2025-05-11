'use client'

import { useSession } from "next-auth/react"

export default function MyComponent() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Učitavanje...</p>
  }

  if (!session) {
    return <p>Niste prijavljeni.</p>
  }

  return (
    <div>
      <p>Prijavljen korisnik: {session.user?.email}</p>
      {/* Ostali podaci iz session.user */}
    </div>
  )
}

