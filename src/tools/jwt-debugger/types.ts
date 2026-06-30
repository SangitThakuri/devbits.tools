import type { JwtParts } from "../../lib/jwt"

export interface JwtDebuggerState {
  input: string
  decoded: JwtParts | null
}
