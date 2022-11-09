import { ContractAddress } from '@contracts/address'

import { useGetContractData } from './useGetContractData'

export const useGetTokenMetadataById = (collectionAddress: ContractAddress) => {
  const getNFTContractData = useGetContractData(collectionAddress)

  const getTokenMetadataById = (id: string): Promise<any> =>
    new Promise(async (resolve) => {
      const data = await getNFTContractData(id)

      return resolve(data)
    })

  return getTokenMetadataById
}
