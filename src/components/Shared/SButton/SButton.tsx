import React, { FC, MouseEvent, useMemo } from "react"
import { Link } from "react-router-dom"
import { Props, ButtonTheme, ButtonSize, ButtonType } from "./types"


const buttonTheme: { [key in keyof typeof ButtonTheme]: string } = {
  primary: '',
  transparent: 'bg-transparent text-black'
}

const buttonSize: { [key in keyof typeof ButtonSize]: string } = {
  medium: '',
  small: 'px-6 h-6 text-sm font-medium',
  large: 'px-10 h-14'
}


export const SButton: FC<Props> = ({
  onClick,
  children,
  className,
  to,
  disabled = false,
  type = 'button',
  theme = 'primary',
  size = 'medium'
}: Props) => {
  const isLink = useMemo(() => ButtonType.link === type, [type])
  const buttonStyles = `${buttonTheme[theme]} ${buttonSize[size]} ${className} ${isLink ? 'px-0 py-0' : ''}`

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
      disabled={disabled}
      className={`s-button px-10 rounded-full bg-orange-400 text-white font-bold h-10 hover:bg-orange-500 transition duration-300 disabled:bg-orange-200 ${buttonStyles}`}
    >
      {children}
    </button>
  )
}