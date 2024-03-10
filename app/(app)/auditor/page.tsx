import ChecklistEntry from "@/app/(app)/auditor/_(components)/je-list-entry";
import paths from "@/lib/paths";
import prisma from "@/prisma";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default async function AuditorPage() {
  let jes = await prisma.je.findMany()

  let jeElements = []

  for (const je of jes) {
    jeElements.push(
      <Link href={paths.auditor.je(je.id)}>
        <ChecklistEntry name={je.name} checked={false} />
      </Link>
    )
  }
  return jeElements
}
