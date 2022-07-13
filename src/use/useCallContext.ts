import { PeerContext } from '../context/PeerContext';
import { useContext } from 'react';

// Not sure that is right solution (useCall + CallContext + useCallContext)

export const useCallContext = () => {
  return {
    ...useContext(PeerContext)
  }
}