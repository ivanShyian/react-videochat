import SInput from '@/components/shared/SInput'
import { useActions } from '@/use/useActions'
import { useTypedSelector } from '@/use/useTypedSelector'
import React, {FC, useState} from 'react'
import { UsersActionCreators } from '../../../store/reducers/users/action-creators'

export const TheSidebarSearch: FC = () => {
  const {query} = useTypedSelector(selector => selector.users)
  const {getUsers} = useActions(UsersActionCreators.getUsers)

  return (
    <div className="sidebar-search">
      <SInput
        id="search-field"
        className="rounded-none"
        value={query}
        placeholder="Find by email, nickname, etc..."
        onChange={getUsers}
      />
    </div>
  )
}