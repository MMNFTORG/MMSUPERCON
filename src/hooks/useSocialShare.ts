import { useCallback, useEffect, useState } from 'react'

import { objectToGetParams } from '@/utils/object'

export enum SOCIAL_NETWORKS {
  facebook = 'facebook',
  twitter = 'twitter',
  telegram = 'telegram'
}

const generators = {
  [SOCIAL_NETWORKS.facebook]: (params: Record<string, string>) => {
    const { url, text = '', longtext = '' } = params
    return `https://www.facebook.com/sharer/sharer.php${objectToGetParams({
      u: url,
      quote: text || longtext ? `${text} \n${longtext}` : ''
    })}`
  },
  [SOCIAL_NETWORKS.twitter]: (params: Record<string, string>) => {
    const { url, text = '' } = params
    return `https://twitter.com/share${objectToGetParams({
      url,
      text
    })}`
  },
  [SOCIAL_NETWORKS.telegram]: (params: Record<string, string>) => {
    const { url, text = '' } = params
    return `https://telegram.me/share/url${objectToGetParams({
      url,
      text
    })}`
  }
}

export interface IUseSocialShareProps {
  url: string
  text: string
  longtext: string
}

export interface ISocialLink {
  network: SOCIAL_NETWORKS
  link: string
}

export const useSocialShare = ({
  url,
  text,
  longtext
}: IUseSocialShareProps) => {
  const [links, setLinks] = useState<Array<ISocialLink>>([])

  const getNetworkLink = (params: any): string => {
    const { network, url, ...rest }: { network: SOCIAL_NETWORKS; url: string } =
      params

    const key = network

    if (!url) {
      // eslint-disable-next-line
      throw new Error("the 'url' prop can't be undefined")
    }

    return generators[key]({ ...rest, url })
  }

  const getNetworksLinks = useCallback(
    (networks?: Array<SOCIAL_NETWORKS>): void => {
      const _networks: Array<SOCIAL_NETWORKS> = networks || [
        SOCIAL_NETWORKS.facebook,
        SOCIAL_NETWORKS.twitter,
        SOCIAL_NETWORKS.telegram
      ]

      const networksLinks = _networks.map((network: SOCIAL_NETWORKS) => {
        return {
          network,
          link: getNetworkLink({ network, url, text, longtext })
        }
      })

      setLinks(networksLinks)
    },
    [url, text, longtext]
  )

  useEffect(() => {
    getNetworksLinks()
  }, [url, text, longtext])

  return { getNetworksLinks, links }
}
