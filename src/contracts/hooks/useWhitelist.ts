import { useCallback, useEffect, useMemo, useState } from 'react'
import { StateCurrentSale } from '@store/types'
import { useWeb3React } from '@web3-react/core'

import { IWhitelistPhase, WhitelistType } from '@/components'

import { getWhitelistData } from '@api/index'
import { sendDataForWhitelist } from '@api/whitelist/applyToWhitelist'
import { WhitelistStatus, WhitelistStatuses } from '@api/whitelist/types'

import { useBookWhitelist } from '@contracts/hooks/useBookWhitelist'
import { useNftWhitelist } from '@contracts/hooks/useNftWhitelist'

import { useIsMounted } from '@hooks/useIsMounted'
import { useSelector } from '@hooks/useSelector'

import { isEmptyObject } from '@utils/object'

export const useWhitelist = (projectId?: string, collectionId?: string) => {
  const isMountedRef = useIsMounted()
  const { account } = useWeb3React()
  const currentPhase = useSelector<IWhitelistPhase>(
    (state) => state.currentCollection?.presale.currentPhase
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [whitelistStatus, setStatus] = useState<WhitelistStatus>()
  const [allocation, setAllocation] = useState(0)
  const [merkleProof, setProof] = useState<string[]>()
  const { isWhitelisted: isBookWhitelisted, allocation: bookAllocation } =
    useBookWhitelist(
      currentPhase?.whitelist_type === WhitelistType.BOOK
        ? currentPhase?.whitelist_address
        : undefined
    )

  const {
    isWhitelisted: isNftWhitelisted,
    allocation: nftAllocation,
    allocPerItem
  } = useNftWhitelist(
    currentPhase?.whitelist_type === WhitelistType.NFT
      ? currentPhase.whitelist_address
      : undefined
  )

  const resetStatus = () => {
    setStatus(undefined)
  }
  const resetAllo = () => {
    setAllocation(0)
    setProof(undefined)
  }

  const getStatusAndAllo = useCallback(async () => {
    if (!account || !projectId) {
      resetStatus()
      resetAllo()
      return
    }
    setLoading(true)

    const data = await getWhitelistData({
      account,
      projectId
    })

    if (!isMountedRef.current) {
      return
    }

    if (!data) {
      setStatus(WhitelistStatuses['not_submitted'])
      resetAllo()
      setLoading(false)
      return
    }

    setStatus(data.status)
    if (data.paramsData && !isEmptyObject(data.paramsData)) {
      const { private_allocation, merkle_proof } = data.paramsData
      setAllocation(Number(private_allocation))
      setProof(merkle_proof)
    }
    setLoading(false)
  }, [account, projectId, isMountedRef])

  const applyToWhitelist = useCallback(
    async (formData) => {
      if (!account || !collectionId) {
        return null
      }
      const status = await sendDataForWhitelist({
        collection_id: collectionId,
        wallet_address: account,
        form_data: formData
      })

      if (status) {
        setStatus(status)
      }
      return status
    },
    [collectionId, account]
  )

  useEffect(() => {
    getStatusAndAllo()
    return setStatus(undefined)
  }, [projectId, account])

  const currentSaleAllocation = useMemo(() => {
    if (currentPhase?.whitelist_type === WhitelistType.BOOK) {
      return bookAllocation
    } else if (currentPhase?.whitelist_type === WhitelistType.MERKLE) {
      return allocation
    } else if (currentPhase?.whitelist_type === WhitelistType.NFT) {
      return allocPerItem
    }
    return 0
  }, [bookAllocation, currentPhase, allocation, nftAllocation, allocPerItem])

  const isCurrentSaleWhitelisted = useMemo(() => {
    if (currentPhase?.whitelist_type === WhitelistType.BOOK) {
      return currentPhase.whitelisting_disabled
        ? isBookWhitelisted
        : isBookWhitelisted && whitelistStatus === WhitelistStatuses.passed
    } else if (currentPhase?.whitelist_type === WhitelistType.MERKLE) {
      return whitelistStatus === WhitelistStatuses.passed
    } else if (currentPhase?.whitelist_type === WhitelistType.NFT) {
      return isNftWhitelisted
    }
    return false
  }, [whitelistStatus, isNftWhitelisted, isBookWhitelisted, currentPhase])

  return {
    whitelistStatus,
    allocation: currentSaleAllocation,
    remainingAllocation: nftAllocation,
    isWhitelisted: isCurrentSaleWhitelisted,
    merkleProof,
    applyToWhitelist,
    loading
  }
}
