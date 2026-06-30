import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { CopyButton } from "../../components/ui/CopyButton"
import type { JwtParts } from "../../lib/jwt"

interface JwtOutputProps {
  decoded: JwtParts | null
}

function JsonBlock({ label, data }: { label: string; data: Record<string, unknown> }) {
  const formatted = JSON.stringify(data, null, 2)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <CopyButton text={formatted} />
      </div>
      <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
        <code>{formatted}</code>
      </pre>
    </div>
  )
}

export function JwtOutput({ decoded }: JwtOutputProps) {
  if (!decoded) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-200 p-8 dark:border-gray-700">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Paste a JWT above to decode
        </p>
      </div>
    )
  }

  if (decoded.error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <p className="font-medium text-sm text-red-700 dark:text-red-400">{decoded.error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <JsonBlock label="Header (Algorithm & Token Type)" data={decoded.header!} />

      <JsonBlock label="Payload (Data / Claims)" data={decoded.payload!} />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Signature
          </span>
          <CopyButton text={decoded.signature} />
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            {decoded.signature ? (
              <>
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                <span className="text-sm text-green-700 dark:text-green-400">
                  Signature present
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                <span className="text-sm text-red-700 dark:text-red-400">
                  Signature missing
                </span>
              </>
            )}
          </div>
          <p className="mt-2 break-all font-mono text-xs text-gray-500 dark:text-gray-400">
            {decoded.signature}
          </p>
        </div>
      </div>
    </div>
  )
}
