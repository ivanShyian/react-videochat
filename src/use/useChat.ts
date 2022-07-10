import React, { useState, useEffect, useMemo, FC } from 'react'
import { useTypedSelector } from '@/use/useTypedSelector'
import SocketService from '../services/SocketService'
import { useActions } from './useActions'
import { ChatsActionCreators } from '@/store/reducers/chats/action-creators'
import { IChat } from '@/models/IChat'
import { MessagesActionCreators } from '@/store/reducers/messages/action-creators'
import { UsersActionCreators } from '@/store/reducers/users/action-creators'
import { useNavigate, useParams } from 'react-router-dom'

export enum UseChatType {
  Actions = 'actions',
  Init = 'init'
}

interface ReturnStatement {
  currentChat: IChat
  sendMessage: (message: string) => void
  onMemberClick: (id: string) => Promise<void>
}

const actionCreatorList = [
  ChatsActionCreators.getChats,
  MessagesActionCreators.getMessagesByChat,
  ChatsActionCreators.createChatWithUser,
  UsersActionCreators.setQuery
]

export const useChat = (type = UseChatType.Actions): ReturnStatement => {
  const navigate = useNavigate()
  const {chatId} = useParams()
  const {chats, isChatsFetched} = useTypedSelector(selector => selector.chats)
  const {user} = useTypedSelector(selector => selector.auth)
  const {getChats, getMessagesByChat, createChatWithUser, setQuery} = useActions(...actionCreatorList)

  const [currentChat, setCurrentChat] = useState<IChat>({} as IChat)

  const chatsExists = useMemo(() => !!Object.keys(chats).length, [chats])

  useEffect(() => {
    if (type === UseChatType.Init) {
      (async() => {
        await getChats()
        SocketService.connect()
      })();
    }
  }, [])

  useEffect(() => {
    if (chatsExists && type !== UseChatType.Actions) {
      SocketService.subscribeToAllChats(Object.keys(chats))
    }
  }, [chatsExists])

  useEffect(() => {
    if (chatsExists && type === UseChatType.Actions && chatId) {
      setCurrentChat(chats[chatId])
      getMessagesByChat(chatId)
    }
  }, [chatsExists, chatId])

  useEffect(() => {
    if (isChatsFetched && chatId && !chatsExists) {
      navigate('/')
    }
  }, [isChatsFetched, chatId, chatsExists])

  const sendMessage = (message: string) => {
    const messageBody = {
      room: currentChat.id,
      senderId: user.id,
      receiverId: currentChat.member.id,
      message
    }
    SocketService.sendMessageToUser(messageBody)
  }

  const onMemberClick = async(id: string) => {
    await createChatWithUser(id, (chatId: string) => {
      SocketService.joinToRoomWithUser(chatId, id)
      navigate(`/chats/${chatId}`)
    })
    setQuery('')
  }

  return {
    currentChat,
    sendMessage,
    onMemberClick
  }
}