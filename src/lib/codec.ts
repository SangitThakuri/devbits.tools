export type CodecType = "base64" | "url"
export type CodecMode = "encode" | "decode"

export function transform(input: string, type: CodecType, mode: CodecMode): string {
  if (!input) return ""

  if (type === "base64") {
    try {
      return mode === "encode" ? btoa(input) : atob(input)
    } catch {
      return ""
    }
  }

  try {
    return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input)
  } catch {
    return ""
  }
}
