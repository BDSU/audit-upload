"use server"

import fs from "fs"
import path from "path"
import { uploadFileForm } from "@/app/(app)/je/schema"
import prisma from "@/prisma"
import { File as PrismaFile } from "@prisma/client"
import { revalidatePath } from "next/cache"

function getFilePath(dbFile: PrismaFile) {
  return path.join("data", "files", dbFile.id.toString())
}

export default async function uploadFile(formData: FormData) {
  const unsafeData = Object.fromEntries(formData.entries())
  const { requirementId, file } = uploadFileForm.parse(unsafeData)

  const requirement = await prisma.requirement.findUnique({
    where: {
      id: requirementId,
    },
  })
  if (!requirement) throw new Error("Requirement not found")

  let dbFile = await prisma.file.create({
    data: {
      fileName: file.name,
      requirement: {
        connect: {
          id: requirementId,
        },
      },
    },
  })

  fs.writeFileSync(getFilePath(dbFile), Buffer.from(await file.arrayBuffer()))

  revalidatePath("/je")

  return { success: true }
}
