import { ReactNode } from "react"

export const enum ButtonTheme {
  primary = 'primary',
  transparent = 'transparent'
}

export const enum ButtonSize {
  medium,
  small,
  large
}

export enum ButtonType {
  button = 'button',
  submit = 'submit',
  link = 'link'
}


export interface Props {
  children: string | ReactNode
  onClick?: () => any
  isDisabled?: boolean
  isLoading?: boolean
  to?: string | {pathname: string, state?: any}
  type?: keyof typeof ButtonType
  theme?: keyof typeof ButtonTheme
  size?: keyof typeof ButtonSize
  className?: string
}
