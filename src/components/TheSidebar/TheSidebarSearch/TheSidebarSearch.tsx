import SInput from '@/components/shared/SInput'
import { useActions } from '@/use/useActions'
import { useTypedSelector } from '@/use/useTypedSelector'
import React, {FC, useState} from 'react'
import { UsersActionCreators } from '@/store/reducers/users/action-creators'

export const TheSidebarSearch: FC = () => {
  const {query} = useTypedSelector(selector => selector.users)
  const {getUsers} = useActions(UsersActionCreators.getUsers)

  return (
    <div className="sidebar-searc relative z-10">
      <SInput
        id="search-field"
        className="rounded-none h-10"
        inputClassName="!bg-black/20 placeholder:text-white/50 caret-white/50 text-white"
        value={query}
        placeholder="Find user by email, nickname, etc..."
        onChange={getUsers}
      />
    </div>
  )
}
