import { ReadableOptions } from "stream"
import fs from "fs"
import { NextResponse } from "next/server"

/**
 * Return a stream from the disk
 * @param {string} path - The location of the file
 * @param {ReadableOptions} options - The streamable options for the stream (ie how big are the chunks, start, end, etc).
 * @returns {ReadableStream} A readable stream of the file
 */
export function streamFile(path: string, options?: ReadableOptions): ReadableStream<Uint8Array> {
  const fileStream = fs.createReadStream(path, options)

  return new ReadableStream({
    start(controller) {
      fileStream.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)))
      fileStream.on("end", () => controller.close())
      fileStream.on("error", (error: NodeJS.ErrnoException) => controller.error(error))
    },
    cancel() {
      fileStream.destroy()
    },
  })
}

export function fileAsResponse(
  path: string,
  contentType: string = "application/pdf",
  additionalHeaders?: HeadersInit
) {
  try {
    const stat = fs.statSync(path)
    const file = streamFile(path)

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        ...additionalHeaders,
      },
    })
  } catch (e: any) {
    console.error(e)
    if (e.code === "ENOENT") return new NextResponse(null, { status: 404 })
    return new NextResponse(null, { status: 500 })
  }
}

export function getFileExtension(filename: string) {
  const match = /\.([^.]+)$/.exec(filename)
  if (!match) return ""
  return match[1]
}
