import {TRegistrationResult, IUser, IUserToken} from 'src/models/IUser'

export interface AuthState {
  isAuth: boolean
  user: IUser
  isLoading: boolean
  error: string
  token: IUserToken
  registrationResult: TRegistrationResult
}

export enum AuthActionEnum {
  SET_IS_AUTH = 'SET_IS_AUTH',
  SET_ERROR = 'SET_ERROR',
  SET_USER = 'SET_USER',
  SET_USER_TOKEN = 'SET_USER_TOKEN',
  SET_USER_AND_TOKEN = 'SET_USER_AND_TOKEN',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_REGISTRATION_RESULT = 'SET_REGISTRATION_RESULT'
}

export interface SetIsAuthAction {
  type: AuthActionEnum.SET_IS_AUTH
  payload: boolean
}

export interface SetErrorAction {
  type: AuthActionEnum.SET_ERROR
  payload: string
}

export interface SetUserAction {
  type: AuthActionEnum.SET_USER
  payload: IUser
}

export interface SetUserTokenAction {
  type: AuthActionEnum.SET_USER_TOKEN,
  payload: IUserToken
}

export interface SetIsLoadingAction {
  type: AuthActionEnum.SET_IS_LOADING,
  payload: boolean
}

export interface SetRegistrationResult {
  type: AuthActionEnum.SET_REGISTRATION_RESULT,
  payload: TRegistrationResult
}

export type AuthAction = 
  SetIsAuthAction | SetErrorAction | SetUserAction | SetIsLoadingAction | SetUserTokenAction | SetRegistrationResult
