/** @jsx jsx */
import { FC } from 'react'
import styled from '@emotion/styled'
import { jsx, keyframes } from '@emotion/react'

interface SpinnerProps {
  style?: { [key: string]: any }
  className?: string
}

const Spinner: FC<SpinnerProps> = () => {
  return (
    <SpinnerContainer>
      <SvgElement viewBox={'25 25 50 50'} className={'svgElement'}>
        <Circle className={'circle'} />
      </SvgElement>
    </SpinnerContainer>
  )
}

const opacityChange = keyframes`
  0%{
    background: rgba(0,0,0,0);
  }
  100% {
    background: rgba(0,0,0,.125);
  }
`

const rotator = keyframes`
  100% {transform: rotate(360deg); }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  /* animation: ${opacityChange} 0.3s ease-in-out forwards; */
`
const SvgElement = styled.svg`
  width: 20px;
  animation: ${rotator} 2s linear infinite;
`

const Circle = styled.circle`
  stroke-dasharray: 1, 200;
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  cx: 50;
  cy: 50;
  r: 20;
  stroke-dashoffset: 0;
  stroke: #fcfcfc;
  transform-origin: center;
  animation: ${dash} 1.5s ease-in-out infinite;
`

export default Spinner
