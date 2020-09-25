import { useEffect, useState } from 'react'
import { theme } from 'theme'

export default function useMediaQuery() {
  const [breakPoint, setBreakPoint] = useState()
  useEffect(() => {}, [])
  return breakPoint
}
