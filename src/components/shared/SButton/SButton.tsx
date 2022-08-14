import React, { FC, MouseEvent, useMemo } from "react"
import { Link } from "react-router-dom"
import { Props, ButtonTheme, ButtonSize, ButtonType } from "./types"
import {ReactComponent as ISpinner} from '@/assets/icons/i-spinner.svg'

const buttonTheme: { [key in keyof typeof ButtonTheme]: string } = {
  primary: 'bg-orange-400 hover:bg-orange-500 disabled:bg-orange-200 text-white',
  transparent: 'hover:bg-white/20 text-white border-2 border-white disabled:border-white/80 disabled:text-white/80'
}

const buttonSize: { [key in keyof typeof ButtonSize]: string } = {
  medium: 'px-8 h-8 text-md font-medium',
  small: 'px-6 h-6 text-sm font-medium',
  large: 'px-10 h-10'
}


export const SButton: FC<Props> = ({onClick, children, className, to, isDisabled = false, isLoading = false, type = 'button', theme = 'primary', size = 'medium'}: Props) => {
  const isLink = useMemo(() => ButtonType.link === type, [type])
  // const buttonLoadingStyles = ButtonTheme.transparent === theme ? 'border-white/80 text-white/80' : ''
  // const buttonIsLoading = isLoading ? buttonLoadingStyles : ''
  const buttonStyles = `${buttonTheme[theme]} ${buttonSize[size]} ${className || ''} ${isLink ? 'px-0 py-0 border-0 hover:bg-transparent' : ''} ${isDisabled ? 'hover:bg-transparent' : ''}`

  const handleClick = (e: MouseEvent) => {
    if (ButtonType.button === type && onClick) {
      e.preventDefault()
      onClick()
    }
  }

  if (isLink && to) {
    if (typeof to === 'string') {
      return <Link className={buttonStyles} to={to}>{children}</Link>
    }
    return <Link className={buttonStyles} to={to.pathname} state={to.state}>{children}</Link>
  }

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`s-button px-10 rounded-full font-bold h-10 transition duration-300 flex items-center justify-center ${buttonStyles}`}
    >
      <ISpinner className={`animate-spin h-4 text-white/20 fill-white/80 w-0 transition-all ease-in-out ${isLoading ? 'w-4 mr-2 block' : 'hidden'}`} />
      {children}
    </button>
  )
}
