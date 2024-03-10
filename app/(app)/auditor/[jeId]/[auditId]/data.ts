import prisma from "@/prisma"
import { Prisma } from "@prisma/client"

export async function getAudit(id: number) {
  return prisma.audit.findUnique({ where: { id }, include: { requirements: {
    include: {
      files: true
    }
      }, je: true } })
}

export type AuditWithRequirementsAndFiles = NonNullable<Prisma.PromiseReturnType<typeof getAudit>>
export type RequirementWithFiles = AuditWithRequirementsAndFiles["requirements"][number]
