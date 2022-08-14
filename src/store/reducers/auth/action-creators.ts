import {TRegistrationResult, IUser, IUserToken} from 'src/models/IUser'
import {AppDispatch, RootState, ThunkArgs} from 'src/store'
import {
  AuthActionEnum,
  SetErrorAction,
  SetIsAuthAction,
  SetIsLoadingAction,
  SetRegistrationResult,
  SetUserAction,
  SetUserTokenAction
} from './types'
import axiosClient from '@/api/axios'
import api from '@/api/routes'
import {bindActionCreators} from 'redux'
import moment from 'moment'

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
  setUserToken: (token: IUserToken): SetUserTokenAction => ({type: AuthActionEnum.SET_USER_TOKEN, payload: token}),
  setIsAuth: (auth: boolean): SetIsAuthAction => ({type: AuthActionEnum.SET_IS_AUTH, payload: auth}),
  setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: loading}),
  setRegistrationResult: (payload: TRegistrationResult): SetRegistrationResult => ({type: AuthActionEnum.SET_REGISTRATION_RESULT, payload}),

  setUserAndToken: (data: IUser & IUserToken) => (dispatch: AppDispatch, getState: RootState, { cookies }: ThunkArgs) => {
    const {accessToken, refreshToken, ...other} = data
    dispatch(AuthActionCreators.setUser({...other}))
    dispatch(AuthActionCreators.setUserToken({accessToken, refreshToken}))
    cookies.set('userData', data, {path: '/', expires: moment().add(3, 'days').toDate()})
    dispatch(AuthActionCreators.setIsAuth(true))
  },
  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      const {data} = await axiosClient.post(api.auth.postLogin(), {email, password})
      if (data) {
        bindActionCreators(AuthActionCreators.setUserAndToken, dispatch)(data)
      }
      dispatch(AuthActionCreators.setIsLoading(false))
    } catch (e: any) {
      dispatch(AuthActionCreators.setError(e.response.data.message))
    }
  },
  signup: (nickname: string, email: string, password: string) => async(dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      const {data} = await axiosClient.post(api.auth.postSignup(), {nickname, email, password})
      dispatch(AuthActionCreators.setRegistrationResult(data))
      dispatch(AuthActionCreators.setIsLoading(false))
    } catch (e: any) {
      dispatch(AuthActionCreators.setRegistrationResult(e.response.data))
      dispatch(AuthActionCreators.setError(e.response.data.message))
    }
  },
  token: () => async(dispatch: AppDispatch, getState: RootState) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      const token = getState.auth.token
      const response = await axiosClient.post(api.auth.postRefreshToken(), {refreshToken: token.refreshToken})
      if (response.data?.accessToken) {
        dispatch(AuthActionCreators.setUserToken(response.data))
        return {
          status: response.status,
          accessToken: response.data.accessToken
        }
      }
    } catch (e: any) {
      dispatch(AuthActionCreators.setError(e.response.data.message))
    } finally {
      dispatch(AuthActionCreators.setIsLoading(false))
    }
  },
  logout: () => (dispatch: AppDispatch, getState: RootState, {cookies}: ThunkArgs) => {
    dispatch(AuthActionCreators.setIsLoading(true))
    cookies.remove('userData')
    cookies.remove('sid')
    dispatch(AuthActionCreators.setIsAuth(false))
    dispatch(AuthActionCreators.setUser({} as IUser))
    dispatch(AuthActionCreators.setUserToken({} as IUserToken))
    dispatch(AuthActionCreators.setIsLoading(false))
  }
}
