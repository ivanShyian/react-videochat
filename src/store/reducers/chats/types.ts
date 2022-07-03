import { IChat } from 'src/models/IChat'

export interface ChatsState {
  chats: IChat[],
  isLoading: boolean,
  error: string
}

export enum ChatsActionEnum {
  SET_CHATS = 'SET_CHATS',
  SET_ERROR = 'SET_ERROR',
  SET_IS_LOADING = 'SET_IS_LOADING'
}

export interface SetChatsAction {
  type: ChatsActionEnum.SET_CHATS
  payload: IChat[]
}

export interface SetErrorAction {
  type: ChatsActionEnum.SET_ERROR
  payload: string
}

export interface SetIsLoadingAction {
  type: ChatsActionEnum.SET_IS_LOADING
  payload: boolean
}

export type ChatsAction = 
 SetErrorAction | SetChatsAction | SetIsLoadingAction