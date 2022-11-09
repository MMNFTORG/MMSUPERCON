import { NormalizedCollectionInfo, WhitelistAllowance } from '@/components'

type CollectionGetter<T> = (project: NormalizedCollectionInfo) => T

const getIsEmailRequired: CollectionGetter<boolean> = (project) =>
  project.whitelisting.fields.email_required
const getIsTelegramRequired: CollectionGetter<boolean> = (project) =>
  project.whitelisting.fields.telegram_required
const getIsTwitterRequired: CollectionGetter<boolean> = (project) =>
  project.whitelisting.fields.twitter_required
const getIsFollowDSRequired: CollectionGetter<boolean> = (project) =>
  Boolean(project.whitelisting.fields.follow_discord_url)
const getIsFollowTwitterRequired: CollectionGetter<boolean> = (project) =>
  Boolean(project.whitelisting.fields.follow_twitter_url)
const getIsFollowTelegramRequired: CollectionGetter<boolean> = (project) =>
  Boolean(project.whitelisting.fields.follow_telegram_url)
const getWhitelistAllowances: CollectionGetter<WhitelistAllowance[]> = (
  project
) => project.whitelisting.participants_allowed

export const whitelistGetters = {
  getIsEmailRequired,
  getIsTelegramRequired,
  getIsTwitterRequired,
  getIsFollowDSRequired,
  getIsFollowTwitterRequired,
  getIsFollowTelegramRequired,
  getWhitelistAllowances
}
