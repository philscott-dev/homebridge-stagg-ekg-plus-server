import React, { useState, useContext, useEffect } from 'react'
import { LoadingStatus } from './useLoadingStatus'
import { ValidationContext } from '../Form'
import { isString, isNumber } from 'helpers/typecheck'
import { isDate } from 'date-fns'

export function useInputValidation(name: string, defaultValue: any) {
  const [value, setValue] = useState(defaultValue || '')
  const [isTouched, setTouched] = useState(false)
  const { updateEntry, isDirty, loadingStatus, error, errors } = useContext(
    ValidationContext,
  )

  //TODO: BUGFIX - this dependency array breaks when updateEntry is added
  useEffect(() => {
    if (defaultValue != undefined) {
      setValue(defaultValue)
      updateEntry(name, defaultValue)
    }
  }, [defaultValue, name])

  //send to context for validation
  useEffect(() => {
    if (isDirty || isTouched) {
      updateEntry(name, value)
    }
  }, [isTouched, isDirty, updateEntry, name, value])

  // reset after successful submit
  useEffect(() => {
    if (loadingStatus === LoadingStatus.Success) {
      setValue('')
      setTouched(false)
    }
  }, [error, loadingStatus])

  const onChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | string
      | number
      | Date,
  ) => {
    if (isString(e) || isNumber(e) || isDate(e) || e instanceof Date) {
      setValue(e)
    } else {
      setValue(e.target.value)
    }
  }

  const onBlur = () => {
    if (!isTouched) {
      setTouched(true)
    }
  }

  const onKeyUp = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLSelectElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.keyCode === 13) {
      e.currentTarget.blur()
    }
  }

  return { onChange, onBlur, onKeyUp, value, error: errors[name] }
}
