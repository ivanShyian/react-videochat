import {IChat, IChatCall, IChatsMap} from 'src/models/IChat'
import {
  AddCallData,
  AppendChatAction,
  ChatsActionEnum, RemoveCallData,
  SetChatsAction,
  SetErrorAction,
  SetIsFetchedAction,
  SetIsLoadingAction,
  UpdateChatLastMessageAction
} from './types'
import axiosClient from '@/api/axios'
import api from '@/api/routes'
import {AppDispatch, RootState, ThunkArgs} from 'src/store'
import { bindActionCreators } from 'redux';
import { UsersActionCreators } from '../users/action-creators';
import { IUser } from '@/models/IUser';
import { IMessage } from '@/models/IMessage';


export const ChatsActionCreators = {
  setError: (error: string): SetErrorAction => ({type: ChatsActionEnum.SET_ERROR, payload: error}),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: ChatsActionEnum.SET_IS_LOADING, payload: loading}),
  setIsFetched: (fetched: boolean): SetIsFetchedAction => ({type: ChatsActionEnum.SET_FETCHED, payload: fetched}),
  setChats: (chats: IChatsMap): SetChatsAction => ({type: ChatsActionEnum.SET_CHATS, payload: chats}),
  setIsOnline: (userId: string, value: boolean) => ({type: ChatsActionEnum.SET_IS_ONLINE, payload: {userId, value}}),
  appendChat: (chat: IChatsMap): AppendChatAction => ({type: ChatsActionEnum.APPEND_CHAT, payload: chat}),
  updateLastMessage: (message: IMessage): UpdateChatLastMessageAction => ({type: ChatsActionEnum.UPDATE_CHAT, payload: message}),
  addCallData: (roomId: string, callData: IChatCall): AddCallData => ({type: ChatsActionEnum.ADD_CALL_DATA, payload: {roomId, callData}}),
  removeCallData: (roomId: string): RemoveCallData => ({type: ChatsActionEnum.REMOVE_CALL_DATA, payload: {roomId}}),

  getChats: () => async(dispatch: AppDispatch) => {
    try {
      dispatch(ChatsActionCreators.setIsLoading(true))
      dispatch(ChatsActionCreators.setIsFetched(false))
      const {data} = await axiosClient.get(api.chats.getChats())
      if (data.chats) {
        const mappedChats = data.chats.reduce((acc: IChat | {}, curr: IChat) => {
          acc = { ...acc, [curr.id]: curr }
          return acc
        }, {})

        dispatch(ChatsActionCreators.setChats(mappedChats))
      }
      dispatch(ChatsActionCreators.setIsLoading(false))
      dispatch(ChatsActionCreators.setIsFetched(true))
    } catch (e: any) {
      dispatch(ChatsActionCreators.setError(e.response.data.message))
    }
  },

  getSingleChatByRoom: (id: string) => async(dispatch: AppDispatch) => {
    try {
      dispatch(ChatsActionCreators.setIsLoading(true))
      const {data} = await axiosClient.get(api.chats.getChatByRoomId(id))
      if (data.chat && Object.keys(data.chat).length) {
        dispatch(ChatsActionCreators.appendChat({[data.chat.id]: data.chat}))
      }
      dispatch(ChatsActionCreators.setIsLoading(false))
    } catch (e: any) {
      dispatch(ChatsActionCreators.setError(e.response.data.message))
    }
  },

  // getChatByUserId: (userId: string) => async(dispatch: AppDispatch) => {
  //   try {
  //     dispatch(ChatsActionCreators.setIsLoading(true))
  //     const {data} = await axiosClient.get(api.chats.getChatByUserId(userId))
  //     console.log({ data })
  //     dispatch(ChatsActionCreators.setIsLoading(false))
  //   } catch (e: any) {
  //     dispatch(ChatsActionCreators.setError(e.response.data.message))
  //   }
  // },

  createChatWithUser: (userId: string, callback: (chatId: string) => void) => async(dispatch: AppDispatch) => {
    try {
      dispatch(ChatsActionCreators.setIsLoading(true))
      const {data} = await axiosClient.post(api.chats.postChatWithUser(), {userId})
      if (data.chat) {
        bindActionCreators(ChatsActionCreators.getChats, dispatch)()
        dispatch(UsersActionCreators.setUsers([] as IUser[]))
        callback(data.chat.id)
      }
      dispatch(ChatsActionCreators.setIsLoading(false))
    } catch (e: any) {
      dispatch(ChatsActionCreators.setError(e.response.data.message))
    }
  }
}
