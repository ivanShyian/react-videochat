import { IUser } from 'src/models/IUser'

export interface UsersState {
  users: IUser[],
  isLoading: boolean,
  error: string,
  query: string
}

export enum UsersActionEnum {
  SET_USERS = 'SET_USERS',
  SET_ERROR = 'SET_ERROR',
  SET_QUERY = 'SET_QUERY',
  SET_IS_LOADING = 'SET_IS_LOADING'
}

export interface SetUsersQuery {
  type: UsersActionEnum.SET_QUERY,
  payload: string
}

export interface SetUsersAction {
  type: UsersActionEnum.SET_USERS
  payload: IUser[]
}

export interface SetErrorAction {
  type: UsersActionEnum.SET_ERROR
  payload: string
}

export interface SetIsLoadingAction {
  type: UsersActionEnum.SET_IS_LOADING
  payload: boolean
}

export type UsersAction = 
 SetErrorAction | SetUsersAction | SetIsLoadingAction | SetUserQuerys