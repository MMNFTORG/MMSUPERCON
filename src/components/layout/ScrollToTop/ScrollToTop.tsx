import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import { scrollToPosition } from '@utils/scrollToPosition'

import { ReactComponent as ToTopIcon } from '../../../assets/to-top-btn.svg'

import './ScrollToTop.css'

interface Props {
  container: Window
}

const ScrollToTop = ({ container }: Props) => {
  let oldScroll = 0
  const isDesktop = window.matchMedia('(min-width: 992px)').matches

  const [isShown, setIsShown] = useState(false)

  const scrollHandler = (event: Event) => {
    const doc = event.target as Document
    const el = doc.documentElement as HTMLElement

    if (
      el.scrollTop > container.innerHeight &&
      (isDesktop || oldScroll > el.scrollTop)
    ) {
      setIsShown(true)
    } else {
      setIsShown(false)
    }

    oldScroll = el.scrollTop
  }

  useEffect(() => {
    container.addEventListener('scroll', scrollHandler)

    return () => {
      container.removeEventListener('scroll', scrollHandler)
    }
  }, [container])

  const scrollToTop = () => scrollToPosition({ y: 0 }, container)

  return (
    <div
      className={classNames({
        'scroll-to-top': true,
        shown: isShown
      })}
      onClick={scrollToTop}
    >
      <ToTopIcon />
    </div>
  )
}

ScrollToTop.defaultProps = {
  container: window
}

export { ScrollToTop }
