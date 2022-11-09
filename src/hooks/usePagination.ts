import { useMemo } from 'react'

export interface IPaginationState {
  currentPage: number
  totalPages: number
}

interface IUsePaginationArgs {
  paginationState: IPaginationState
}

const PAGINATION_LIST_LENGTH = 5
const START_PAGINATION_GAP = 3

export const usePagination = ({ paginationState }: IUsePaginationArgs) => {
  const showedPages = useMemo(() => {
    if (paginationState.currentPage <= PAGINATION_LIST_LENGTH) {
      return new Array(PAGINATION_LIST_LENGTH)
        .fill(null)
        .map((_, index) => index + 1)
    }
    if (
      paginationState.currentPage >=
      paginationState.totalPages - START_PAGINATION_GAP
    ) {
      return new Array(PAGINATION_LIST_LENGTH)
        .fill(null)
        .map((_, index) => paginationState.totalPages - index)
        .sort((a, b) => a - b)
    }
    return new Array(PAGINATION_LIST_LENGTH)
      .fill(null)
      .map(
        (_, index) =>
          paginationState.currentPage - START_PAGINATION_GAP + index + 1
      )
  }, [paginationState])

  const showLastPage: boolean =
    paginationState.currentPage <
    paginationState.totalPages - START_PAGINATION_GAP

  return { showedPages, showLastPage }
}
