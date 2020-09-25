import { keyframes } from '@emotion/react'

export const fade = keyframes`
  0% {
    display: none;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
  `

export const fadeOut = keyframes`
0% {
  display: block;
  opacity: 1;
}
100% {
  display: none;
  opacity: 0;
}
`
