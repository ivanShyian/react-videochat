import React, {FC, LegacyRef} from 'react'
import ChatsChatCallControls from '@/components/ChatsChat/ChatsChatCall/ChatsChatCallControls'
import {IChatCall} from '@/models/IChat'
import SVideo from '@/components/shared/SVideo'

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
      <div className="chat-call__wrapper flex flex-col justify-evenly md:justify-start md:px-5 md:py-6 blurred-bg md:mr-5 md:my-5 h-full md:border border-white/20 md:rounded-xl">
        <div className="mt-2 md:mb-4">
          <p className="text-white/70 text-xl text-center mb-1">USER THAT I TALKING WITH</p>
          <p className="text-white/40 text-center">00:00</p>
        </div>
        <div className="flex flex-col md:flex-row relative md:h-[65%]">
          <SVideo videoRef={videoRefMember} className="max-h-[365px] md:h-full md:max-h-[100%] md:h-auto md:w-1/2 flex justify-center items-center" />
          <SVideo videoRef={videoRef} className="absolute h-[100px] md:h-auto md:w-1/2 right-0 bottom-0 border border-white/20 md:static md:border-0"/>
        </div>
        <ChatsChatCallControls
          onCallClose={closeCall}
          onToggleVideo={toggleVideo}
          onToggleAudio={toggleAudio}
          callData={callData}
        />
      </div>
    </div>
  )
}
