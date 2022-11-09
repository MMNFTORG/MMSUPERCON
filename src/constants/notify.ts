export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

export const autoDismissTime: number = 60000
