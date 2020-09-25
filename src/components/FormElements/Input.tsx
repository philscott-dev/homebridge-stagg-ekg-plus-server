import { ChangeEvent, FocusEvent } from 'react'
import styled from '@emotion/styled'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'

interface InputProps {
  type: string
  name: string
  error: boolean
  inputSize: Size
  required?: boolean
  value?: string
  placeholder: string
  onFocus: (e: FocusEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default styled.input<InputProps>`
  -webkit-appearance: none;
  ::-webkit-calendar-picker-indicator {
    display: none;
  }
  box-sizing: border-box;
  height: ${({ inputSize }) =>
    inputSize === 'large' ? INPUT_LARGE : INPUT_SMALL}px;
  padding: 0 16px;
  outline: none;
  width: 100%;
  font-size: 16px;
  background-clip: padding-box;
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 300;
  border-radius: 2px;
  border: 2px solid
    ${({ theme, error }) =>
      !error ? theme.color.peach[100] : theme.color.red[300]};
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.black[700]};
  &::placeholder {
    color: ${({ theme }) => theme.color.gray[200]};
    font-family: ${({ theme }) => theme.font.family};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border: 1px solid ${({ theme }) => theme.color.white[100]};
    -webkit-text-fill-color: ${({ theme }) => theme.color.white[100]};
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  &:focus {
    border: 2px solid
      ${({ theme, error }) =>
        !error ? theme.color.peach[300] : theme.color.red[300]};
  }
  transition: ${({ theme }) => theme.transition.all};
`
