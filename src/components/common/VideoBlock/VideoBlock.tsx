import React, { useRef, useState } from 'react'
import { Image } from 'react-bootstrap'
import YouTube from 'react-youtube'

import { DynamicImage } from '@/components'

import './VideoBlock.scss'

interface IVideoBlockProps {
  videoId: string
  posterImage: string
}

export const VideoBlock = ({
  posterImage,
  videoId
}: IVideoBlockProps): JSX.Element => {
  const [played, setPlayed] = useState<boolean>(false)
  const videoRef = useRef<YouTube>(null)

  const opts: Record<string, any> = {
    height: '460',
    width: '816',
    playerVars: {
      autoplay: 1
    }
  }

  const playHandler = () => {
    setPlayed(true)
    setTimeout(() => videoRef?.current?.internalPlayer?.playVideo(), 300)
  }

  return (
    <div className="video-block">
      {played ? (
        <div className="video-block__player">
          <YouTube ref={videoRef} videoId={videoId} opts={opts} />
        </div>
      ) : (
        <div className="video-block__poster">
          <Image src={posterImage} />

          <button className="video-block__play-btn" onClick={playHandler}>
            <DynamicImage path={'video-play-btn.svg'} />
          </button>
        </div>
      )}
    </div>
  )
}
