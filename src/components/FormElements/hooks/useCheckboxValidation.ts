import React, { useState, useContext, useEffect } from 'react'
import { LoadingStatus } from './useLoadingStatus'
import { ValidationContext } from '../Form'

export function useCheckboxValidation(name: string, defaultValue: any) {
  const [value, setValue] = useState(false)
  const [checked, setChecked] = useState(false)
  const [isTouched, setTouched] = useState(false)
  const [didMount, setDidMount] = useState(false)
  const { updateEntry, isDirty, loadingStatus, error, errors } = useContext(
    ValidationContext,
  )

  // prevents initial flicker
  useEffect(() => {
    if (!didMount) {
      setDidMount(true)
      if (defaultValue) {
        setValue(defaultValue)
        setChecked(defaultValue)
      }
    }
  }, [didMount, defaultValue])

  //send to context for validation
  useEffect(() => {
    if (isDirty || isTouched) {
      updateEntry(name, value)
    }
  }, [isTouched, isDirty, updateEntry, name, value])

  // reset after successful submit
  useEffect(() => {
    if (loadingStatus === LoadingStatus.Success) {
      setValue(false)
      setTouched(false)
    }
  }, [error, loadingStatus])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    setValue(e.target.checked)
  }

  const onBlur = () => {
    if (!isTouched) {
      setTouched(true)
    }
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.currentTarget.blur()
    }
  }

  return { onChange, onBlur, onKeyUp, value, checked, error: errors[name] }
}
