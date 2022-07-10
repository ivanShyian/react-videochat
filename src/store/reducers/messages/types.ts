import { IMapMessages, IMessage } from '@/models/IMessage'

export interface MessagesState {
  error: string
  isLoading: boolean
  messages: IMapMessages
}

export enum MessagesActionEnum {
  SET_ERROR = 'SET_ERROR',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_MESSAGES = 'SET_MESSAGES',
  SET_MESSAGE='SET_MESSAGE'
}

export interface SetMessagesAction {
  type: MessagesActionEnum.SET_MESSAGES
  payload: IMapMessages
}

export interface SetMessageAction {
  type: MessagesActionEnum.SET_MESSAGE
  chatId: string
  payload: IMessage
}

export interface SetErrorAction {
  type: MessagesActionEnum.SET_ERROR
  payload: string
}

export interface SetIsLoadingAction {
  type: MessagesActionEnum.SET_IS_LOADING
  payload: boolean
}

export type MessagesAction = SetErrorAction | SetIsLoadingAction | SetMessagesAction | SetMessageAction