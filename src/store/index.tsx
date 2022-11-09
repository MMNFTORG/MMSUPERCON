import React, { createContext, useReducer } from 'react'

import { stateReducer } from './reducer'
import { AppState, StateAction } from './types'

const initialState: AppState = {
  loading: false,
  collections: null,
  whitelistedCollections: null,
  currentCollection: null,
  currentSale: null,
  market: {
    stats: null,
    statsLoading: false
  },
  NFT: {
    fetchingCollection: false,
    userNFTTokens: [],
    NFTTokens: [],
    fetchingCurrentToken: false,
    currentNFT: null
  },
  auction: {
    loading: false,
    currentAuction: {
      contractData: null,
      backendData: null
    }
  }
}

export const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<StateAction>
}>({
  state: initialState,
  dispatch: () => undefined
})

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
