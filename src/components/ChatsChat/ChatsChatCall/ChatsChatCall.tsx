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
    <div className="chats-call mr-5 my-5 w-full h-[calc(100%_-_40px)] flex flex-col">
      <div className="chat-call__wrapper h-[calc(100%_-_80px)] flex flex-col xl:flex-row">
        <div className="chat-call__video mb-5 flex-1 h-[calc(50%_-_10px)] block xl:block xl:h-full xl:my-auto xl:mr-5">
          <video
            className="rounded-xl overflow-hidden mx-auto w-auto h-full xl:w-auto xl:h-full"
            playsInline={true}
            ref={videoRefMember}
          />
        </div>
        <div className="chat-call__video flex-1 h-[calc(50%_-_10px)] block xl:block xl:h-full xl:my-auto">
          <video
            className="rounded-xl overflow-hidden mx-auto w-auto h-full xl:w-auto xl:h-full"
            playsInline={true}
            ref={videoRef}
          />
        </div>
      </div>
      <ChatsChatCallControls
        onCallClose={closeCall}
        onToggleVideo={toggleVideo}
        onToggleAudio={toggleAudio}
        callData={callData}
      />
    </div>
  )
}
