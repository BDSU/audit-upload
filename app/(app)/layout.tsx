import type { Metadata } from "next"
import { TooltipProvider } from "@/components/ui/tooltip"
import React, { ReactNode, Suspense } from "react"
import { Toaster } from "sonner"
import DarkModeSelector from "@/app/(app)/_(components)/dark-mode-selector"
import Navbar from "@/app/(app)/_(components)/navbar"
import Logo from "@/app/(app)/_(components)/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import paths from "@/lib/paths"
import ProfileMenu from "@/app/(app)/_(components)/profile-menu"

export const metadata: Metadata = {
  title: {
    default: "BDSU Audit",
    template: "%s | BDSU Audit",
  },
}

export default async function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Suspense>
        <Toaster duration={5000} />
        <DarkModeSelector />
      </Suspense>

      <header className="sticky top-0 left-0 w-full z-50 h-16 px-3 md:px-6 bg-gray-900 flex flex-row justify-between items-center text-white">
        <div className="flex items-center">
          <Link href="/">
            <Logo className="h-10 mr-4" />
          </Link>
          <Button variant="link" asChild className="text-white font-semibold text-xl">
            <Link href={paths.home}>Audit Upload</Link>
          </Button>
          <Navbar />
        </div>

        <ProfileMenu />
      </header>

      <main className="p-2 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Suspense>
            <TooltipProvider>{children}</TooltipProvider>
          </Suspense>
        </div>
      </main>
    </>
  )
}
