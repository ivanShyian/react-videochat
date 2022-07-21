import React, {FC, FormEvent, useEffect, useMemo, useState} from 'react'
import SButton from '@/components/shared/SButton'
import SInput from '@/components/shared/SInput'
import {useLocation} from 'react-router-dom'
import {useActions} from '@/use/useActions'
import {AuthActionCreators} from '@/store/reducers/auth/action-creators'
import {toast, ToastContainer} from 'react-toastify'
import {useTypedSelector} from '@/use/useTypedSelector'

export const Login: FC = () => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const location = useLocation()
  const {login} = useActions(AuthActionCreators.login)
  const {isLoading} = useTypedSelector(selector => selector.auth)

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitButtonActive && !isLoading) {
      await login(email, password)
      clearFields()
    }
  }

  useEffect(() => {
    if (withQueryParam.get('register')) {
      toast.success('Registration success!', {
        icon: "🚀"
      });
    } else if (withQueryParam.get('auth')) {
      toast.info('Sign in please!')
    }
  }, [location])

  const withQueryParam = useMemo(() => {
    return new URLSearchParams(location.search)
  }, [location])

  const clearFields = () => {
    changePassword('')
    changeEmail('')
  }

  const submitButtonActive = useMemo(() => {
    return !!(email.length && password.length)
  }, [email, password])

  return (
    <div className="login mx-auto md:mx-0">
      <form
        className="card__form flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <p className="login__title font-semibold text-xl mb-5 text-white">Member login</p>
        <SInput
          id="login-email"
          value={email}
          onChange={changeEmail}
          placeholder="Email"
          className="mb-4"
        />
        <SInput
          id="login-password"
          value={password}
          type="password"
          onChange={changePassword}
          placeholder="Password"
          className="mb-5"
        />
        <SButton
          className="card__button w-full mb-3 w-9/12"
          type="submit"
          size="medium"
          theme="transparent"
          isLoading={isLoading}
        >
          Login
        </SButton>
        <div className="card__forgot mb-24 text-xs">
          <span className="text-white/50">Forgot</span>
          <SButton
            className="pl-1 border-none text-xs"
            theme="transparent"
            size="small"
            type="link"
            to="/registration"
          >
            Username/Password?
          </SButton>
        </div>
        <div className="card__signout">
          <SButton
            size="small"
            type="link"
            theme="transparent"
            className="border-none text-white/70 hover:text-white"
            to={{
              pathname: '/registration',
              state: {prevPath: location.pathname}
            }}
          >
            Create your account &#8594;
          </SButton>
        </div>
      </form>
    </div>
  )
}
