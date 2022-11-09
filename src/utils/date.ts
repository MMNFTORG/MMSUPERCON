import { IMonthData } from '@components/Calendar/types'

export const groupDateByMonth = <T extends Required<{ date: string }>>(
  dateArray: T[]
): IMonthData<T> => {
  return dateArray.reduce((acc: any, curr) => {
    const date = new Date(curr.date)
    const month = date.toLocaleString('default', { month: 'long' })

    if (!Array.isArray(acc[month])) {
      acc[month] = []
    }
    acc[month].push(curr)
    return acc
  }, {})
}
