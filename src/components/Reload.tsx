'use client'
import React from 'react'


export default function ReloadWindows() {
  return (
    <div>
 <button onClick={() => window.location.reload()}>Osveži</button>
 {/* <button type='button' onMouseOver={() => window.location.reload()}>Osveži</button> */}

    </div>
  )
}
