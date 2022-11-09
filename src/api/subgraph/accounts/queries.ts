import { gql } from '@apollo/client'

export const getPhaseSoldAmountQuery = gql`
  query getPhaseSoldAmount($collection: String!) {
    phases(where: { collection: $collection }) {
      soldAmount
      phaseId
    }
  }
`
