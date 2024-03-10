import { NextRequest } from "next/server"

export const CORS_ORIGIN = "*"

/*
  Preflight request
 */
export function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: new Headers({
      "Access-Control-Allow-Origin": CORS_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    }),
  })
}
