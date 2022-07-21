import { IMessage } from '@/models/IMessage'
import {IChatCall, IChatsMap} from 'src/models/IChat'

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
  UPDATE_CHAT = 'UPDATE_CHAT',
  APPEND_CHAT = 'APPEND_CHAT',
  SET_IS_ONLINE = 'SET_IS_ONLINE',
  ADD_CALL_DATA = 'ADD_CALL_DATA',
  REMOVE_CALL_DATA = 'REMOVE_CALL_DATA',
  TOGGLE_AUDIO = 'TOGGLE_AUDIO',
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
}

export interface SetChatsAction {
  type: ChatsActionEnum.SET_CHATS
  payload: IChatsMap
}

export interface AppendChatAction {
  type: ChatsActionEnum.APPEND_CHAT,
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

export interface SetIsOnline {
  type: ChatsActionEnum.SET_IS_ONLINE
  payload: {
    room: string
    value: boolean
  }
}

export interface AddCallData {
  type: ChatsActionEnum.ADD_CALL_DATA
  payload: {
    roomId: string
    callData: IChatCall
  }
}

export interface RemoveCallData {
  type: ChatsActionEnum.REMOVE_CALL_DATA,
  payload: {
    roomId: string
  }
}

// export interface ToggleAudio {
//   type: ChatsActionEnum.TOGGLE_AUDIO
//   payload: {
//     roomId: string
//   }
// }
//
// export interface ToggleVideo {
//   type: ChatsActionEnum.TOGGLE_VIDEO
//   payload: {
//     roomId: string
//   }
// }

export type ChatsAction = 
  SetErrorAction | SetChatsAction | SetIsLoadingAction | UpdateChatLastMessageAction | SetIsFetchedAction | AppendChatAction | SetIsOnline | AddCallData | RemoveCallData
