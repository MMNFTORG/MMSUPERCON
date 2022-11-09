import React, { useEffect, useMemo, useState } from 'react'
import { Image, ImageProps } from 'react-bootstrap'
import classNames from 'classnames'

import { useIsMounted } from '@hooks/useIsMounted'

import { sendExceptionReport } from '@utils/errors'

interface Props extends ImageProps {
  path: string
}

export const DynamicImage = (props: Props) => {
  const isMountedRef = useIsMounted()
  const [icon, setIcon] = useState<string | null>(null)

  const isSVG = useMemo(() => {
    return props.path.endsWith('.svg')
  }, [props.path])

  useEffect(() => {
    const getIcon = async () => {
      try {
        let data = await import(`../../../assets/${props.path}`)
        if (isSVG) {
          let svg = await (await fetch(data.default)).text()
          isMountedRef.current && setIcon(svg)
        } else {
          isMountedRef.current && setIcon(data.default)
        }
      } catch (err) {
        sendExceptionReport(err)
      }
    }

    getIcon()
  }, [props.path, isSVG])

  const expandedProps = useMemo(() => {
    return {
      ...props,
      className: classNames({
        'dynamic-image': true,
        'rounded-circle': props.roundedCircle,
        rounded: props.rounded,
        [`${props.className ?? ''}`]: true
      })
    }
  }, [props])

  return isSVG ? (
    <span {...expandedProps} dangerouslySetInnerHTML={{ __html: icon ?? '' }} />
  ) : (
    <Image {...expandedProps} src={icon ?? ''} />
  )
}
