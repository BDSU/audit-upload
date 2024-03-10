import { LucideDownload } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTriggerButton } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { File as PrismaFile } from "@prisma/client"

export function FileButton(props: { file: PrismaFile, title: string}) {
  return <Button asChild className="mb-2">
    <Link href={`/api/file/${props.file.id}`} target="_blank">{props.title}<LucideDownload className="ml-2" /></Link>
  </Button>
}

interface FileTileProps {
  title: string,
  children: React.ReactNode
}

export default function FileTile({ title, children }: FileTileProps) {
  return <Collapsible className="shadow">
    <CollapsibleTriggerButton variant="chevron">
      <span className="m-2">{title}</span>
    </CollapsibleTriggerButton>
    <CollapsibleContent>
      <div className="flex justify-end px-2">
        {children}
      </div>

    </CollapsibleContent>
  </Collapsible>
}
