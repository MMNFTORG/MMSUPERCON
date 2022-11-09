import { INormalizedAuctionSale } from '@/components'

import { Auction } from '@contracts/hooks/useNftAuction'
import { NftSale } from '@contracts/hooks/useNftSale'

import { NormalizedCollectionInfo } from '../components/CollectionPresale/types'

export enum ActionType {
  SET_LOADING,
  SET_COLLECTIONS,
  SET_WHITElLISTED_COLLECTIONS,
  SET_COLLECTION,
  SET_FETCHING_NFT_COLLECTION,
  SET_USER_NFTS,
  ADD_USER_NFTS,
  SET_NFT_TOKENS,
  ADD_NFT_TOKENS,
  SET_FETCHING_CURRENT_NFT,
  SET_CURRENT_NFT,
  SET_AUCTION_CONTRACT_DATA,
  SET_AUCTION_BACKEND_DATA,
  SET_FETCHING_AUCTION,
  SET_CURRENT_SALE,
  SET_LOADING_MARKET_STATS,
  SET_MARKET_STATS
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  id: string
}

export interface StateNFT {
  fetchingCollection: boolean
  fetchingCurrentToken: boolean
  NFTTokens: NFTMetadata[] | null
  userNFTTokens: NFTMetadata[] | null
  currentNFT: NFTMetadata | null
}

export interface StateAuction {
  loading: boolean
  currentAuction: IStateAuctionSale
}

export interface SetLoading {
  type: ActionType.SET_LOADING
  payload?: boolean
}

export interface SetCollections {
  type: ActionType.SET_COLLECTIONS
  payload: NormalizedCollectionInfo[]
}

export interface SetWhitelistedCollections {
  type: ActionType.SET_WHITElLISTED_COLLECTIONS
  payload: NormalizedCollectionInfo[]
}

export interface SetCollection {
  type: ActionType.SET_COLLECTION
  payload: NormalizedCollectionInfo | null
}

export interface SetCurrentSale {
  type: ActionType.SET_CURRENT_SALE
  payload: NftSale | null
}

export interface SetFetchingNFTCollection {
  type: ActionType.SET_FETCHING_NFT_COLLECTION
  payload: boolean
}

export interface SetFetchingCurrentNFT {
  type: ActionType.SET_FETCHING_CURRENT_NFT
  payload: boolean
}

export interface SetUserNFTs {
  type: ActionType.SET_USER_NFTS
  payload: NFTMetadata[] | null
}

export interface AddUserNFTs {
  type: ActionType.ADD_USER_NFTS
  payload: NFTMetadata[]
}

export interface SetNFTTokens {
  type: ActionType.SET_NFT_TOKENS
  payload: NFTMetadata[] | null
}

export interface AddNFTTokens {
  type: ActionType.ADD_NFT_TOKENS
  payload: NFTMetadata[]
}

export interface SetCurrentNFT {
  type: ActionType.SET_CURRENT_NFT
  payload: NFTMetadata | null
}

export interface SetAuctionContractData {
  type: ActionType.SET_AUCTION_CONTRACT_DATA
  payload: Auction | null
}

export interface SetAuctionBackendData {
  type: ActionType.SET_AUCTION_BACKEND_DATA
  payload: INormalizedAuctionSale | null
}

export interface SetFetchingAuction {
  type: ActionType.SET_FETCHING_AUCTION
  payload: boolean
}

export interface SetFetchingMarketStats {
  type: ActionType.SET_LOADING_MARKET_STATS
  payload: boolean
}

export interface SetMarketStats {
  type: ActionType.SET_MARKET_STATS
  payload: IMarketStats
}

export type StateAction =
  | SetLoading
  | SetCollections
  | SetWhitelistedCollections
  | SetCollection
  | SetCurrentSale
  | SetUserNFTs
  | AddUserNFTs
  | SetFetchingNFTCollection
  | SetCurrentNFT
  | SetFetchingCurrentNFT
  | SetNFTTokens
  | AddNFTTokens
  | SetAuctionContractData
  | SetAuctionBackendData
  | SetFetchingAuction
  | SetMarketStats
  | SetFetchingMarketStats

export type StateLoading = boolean
export type StateCollections = NormalizedCollectionInfo[] | null
export type StateCurrentCollection = NormalizedCollectionInfo | null
export type StateCurrentSale = NftSale | null

export type StateAuctionSaleContractData = Auction | null
export type StateAuctionSaleBackendData = INormalizedAuctionSale | null

export interface IStateAuctionSale {
  contractData: StateAuctionSaleContractData
  backendData: StateAuctionSaleBackendData
}

export interface IMarketStats {
  total: number
  [key: string]: string | number
}

export interface IMarketState {
  stats: IMarketStats | null
  statsLoading: boolean
}

export interface AppState {
  loading: StateLoading
  collections: StateCollections
  whitelistedCollections: StateCollections
  currentCollection: StateCurrentCollection
  currentSale: StateCurrentSale
  NFT: StateNFT
  auction: StateAuction
  market: IMarketState
}
