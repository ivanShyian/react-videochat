import { IMessage } from '@/models/IMessage'
import { IChatsMap } from 'src/models/IChat'

export interface ChatsState {
  chats: IChatsMap
  isLoading: boolean
  isChatsFetched: boolean
  error: string
}

export enum ChatsActionEnum {
  SET_FETCHED = 'SET_FETCHED',
  SET_CHATS = 'SET_CHATS',
  SET_ERROR = 'SET_ERROR',
  SET_IS_LOADING = 'SET_IS_LOADING',
  UPDATE_CHAT = 'UPDATE_CHAT'
}

export interface SetChatsAction {
  type: ChatsActionEnum.SET_CHATS
  payload: IChatsMap
}

export interface UpdateChatLastMessageAction {
  type: ChatsActionEnum.UPDATE_CHAT
  payload: IMessage
}

export interface SetErrorAction {
  type: ChatsActionEnum.SET_ERROR
  payload: string
}

export interface SetIsFetchedAction {
  type: ChatsActionEnum.SET_FETCHED
  payload: boolean
}

export interface SetIsLoadingAction {
  type: ChatsActionEnum.SET_IS_LOADING
  payload: boolean
}

export type ChatsAction = 
 SetErrorAction | SetChatsAction | SetIsLoadingAction | UpdateChatLastMessageAction | SetIsFetchedAction