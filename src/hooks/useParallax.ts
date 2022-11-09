import React, { useEffect, useMemo } from 'react'
import lax from 'lax.js'

lax.init()
lax.addDriver('scrollY', function () {
  return window.scrollY
})

export const useParallax = <ELEMENT>(
  elementRef: React.MutableRefObject<ELEMENT | null>,
  elementOptions: Record<string, any>
) => {
  const selector = useMemo(() => {
    if (elementRef.current instanceof HTMLElement) {
      return `.${elementRef.current?.className.replace(' ', '.')}`
    }

    return null
  }, [elementRef.current])

  useEffect(() => {
    if (selector) {
      lax.addElements(selector, elementOptions)
    }

    return () => lax.removeElements(selector)
  }, [elementRef.current, selector])
}
