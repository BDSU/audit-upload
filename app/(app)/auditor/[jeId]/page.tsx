import paths from "@/lib/paths"

import ChecklistEntry from "../_(components)/je-list-entry"
import Link from "next/link"
import prisma from "@/prisma"
import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WriteAudit from "./action"

interface Props{
    params : {
        auditId? : string
        jeId?    : string
    }
}

export default async function AuditSelectPage( {params : {jeId}} : Props) {
    let Audits = await prisma.audit.findMany({where : {jeId : Number(jeId!)}})
    let je = await prisma.je.findUnique({where : {id : Number(jeId!)}})

    let auditElements = []

    auditElements.push(
      <div>
        <form action={async (data: FormData) => {
          "use server"
          WriteAudit({jeId: Number(jeId), name: data.get("name") as string})}}>
          <Input id="auditName" type="string" name="name" tabIndex={0} className="mb-3" />
          <div className="flex justify-end">
            <Button >Audit hinzufügen</Button>
          </div>
        </form>
      </div>
    )

    for (const Audit of Audits) {
      auditElements.push(
        <Link href={paths.auditor.audit(Audit.id, Number(jeId!))}>
          <ChecklistEntry name={Audit.name} checked={false} />
        </Link>
      )
    }
    return <>
      <Heading>{je?.name ?? ""}</Heading>
      {auditElements}
    </>
}
