import LayoutDefault from './LayoutDefault'
import LayoutLogin from './LayoutLogin'
import React, {FC} from 'react'

interface Props {
  isAuth: boolean
}

const Layout:FC<Props> = ({isAuth}) => {
  if (isAuth) return <LayoutDefault />
  return <LayoutLogin />
}

export default Layout
