"use client"

import { LucideCheck, LucideDownload, LucideUpload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import uploadFile from "@/app/(app)/je/action"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import HelpText from "@/app/(app)/je/_(components)/help-text"

interface RequirementProps {
  name: string
  legalRef: string
  help: string
  checked?: boolean
  id?: number
}

export default function Requirement({
  name,
  legalRef,
  help,
  checked = false,
  id,
}: Readonly<RequirementProps>) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (formData: FormData) =>
    uploadFile(formData)
      .then(() => setOpen(false))
      .catch((error) =>
        toast.error("Beim Hochladen ist ein Fehler aufgetreten!", { description: error.toString() })
      )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between h-16 px-3 hover:bg-accent transition-colors cursor-pointer">
          <div className="flex items-center">
            {checked && (
              <div className="inline-flex p-1 rounded-full bg-green-500 text-white">
                <LucideCheck />
              </div>
            )}
            <span className="text-lg ml-3">{name}</span>
          </div>
          {checked ? <LucideDownload /> : <LucideUpload />}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{legalRef}</DialogDescription>
        </DialogHeader>

        <div className="max-h-[75vh] overflow-auto">
          <HelpText visible={open} path={help} />
        </div>

        <form action={handleSubmit}>
          <input type="hidden" name="requirementId" value={id} />
          <Input type="file" accept="application/pdf" name="file" tabIndex={0} />
          <DialogFooter className="mt-3">
            <Button>Hochladen</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
