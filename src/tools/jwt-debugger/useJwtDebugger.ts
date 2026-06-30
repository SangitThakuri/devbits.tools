import { useState, useMemo } from "react"
import { decodeJwt } from "../../lib/jwt"
import type { JwtDebuggerState } from "./types"

export function useJwtDebugger() {
  const [state, setState] = useState<JwtDebuggerState>({
    input: "",
    decoded: null,
  })

  const decoded = useMemo(
    () => (state.input.trim() ? decodeJwt(state.input.trim()) : null),
    [state.input],
  )

  return {
    state,
    decoded,
    setInput: (value: string) => setState({ input: value, decoded: null }),
  }
}
