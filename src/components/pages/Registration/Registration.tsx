import { useActions } from '@/use/useActions';
import { FC, FormEvent, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthActionCreators } from '@/store/reducers/auth/action-creators';
import SButton from "@/components/shared/SButton";
import SInput from "@/components/shared/SInput";

type LocationState = null | {
  prevPath: string
} 

export const Registration: FC = () => {
  const location = useLocation()
  const [nickname, changeNickname] = useState('')
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [repeatPassword, changeRepeatPassword] = useState('')
  const {signup} = useActions(AuthActionCreators.signup)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitButtonActive && passwordsIsEqual) {
      signup(nickname, email, password)
    }
  }

  const submitButtonActive = useMemo(() => {
    return !!(nickname.length && email.length && password.length && repeatPassword.length)
  }, [nickname, email, password, repeatPassword])

  const passwordsIsEqual = useMemo(() => {
    return password === repeatPassword
  }, [password, repeatPassword])

  const locationState = useMemo(() => location.state as LocationState, [location])

  return (
    <div className="registration">
      {locationState?.prevPath && (
        <div className="registration__back absolute top-6 left-6">
          <SButton
            type="link" 
            to="/login"
            size="small"
            theme="transparent"
            className="border-none"
          >
            &#8592; Back to login
          </SButton>
        </div>
      )}
      <p className="registration__title font-bold text-2xl mb-5">Member registration</p>
      <form
        className="registration__form"
        onSubmit={handleSubmit}
      >
        <SInput
          id="registration-name"
          value={nickname}
          onChange={changeNickname}
          placeholder="Nickname"
          type="text"
          className="mb-4"
        />
        <SInput
          id="registration-email"
          value={email}
          placeholder="Email"
          onChange={changeEmail}
          type="email"
          className="mb-8"
        />
        <SInput
          id="registration-password"
          value={password}
          placeholder="Password"
          onChange={changePassword}
          type="password"
          className="mb-4"
        />
        <SInput
          id="registration-repeat-password"
          value={repeatPassword}
          placeholder="Repeat password"
          onChange={changeRepeatPassword}
          type="password"
          className="mb-4"
        />
        <SButton
          className="w-full"
          disabled={!submitButtonActive}
          type="submit"
        >
          Sign up
        </SButton>
      </form>
    </div>
  )
}
