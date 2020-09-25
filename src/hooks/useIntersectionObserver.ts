import { isString } from 'helpers/typecheck'
import { useEffect, useState } from 'react'

export interface Bounds {
  isTop: boolean
  isLeft: boolean
  isBottom: boolean
  isRight: boolean
  entry: IntersectionObserverEntry
}

export interface IntersectionObserverConfig {
  element?: Element | string | null
  root?: Element | null
  offset?: number
  observeOnce?: boolean
  shouldObserve?: boolean
  unobserveTimeout?: number
  threshold?: number
}

export default function useIntersectionObserver({
  element: elem,
  root,
  offset = 0,
  observeOnce = false,
  shouldObserve = true,
  unobserveTimeout = 0,
  threshold = 0,
}: IntersectionObserverConfig) {
  const [bounds, setBounds] = useState<Bounds>()
  useEffect(() => {
    // string or actual element
    const element = isString(elem) ? document.querySelector(elem) : elem

    //configure observer
    const observer = new IntersectionObserver(handleObserve, {
      root, // null === watch viewport
      rootMargin: '0px',
      threshold,
    })

    // turn on the observer
    if (element && shouldObserve) {
      observer.observe(element)
    }

    // clear if should unobserve
    if (!shouldObserve) {
      const timeout = setTimeout(() => {
        setBounds(undefined)
      }, unobserveTimeout)

      if (timeout && shouldObserve) {
        clearTimeout(timeout)
      }
    }

    // observer handler
    function handleObserve(entries: IntersectionObserverEntry[]) {
      const entry = entries[0]
      const rect = entry.boundingClientRect
      const root = entry.rootBounds
      if (root) {
        setBounds({
          isTop: rect.top < 0,
          isLeft: rect.left < 0,
          isBottom: rect.bottom > root.bottom,
          isRight: rect.right > root.right,
          entry,
        })
      }
      // immediately unobserve, if specified
      if (element && observeOnce) {
        observer.unobserve(element)
      }
    }

    // clear on unmount
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [
    elem,
    root,
    offset,
    shouldObserve,
    observeOnce,
    unobserveTimeout,
    threshold,
  ])
  return bounds
}
