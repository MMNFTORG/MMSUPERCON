import BigNumber from 'bignumber.js'

export const formatUSD = (amount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return formatter.format(amount)
}

const getDecimalPlaces = (amount: number): number => {
  let decimalPlaces = 2
  const absoluteValue = Math.abs(amount)
  if (absoluteValue < 1) {
    const zeroDigits = Math.floor(Math.log10(1 / (absoluteValue || 1)))
    decimalPlaces = zeroDigits + 2
  }
  return decimalPlaces
}

export const balanceToNumber = (balance: BigNumber, decimals = 18): number => {
  const balanceNumber = balance
    .dividedBy(new BigNumber(10).pow(decimals))
    .toNumber()

  return balanceNumber
}

export const balanceToCurrency = (
  balance: BigNumber,
  decimals = 18
): string => {
  const numberValue = balanceToNumber(balance, decimals)
  let decimalPlaces = getDecimalPlaces(numberValue)
  const balanceCurrency = balance
    .dividedBy(new BigNumber(10).pow(decimals))
    .toFormat(decimalPlaces, 1)
  return balanceCurrency
}

export const balanceToNumeric = (
  balance: BigNumber,
  decimals = 18
): string => {
  return balance
    .dividedBy(new BigNumber(10).pow(decimals))
    .toFixed()
}

export const numberToUint256 = (
  amount: number,
  decimals = 18
): string => {
  const amountUint256 = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(0, 1)
  return amountUint256
}

export const numericToUint256 = (
  amount: string,
  decimals = 18
): string => {
  const amountUint256 = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(0, 1)
  return amountUint256
}

export const numericToBalance = (
  amount: string,
  decimals = 18
): BigNumber => {
  return new BigNumber(numericToUint256(amount, decimals))
}

export const numberToCurrency = (
  amount: number,
  maxDigits: number | undefined = undefined
): string => {
  let decimalPlaces = maxDigits
  if (!decimalPlaces) {
    decimalPlaces = getDecimalPlaces(amount)
  }
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimalPlaces
  })

  return formatter.format(amount)
}

