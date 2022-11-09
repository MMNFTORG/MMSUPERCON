import axios from 'axios'

import { getIPFSGateway } from '@utils/string'

import { ContractAddress } from '../../address'
import { useNftCollection } from '../useNftCollection'

export const useGetContractData = (collectionAddress: ContractAddress) => {
  const { tokenURI } = useNftCollection(collectionAddress)
  const getNFTContractData = async (tokenId: string) => {
    const tokenURIResponse = await tokenURI(tokenId)

    if (!tokenURIResponse) {
      return {
        description: '',
        id: tokenId
      }
    }

    try {
      const { data } = await axios.get(getIPFSGateway(tokenURIResponse))

      return {
        ...data,
        id: tokenId
      }
    } catch (e) {
      return {
        description: '',
        id: tokenId
      }
    }
  }

  return getNFTContractData
}
