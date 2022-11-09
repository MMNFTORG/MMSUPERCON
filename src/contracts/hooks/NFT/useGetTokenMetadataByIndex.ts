import { ContractAddress, WalletAddress } from '../../address'
import { useNftCollection } from '../useNftCollection'

import { useGetContractData } from './useGetContractData'

export const useGetUserTokenMetadataByIndex = (
  collectionAddress: ContractAddress
) => {
  const { tokenOfOwnerByIndex } = useNftCollection(collectionAddress)
  const getNFTContractData = useGetContractData(collectionAddress)

  const getUserTokenMetadataByIndex = (
    account: WalletAddress,
    index: number
  ): Promise<any> =>
    new Promise(async (resolve) => {
      const id = await tokenOfOwnerByIndex(account, index)

      const data = await getNFTContractData(id)

      return resolve(data)
    })

  return getUserTokenMetadataByIndex
}
