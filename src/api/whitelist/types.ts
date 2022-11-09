import { WLFormValues } from '../../components'

export enum WhitelistStatuses {
  not_submitted = 'not_submitted',
  in_review = 'in_review',
  rejected = 'rejected',
  passed = 'passed'
}

export type WhitelistStatus = keyof typeof WhitelistStatuses

export interface GetWhitelistArgs {
  account: string
  projectId: string
}

export interface WhitelistRequestFormData
  extends Omit<WLFormValues, 'agree_to_saft'> {
  agree_to_saft?: string
}

export interface WhitelistRequestArgs {
  collection_id: string
  wallet_address: string
  form_data: WhitelistRequestFormData
}

export interface ExclusiveWhitelistRequestArgs extends WhitelistRequestArgs {
  referrer: string
  password: string
}

export interface WhitelistRecordContractParams {
  is_kyc_passed: boolean
  private_allocation: string
  private_presale_allowed: boolean
  public_allocation: string
  merkle_proof: string[]
}

export interface WhitelistSuccessResponse {
  project_id: string
  user_id: string
  wallet_address: string
  status: WhitelistStatus
  referrer: string | null
  params_data?: WhitelistRecordContractParams
  created_at: number
  updated_at: number
}

export interface GetWhitelistDataReturns {
  status: WhitelistStatus
  paramsData?: WhitelistRecordContractParams
}
