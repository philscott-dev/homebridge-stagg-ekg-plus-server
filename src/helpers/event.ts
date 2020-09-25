import { MouseEvent } from 'react'

export function getDataAttrForMouseEvent(e: MouseEvent, attr: string) {
  const x = e.clientX
  const y = e.clientY
  const elements = document.elementsFromPoint(x, y)
  const el = elements.find((el) => el.getAttribute(attr))
  if (el) {
    return el.getAttribute(attr)
  }
}
