import { ChatsState, ChatsAction, ChatsActionEnum } from './types'
import { IChatsMap } from '@/models/IChat'

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