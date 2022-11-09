import { defaultEnvironmentNetworkId } from '@firestarter-private/firestarter-library/lib/constants/networks'
import { web3NoAccountInstances } from '@firestarter-private/firestarter-library/lib/constants/web3'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import { sendExceptionReport } from '../utils/errors'

import bookWhitelistAbi from './abis/bookWhitelist.json'
import nftAuctionAbi from './abis/nftAuction.json'
import nftCollectionAbi from './abis/nftCollection.json'
import nftSaleAbi from './abis/nftSale.json'
import nftWhitelistAbi from './abis/nftWhitelist.json'
import { ContractAddress, NFT_AUCTION_ADDRESS } from './address'

const getContract = (
  abi: any,
  address: string,
  chainId: string,
  web3?: Web3
) => {
  const _web3 = web3 ?? web3NoAccountInstances[chainId]
  return new _web3.eth.Contract(abi as AbiItem, address)
}

export const getNftSaleContract = (
  currentChainId: string | undefined,
  address: ContractAddress | undefined,
  web3?: Web3
) => {
  if (currentChainId !== defaultEnvironmentNetworkId) {
    sendExceptionReport(
      new Error('Calling internal contract with a non default network')
    )
    return null
  }
  return Web3.utils.isAddress(address ?? '')
    ? getContract(nftSaleAbi, address!, defaultEnvironmentNetworkId, web3)
    : null
}

export const getBookWhitelistContract = (
  currentChainId: string | undefined,
  address: ContractAddress | undefined,
  web3?: Web3
) => {
  if (!currentChainId || !address) {
    return null
  }
  if (currentChainId !== defaultEnvironmentNetworkId) {
    sendExceptionReport(
      new Error('Calling internal contract with a non default network')
    )
    return null
  }
  return Web3.utils.isAddress(address ?? '')
    ? getContract(bookWhitelistAbi, address!, defaultEnvironmentNetworkId, web3)
    : null
}

export const getNftWhitelistContract = (
  currentChainId: string | undefined,
  address: ContractAddress | undefined,
  web3?: Web3
) => {
  if (!currentChainId || !address) {
    return null
  }
  if (currentChainId !== defaultEnvironmentNetworkId) {
    sendExceptionReport(
      new Error('Calling internal contract with a non default network')
    )
    return null
  }
  return Web3.utils.isAddress(address ?? '')
    ? getContract(nftWhitelistAbi, address!, defaultEnvironmentNetworkId, web3)
    : null
}

export const getNftAuctionContract = (
  currentChainId: string | undefined,
  web3?: Web3
) => {
  if (!currentChainId) {
    return null
  }
  if (currentChainId !== defaultEnvironmentNetworkId) {
    sendExceptionReport(
      new Error('Calling internal contract with a non default network')
    )
    return null
  }

  return Web3.utils.isAddress(NFT_AUCTION_ADDRESS ?? '')
    ? getContract(
        nftAuctionAbi,
        NFT_AUCTION_ADDRESS!,
        defaultEnvironmentNetworkId,
        web3
      )
    : null
}

export const getNftCollectionContract = (
  currentChainId: string | undefined,
  address: ContractAddress | undefined,
  web3?: Web3
) => {
  return Web3.utils.isAddress(address ?? '')
    ? getContract(nftCollectionAbi, address!, defaultEnvironmentNetworkId, web3)
    : null
}
