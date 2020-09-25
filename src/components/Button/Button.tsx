import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Sizes } from './types'

export interface ButtonProps {
  size?: Sizes
  type?: 'button' | 'submit' | 'reset'
  isActive?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onTouchStart?: (e: React.TouchEvent<HTMLButtonElement>) => void
}

const Button = styled.button<ButtonProps>`
  ${sizes};
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  align-items: center;
  border-radius: 2px;
  outline: none;
  pointer-events: all;
  border-style: solid;
  cursor: pointer;
  font-weight: 300;
  font-family: ${({ theme }) => theme.font.family};
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
`

const Primary = styled(Button)`
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

const Secondary = styled(Button)`
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[500]};
  border-color: ${({ theme }) => theme.color.blue[500]};
  box-shadow: ${({ theme }) => theme.shadow.up.one};
  &:hover {
    color: ${({ theme }) => theme.color.white[100]};
    background: ${({ theme }) => theme.color.blue[500]};
    box-shadow: ${({ theme }) => theme.shadow.up.two};
  }
  &:active {
    box-shadow: ${({ theme }) => theme.shadow.up.one};
  }
`

const Tertiary = styled(Button)`
  color: ${({ theme }) => theme.color.white[100]};
  background: transparent;
  /* background: ${({ theme }) => theme.color.blue[600]}; */
  border-color: ${({ theme }) => theme.color.blue[400]};
  &:hover {
    color: ${({ theme }) => theme.color.white[100]};
    border-color: ${({ theme }) => theme.color.blue[300]};
  }
`

const Alt = styled(Button)`
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[700]};
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.color.blue[400] : theme.color.blue[700]};
  &:hover {
    border-color: ${({ theme }) => theme.color.blue[300]};
  }
`

const Danger = styled(Button)`
  color: ${({ theme }) => theme.color.red[300]};
  background: transparent;
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.color.blue[400] : theme.color.blue[700]};
  &:hover {
    border-color: ${({ theme }) => theme.color.blue[300]};
  }
`

function sizes({ size }: { size?: Sizes }) {
  switch (size) {
    case 'small':
      return css`
        font-size: 14px;
        padding: 8px 24px;
      `
    case 'large':
      return css`
        font-size: 18px;
        padding: 24px 48px;
      `
    default:
      return css`
        font-size: 16px;
        padding: 16px 40px;
      `
  }
}

export default Object.assign(Button, {
  Primary,
  Secondary,
  Tertiary,
  Alt,
  Danger,
})
