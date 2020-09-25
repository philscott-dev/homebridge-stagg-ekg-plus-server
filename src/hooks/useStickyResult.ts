import { useRef } from 'react'

export default function useStickyResult<T>(value: T) {
  const val = useRef<T>()
  if (value !== undefined) {
    val.current = value
  }
  return val.current
}
