import { IUser } from 'src/models/IUser'
import { AppDispatch } from 'src/store'
import {AuthActionEnum, SetIsAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from './types'
import axiosClient from '../../../api/axios'
import api from '../../../api/routes'

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
  setIsAuth: (auth: boolean): SetIsAuthAction => ({type: AuthActionEnum.SET_IS_AUTH, payload: auth}),
  setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: loading}),
  
  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      const {data} = await axiosClient.post(api.auth.login(), {email, password})
      console.log(data)
    } catch (e) {
      console.log('err', e)
      dispatch(AuthActionCreators.setError('Login gone wrong'))
    }
  }
}