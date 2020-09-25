import { ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'

interface TextareaProps {
  name: string
  error: boolean
  required?: boolean
  value?: string
  placeholder: string
  onFocus: () => void
  onBlur: () => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export default styled.textarea<TextareaProps>`
  -webkit-appearance: none;
  resize: none;
  height: 250px;
  box-sizing: border-box;
  border-radius: 2px;
  outline: none;
  width: 100%;
  padding: 16px;
  font-size: 14px;
  background-clip: padding-box;
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 200;
  border: 2px solid
    ${({ theme, error }) =>
      !error ? theme.color.blue[400] : theme.color.red[300]};
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[500]};
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
        !error ? theme.color.blue[300] : theme.color.red[300]};
  }
  transition: ${({ theme }) => theme.transition.all};
`
