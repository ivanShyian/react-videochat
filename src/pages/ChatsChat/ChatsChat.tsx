import React, {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useTypedSelector} from '@/use/useTypedSelector'
import {useChat, UseChatType} from '@/use/useChat'
import ChatsChatCall from '@/components/ChatsChat/ChatsChatCall'
import {usePeerContext} from '../../context/PeerContext'
import ChatsChatMessages from '@/components/ChatsChat/ChatsChatMessages'
import SLoader from '@/components/shared/SLoader'

export const ChatsChat: FC = () => {
  const {chatId} = useParams()
  const {messages} = useTypedSelector(selector => selector.messages)
  const {chats} = useTypedSelector(selector => selector.chats)
  const {user} = useTypedSelector(selector => selector.auth)
  const {currentChat, sendMessage} = useChat(UseChatType.Actions)
  const [loading, setLoading] = useState(true)

  const {
    onCallUser,
    closeCall,
    videoRefMember,
    videoRef,
    isCallView,
    toggleVideoStream,
    toggleAudioStream,
    currentChat: currentCall
  } = usePeerContext()

  const handleCall = () => {
    if (currentChat.member) {
      onCallUser(currentChat.id, currentChat.member.id)
    }
  }

  useEffect(() => {
    if (loading) {
      setLoading(false)
    }
  }, [currentCall, currentChat, loading])
  //
  // if (loading) {
  //   return <SLoader />
  // }

  if (!isCallView) {
    return (
      <ChatsChatMessages
        handleCall={handleCall}
        member={currentChat?.member}
        chat={chats[chatId as string]}
        messages={messages[chatId as string]}
        userId={user.id}
        sendMessage={sendMessage}
      />
    )
  }
  return (
    <ChatsChatCall
      videoRefMember={videoRefMember}
      videoRef={videoRef}
      closeCall={closeCall}
      toggleAudio={toggleAudioStream}
      toggleVideo={toggleVideoStream}
      callData={currentCall?.callData}
    />
  )
}
