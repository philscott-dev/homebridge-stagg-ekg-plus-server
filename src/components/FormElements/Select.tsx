import styled from '@emotion/styled'
import { ChangeEvent } from 'react'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'

interface SelectProps {
  name: string
  error: boolean
  inputSize: Size
  required?: boolean
  value?: string
  placeholder: string
  onFocus: () => void
  onBlur: () => void
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default styled.select<SelectProps>`
  -webkit-appearance: none;
  height: ${({ inputSize }) =>
    inputSize === 'large' ? INPUT_LARGE : INPUT_SMALL}px;
  border-radius: 2px;
  outline: none;
  width: 100%;
  font-size: 16px;
  background-clip: padding-box;
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 300;
  padding: 0 16px;
  border: 2px solid
    ${({ theme, error }) =>
      !error ? theme.color.peach[100] : theme.color.red[300]};
  color: ${({ theme, value }) =>
    value ? theme.color.white[100] : theme.color.gray[200]};
  background: ${({ theme }) => theme.color.black[700]};
  &:focus {
    border: 2px solid
      ${({ theme, error }) =>
        !error ? theme.color.peach[300] : theme.color.red[300]};
  }
  &::placeholder {
    color: ${({ theme, error }) =>
      !error ? theme.color.gray[300] : theme.color.red[300]};
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
  transition: ${({ theme }) => theme.transition.all};
  > option {
    :nth-of-type(1) {
      color: ${({ theme }) => theme.color.gray[200]};
    }
  }
`
