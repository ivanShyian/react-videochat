import {AuthAction, AuthActionEnum, AuthState} from './types'
import {TRegistrationResult, IUser, IUserToken} from 'src/models/IUser'
import {Cookies} from 'react-cookie'

const cookies = new Cookies()
const userData = cookies.get('userData')
const hasData = userData && Object.keys(userData).length

const parsedCookies = (hasData: boolean, userData: IUser & IUserToken) => {
  if (hasData) {
    const {refreshToken, accessToken, ...user} = userData
    return { token: {refreshToken, accessToken}, user }
  }
  return {
    token: {} as IUserToken,
    user: {} as IUser
  }
}

const initialState: AuthState = {
  isAuth: hasData ?? false,
  error: '',
  isLoading: false,
  registrationResult: null,
  user: parsedCookies(hasData, userData).user,
  token: parsedCookies(hasData, userData).token
}

export default function authReducer(state = initialState, action: AuthAction): AuthState {
  switch(action.type) {
    case AuthActionEnum.SET_IS_AUTH:
      return {...state, isAuth: action.payload, isLoading: false}
    case AuthActionEnum.SET_USER:
      return {...state, user: action.payload}
    case AuthActionEnum.SET_USER_TOKEN:
      return {...state, token: action.payload}
    case AuthActionEnum.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case AuthActionEnum.SET_ERROR:
      return {...state, error: action.payload, isLoading: false}
    case AuthActionEnum.SET_REGISTRATION_RESULT:
      return {...state, registrationResult: action.payload}
    default:
      return state
  }
}
