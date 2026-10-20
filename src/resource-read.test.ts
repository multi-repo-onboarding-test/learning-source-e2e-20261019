import assert from "node:assert/strict"
import test from "node:test"
import { getMember } from "./members.ts"
import { getTeam } from "./teams.ts"
import { HttpStatusError } from "./transport.ts"

for (const [name, read] of [["member", getMember], ["team", getTeam]] as const) {
  test(`${name} returns the resource`, async () => {
    const payload = { id: "42", name: "Engineering", displayName: "Alex" }
    assert.deepEqual(
      await read("https://directory.example", "42", async () => Response.json(payload)),
      payload,
    )
  })

  test(`${name} returns undefined for a missing resource`, async () => {
    assert.equal(
      await read("https://directory.example", "42", async () => new Response(null, { status: 404 })),
      undefined,
    )
  })

  for (const status of [401, 429, 503]) {
    test(`${name} preserves HTTP ${status} as a failure`, async () => {
      await assert.rejects(
        read("https://directory.example", "42", async () => new Response(null, { status })),
        error => error instanceof HttpStatusError && error.status === status,
      )
    })
  }
}
