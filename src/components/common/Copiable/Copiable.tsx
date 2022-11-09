import React, { useRef, useState } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap'

import { copyToClipBoard } from '@utils/string'

interface Props {
  text: string
  children: React.ReactNode
}

export const Copiable = ({ text, children }: Props) => {
  const [copied, setCopied] = useState(false)
  const target = useRef(null)

  const copy = async () => {
    if (await copyToClipBoard(text)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 900)
    }
  }

  return (
    <>
      <span className="copiable" ref={target} onClick={copy}>
        {children}
      </span>
      <Overlay target={target.current} show={copied} placement="right">
        {(props) => (
          <Tooltip id="copied-overlay" {...props}>
            Copied!
          </Tooltip>
        )}
      </Overlay>
    </>
  )
}
