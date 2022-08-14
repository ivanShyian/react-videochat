import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useActions = (...args: any[]) => {
  const dispatch = useDispatch()
  const argsToObject = useMemo(() => {
    return (args: any[]) => {
      return args.reduce((acc, curr) => {
        acc = { ...acc, [curr.name]: curr }
        return acc
      }, {})
    }
  }, [args])
  return bindActionCreators(argsToObject(args), dispatch)
}