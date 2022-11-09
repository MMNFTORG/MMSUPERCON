import { ActionType, AppState, StateAction } from './types'

export function stateReducer(state: AppState, action: StateAction): AppState {
  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed(`State Action: ${ActionType[action.type]}`)
    console.log(`Action: ${ActionType[action.type]}`)
    console.log('Prev state: ', state)
    if ('payload' in action) {
      console.log('Payload: ', action.payload)
    }
    console.groupEnd()
  }

  switch (action.type) {
    case ActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload ?? true
      }
    case ActionType.SET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
        loading: false
      }
    case ActionType.SET_WHITElLISTED_COLLECTIONS:
      return {
        ...state,
        whitelistedCollections: action.payload,
        loading: false
      }
    case ActionType.SET_COLLECTION:
      return {
        ...state,
        currentCollection: action.payload,
        loading: false
      }
    case ActionType.SET_FETCHING_NFT_COLLECTION: {
      return {
        ...state,
        NFT: {
          ...state.NFT,
          fetchingCollection: action.payload
        }
      }
    }
    case ActionType.SET_USER_NFTS:
      return {
        ...state,
        NFT: {
          ...state.NFT,
          userNFTTokens: action.payload
        }
      }
    case ActionType.ADD_USER_NFTS:
      return {
        ...state,
        NFT: {
          ...state.NFT,
          userNFTTokens: [
            ...(state.NFT.userNFTTokens?.length ? state.NFT.userNFTTokens : []),
            ...action.payload
          ]
        }
      }
    case ActionType.SET_NFT_TOKENS:
      return {
        ...state,
        NFT: {
          ...state.NFT,
          NFTTokens: action.payload
        }
      }
    case ActionType.ADD_NFT_TOKENS:
      return {
        ...state,
        NFT: {
          ...state.NFT,
          NFTTokens: [
            ...(state.NFT.NFTTokens?.length ? state.NFT.NFTTokens : []),
            ...action.payload
          ]
        }
      }
    case ActionType.SET_CURRENT_NFT:
      return {
        ...state,
        NFT: {
          ...state.NFT,
          currentNFT: action.payload
        }
      }
    case ActionType.SET_CURRENT_SALE:
      return {
        ...state,
        currentSale: action.payload
      }
    case ActionType.SET_FETCHING_AUCTION:
      return {
        ...state,
        auction: {
          ...state.auction,
          loading: action.payload
        }
      }
    case ActionType.SET_AUCTION_CONTRACT_DATA:
      return {
        ...state,
        auction: {
          ...state.auction,
          currentAuction: {
            ...state.auction.currentAuction,
            contractData: action.payload
          }
        }
      }
    case ActionType.SET_AUCTION_BACKEND_DATA:
      return {
        ...state,
        auction: {
          ...state.auction,
          currentAuction: {
            ...state.auction.currentAuction,
            backendData: action.payload
          }
        }
      }

    case ActionType.SET_MARKET_STATS:
      return {
        ...state,
        market: {
          ...state.market,
          stats: action.payload,
          statsLoading: false
        }
      }

    case ActionType.SET_LOADING_MARKET_STATS:
      return {
        ...state,
        market: {
          ...state.market,
          statsLoading: true
        }
      }

    default:
      return state
  }
}
