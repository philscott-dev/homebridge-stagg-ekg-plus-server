/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent, useState, useContext, useEffect } from 'react'
import { jsx, css } from '@emotion/react'
import { ValidationContext } from './Form'
import { LoadingStatus } from './hooks/useLoadingStatus'

export interface ButtonProps {
  className?: string
  name?: string
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<ButtonProps> = ({
  name,
  children,
  className,
  onMouseDown,
  onClick,
}) => {
  const { delayedStatus, animationSpeed } = useContext(ValidationContext)
  const [previousStatus, setPreviousStatus] = useState(LoadingStatus.Normal)
  const [animation, setAnimation] = useState(baseCss)

  useEffect(() => {
    const delayToNormal = () => {
      setTimeout(() => {
        setAnimation(baseCss)
      }, animationSpeed)
    }

    if (previousStatus !== delayedStatus) {
      if (
        previousStatus === LoadingStatus.Error &&
        delayedStatus === LoadingStatus.Normal
      ) {
        setAnimation(errorToNormal)
        delayToNormal()
      }
      if (
        previousStatus === LoadingStatus.Success &&
        delayedStatus === LoadingStatus.Normal
      ) {
        setAnimation(successToNormal)
        delayToNormal()
      }
      if (delayedStatus === LoadingStatus.Success) {
        setAnimation(normalToSuccess)
      }
      if (delayedStatus === LoadingStatus.Error) {
        setAnimation(normalToError)
      }
      setPreviousStatus(delayedStatus)
    }
  }, [delayedStatus, previousStatus, animationSpeed])

  const disabled = delayedStatus !== LoadingStatus.Normal

  return (
    <button
      type="submit"
      disabled={disabled}
      name={name}
      className={className}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const colors = {
  blue: '#114b5f',
  red: '#ff5151',
  green: '#1a936f',
}

const baseCss = css`
  position: relative;
  text-align: center;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  background-size: 360% 120%;
  color: #fcfcfc;
  border: none;
  height: 40px;
  border-radius: 2px;
  overflow: hidden;
  background-position: right bottom;
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.red} 33%,
    ${colors.red} 66%,
    ${colors.blue} 66%
  );
  background-position: right bottom;
  background-size: 360% 120%;
`

export const normalToError = css`
  ${baseCss};
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.red} 33%,
    ${colors.red} 66%,
    ${colors.blue} 66%
  );
  background-position: 50% bottom;
  background-size: 360% 120%;
  transition: all ${700}ms ease-in-out;
`

export const errorToNormal = css`
  ${baseCss};
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.red} 33%,
    ${colors.red} 66%,
    ${colors.blue} 66%
  );
  background-position: left bottom;
  background-size: 360% 120%;
  transition: all ${700}ms ease-in-out;
`

export const normalToSuccess = css`
  ${baseCss};
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.green} 33%,
    ${colors.green} 66%,
    ${colors.blue} 66%
  );
  background-position: 50% bottom;
  background-size: 360% 120%;
  transition: all ${700}ms ease-in-out;
`
export const successToNormal = css`
  ${baseCss};
  background: linear-gradient(
    135deg,
    ${colors.blue},
    ${colors.blue} 33%,
    ${colors.green} 33%,
    ${colors.green} 66%,
    ${colors.blue} 66%
  );
  background-position: left bottom;
  background-size: 360% 120%;
  transition: all ${700}ms ease-in-out;
`

export default styled(Button)`
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  white-space: nowrap;
  align-items: center;
  border-radius: 2px;
  outline: none;
  pointer-events: all;
  border-style: solid;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.all};
  &:hover {
    background-size: 100% 100%;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    display: block;
    width: 100%;
  }

  font-weight: 300;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[400]};
  border-color: ${({ theme }) => theme.color.blue[400]};
  box-shadow: ${({ theme }) => theme.shadow.up.one};
  &:hover {
    color: ${({ theme }) => theme.color.white[100]};
    background: ${({ theme }) => theme.color.blue[300]};
    box-shadow: ${({ theme }) => theme.shadow.up.two};
    border-color: ${({ theme }) => theme.color.blue[300]};
  }
`
