import React, { useMemo } from 'react'

import { DynamicImage } from '@/components'

import { IUseSocialShareProps, useSocialShare } from '@hooks/useSocialShare'

import './ShareWithBlock.scss'

interface IShareWithBlockProps {
  title?: string
  text: string
  longtext?: string
  url?: string
}

export const ShareWithBlock = ({
  text,
  longtext = '',
  url,
  title = 'Share with'
}: IShareWithBlockProps) => {
  const socialShareProps: IUseSocialShareProps = useMemo(
    () => ({
      url: url || window.location.href,
      text,
      longtext
    }),
    [window.location.href, url, text, longtext]
  )
  const { links } = useSocialShare(socialShareProps)

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault()
    await navigator.clipboard.writeText(window.location.href)
  }
  return (
    <div className={'share-with'}>
      <h4 className={'share-with__title'}>{title}</h4>
      <ul className={'share-with__list'}>
        <li>
          <a href={'#'} onClick={handleCopyLink} title={'Copy link'}>
            <DynamicImage path={'copy-icon.svg'} />
          </a>
        </li>
        {links.map(({ link, network }) => (
          <li key={network}>
            <a href={link} target={'_blank'} title={`Share in ${network}`}>
              <DynamicImage path={`socials/${network}.svg`} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
