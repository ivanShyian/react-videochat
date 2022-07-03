import React, { FC, FormEvent, useMemo, useState } from 'react'
import SButton from '../../shared/SButton'
import SInput from '../../shared/SInput'
import { useLocation } from 'react-router-dom'
import { useActions } from '@/use/useActions'
import { AuthActionCreators } from '../../../store/reducers/auth/action-creators'

export const Login: FC = () => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const location = useLocation()
  const {login} = useActions(AuthActionCreators.login)

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitButtonActive) {
      await login(email, password)
      clearFields()
    }
  }

  const clearFields = () => {
    changePassword('')
    changeEmail('')
  }

  const submitButtonActive = useMemo(() => {
    return !!(email.length && password.length)
  }, [email, password])

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
        type="password"
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