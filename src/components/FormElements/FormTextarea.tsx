/** @jsx jsx */
import { FC, useState, useEffect, ChangeEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { useInputValidation } from './hooks/useInputValidation'
import FormLabel from './FormLabel'
import Textarea from './Textarea'

export interface FormTextareaProps {
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
  tabIndex?: number
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const FormTextarea: FC<FormTextareaProps> = ({
  className,
  name,
  label,
  placeholder,
  defaultValue,
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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeHook(e)
    if (onChangeProp) {
      onChangeProp(e)
    }
  }

  return (
    <Container className={className}>
      <FormLabel error={!!error} isVisible={isVisible || value.length > 0}>
        {placeholder}
      </FormLabel>
      <Textarea
        name={name}
        value={value}
        error={!!error}
        placeholder={isVisible ? '' : placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleChange}
        {...props}
        {...fns}
      />
    </Container>
  )
}

const Container = styled.div`
  overflow-y: visible;
  overflow: visible;
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 2px;
`

export default FormTextarea
