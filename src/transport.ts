export type Transport = (
  input: string | URL,
  init?: RequestInit,
) => Promise<Response>

export class HttpStatusError extends Error {
  readonly status: number

  constructor(status: number) {
    super(`Directory request failed with HTTP ${status}`)
    this.name = "HttpStatusError"
    this.status = status
  }
}
