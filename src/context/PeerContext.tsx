import { ICallReturnStatement, useCall } from '@/use/useCall'
import {createContext, ReactNode, useContext} from 'react'


export const PeerContext = createContext<ICallReturnStatement>({} as ICallReturnStatement)

export const PeerContextProvider = ({ children }: {children: ReactNode}) => {
  return (
    <PeerContext.Provider value={{...useCall()}} children={children} />
  )
}

export const usePeerContext = () => {
  return {
    ...useContext(PeerContext)
  }
}
