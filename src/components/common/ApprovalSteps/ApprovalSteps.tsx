import React from 'react'

import './ApprovalSteps.scss'

interface Props {
  fillingCondition: boolean
}

export const ApprovalSteps = ({ fillingCondition }: Props) => {
  return (
    <div className="approval-steps">
      <span
        className={`approval-steps__label ${!fillingCondition && 'active'}`}
      >
        Step 1
      </span>
      <div className={`approval-steps__line ${fillingCondition && 'filled'}`} />
      <span className={`approval-steps__label ${fillingCondition && 'active'}`}>
        Step 2
      </span>
    </div>
  )
}
