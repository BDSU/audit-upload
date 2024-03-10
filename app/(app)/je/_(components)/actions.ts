"use server"

import prisma from "@/prisma"
import { revalidatePath } from "next/cache"
import paths from "@/lib/paths"

export const createProject = async (name: string, auditId: number) => {
  return prisma.requirement
    .create({
      data: {
        auditId,
        fileGroup: "projects",
        instance: name,
        fileTitle: "",
      },
    })
    .then((data) => {
      revalidatePath(paths.je)
      return data
    })
}

export const createAssociate = async (name: string, auditId: number) => {
  return prisma.requirement
    .create({
      data: {
        auditId,
        fileGroup: "associates",
        instance: name,
        fileTitle: "",
      },
    })
    .then((data) => {
      revalidatePath(paths.je)
      return data
    })
}
