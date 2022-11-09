import CryptoNewsGlobalLogo from '@assets/about-us/socials/crypto-news-global.png'
import JasonLogo from '@assets/about-us/socials/jason-stone.png'
import Meta8verseLogo from '@assets/about-us/socials/met8verse.png'
import MillmentorLogo from '@assets/about-us/socials/millmentor.png'
import NftNewsGlobalLogo from '@assets/about-us/socials/nft-news-global.png'
import TwitterLogo from '@assets/about-us/socials/twitter.png'

export interface IJasonMedia {
  image: string
  link: string
  name: string
}

export const JASON_MEDIAS = [
  {
    image: MillmentorLogo,
    link: 'https://instagram.com/millionaire_mentor',
    name: '@millionaire\n' + '_mentor'
  },
  {
    image: JasonLogo,
    link: 'https://instagram.com/jason__stone',
    name: 'jason__stone'
  },
  {
    image: NftNewsGlobalLogo,
    link: 'https://instagram.com/NFT.newsglobal',
    name: 'NFT.newsglobal'
  },
  {
    image: Meta8verseLogo,
    link: 'https://instagram.com/Met8verse',
    name: 'Met8verse'
  },
  {
    image: CryptoNewsGlobalLogo,
    link: 'https://instagram.com/crypto.newsglobal',
    name: 'crypto.newsglobal'
  },
  {
    image: TwitterLogo,
    link: 'https://twitter.com/Mill_Mentor?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
    name: 'Twitter'
  }
]
