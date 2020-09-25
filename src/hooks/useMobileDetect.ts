import { useState, useEffect } from 'react'

export default function useMobileDetect() {
  const [isMobile, setMobile] = useState(false)
  useEffect(() => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ]
    const mobile =
      toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem)
      }) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)

    setMobile(mobile)
  }, [])

  return isMobile
}
