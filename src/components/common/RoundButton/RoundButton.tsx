import React, { useMemo } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { LocationDescriptor } from 'history'

interface ExternalLink {
  href?: string
  to?: undefined
}

interface InternalLink {
  to?: LocationDescriptor
  href?: undefined
}

export type RoundButtonProps = {
  color?: 'DARK' | 'LIGHT' | 'TRANSPARENT'
  size?: 'large' | 'small'
  wide?: boolean
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  badgeText?: string
  onClick?: () => void
  children: React.ReactNode
  fullWidth?: boolean
} & (InternalLink | ExternalLink) &
  React.HTMLAttributes<HTMLElement>

const getTheme = (color: string): string => {
  switch (color) {
    case 'DARK':
      return 'dark'
    case 'TRANSPARENT':
      return 'transparent'
    default:
      return 'light'
  }
}

const RoundButton = ({
  id,
  className,
  to,
  href,
  color,
  size,
  wide,
  type,
  badgeText,
  disabled,
  onClick,
  children,
  style,
  fullWidth
}: RoundButtonProps) => {
  if (href && to) {
    throw new Error(
      'Invalid props: component RoundButton cannot get "href" and "to" property at the same time'
    )
  }

  const theme = getTheme(color || '')
  const linkProp = useMemo(() => {
    return to
      ? { to }
      : href
      ? { href, target: '_blank', rel: 'noreferrer noopener' }
      : {}
  }, [to, href])
  const buttonType: 'submit' | 'reset' | 'button' | undefined = useMemo(() => {
    if (!to && !href && !type) return 'button'
    return type
  }, [type, to, href])

  return (
    <Button
      as={to ? Link : href ? 'a' : undefined}
      variant="main"
      id={id}
      className={classNames({
        'round-button': true,
        [`${theme ?? ''}`]: true,
        [`${size ?? ''}`]: true,
        'round-button--with-badge': !!badgeText,
        wide: wide,
        'full-width': fullWidth,
        [`${className ?? ''}`]: true
      })}
      disabled={disabled}
      onClick={onClick}
      type={buttonType}
      style={style}
      {...linkProp}
    >
      {badgeText && <span className="round-button__badge">{badgeText}</span>}
      {children}
    </Button>
  )
}

RoundButton.defaultProps = {
  color: 'LIGHT'
} as RoundButtonProps

export { RoundButton }
