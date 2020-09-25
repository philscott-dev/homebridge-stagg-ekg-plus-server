import { ApolloError } from 'apollo-boost'
import { Keyframes } from '@emotion/serialize'

export type FormError = string | Error | ApolloError | undefined

export interface Errors {
  [key: string]: FormError
}

export interface Entries {
  [key: string]: string | number | boolean | File | undefined
}

/* Props */

export interface InputProps {
  name: string
  placeholder: string
  type: string
  label?: string
}

export interface WithValidationProps {
  error: FormError
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface ErrorProps {
  name: string
  errors: Errors
}

export interface FormProps {
  autoComplete?: 'on' | 'off'
  formHandlerUrl?: string
  animationSpeed?: number
  loadingAnimationThreshold?: number
  responseDelay?: number
  children: any
  loading: boolean
  error: FormError
  rules: Rules
  onSubmit: (entries: Entries, e: React.FormEvent<HTMLFormElement>) => void
  onError?: (errors: Errors) => void
}

export interface AnimationProps {
  shouldAnimate?: boolean
  animation?: Keyframes | null | undefined
}

/* Types */

export interface Validator {
  isRequired?: boolean
  fn: (...args: any) => boolean
  error: FormError
}

export interface Rules {
  [key: string]: Validator[]
}

export interface Entry {
  value: any
  error: string
  isValid: boolean
}

export type Size = 'large' | 'small'

// export interface Entries {
//   [key: string]: Entry
// }
