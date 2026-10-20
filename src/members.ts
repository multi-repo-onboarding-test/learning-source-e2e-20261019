import { HttpStatusError, type Transport } from "./transport.ts"

export interface Member {
  id: string
  displayName: string
}

export async function getMember(
  baseUrl: string,
  id: string,
  transport: Transport = fetch,
): Promise<Member | undefined> {
  const response = await transport(
    new URL(`/members/${encodeURIComponent(id)}`, baseUrl),
  )
  if (response.status === 404) return undefined
  if (!response.ok) throw new HttpStatusError(response.status)
  return await response.json() as Member
}
