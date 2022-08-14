import { MessagesActionEnum, MessagesAction, MessagesState } from './types'
import { IMapMessages } from '@/models/IMessage'

const initialState: MessagesState = {
  isLoading: false,
  error: '',
  messages: {} as IMapMessages
}

export default function messagesReducer(state = initialState, action: MessagesAction): MessagesState {
  switch(action.type) {
    case MessagesActionEnum.SET_MESSAGES:
      return {...state, messages: {...state.messages, ...action.payload}}
    case MessagesActionEnum.SET_MESSAGE:
      if (state.messages[action.chatId]) {
        return {...state, messages: {
            ...state.messages,
            [action.chatId]: [
              ...state.messages[action.chatId],
              action.payload
            ]
          }}
      }
      return state
    case MessagesActionEnum.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case MessagesActionEnum.SET_ERROR:
      return {...state, error: action.payload, isLoading: false}
    default:
      return state
  }
}
