import { NormalizedCollectionInfo } from '../CollectionPresale'

export interface IPreviewCollection
  extends Pick<
    NormalizedCollectionInfo,
    'id' | 'name' | 'assets' | 'max_nft_amount'
  > {}
