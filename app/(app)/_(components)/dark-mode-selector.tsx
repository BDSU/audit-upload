"use client"

import { useEffect } from "react"

export default function DarkModeSelector() {
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (prefersDark) document.documentElement.classList.add("dark")
  })

  return <></>
}
