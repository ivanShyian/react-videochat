import { IUser } from 'src/models/IUser'
import { UsersAction, UsersActionEnum, UsersState } from './types'

const initialState: UsersState = {
  users: [] as IUser[],
  isLoading: false,
  error: '',
  query: ''
}

export default function userReducer (state = initialState, action: UsersAction) {
  switch (action.type) {
    case UsersActionEnum.SET_USERS:
      return {...state, users: action.payload}
    case UsersActionEnum.SET_QUERY:
      return {...state, query: action.payload}
    case UsersActionEnum.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case UsersActionEnum.SET_ERROR:
      return {...state, error: action.payload, isLoading: false}
    default:
      return state
  }
}