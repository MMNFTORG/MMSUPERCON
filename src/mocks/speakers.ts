import { ISocialLink } from '@/constants'

export enum SpeakersTopicEnum {
  WEB3 = 'Web3',
  SALES = 'Sales',
  MARKETING = 'Marketing',
  PERSONAL_DEVELOPMENT = 'Personal development',
  SOCIAL_MEDIA = 'Social media',
  ECOMMERCE = 'Ecommerce',
  REAL_ESTATE = 'Real estate',
  PERSONAL_FINANCE = 'Personal finance',
  FITNESS = 'Fitness',
  LAW = 'Law',
  KEYNOTE = 'Keynote speakers'
}

export interface ISpeaker {
  id: number
  name: string
  avatar: string
  topic: SpeakersTopicEnum
  socialMedia?: ISocialLink[]
}

const KEYNOTE_SPEAKERS_IDS = [0, 1, 2, 3]

const KEYNOTE_SPEAKERS: Array<ISpeaker> = [
  {
    id: 23,
    name: 'Depak Chopra',
    avatar: 'depak_chopra.png',
    topic: SpeakersTopicEnum.KEYNOTE,
    socialMedia: [
      {
        name: 'twitter',
        url: 'https://twitter.com/deepakchopra'
      },
      {
        name: 'web',
        url: 'https://www.deepakchopra.com/'
      }
    ]
  },
  {
    id: 24,
    name: 'Gary Vee',
    avatar: 'gary_vee.png',
    topic: SpeakersTopicEnum.KEYNOTE,
    socialMedia: [
      {
        name: 'twitter',
        url: 'https://twitter.com/garyvee'
      },
      {
        name: 'web',
        url: 'https://www.garyvaynerchuk.com/'
      }
    ]
  },
  {
    id: 25,
    name: 'Jordan Belfort',
    avatar: 'jordan_belfort.png',
    topic: SpeakersTopicEnum.KEYNOTE,
    socialMedia: [
      {
        name: 'twitter',
        url: 'https://twitter.com/wolfofwallst'
      },
      {
        name: 'web',
        url: 'https://jb.online/'
      }
    ]
  },
  {
    id: 26,
    name: 'Logan Paul',
    avatar: 'logan_paul.png',
    topic: SpeakersTopicEnum.KEYNOTE,
    socialMedia: [
      {
        name: 'twitter',
        url: 'https://twitter.com/LoganPaul'
      },
      {
        name: 'instagram',
        url: 'https://www.instagram.com/loganpaul'
      }
    ]
  },
  {
    id: 27,
    name: 'Kyle “Hedera”',
    avatar: 'kyle_hedera.png',
    topic: SpeakersTopicEnum.KEYNOTE,
    socialMedia: [
      {
        name: 'twitter',
        url: 'https://twitter.com/ArmourNFT'
      },
      {
        name: 'web',
        url: 'https://www.nft.com/'
      }
    ]
  }
]

const WEB3_SPEAKERS: Array<ISpeaker> = [
  {
    id: 4,
    name: 'Shane Edwards',
    avatar: 'shane_edwards.png',
    topic: SpeakersTopicEnum.WEB3
  },
  {
    id: 5,
    name: 'Randal Warren',
    avatar: 'randal_warren.png',
    topic: SpeakersTopicEnum.WEB3
  },
  {
    id: 6,
    name: 'Dustin Richards',
    avatar: 'dustin_richards.png',
    topic: SpeakersTopicEnum.WEB3
  },
  {
    id: 7,
    name: 'Kristin Hawkins',
    avatar: 'dustin_richards.png',
    topic: SpeakersTopicEnum.WEB3
  }
]

const SALES_SPEAKERS: Array<ISpeaker> = [
  {
    id: 8,
    name: 'Shane Edwards',
    avatar: 'shane_edwards1.png',
    topic: SpeakersTopicEnum.SALES
  },
  {
    id: 9,
    name: 'Dustin Richards',
    avatar: 'dustin_richards1.png',
    topic: SpeakersTopicEnum.SALES
  },
  {
    id: 10,
    name: 'Kristin Hawkins',
    avatar: 'randal_warren1.png',
    topic: SpeakersTopicEnum.SALES
  },
  {
    id: 11,
    name: 'Jesse Wellens',
    avatar: 'randal_warren1.png',
    topic: SpeakersTopicEnum.SALES
  },
  {
    id: 0,
    name: 'Jesse Wellens',
    avatar: 'jesse_wellens.png',
    topic: SpeakersTopicEnum.SALES
  }
]

const MARKETING_SPEAKERS: Array<ISpeaker> = [
  {
    id: 1,
    name: 'Kevin Hart',
    avatar: 'kevin_hart.png',
    topic: SpeakersTopicEnum.MARKETING,
    socialMedia: [
      {
        name: 'twitter',
        url: 'https://twitter.com/KevinHart4real'
      },
      {
        name: 'facebook',
        url: 'https://www.facebook.com/hartkevin'
      }
    ]
  },
  {
    id: 12,
    name: 'Shane Edwards',
    avatar: 'shane_edwards.png',
    topic: SpeakersTopicEnum.MARKETING
  },
  {
    id: 13,
    name: 'Randal Warren',
    avatar: 'randal_warren.png',
    topic: SpeakersTopicEnum.MARKETING
  },
  {
    id: 14,
    name: 'Dustin Richards',
    avatar: 'dustin_richards.png',
    topic: SpeakersTopicEnum.MARKETING
  }
]

const SOCIAL_SPEAKERS: Array<ISpeaker> = [
  {
    id: 2,
    name: 'Jimmy',
    avatar: 'kevin_hart.png',
    topic: SpeakersTopicEnum.SOCIAL_MEDIA
  },
  {
    id: 3,
    name: 'Jimmy 2',
    avatar: 'kevin_hart.png',
    topic: SpeakersTopicEnum.SOCIAL_MEDIA
  },
  {
    id: 19,
    name: 'Dustin Richards',
    avatar: 'dustin_richards1.png',
    topic: SpeakersTopicEnum.SOCIAL_MEDIA
  },
  {
    id: 20,
    name: 'Kristin Hawkins',
    avatar: 'randal_warren1.png',
    topic: SpeakersTopicEnum.SOCIAL_MEDIA
  },
  {
    id: 21,
    name: 'Jesse Wellens',
    avatar: 'randal_warren1.png',
    topic: SpeakersTopicEnum.SOCIAL_MEDIA
  },
  {
    id: 22,
    name: 'Jesse Wellens',
    avatar: 'jesse_wellens.png',
    topic: SpeakersTopicEnum.SOCIAL_MEDIA
  }
]

const PERSONAL_DEVELOPMENT_SPEAKERS: Array<ISpeaker> = [
  {
    id: 15,
    name: 'Dustin Richards',
    avatar: 'dustin_richards1.png',
    topic: SpeakersTopicEnum.PERSONAL_DEVELOPMENT
  },
  {
    id: 16,
    name: 'Kristin Hawkins',
    avatar: 'randal_warren1.png',
    topic: SpeakersTopicEnum.PERSONAL_DEVELOPMENT
  },
  {
    id: 17,
    name: 'Jesse Wellens',
    avatar: 'randal_warren1.png',
    topic: SpeakersTopicEnum.PERSONAL_DEVELOPMENT
  },
  {
    id: 18,
    name: 'Jesse Wellens',
    avatar: 'jesse_wellens.png',
    topic: SpeakersTopicEnum.PERSONAL_DEVELOPMENT
  }
]

export const SPEAKERS: Array<ISpeaker> = [
  ...WEB3_SPEAKERS,
  ...WEB3_SPEAKERS,
  ...SALES_SPEAKERS,
  ...MARKETING_SPEAKERS,
  ...SOCIAL_SPEAKERS,
  ...PERSONAL_DEVELOPMENT_SPEAKERS,
  ...KEYNOTE_SPEAKERS
]

export const getSpeakersByTopic = (
  topic: SpeakersTopicEnum,
  speakers: ISpeaker[] = SPEAKERS
) => {
  return speakers.filter((speaker) => speaker.topic === topic)
}

export const getKeynoteSpeakers = (
  speakers: ISpeaker[] | undefined = SPEAKERS
) => {
  return getSpeakersByTopic(SpeakersTopicEnum.KEYNOTE, speakers)
}
