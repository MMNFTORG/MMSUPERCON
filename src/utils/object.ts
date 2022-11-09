export function isDefined(prop: any): boolean {
  return prop !== undefined
}

export function isEmptyObject(value: Object) {
  if (value === null) {
    return true
  }

  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

export function objectToGetParams(object: Record<string, any>) {
  const params = Object.keys(object).filter((key: string) => !!object[key])

  if (!params.length) {
    return ''
  }

  return (
    '?' +
    params.map((key) => `${key}=${encodeURIComponent(object[key])}`).join('&')
  )
}
