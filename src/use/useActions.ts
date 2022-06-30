import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useActions = (args: any) => {
  const dispatch = useDispatch()
  return bindActionCreators(args, dispatch)
}