import { NetworkName } from '@firestarter-private/firestarter-library/lib/constants/networks'
import BigNumber from 'bignumber.js'
export type ContractAddress = string
export type PresaleStatus = 'open' | 'closed'

export enum CollectionStatuses {
  private = 'private',
  coming_soon = 'coming_soon',
  active = 'active',
  completed = 'completed'
}

export enum CollectionTypes {
  token_presale = 'token_presale',
  NFT_presale = 'NFT_presale',
  NFT_claim = 'NFT_claim',
  collection = 'collection'
}

export type CollectionType = keyof typeof CollectionTypes

export type CollectionStatus = keyof typeof CollectionStatuses

export enum CollectionStatusesProps {
  'Coming Soon' = 'Coming Soon',
  'Registration Open' = 'Registration Open',
  'Registration Closed' = 'Registration Closed',
  'Private Live' = 'Private Live',
  Live = 'Live',
  Closed = 'Closed'
}

export type CollectionStatusProp = keyof typeof CollectionStatusesProps

export enum WhitelistAllowances {
  all = 'all', // allow whitelisting for all KYC'd users
  locked = 'locked', // allow whitelisting for users with locked flame
  staked = 'staked', // allow whitelisting for users with staked lp tokens
  hiro = 'hiro' // allow whitelisting for Hiro owners
}

export type WhitelistAllowance = keyof typeof WhitelistAllowances

export enum SocialMedias {
  web = 'web',
  twitter = 'twitter',
  telegram = 'telegram',
  medium = 'medium',
  discord = 'discord',
  instagram = 'instagram'
}

export enum WhitelistType {
  BOOK = 0,
  MERKLE = 1,
  NFT = 2
}

export type SocialMedia = keyof typeof SocialMedias

export type TokenName = string

export interface TokenInfo {
  name: TokenName
  address: ContractAddress
  icon?: string
}

export type NftCollectionTypes = 'ERC721' | 'ERC1155'

export interface NftTokenInfo extends Omit<TokenInfo, 'address'> {
  address: ContractAddress
  type: NftCollectionTypes
}

export interface SocialLink {
  name: SocialMedia
  url: string
}

export interface DatesInterval {
  starts_at: string | null
  end_at: string | null
}

export interface PresaleDates {
  public_starts_at?: string | null
  public_end_at?: string | null
  private_starts_at?: string | null
  private_end_at?: string | null
}

type NormalizeDates<T extends object> = {
  [K in keyof T]: Date | null
}

export type NormalizedDatesInterval = NormalizeDates<DatesInterval>
export type NormalizedPresaleDates = NormalizeDates<PresaleDates>

export interface WhitelistingFields {
  email_required: boolean
  telegram_required: boolean
  twitter_required: boolean
  follow_twitter_url: string | null
  follow_telegram_url: string | null
  follow_discord_url: string | null
}

export interface WhitelistingInfo extends DatesInterval {
  country_restrictions: string[]
  allow_exclusives: boolean
  participants_allowed: WhitelistAllowance[]
  fields: WhitelistingFields
}

export interface NormalizedWhitelistingInfo
  extends Omit<WhitelistingInfo, 'starts_at' | 'end_at'>,
    NormalizedDatesInterval {}

export interface PresaleInfo extends PresaleDates {
  min_allocation?: number
  max_allocation?: number
  presale_contract_address?: ContractAddress
  vesting_contract_address?: ContractAddress
  whitelist_contract_address: ContractAddress
  fund_token: TokenInfo
  reward_token: NftTokenInfo
  status: CollectionStatus
  release_schedule?: string
  external_presale_link?: string
  whitelisting_phases: IWhitelistPhase[]
}

export interface NormalizedPresaleInfo
  extends Omit<
      PresaleInfo,
      | 'public_starts_at'
      | 'public_end_at'
      | 'private_starts_at'
      | 'private_end_at'
    >,
    NormalizedPresaleDates {
  statusMessage: CollectionStatusProp
  currentPhase: IWhitelistPhase
}

export interface SAFTInfo {
  official_company_name: string
  company_registration_data: string
  contact_email: string
  exchange_rate: number
}

export interface CollectionBio {
  title: string
  image?: string
  text: string
}

export interface CollectionInfo {
  subtitle?: string
  description: string
  main_color: string
  bio?: CollectionBio
}

export interface CollectionAssets {
  logo_image_url: string
  nft_image_url?: string
}

export interface CollectionSettings {
  multiple_vesting: boolean
  is_external_presale: boolean
}

export interface IWhitelistPhase extends WhitelistingInfo {
  whitelisting_disabled: boolean
  whitelist_type: WhitelistType
  presale_starts_at: string
  presale_ends_at: string
  price: BigNumber
  name: string
  phase_id: number
  max_nft_buy_limit: number
  user_cap: number
  whitelist_address: ContractAddress
}

export interface IArtist {
  name: string
  image: string
}

export interface CollectionResponseInfo {
  id: string
  name: string
  network: NetworkName
  chainId: number | string
  project_type: CollectionType
  info: CollectionInfo
  assets: CollectionAssets
  settings: CollectionSettings
  social_links: SocialLink[]
  whitelisting: WhitelistingInfo
  presale: PresaleInfo
  saft?: SAFTInfo
  created_at: number
  updated_at: number
  project_id: string
  NFT_address: string
  opensea_link?: string
  max_nft_amount: number
  artist: IArtist
}

export interface NormalizedCollectionInfo
  extends Omit<CollectionResponseInfo, 'presale' | 'whitelisting' | 'chainId'> {
  chainId: string
  whitelisting: NormalizedWhitelistingInfo
  presale: NormalizedPresaleInfo
}
