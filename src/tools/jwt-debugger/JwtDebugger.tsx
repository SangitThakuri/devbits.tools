import { Helmet } from "react-helmet-async"
import { useJwtDebugger } from "./useJwtDebugger"
import { JwtInput } from "./JwtInput"
import { JwtOutput } from "./JwtOutput"
import { ToolSeoSection } from "../../components/ui/ToolSeoSection"

export default function JwtDebugger() {
  const { state, decoded, setInput } = useJwtDebugger()

  const status = !state.input.trim()
    ? "idle"
    : decoded?.error
      ? "error"
      : decoded
        ? "success"
        : "idle"

  return (
    <div className="mx-auto max-w-4xl">
      <Helmet>
        <title>Secure Client-Side JWT Debugger &amp; Decoder | DevBits</title>
        <meta name="description" content="Decode JSON Web Tokens (JWT) safely. Inspect header, payload, and signature values completely client-side without sending sensitive data over the network." />
      </Helmet>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          JWT Debugger
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Decode and inspect JSON Web Tokens. All processing is done client-side.
        </p>
      </div>

      <div className="mb-6">
        <JwtInput value={state.input} status={status} onChange={setInput} />
      </div>

      <JwtOutput decoded={decoded} />

      <ToolSeoSection
        steps={[
          "Paste a JWT (the three Base64url segments separated by dots) into the input, or drag a .jwt / .txt file onto it.",
          "The header and payload are automatically decoded and displayed as formatted JSON with no button press required.",
          "The signature segment is shown for reference — verification is intentionally not supported to keep your secret keys safe.",
          "Use any Copy button to independently copy the header JSON, payload JSON, or raw signature string.",
        ]}
        faqs={[
          {
            q: "Is it safe to paste a real JWT here?",
            a: "All decoding runs in your browser with zero network requests. As a best practice, avoid pasting live production tokens into any online tool. Prefer test or already-expired tokens.",
          },
          {
            q: "Does this tool verify the JWT signature?",
            a: "No. Signature verification requires the signing secret or public key. Sharing that with a third-party tool would be a security risk, so this tool focuses on safe read-only inspection.",
          },
          {
            q: "What algorithms does JWT support?",
            a: "JWTs can be signed with HMAC (HS256, HS384, HS512), RSA (RS256, RS384, RS512), or ECDSA (ES256, ES384, ES512). The algorithm is declared in the 'alg' field of the decoded header.",
          },
          {
            q: "What does 'exp' mean in the JWT payload?",
            a: "The 'exp' claim is a Unix timestamp (seconds since Jan 1 1970 UTC) indicating when the token expires. Servers reject tokens presented after this time.",
          },
        ]}
      />
    </div>
  )
}
