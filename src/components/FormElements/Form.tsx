/** @jsx jsx */
import { FC, useState, useEffect, useRef, createContext } from 'react'
import { jsx, css } from '@emotion/react'
import useLoadingStatus, { LoadingStatus } from './hooks/useLoadingStatus'
import { useDelayedStatus } from './hooks/useDelayedStatus'
import { FormError, FormProps, Entries, Errors } from './types'
import { getFormEntries, validate } from './helpers'

export const LOADING_ANIMATION_THRESHOLD: number = 200
export const ANIMATION_SPEED: number = 700
export const RESPONSE_DELAY: number = 2500

export const ValidationContext = createContext<{
  animationSpeed: number
  loadingAnimationThreshold: number
  responseDelay: number
  loadingStatus: LoadingStatus
  delayedStatus: LoadingStatus
  error: FormError
  shouldShowLoading: boolean
  isDirty: boolean
  entries: Entries
  errors: Errors
  updateEntry: (name: string, value: any) => void
}>({
  animationSpeed: 0,
  loadingAnimationThreshold: 0,
  responseDelay: 0,
  shouldShowLoading: false,
  error: undefined,
  isDirty: false,
  entries: {},
  errors: {},
  loadingStatus: LoadingStatus.Normal,
  delayedStatus: LoadingStatus.Normal,
  updateEntry: () => {},
})

const Form: FC<FormProps> = ({
  rules,
  children,
  onSubmit,
  loading,
  error,
  formHandlerUrl,
  autoComplete = 'on',
  animationSpeed = ANIMATION_SPEED,
  responseDelay = RESPONSE_DELAY,
  loadingAnimationThreshold = LOADING_ANIMATION_THRESHOLD,
}) => {
  const ref = useRef<HTMLFormElement>(null)
  const [isDirty, setDirty] = useState<boolean>(false)
  const [entries, setEntries] = useState<Entries>({})
  const [errors, setErrors] = useState<Errors>({})
  const { loadingStatus, shouldShowLoading } = useLoadingStatus(
    loading,
    error,
    loadingAnimationThreshold,
  )
  const { delayedStatus } = useDelayedStatus(
    loadingStatus,
    loadingAnimationThreshold,
    animationSpeed,
    responseDelay,
  )

  // reset after successful submit
  useEffect(() => {
    if (!loading && !error) {
      setDirty(false)
    }
  }, [loading, error])

  const updateEntry = (name: string, value: any) => {
    const isValueUpdated = entries[name] !== value
    const validators = rules[name]
    if (isValueUpdated) {
      const rule =
        validators && validators.length
          ? validators.find((validator) => !validator.fn(value, entries))
          : undefined
      const error = rule ? rule.error : undefined
      setEntries((prev) => ({ ...prev, [name]: value }))
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const submittedErrors = validate(entries, rules)

    // check all the validators
    if (!Object.keys(submittedErrors).length) {
      onSubmit(entries, e)
    } else {
      setDirty(true)
      setErrors(submittedErrors)
    }
  }

  return (
    <ValidationContext.Provider
      value={{
        animationSpeed,
        responseDelay,
        loadingAnimationThreshold,
        loadingStatus,
        delayedStatus,
        error,
        shouldShowLoading,
        isDirty,
        entries,
        errors,
        updateEntry,
      }}
    >
      <form
        noValidate
        ref={ref}
        css={formCss}
        onSubmit={handleSubmit}
        action={formHandlerUrl}
        autoComplete={autoComplete}
      >
        {children}
      </form>
    </ValidationContext.Provider>
  )
}

const formCss = css`
  display: contents;
  width: 100%;
`

export default Form
