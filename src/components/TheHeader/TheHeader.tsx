import SInput from '../shared/SInput'
import React, { FC, useState } from 'react';


export const TheHeader: FC = () => {
  const [search, changeSearch] = useState('')
  return (
    <div className='the-header'>
      <SInput placeholder='Search users' id="search" name="search" value={search} onChange={changeSearch} />      
    </div>
  )
}