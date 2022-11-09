import React from 'react'

import './Timer.css'

interface Props {
  duration: Duration
}

export const Timer = ({ duration }: Props) => {
  return (
    <div className="timer-values">
      <div className="timer-values__item days">
        <div className="value">
          {duration?.days?.toString()?.length === 1 ? (
            <>
              <span className="grey-text">0</span>
              {duration?.days}
            </>
          ) : (
            duration?.days
          )}
        </div>
        <div className="name">days</div>
      </div>
      <div className="timer-values__item hours">
        <div className="value">{duration.hours}</div>
        <div className="name">hours</div>
      </div>
      <div className="timer-values__item minutes">
        <div className="value">{duration.minutes}</div>
        <div className="name">minutes</div>
      </div>
      <div className="timer-values__item seconds">
        <div className="value">{duration.seconds}</div>
        <div className="name">seconds</div>
      </div>
    </div>
  )
}
