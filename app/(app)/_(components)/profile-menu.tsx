"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "@/components/ui/avatar"
import React from "react"
import { usePathname } from "next/navigation"

export default function ProfileMenu() {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          src=""
          name={pathname.endsWith("je") ? "Tom Rasch" : "Tim Neubert"}
          className="hover:ring-2 ring-muted-foreground transition"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Ausloggen</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
