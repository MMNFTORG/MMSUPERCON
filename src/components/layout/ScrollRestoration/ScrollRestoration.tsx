import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export const ScrollRestoration = ({ children }: Props) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}
