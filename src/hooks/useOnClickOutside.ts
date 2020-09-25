import { useEffect, useRef, RefObject, MutableRefObject } from 'react'

const events = ['mousedown', 'touchstart']

export default function useOnClickOutside(
  ref: RefObject<Element> | MutableRefObject<Element | undefined>,
  handler: (e: any) => void, //function to execute
  shouldListen: boolean, //escape hatch to clear the listeners
) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    const onClickOutside = (e: any) => {
      //TODO: This is a hack for SVG Checkboxes and Icons
      // const tagList = ['path', 'svg', 'g']
      // const tag = e.target.tagName
      if (ref.current && !ref.current.contains(e.target)) {
        handlerRef.current(false)
      }
    }

    events.forEach((event) =>
      document.addEventListener(event, onClickOutside, true),
    )

    if (!shouldListen) {
      events.forEach((event) =>
        document.removeEventListener(event, onClickOutside, true),
      )
    }

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, onClickOutside, true),
      )
    }
  }, [ref, handler, shouldListen])
}
