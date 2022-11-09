export interface ISocialLink {
  name:
    | 'web'
    | 'twitter'
    | 'telegram'
    | 'medium'
    | 'discord'
    | 'facebook'
    | 'instagram'
    | 'youtube'
    | 'linkedin'
  url: string
}

export const SOCIAL_LINKS: ISocialLink[] = [
  {
    name: 'twitter',
    url: 'https://twitter.com/mill_mentor'
  },
  {
    name: 'telegram',
    url: 'https://t.me/whitelabalproject'
  },
  {
    name: 'discord',
    url: 'https://discord.gg/whitelabalproject'
  },
  {
    name: 'facebook',
    url: 'https://www.facebook.com/millimentor/'
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/Millionaire_Mentor/'
  },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/channel/UCnzXXulZ9NhVmefDELf5G9w'
  }
]
