import { lazy } from "react"
import { Code2, ArrowLeftRight, Shield, Search, Fingerprint, FileCode, Database, Clock } from "lucide-react"
import type { RegistryEntry } from "./types"

export const tools: RegistryEntry[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: Code2,
    component: lazy(() => import("../tools/json-formatter/JsonFormatter")),
  },
  {
    id: "codec",
    name: "Base64 & URL Codec",
    description: "Encode and decode Base64 and URL strings",
    icon: ArrowLeftRight,
    component: lazy(() => import("../tools/codec/Codec")),
  },
  {
    id: "jwt-debugger",
    name: "JWT Debugger",
    description: "Decode and inspect JSON Web Tokens",
    icon: Shield,
    component: lazy(() => import("../tools/jwt-debugger/JwtDebugger")),
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test patterns with real-time match highlighting",
    icon: Search,
    component: lazy(() => import("../tools/regex-tester/RegexTester")),
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Bulk generate Version 4 UUIDs / GUIDs",
    icon: Fingerprint,
    component: lazy(() => import("../tools/uuid-generator/UuidGenerator")),
  },
  {
    id: "yaml-json",
    name: "YAML ⇄ JSON",
    description: "Convert between YAML and JSON instantly",
    icon: FileCode,
    component: lazy(() => import("../tools/yaml-json/YamlJson")),
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Beautify and format SQL queries",
    icon: Database,
    component: lazy(() => import("../tools/sql-formatter/SqlFormatter")),
  },
  {
    id: "cron-parser",
    name: "Cron Parser",
    description: "Translate cron expressions to plain English",
    icon: Clock,
    component: lazy(() => import("../tools/cron-parser/CronParser")),
  },
]
