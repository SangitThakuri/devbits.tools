export interface JwtParts {
  header: Record<string, unknown> | null
  payload: Record<string, unknown> | null
  signature: string
  error: string | null
}

export function decodeJwt(token: string): JwtParts {
  if (!token.trim()) {
    return { header: null, payload: null, signature: "", error: null }
  }

  const parts = token.split(".")
  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: "",
      error: "Invalid JWT format. Expected 3 dot-separated parts.",
    }
  }

  try {
    const header = JSON.parse(atob(parts[0]))
    const payload = JSON.parse(atob(parts[1]))
    const signature = parts[2]
    return { header, payload, signature, error: null }
  } catch {
    return {
      header: null,
      payload: null,
      signature: "",
      error: "Invalid JWT: could not decode base64 content. Ensure the token is well-formed.",
    }
  }
}

export function isSignatureValid(token: string): boolean {
  const parts = token.split(".")
  if (parts.length !== 3) return false
  return parts[2].length > 0
}
