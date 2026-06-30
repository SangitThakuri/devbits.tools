import { lazy } from "react"
import type { RegistryEntry } from "./types"

export const tools: RegistryEntry[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: "Code2",
    component: lazy(() => import("../tools/json-formatter/JsonFormatter")),
  },
]
