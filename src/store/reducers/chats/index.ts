import { ChatsState, ChatsAction, ChatsActionEnum } from './types'
import { IChat } from 'src/models/IChat'

const initialState: ChatsState = {
  isLoading: false,
  error: '',
  chats: [] as IChat[]
}

export default function chatsReducer(state = initialState, action: ChatsAction): ChatsState {
  switch(action.type) {
    case ChatsActionEnum.SET_CHATS:
      return {...state, chats: action.payload}
    case ChatsActionEnum.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case ChatsActionEnum.SET_ERROR:
      return {...state, error: action.payload, isLoading: false}
    default:
      return state
  }
}