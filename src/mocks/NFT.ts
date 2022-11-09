import { IAuctionSale } from '@/components'

import { SaleStatuses } from '@components/Market/types'

import { IAssetPresale } from '@api/assetSale/types'
import { normalizeDate } from '@api/collection'

import NFTImage from '@assets/NFT/NFT-placeholder.png'

export const NFT_PRESALE_COLLECTION: IAssetPresale[] = [
  {
    id: '1',
    collection_id: 'collection-1',
    asset_id: 'asset-1',
    name: 'Presale nft',
    sale_type: 'public_sale',
    sale_details: {
      starts_at: normalizeDate('2021-10-20T12:00:00.000Z'),
      end_at: normalizeDate('2021-10-30T11:00:00.000Z'),
      fund_token: {
        name: 'BUSD'
      },
      status: SaleStatuses.canceled,
      tokenAmount: 0.5
    }
  },

  {
    id: '2',
    collection_id: 'collection-1',
    asset_id: 'asset-2',
    name: 'Presale nft',
    sale_type: 'public_sale',
    sale_details: {
      starts_at: normalizeDate('2022-01-19T12:00:00.000Z'),
      end_at: normalizeDate('2022-02-30T11:00:00.000Z'),
      fund_token: {
        name: 'BUSD'
      },
      status: SaleStatuses.active,
      tokenAmount: 0.5
    }
  },

  {
    id: '3',
    collection_id: 'collection-1',
    asset_id: 'asset-3',
    name: 'Presale nft',
    sale_type: 'public_sale',
    sale_details: {
      starts_at: normalizeDate('2021-10-20T12:00:00.000Z'),
      end_at: normalizeDate('2021-10-30T11:00:00.000Z'),
      fund_token: {
        name: 'BUSD'
      },
      status: SaleStatuses.completed,
      tokenAmount: 0.58
    }
  },
  {
    id: '4',
    collection_id: 'collection-1',
    asset_id: 'asset-4',
    name: 'Presale nft',
    sale_type: 'public_sale',
    sale_details: {
      starts_at: normalizeDate('2021-10-20T12:00:00.000Z'),
      end_at: normalizeDate('2021-10-30T11:00:00.000Z'),
      fund_token: {
        name: 'BUSD'
      },
      status: SaleStatuses.canceled,
      tokenAmount: 0.05
    }
  }
]

export const NFT_AUCTION_COLLECTION: IAuctionSale[] = [
  {
    id: '6',
    collection_id: 'collection-1',
    asset_id: 'asset-5',
    name: 'Auction nft',
    sale_type: 'auction',
    sale_details: {
      starts_at: normalizeDate('2021-10-20T12:00:00.000Z'),
      end_at: normalizeDate('2021-10-30T11:00:00.000Z'),
      fund_token: {
        name: 'BUSD'
      },
      status: SaleStatuses.canceled,
      starting_bid: 3.2
    }
  },
  {
    id: '9',
    collection_id: 'collection-1',
    asset_id: 'asset-6',
    name: 'Auction nft',
    sale_type: 'auction',
    sale_details: {
      starts_at: normalizeDate('2021-10-20T12:00:00.000Z'),
      end_at: normalizeDate('2021-10-30T11:00:00.000Z'),
      fund_token: {
        name: 'BUSD'
      },
      status: SaleStatuses.completed,
      starting_bid: 5
    }
  },

  {
    id: '21',
    collection_id: 'collection-1',
    asset_id: 'asset-7',
    name: 'Auction nft',
    sale_type: 'auction',
    sale_details: {
      starts_at: normalizeDate('2021-10-20T12:00:00.000Z'),
      end_at: normalizeDate('2021-10-30T11:00:00.000Z'),
      fund_token: {
        name: 'BUSD'
      },
      status: SaleStatuses.active,
      starting_bid: 0.523
    }
  },
  {
    id: '121',
    collection_id: 'collection-1',
    asset_id: 'asset-8',
    name: 'Auction nft',
    sale_type: 'auction',
    sale_details: {
      starts_at: normalizeDate('2022-01-19T12:00:00.000Z'),
      end_at: normalizeDate('2022-02-30T11:00:00.000Z'),
      fund_token: {
        name: 'BUSD'
      },
      status: SaleStatuses.active,
      starting_bid: 1
    }
  }
]

export const NFT_AUCTION_CONTRACT_DATA = {
  image: NFTImage,
  collectedBy: '0x0381B81BD78929Cd424730df91650e907d87496E',
  lastPrice: {
    tokenAmount: 11.84
  },
  provenance: [
    {
      status: 'listed',
      user: {
        name: '@user'
      },
      date: 'Nov 12, 2021 at 10:06am',
      link: '#',
      price: {
        tokenAmount: 1
      }
    },
    {
      status: 'minted',
      user: {
        name: '@user'
      },
      date: 'Nov 9, 2021 at 10:06am',
      link: '#'
    }
  ],
  collectors: [
    {
      wallet: '0x0381B81BD78929Cd424730df91650e907d875567',
      bid: {
        tokenAmount: 11.84
      },
      date: '10.04.2021 at 05:42'
    },
    {
      wallet: '0x0381B81BD78929Cd424730df91650e907d874567',
      bid: {
        tokenAmount: 10.79
      },
      date: '10.04.2021 at 05:34'
    },
    {
      wallet: '0x0381B81BD78929Cd424730df91650e907d875567',
      bid: {
        tokenAmount: 9.78
      },
      date: '10.04.2021 at 05:32'
    },
    {
      wallet: '0x0381B81BD78929Cd424730df91650e907d874567',
      bid: {
        tokenAmount: 8.89
      },
      date: '10.04.2021 at 05:31'
    },
    {
      wallet: '0x0381B81BD78929Cd424730df91650e907d875567',
      bid: {
        tokenAmount: 5.5
      },
      date: '10.04.2021 at 05:31'
    },
    {
      wallet: '0x0381B81BD78929Cd424730df91650e907d874567',
      bid: {
        tokenAmount: 5
      },
      date: '10.04.2021 at 04:23'
    }
  ]
}
