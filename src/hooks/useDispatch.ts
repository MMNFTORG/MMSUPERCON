import { useContext } from 'react'

import { AppContext } from '../store'

export const useDispatch = () => {
  const { dispatch } = useContext(AppContext)

  return dispatch
}
