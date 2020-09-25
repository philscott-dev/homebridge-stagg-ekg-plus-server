import { Rules } from './types'
import { email, phone } from './regex'

export const rules: Rules = {
  phone: [
    {
      fn: (string: string) => phone.test(string),
      error: 'Please provide a valid phone number',
    },
  ],
  email: [
    {
      fn: (string: string) => email.test(string),
      error: 'Please provide a real email address',
    },
  ],
  first_name: [
    {
      fn: (string: string) => string.length > 0,
      error: 'First name is too short.',
    },
  ],
  last_name: [
    {
      fn: (string: string) => string.length > 0,
      error: 'Last name is too short.',
    },
  ],
  company: [
    {
      fn: (string: string) => string.length > 0,
      error: 'Please provide a company name',
    },
  ],
  role: [
    {
      fn: (string: string) => string.length > 0,
      error: 'Please provide your role',
    },
  ],
}
