import { ISocialLink } from '@/constants'

export interface IPerson {
  avatar: string
  name: string
  bio: string
  socialLinks?: ISocialLink[]
}
