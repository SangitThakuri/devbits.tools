import { useState, useCallback, useMemo } from "react"
import { transform } from "../../lib/codec"
import type { CodecMode, CodecType } from "../../lib/codec"
import type { CodecState } from "./types"

export function useCodec() {
  const [state, setState] = useState<CodecState>({
    input: "",
    output: "",
    type: "base64",
    mode: "encode",
  })

  const handleInputChange = useCallback((value: string) => {
    setState((prev) => ({ ...prev, input: value }))
  }, [])

  const setType = useCallback((type: CodecType) => {
    setState((prev) => ({ ...prev, type, output: prev.input ? transform(prev.input, type, prev.mode) : "" }))
  }, [])

  const setMode = useCallback((mode: CodecMode) => {
    setState((prev) => ({ ...prev, mode, output: prev.input ? transform(prev.input, prev.type, mode) : "" }))
  }, [])

  const output = useMemo(
    () => (state.input ? transform(state.input, state.type, state.mode) : ""),
    [state.input, state.type, state.mode],
  )

  return { state: { ...state, output }, handleInputChange, setType, setMode }
}
