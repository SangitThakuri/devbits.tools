import type { CodecMode, CodecType } from "../../lib/codec"

export interface CodecState {
  input: string
  output: string
  type: CodecType
  mode: CodecMode
}
