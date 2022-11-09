import { useCallback, useEffect, useState } from 'react'
import { Interval, intervalToDuration } from 'date-fns'

export const useTimeLeft = (dueDate: Date | null | undefined) => {
  const calcTimeLeft = useCallback(() => {
    if (!dueDate) {
      return null
    }

    let currentDate = new Date()
    const interval: Interval = {
      start: currentDate,
      end: dueDate
    }

    if (+dueDate < +currentDate) {
      return null
    }

    let timeLeft: Duration = intervalToDuration(interval)

    return timeLeft
  }, [dueDate])

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calcTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, calcTimeLeft])

  return timeLeft
}
