"use server"

import fs from "fs"
import path from "path"

export default async function loadMarkdown(markdownPath: string): Promise<string> {
  return fs.promises
    .readFile(path.join("config", "helpTexts", markdownPath))
    .then((data) => data.toString())
}
