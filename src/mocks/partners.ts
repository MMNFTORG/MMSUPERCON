import FirestarterLogo from '@assets/partners/firestarter-logo.svg'
import HederaLogo from '@assets/partners/hedera-logo.svg'
import SevaLoveLogo from '@assets/partners/seva-logo.svg'
import SnowballLogo from '@assets/partners/snowball-logo.svg'

export interface IProjectPartner {
  logo: string
  name: string
  url: string
}

export const PARTNERS: Array<IProjectPartner> = [
  {
    logo: SnowballLogo,
    name: 'Snowball money',
    url: 'https://www.snowball.money/'
  },
  {
    logo: FirestarterLogo,
    name: 'Firestarter',
    url: 'https://firestarter.fi/'
  },
  {
    logo: HederaLogo,
    name: 'Hedera',
    url: 'https://hedera.com/'
  },
  {
    logo: SevaLoveLogo,
    name: 'Seva love',
    url: 'https://www.seva.love/'
  }
]
