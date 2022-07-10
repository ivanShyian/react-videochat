import axiosClient from '@/api/axios';
import api from '@/api/routes'
import { IMapMessages, IMessage } from '@/models/IMessage';
import { AppDispatch } from 'src/store';
import { MessagesActionEnum, SetErrorAction, SetIsLoadingAction, SetMessageAction, SetMessagesAction } from './types';


export const MessagesActionCreators = {
  setMessagesError: (error: string): SetErrorAction => ({type: MessagesActionEnum.SET_ERROR, payload: error}),
  setMessagesAreLoading: (loading: boolean): SetIsLoadingAction => ({type: MessagesActionEnum.SET_IS_LOADING, payload: loading}),
  setMessages: (messages: IMapMessages): SetMessagesAction => ({type: MessagesActionEnum.SET_MESSAGES, payload: messages}),
  setMessage: (chatId: string, message: IMessage): SetMessageAction => ({type: MessagesActionEnum.SET_MESSAGE, chatId, payload: message}),

  getMessagesByChat: (chatId: string) => async(dispatch: AppDispatch) => {
    try {
      dispatch(MessagesActionCreators.setMessagesAreLoading(true))
      const { data } = await axiosClient.get(api.messages.getChatMessages(chatId))
      if (data.messages) {
        dispatch(MessagesActionCreators.setMessages({[chatId]: data.messages}))
      }
      dispatch(MessagesActionCreators.setMessagesAreLoading(false))
    } catch (e: any) {
      dispatch(MessagesActionCreators.setMessagesError(e.response.data.message))
    }
  },

}