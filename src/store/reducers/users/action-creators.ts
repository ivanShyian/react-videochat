import { Cookies } from 'react-cookie';
import { IUser } from 'src/models/IUser';
import { AppDispatch, RootState, ThunkArgs } from 'src/store';
import { SetUsersAction, UsersActionEnum, SetIsLoadingAction, SetErrorAction, SetUsersQuery } from './types';
import axiosClient from '@/api/axios'
import api from '@/api/routes'

export const UsersActionCreators = {
  setUsers: (users: IUser[]): SetUsersAction => ({type: UsersActionEnum.SET_USERS, payload: users}),
  setQuery: (query: string): SetUsersQuery => ({type: UsersActionEnum.SET_QUERY, payload: query}),
  setLoading: (loading: boolean): SetIsLoadingAction => ({type: UsersActionEnum.SET_IS_LOADING, payload: loading}),
  setError: (error: string): SetErrorAction => ({type: UsersActionEnum.SET_ERROR, payload: error}),

  getUsers: (query: string) => async(dispatch: AppDispatch, getState: RootState, {cookies}: ThunkArgs) => {
    try {
      dispatch(UsersActionCreators.setQuery(query))
      if (query.length === 0) return dispatch(UsersActionCreators.setUsers([]))
      else if (query.length < 2) return

      dispatch(UsersActionCreators.setLoading(true))
      const {data} = await axiosClient.get(api.users.getUserList(query))
      if (data) dispatch(UsersActionCreators.setUsers(data.users))
      dispatch(UsersActionCreators.setLoading(false))
    } catch (e: any) {
      dispatch(UsersActionCreators.setError(e.response.data.message))
    }
  }
}
