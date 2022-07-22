import React, {FC, LegacyRef} from 'react'
import ChatsChatCallControls from '@/components/ChatsChat/ChatsChatCall/ChatsChatCallControls'
import {IChatCall} from '@/models/IChat'

interface IChatChatCall {
  videoRefMember: LegacyRef<HTMLVideoElement>
  videoRef: LegacyRef<HTMLVideoElement>
  closeCall: () => void
  toggleVideo: () => void
  toggleAudio: () => void
  callData: IChatCall | undefined
}

export const ChatsChatCall: FC<IChatChatCall> = ({videoRefMember, videoRef, closeCall, toggleVideo, toggleAudio, callData}) => {
  return (
    <div className="chats-call w-full flex flex-col">
      <div className="chat-call__wrapper flex flex-col px-5 py-6 blurred-bg md:mr-5 md:my-5 h-full md:border border-white/20 rounded-xl">
        <div className="flex flex-col md:flex-row w-full h-[calc(100%_-_120px)] md:h-auto">
          <div className="chat-call__video flex-1 md:mr-5 mb-5 h-1/2 md:h-auto">
            <p className="text-white text-center text-blue-200 mb-5">User-1</p>
            <video
              className="w-auto md:w-full h-full md:h-auto mx-auto md:mx-0"
              playsInline={true}
              ref={videoRefMember}
            />
          </div>
          <div className="chat-call__video flex-1 h-1/2 md:h-auto">
            <p className="text-white text-center text-blue-200 mb-5 hidden md:block">Me</p>
            <video
              className="w-auto md:w-full h-full md:h-auto"
              playsInline={true}
              ref={videoRef}
            />
            <p className="text-white text-center text-blue-200 mt-5 block md:hidden">Me</p>
          </div>
        </div>
        <div className="mt-auto">
          <ChatsChatCallControls
            onCallClose={closeCall}
            onToggleVideo={toggleVideo}
            onToggleAudio={toggleAudio}
            callData={callData}
          />
        </div>
      </div>
    </div>
  )
}
