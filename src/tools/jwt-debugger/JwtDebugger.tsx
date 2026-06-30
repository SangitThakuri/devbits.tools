import { useJwtDebugger } from "./useJwtDebugger"
import { JwtInput } from "./JwtInput"
import { JwtOutput } from "./JwtOutput"

export default function JwtDebugger() {
  const { state, decoded, setInput } = useJwtDebugger()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          JWT Debugger
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Decode and inspect JSON Web Tokens. All processing is done client-side.
        </p>
      </div>

      <div className="mb-6">
        <JwtInput value={state.input} onChange={setInput} />
      </div>

      <JwtOutput decoded={decoded} />
    </div>
  )
}
