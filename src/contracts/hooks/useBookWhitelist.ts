import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNetwork, useTransactions, useWeb3 } from '@firestarter-private/firestarter-library'
import { useWeb3React } from '@web3-react/core'
import { BlockNumber } from 'web3-core'

import { useIsMounted } from '@hooks/useIsMounted'

import { sendExceptionReport } from '@utils/errors'

import { ContractAddress } from '../address'
import { getBookWhitelistContract } from '../getContract'

const PAGE_LIMIT = 200

export const useBookWhitelist = (
  whitelistAddress: ContractAddress | undefined
) => {
  const isMountedRef = useIsMounted()
  const web3 = useWeb3()
  const { account } = useWeb3React()
  const { currentNetworkId } = useNetwork()
  const { callTransaction } = useTransactions()
  const bookWhitelistContract = useMemo(
    () => getBookWhitelistContract(currentNetworkId, whitelistAddress, web3),
    [currentNetworkId, web3, whitelistAddress]
  )

  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false)
  const [allocation, setAllocation] = useState<number>(0)
  const [blockNumber, setBlockNumber] = useState<BlockNumber>('latest')

  const getWhitelistInfo = useCallback(async (): Promise<void> => {
    if (!bookWhitelistContract) {
      return
    }
    try {
      const whitelistedUsersCount = Number(
        await callTransaction(
          bookWhitelistContract!.methods.usersCount(),
          blockNumber
        )
      )

      const pageCount =
        whitelistedUsersCount > PAGE_LIMIT
          ? Math.ceil(whitelistedUsersCount / PAGE_LIMIT)
          : 0

      const promiseArray = []

      for (let i = 0; i <= pageCount; i++) {
        promiseArray.push(
          callTransaction(
            bookWhitelistContract!.methods.getUsers(i, PAGE_LIMIT),
            blockNumber
          )
        )
      }

      const whitelistedUsersList = (await Promise.all(promiseArray)).flat()

      if (whitelistedUsersList.includes(account)) {
        isMountedRef && setIsWhitelisted(true)
      } else {
        isMountedRef && setIsWhitelisted(false)
      }
    } catch (e) {
      sendExceptionReport(e)
    }
  }, [bookWhitelistContract, blockNumber, callTransaction])

  const getAllocation = useCallback(async () => {
    if (!bookWhitelistContract) return
    const allocationSize = await callTransaction(
      bookWhitelistContract!.methods.getAlloc(account),
      blockNumber
    )

    if (isMountedRef) {
      setAllocation(allocationSize)
    }
  }, [bookWhitelistContract, blockNumber, callTransaction])

  useEffect(() => {
    getWhitelistInfo()
  }, [blockNumber, account, bookWhitelistContract])

  useEffect(() => {
    if (isWhitelisted) {
      getAllocation()
    }
  }, [blockNumber, account, bookWhitelistContract, isWhitelisted])

  return {
    isWhitelisted,
    allocation,
    getWhitelistInfo
  }
}
