import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { fileAsResponse } from "@/lib/file-utils"
import prisma from "@/prisma"

export async function GET(_: NextRequest, { params: { fileId } }: { params: { fileId: string } }) {
  if (!fileId || !/\d+/.exec(fileId))
    return NextResponse.json({ error: "file id is invalid" }, { status: 400 })

  const file = await prisma.file.findUnique({ where: { id: parseInt(fileId) } })
  if (!file) {
    return NextResponse.json({ error: "file not found" }, { status: 404 })
  }

  return fileAsResponse(path.join("data", "files", fileId), "application/pdf", { "Content-Disposition": `inline; filename=${file.fileName}` })
}
