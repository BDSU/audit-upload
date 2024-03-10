"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { createProject } from "@/app/(app)/je/_(components)/actions"

interface CreateProjectPopoverProps {
  auditId: number
}

export default function CreateProjectPopover({ auditId }: CreateProjectPopoverProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState<string>("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return createProject(name, auditId).then(() => {
      setOpen(false)
      setName("")
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>Projekt hinzufügen</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Button className="mt-3">Hinzufügen</Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
