/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState, useEffect, ChangeEvent } from 'react'
import { jsx } from '@emotion/react'
import { useInputValidation } from './hooks/useInputValidation'
import { Size } from './types'
import { INPUT_LARGE, INPUT_SMALL } from './constants'
import FormLabel from './FormLabel'
import Select from './Select'
import { FaCaretDown } from 'react-icons/fa'

export interface FormSelectProps {
  className?: string
  name: string
  placeholder: string
  label?: string
  autofocus?: boolean
  list?: string
  min?: string
  max?: string
  multiple?: boolean
  required?: boolean
  step?: number
  defaultValue?: any
  inputSize?: Size
  tabIndex?: number
  children: React.ReactNode
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const FormSelect: FC<FormSelectProps> = ({
  className,
  name,
  label,
  inputSize = 'large',
  placeholder,
  defaultValue,
  children,
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

  useEffect(() => {
    if (defaultValue != undefined) {
      setLabelVisibility(true)
    }
  }, [defaultValue])

  const handleOnFocus = () => {
    setLabelVisibility(true)
  }

  const handleOnBlur = () => {
    if (!value || !value.length) {
      setLabelVisibility(false)
    }
    onBlur()
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangeHook(e)
    if (onChangeProp) {
      onChangeProp(e)
    }
  }

  return (
    <Container className={className} inputSize={inputSize}>
      <FormLabel error={!!error} isVisible={isVisible || value.length > 0}>
        {placeholder}
      </FormLabel>

      <Select
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
      >
        {children}
      </Select>
      <ArrowDown />
    </Container>
  )
}

const Container = styled.div<{ inputSize: Size }>`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  overflow-y: visible;
  overflow: visible;
  position: relative;
  min-width: 300px;
  border-radius: 2px;
  /* border-radius: ${({ inputSize }) =>
    inputSize === 'large' ? INPUT_LARGE : INPUT_SMALL}px; */
`

const ArrowDown = styled(FaCaretDown)`
  position: absolute;
  color: ${({ theme }) => theme.color.white[100]};
  right: 24px;
  top: 50%;
  margin-top: 8px;
  pointer-events: none;
`

export default FormSelect
