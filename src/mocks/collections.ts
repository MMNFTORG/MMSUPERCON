import { IPreviewCollection } from '@components/Collections/types'

import { SocialLink, WhitelistAllowance } from '../components'
import {
  CollectionStatuses,
  CollectionStatusesProps,
  CollectionTypes
} from '../components/CollectionPresale/types'

export const COLLECTIONS_LIST: IPreviewCollection[] = [
  {
    id: '0',
    name: 'Collection name 1',
    max_nft_amount: 1,
    assets: {
      logo_image_url:
        'https://storage.googleapis.com/firestarter-web-assets/projects/icnGpPSzKx09ctq28xsj/nft_image/nicky-diamonds-nft-gif.gif'
    }
  },
  {
    id: '1',
    name: 'Collection name 1123',
    max_nft_amount: 100,
    assets: {
      logo_image_url:
        'https://storage.googleapis.com/firestarter-web-assets/projects/icnGpPSzKx09ctq28xsj/nft_image/nicky-diamonds-nft-gif.gif'
    }
  },
  {
    id: '2',
    name: 'Collection name 6456',
    max_nft_amount: 10000,
    assets: {
      logo_image_url:
        'https://storage.googleapis.com/firestarter-web-assets/projects/icnGpPSzKx09ctq28xsj/nft_image/nicky-diamonds-nft-gif.gif'
    }
  },
  {
    id: '3',
    name: 'Collection name 12312',
    max_nft_amount: 500,
    assets: {
      logo_image_url:
        'https://storage.googleapis.com/firestarter-web-assets/projects/icnGpPSzKx09ctq28xsj/nft_image/nicky-diamonds-nft-gif.gif'
    }
  },
  {
    id: '12321',
    name: 'Collection name 312',
    max_nft_amount: 5000,
    assets: {
      logo_image_url:
        'https://storage.googleapis.com/firestarter-web-assets/projects/icnGpPSzKx09ctq28xsj/nft_image/nicky-diamonds-nft-gif.gif'
    }
  }
]

export const COLLECTION = {
  id: '1',
  name: 'FireStarter',
  network: 'POLYGON',
  chainId: '137',
  project_type: CollectionTypes.collection,
  info: {
    subtitle: 'Launchpad for IMO',
    description: '<p>Firestarter is the first launchpad...</p>',
    main_color: 'FFAA00',
    bio: {
      title: 'Some title',
      image: 'https://link.to/some/image.png',
      text: '<p>Some interesting facts from bio or collection histore</p>'
    }
  },
  assets: {
    logo_image_url:
      'https://storage.googleapis.com/firestarter-web-assets/projects/icnGpPSzKx09ctq28xsj/nft_image/nicky-diamonds-nft-gif.gif',
    nft_image_url: 'https://link.to/collection/nft/image.svg'
  },
  settings: {
    is_external_presale: false,
    multiple_vesting: false
  },
  social_links: [
    {
      name: 'web',
      url: 'https://preview.firestarter.fi'
    },
    {
      name: 'twitter',
      url: 'https://twitter.com'
    },
    {
      name: 'telegram',
      url: 'https://telegram.com'
    },
    {
      name: 'medium',
      url: 'https://medium.com'
    },
    {
      name: 'discord',
      url: 'https://discord.com'
    }
  ] as SocialLink[],
  whitelisting: {
    starts_at: new Date(),
    end_at: new Date(),
    country_restrictions: ['USA', 'SYR', 'IRN'],
    participants_allowed: ['locked', 'staked', 'hiro'] as WhitelistAllowance[],
    allow_exclusives: true,
    fields: {
      email_required: true,
      telegram_required: true,
      twitter_required: true,
      follow_twitter_url: 'https://twitter.com/collection-username',
      follow_telegram_url: 'https://t.me/collection-telegram-channel',
      follow_discord_url: 'https://discord.com/invite/invite-code'
    }
  },
  presale: {
    private_starts_at: new Date(),
    private_end_at: new Date(),
    public_starts_at: new Date(),
    public_end_at: new Date(),
    min_allocation: 0,
    max_allocation: 300,
    presale_contract_address: '0x0',
    vesting_contract_address: '0x0',
    whitelist_contract_address: '0x0',
    release_schedule: '/pdf/FLAME_release_schedule.pdf',
    fund_token: {
      name: 'BUSD',
      address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      icon: '/token-logos/USDC.svg'
    },
    reward_token: {
      name: 'FLAME',
      address: '0x79068a4D63997cC4b553B3aa230026885135E128',
      icon: '/token-logos/USDC.svg'
    },
    status: CollectionStatuses.active,
    statusMessage: CollectionStatusesProps['Live']
  },
  saft: {
    official_company_name: 'Fire Labs LTD.',
    company_registration_data: 'Info about registration of company',
    contact_email: 'info@firestarter.finance',
    exchange_rate: 0.06
  },
  created_at: 1627394759766,
  updated_at: 1627394759766,
  stats: {
    total_NFTs: 10,
    sold_for: {
      tokenAmount: 11.2
    },
    sold_NFTs: 3
  }
}
