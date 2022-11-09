export interface NotifyTxCallbacks {
  onHash?: () => void
  onReject?: () => void
  onSuccess?: () => void
  onError?: () => void
}
