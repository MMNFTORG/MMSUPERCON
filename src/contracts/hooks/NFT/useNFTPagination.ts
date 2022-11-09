import { useState } from 'react'

export const useNFTPagination = () => {
  const [totalNFTAmount, setTotalNFTAmount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)

  return {
    totalNFTAmount,
    setTotalNFTAmount,
    page,
    setPage
  }
}
