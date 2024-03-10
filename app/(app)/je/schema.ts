import { z } from "zod"

export const uploadFileForm = z.object({
  requirementId: z.coerce.number().int().positive(),
  file: z
    .instanceof(File, { message: "Bitte wähle eine PDF-Datei aus." })
    .refine((file) => ["application/pdf"].includes(file.type), "Bitte wähle eine PDF-Datei aus."),
})
export type UploadFileValues = z.infer<typeof uploadFileForm>
