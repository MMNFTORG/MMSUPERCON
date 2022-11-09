import { useMemo } from 'react'
import { QueryResults, useMedia } from 'react-media'

interface IMediaQueries {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

const MEDIA_QUERIES: IMediaQueries = {
  xs: '(min-width: 0px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 767px)',
  lg: '(min-width: 991px)',
  xl: '(min-width: 1200px)'
}

interface IUseMediaDimensionsResult extends QueryResults<IMediaQueries> {
  currentDimension: string
}

export const useMediaDimensions = (): IUseMediaDimensionsResult => {
  const matches = useMedia<IMediaQueries>({ queries: MEDIA_QUERIES })

  const currentDimension = useMemo(() => {
    return (
      Object.keys(MEDIA_QUERIES)
        .filter((dimension: any) => matches[dimension as keyof IMediaQueries])
        .pop() || 'md'
    )
  }, [matches])

  return { ...matches, currentDimension }
}
