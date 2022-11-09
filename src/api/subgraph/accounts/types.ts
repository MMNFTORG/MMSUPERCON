export interface IPhaseSoldAmount {
  soldAmount: string
  phaseId: string
}

export interface SubgraphPhaseSoldAmountResponse {
  phases: IPhaseSoldAmount[]
}
