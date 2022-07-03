import { IChat } from 'src/models/IChat';
import { ChatsActionEnum, SetChatsAction, SetErrorAction, SetIsLoadingAction } from './types';
import axiosClient from '../../../api/axios'
import api from '../../../api/routes'
import { AppDispatch } from 'src/store';


export const ChatsActionCreators = {
  setError: (error: string): SetErrorAction => ({type: ChatsActionEnum.SET_ERROR, payload: error}),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: ChatsActionEnum.SET_IS_LOADING, payload: loading}),
  setChats: (chats: IChat[]): SetChatsAction => ({type: ChatsActionEnum.SET_CHATS, payload: chats}),

  getChats: () => async(dispatch: AppDispatch) => {
    try {
      dispatch(ChatsActionCreators.setIsLoading(true))
      const {data} = await axiosClient.get(api.chats.getChats())
      if (data) {
        dispatch(ChatsActionCreators.setChats(data))
      }
      dispatch(ChatsActionCreators.setIsLoading(false))
    } catch (e: any) {
      dispatch(ChatsActionCreators.setError(e.response.data.message))
    }
  }
}