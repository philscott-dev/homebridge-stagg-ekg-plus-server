export const numberToHex = (number: number) => {
  const hexString = number.toString(16)
  return hexString.length === 1 ? `0${hexString}` : hexString
}

export const hexToNumber = (hexString: string) => {
  const result: string[] = []
  for (let i = 0; i < hexString.length; i += 2) {
    result.push(`0x${hexString.substr(i, 2)}`)
  }
  return parseInt(result.join(' '), 16)
}
