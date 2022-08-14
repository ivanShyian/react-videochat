import { ICallReturnStatement, useCall } from '@/use/useCall'
import {createContext, ReactNode, useContext} from 'react'

export const PeerContext = createContext<ICallReturnStatement>({} as ICallReturnStatement)

export const PeerContextProvider = ({ children }: {children: ReactNode}) => {
  const call = useCall()
  return (
    <PeerContext.Provider value={{...call}}>
      {children}
    </PeerContext.Provider>
  )
}

export const usePeerContext = () => {
  return {
    ...useContext(PeerContext)
  }
}
