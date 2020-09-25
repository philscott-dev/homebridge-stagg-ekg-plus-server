/** @jsx jsx */
import { FC, useState, useEffect, ChangeEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { useInputValidation } from './hooks/useInputValidation'
import FormLabel from './FormLabel'
import Input from './Input'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'

export interface FormInputProps {
  className?: string
  name: string
  placeholder: string
  type: string
  label?: string
  autofocus?: boolean
  list?: string
  min?: string
  max?: string
  multiple?: boolean
  required?: boolean
  step?: number
  defaultValue?: any
  tabIndex?: number
  inputSize?: Size
  shouldShowLabel?: boolean
  inputMode?:
    | 'text'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormInput: FC<FormInputProps> = ({
  className,
  name,
  label,
  inputSize = 'large',
  placeholder,
  defaultValue,
  type = 'text',
  shouldShowLabel = true,
  onChange: onChangeProp,
  ...props
}) => {
  const {
    value,
    error,
    onBlur,
    onChange: onChangeHook,
    ...fns
  } = useInputValidation(name, defaultValue)

  const [isVisible, setLabelVisibility] = useState(false)

  // NEW: if defaultValue changes, update things
  useEffect(() => {
    if (defaultValue != undefined) {
      setLabelVisibility(true)
    }
  }, [defaultValue])

  const handleOnFocus = () => {
    setLabelVisibility(true)
  }

  const handleOnBlur = () => {
    if (!value) {
      setLabelVisibility(false)
    }
    onBlur()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeHook(e)
    if (onChangeProp) {
      onChangeProp(e)
    }
  }

  return (
    <Container className={className} inputSize={inputSize}>
      {shouldShowLabel ? (
        <FormLabel error={!!error} isVisible={isVisible || value.length > 0}>
          {placeholder}
        </FormLabel>
      ) : null}
      <Input
        type={type}
        name={name}
        value={value}
        error={!!error}
        placeholder={isVisible ? '' : placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        inputSize={inputSize}
        onChange={handleChange}
        {...props}
        {...fns}
      />
    </Container>
  )
}

const Container = styled.div<{ inputSize: Size }>`
  display: flex;
  flex-direction: column;
  overflow-y: visible;
  overflow: visible;
  position: relative;
  width: 100%;
  border-radius: ${({ inputSize }) =>
    inputSize === 'large' ? INPUT_LARGE : INPUT_SMALL}px;
`

export default FormInput
