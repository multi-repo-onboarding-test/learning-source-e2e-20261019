import { HttpStatusError, type Transport } from "./transport.ts"

export interface Team {
  id: string
  name: string
}

export async function getTeam(
  baseUrl: string,
  id: string,
  transport: Transport = fetch,
): Promise<Team | undefined> {
  const response = await transport(
    new URL(`/teams/${encodeURIComponent(id)}`, baseUrl),
  )
  if (response.status === 404) return undefined
  if (!response.ok) throw new HttpStatusError(response.status)
  return await response.json() as Team
}
