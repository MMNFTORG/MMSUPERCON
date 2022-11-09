import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Image, ImageProps } from 'react-bootstrap'
import classNames from 'classnames'

import { useAssetWithType } from '@hooks/useAssetWithType'

import { getIPFSGateway } from '@utils/string'

import { LoadingWrap } from '../LoadingWrap'

import './MediaAsset.css'

type ImgProps = ImageProps & React.RefAttributes<HTMLImageElement>
type VideoProps = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>

type Props = VideoProps | ImgProps

export const MediaAsset = (props: Props) => {
  const [loaded, setLoaded] = useState(false)
  const { assetType, assetSource } = useAssetWithType(
    getIPFSGateway(props.src ?? '')
  )
  const assetRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null)

  const defaultVideoProps = {
    autoPlay: true,
    controls: false,
    loop: true,
    muted: true,
    playsInline: true,
    preload: 'metadata'
  }

  useEffect(() => {
    if (assetRef.current) {
      assetRef.current.onload = function () {
        setLoaded(true)
      }
    }

    return () => {
      if (assetRef.current) {
        assetRef.current.onload = null
      }
    }
  }, [assetRef.current])

  const assetProps = useMemo(() => {
    return assetType === 'video'
      ? ({
          ...defaultVideoProps,
          ...props,
          className: classNames({
            [`${props.className}`]: true,
            'asset-loading': !loaded
          }),
          src: assetSource
        } as VideoProps)
      : ({
          ...props,
          className: classNames({
            [`${props.className}`]: true,
            'asset-loading': !loaded
          }),
          src: assetSource
        } as ImgProps)
  }, [assetSource, assetType, props, loaded])

  return (
    <LoadingWrap loading={!assetSource}>
      {assetType === 'video' ? (
        <video
          ref={assetRef as React.MutableRefObject<HTMLVideoElement>}
          {...(assetProps as VideoProps)}
        />
      ) : (
        <Image
          ref={assetRef as React.MutableRefObject<HTMLImageElement>}
          {...(assetProps as ImgProps)}
        />
      )}
    </LoadingWrap>
  )
}
