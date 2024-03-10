import React, { MutableRefObject, useRef } from "react"
import useResizeObserver from "@react-hook/resize-observer"
import { useDebounce } from "use-debounce"

interface Size {
  width: number
  height: number
}

export default function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  MutableRefObject<T | null>,
  Size | null
] {
  const target = useRef<T | null>(null)
  const [size, setSize] = useDebounce<Size | null>(null, 200)

  React.useEffect(() => {
    if (target.current) setSize(target.current.getBoundingClientRect())
  }, [target, setSize])

  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return [target, size]
}
