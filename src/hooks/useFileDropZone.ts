import { useCallback, useRef, useState } from "react"

export function useFileDropZone(onLoad: (content: string) => void) {
  const [isDragging, setIsDragging] = useState(false)
  const counterRef = useRef(0)

  const readFile = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result
        if (typeof text === "string") onLoad(text)
      }
      reader.readAsText(file)
    },
    [onLoad],
  )

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    counterRef.current++
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    counterRef.current--
    if (counterRef.current === 0) setIsDragging(false)
  }, [])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      counterRef.current = 0
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) readFile(file)
    },
    [readFile],
  )

  const onFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) readFile(file)
      e.target.value = ""
    },
    [readFile],
  )

  return { isDragging, onDragEnter, onDragLeave, onDragOver, onDrop, onFileInput }
}
