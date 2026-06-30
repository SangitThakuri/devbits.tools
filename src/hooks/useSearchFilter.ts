import { useMemo, useState } from "react"
import type { RegistryEntry } from "../registry/types"

export function useSearchFilter(items: RegistryEntry[]) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase().trim()
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    )
  }, [items, query])

  return { query, setQuery, filtered }
}
