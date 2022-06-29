import { ReactNode } from "react"

export const enum ButtonTheme {
  primary,
  transparent
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
  to?: string | {pathname: string, state?: any}
  type?: keyof typeof ButtonType
  theme?: keyof typeof ButtonTheme
  size?: keyof typeof ButtonSize
  className?: string
}