import { Rules, Entries, Errors } from './types'

export const validate = (entries: Entries, rules: Rules) => {
  let errors: Errors = {}
  for (let key of Object.keys(rules)) {
    const validators = rules[key]
    // return the first failed rule
    const rule = validators.find(
      (validator) => !validator.fn(entries[key], entries),
    )

    // update the failed entry with rules message
    if (rule) {
      errors[key] = rule.error
    }
  }
  return errors
}

export const getFormEntries = (form: HTMLFormElement) => {
  let entries: Entries = {}

  new FormData(form).forEach((value, key) => {
    entries[key] = value
  })

  // parse bools
  for (let key in entries) {
    let value = entries[key]
    if (value === 'true') {
      entries[key] = true
    }
    if (value === 'false') {
      entries[key] = false
    }
  }

  return entries
}
