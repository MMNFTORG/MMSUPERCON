import { useEffect, useState } from 'react'

import { getAssetWithType, hasFileExtension, isVideoUrl } from '@utils/urls'

export const useAssetWithType = (url?: string) => {
  const [assetType, setAssetType] = useState<string | undefined>('image')
  const [assetSource, setAssetSource] = useState('')

  const getAsset = async () => {
    if (!url) return
    if (hasFileExtension(url)) {
      setAssetType(isVideoUrl(url) ? 'video' : 'image')
      setAssetSource(url)
      return
    }
    const { contentType, source } = await getAssetWithType(url as string)
    setAssetType(contentType)
    setAssetSource(source)
  }

  useEffect(() => {
    if (url) {
      getAsset()
    }
  }, [url])

  return {
    assetType,
    assetSource
  }
}
