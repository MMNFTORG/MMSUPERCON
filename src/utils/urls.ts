import axios from 'axios'

import { sendExceptionReport } from './errors'

export const hasFileExtension = (url: string): boolean =>
  /(.webm|.mp4|.m4v|.ogg|.ogv|.mov|.gif|.svg|.png|.jpg|.jpeg)$/i.test(url)

export const isVideoUrl = (url: string): boolean =>
  /(.webm|.mp4|.m4v|.ogg|.ogv|.mov)$/i.test(url)

export const getAssetWithType = async (
  url: string
): Promise<{
  contentType: string | undefined
  source: string
}> => {
  try {
    const response = await axios.request({
      method: 'HEAD',
      url,
      maxRedirects: 0
    })

    return {
      contentType: response.headers['content-type'].split('/')[0],
      source: response.request.responseURL || url
    }
  } catch (err) {
    sendExceptionReport(`Error with loading asset ${url}`)

    return {
      contentType: undefined,
      source: url
    }
  }
}
