import { z } from "zod"

export const zodOptionalString = z
  .string()
  .trim()
  .transform((value) => value || null)
  .optional()

export const zodOptionalUrlString = z
  .string()
  .url()
  .optional()
  .or(
    z
      .string()
      .length(0)
      .transform((value) => value || null)
  )
