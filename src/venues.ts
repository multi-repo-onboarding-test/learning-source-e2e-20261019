import type { Transport } from "./transport.ts"

export interface Venue {
  id: string
  name: string
}

export async function getVenue(
  baseUrl: string,
  id: string,
  transport: Transport = fetch,
): Promise<Venue | undefined> {
  const response = await transport(
    new URL(`/venues/${encodeURIComponent(id)}`, baseUrl),
  )
  if (!response.ok) return undefined
  return await response.json() as Venue
}
