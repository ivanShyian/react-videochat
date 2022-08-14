import React, {FC} from 'react'
import {ReactComponent as ISpinner} from '@/assets/icons/i-spinner.svg'

export const SLoader: FC<{className?: string}> = ({className = ''}) => {
  return (
    <p className={`flex justify-center flex-1 items-center text-center text-xl relative ${className}`}>
      <ISpinner className="animate-spin h-5 text-white/20 fill-red-400 mr-2" />
      <span className="text-white/20">Loading...</span>
    </p>
  )
}
