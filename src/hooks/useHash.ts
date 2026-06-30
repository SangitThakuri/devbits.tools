import { useCallback, useSyncExternalStore } from "react"

function getHash() {
  return window.location.hash.replace(/^#/, "") || ""
}

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback)
  return () => window.removeEventListener("hashchange", callback)
}

export function useHash() {
  const hash = useSyncExternalStore(subscribe, getHash)
  const setHash = useCallback((value: string) => {
    window.location.hash = value
  }, [])
  return [hash, setHash] as const
}
