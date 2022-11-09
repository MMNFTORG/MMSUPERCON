import { useContext } from 'react'
import { AppContext } from '@store/index'
import { AppState } from '@store/types'

type SelectorCallback = (state: AppState | Partial<AppState>) => any

export const useSelector = <SELECTED>(callback: SelectorCallback): SELECTED => {
  const { state } = useContext(AppContext)

  return callback(state)
}
