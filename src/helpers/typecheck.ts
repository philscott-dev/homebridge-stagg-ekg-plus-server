export function isNumber(x: any): x is number {
  return typeof x === 'number'
}

export function isString(x: any): x is string {
  return typeof x === 'string'
}

export function isBoolean(x: any): x is boolean {
  return typeof x === 'boolean'
}

export function isFunction(x: any): x is Function {
  return x instanceof Function
}
