import { SaleStatuses } from '@/components'

import { _updateAuction } from '@api/assetSale/updateAuction'

import { sendExceptionReport } from '@utils/errors'

export const _cancelAuction = async (id: string): Promise<void | null> => {
  try {
    await _updateAuction({
      id,
      data: {
        sale_details: {
          status: SaleStatuses.canceled
        }
      }
    })
  } catch (err) {
    sendExceptionReport(err)
    return null
  }
}
