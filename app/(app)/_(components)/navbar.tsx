"use client"

import paths from "@/lib/paths"
import Link from "next/link"
import { usePathname } from "next/navigation"

const route = (path: string, href: string) => ({
  href,
  "aria-current": path === href ? ("page" as const) : undefined,
})

export default function Navbar() {
  const path = usePathname()

  return (
    <nav className="flex items-center space-x-4">
      <Link
        className="text-sm font-medium transition-colors text-muted-foreground aria-page:text-primary hover:text-primary"
        {...route(path, paths.auditor.home)}
      >
        JE Übersicht
      </Link>
      <Link
        className="text-sm font-medium transition-colors text-muted-foreground aria-page:text-primary hover:text-primary"
        {...route(path, paths.je)}
      >
        QM Upload
      </Link>
    </nav>
  )
}
