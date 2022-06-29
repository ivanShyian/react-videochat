import React, { FC, FormEvent, useState } from 'react'
import SButton from '../Shared/SButton'
import SInput from '../Shared/SInput'
import { useLocation, useNavigate } from 'react-router-dom'

export const Login: FC = () => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const location = useLocation()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="login">
    <form
      className="card__form flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <p className="login__title font-bold text-2xl mb-5">Member login</p>
      <SInput
        id="login-email"
        value={email}
        onChange={changeEmail}
        placeholder="Email"
        className='mb-4'
      />
      <SInput
        id="login-password"
        value={password}
        onChange={changePassword}
        placeholder="Password"
        className='mb-4'
      />
      <SButton
        className="card__button w-full mb-2"
        type='submit'
      >
        Login
      </SButton>
      <div className="card__forgot mb-24">
        <span className="font-noraml text-sm">Forgot</span>
        <SButton
          className='pl-1'
          size='small'
          type='link'
          to="/registration"
        >
          Username/Password?
        </SButton>
      </div>
      <div className="card__signout">
        <SButton
          size='small'
          type='link'
          to={{
            pathname: '/registration',
            state: { prevPath: location.pathname }
          }}
        >
          Create your account &#8594;
        </SButton>
      </div>
    </form>
  </div>
  )
}