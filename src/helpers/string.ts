import humps from 'humps'

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function splitAndCapitalize(string: string): string {
  return humps.decamelize(string).split('_').map(capitalize).join(' ')
}
