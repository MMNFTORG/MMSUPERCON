import React from 'react'

import { useTimeLeft } from '@hooks/useTimeLeft'

import Fog from '@assets/fog.png'

import { Timer } from '../Timer'

import './TimerWrap.css'

interface Props {
  dueDate: Date
  title?: string
}

export const TimerWrap = ({ dueDate, title = 'Auction ending in' }: Props) => {
  const timeLeft = useTimeLeft(dueDate)

  return (
    <div className="timer-wrap">
      {timeLeft && (
        <>
          <div className="timer tile text-center p-md-5 p-4 d-flex align-items-md-center align-items-start justify-content-between flex-column flex-md-row">
            <h2 className="timer__title">{title}</h2>
            <Timer duration={timeLeft} />
          </div>
        </>
      )}
    </div>
  )
}
