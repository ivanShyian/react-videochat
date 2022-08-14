import {ChatsAction, ChatsActionEnum, ChatsState} from './types'
import {IChatsMap} from '@/models/IChat'

const initialState: ChatsState = {
  isLoading: false,
  isChatsFetched: false,
  error: '',
  chats: {} as IChatsMap
}

export default function chatsReducer(state = initialState, action: ChatsAction): ChatsState {
  switch(action.type) {
    case ChatsActionEnum.SET_CHATS:
      return {...state, chats: action.payload}
    case ChatsActionEnum.APPEND_CHAT: {
      return {
        ...state,
        chats: {
          ...state.chats,
          ...action.payload
        }
      }
    }
    case ChatsActionEnum.UPDATE_CHAT: {
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatroom_id]: {
            ...state.chats[action.payload.chatroom_id],
            lastMessage: action.payload
          }
        }
      }
    }
    case ChatsActionEnum.SET_IS_ONLINE: {
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.room]: {
            ...state.chats[action.payload.room],
            isOnline: action.payload.value
          }
        }
      }
    }
    case ChatsActionEnum.ADD_CALL_DATA: {
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.roomId]: {
            ...state.chats[action.payload.roomId],
            callData: action.payload.callData
          }
        }
      }
    }
    case ChatsActionEnum.REMOVE_CALL_DATA: {
      const {callData, ...data} = state.chats[action.payload.roomId]
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.roomId]: data
        }
      }
    }
    case ChatsActionEnum.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case ChatsActionEnum.SET_FETCHED:
      return {...state, isChatsFetched: action.payload}
    case ChatsActionEnum.SET_ERROR:
      return {...state, error: action.payload, isLoading: false, isChatsFetched: true}
    default:
      return state
  }
}
