import React, {FC, useState} from 'react'
import SButton from '@/components/shared/SButton'
import {ReactComponent as IVideoOff} from '@/assets/icons/i-video-off.svg'
import {ReactComponent as IVideo} from '@/assets/icons/i-videocall.svg'
import {ReactComponent as IVoice} from '@/assets/icons/i-voice-2.svg'
import {ReactComponent as IVoiceCross} from '@/assets/icons/i-voice-2-cross.svg'
import {ReactComponent as IPhoneDisconnect} from '@/assets/icons/i-phone-disconnect.svg'
import {IChatCall} from '@/models/IChat'

interface ICallControls {
  onCallClose: () => void
  onToggleVideo: () => void
  onToggleAudio: () => void
  callData: IChatCall | undefined
}

export const ChatsChatCallControls: FC<ICallControls> = ({onCallClose, onToggleAudio, onToggleVideo, callData}) => {
  const [videoHidden, changeVideoHidden] = useState(false)
  const [audioMuted, changeAudioMuted] = useState(false)

  const handleToggleVideo = () => {
    if (callData && callData.myVideoStream) {
      onToggleVideo()
      changeVideoHidden(!callData.myVideoStream.getVideoTracks()[0].enabled)
    }
  }

  const handleToggleAudio = () => {
    if (callData && callData.myVideoStream) {
      onToggleAudio()
      changeAudioMuted(!callData.myVideoStream.getAudioTracks()[0].enabled)
    }
  }

  const IVideoIcon = videoHidden ? IVideo : IVideoOff
  const IAudioIcon = audioMuted ? IVoice : IVoiceCross

  return (
    <div className="h-[60px] flex items-center justify-center md:flex-1 md:-mb-5">
      <div>
        <SButton
          theme="transparent"
          className="!border !border-white/20 overflow-hidden relative before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg"
          onClick={handleToggleVideo}
        >
          <IVideoIcon className="fill-current text-white" />
          {/*<IVideoOff className="fill-current text-white" />*/}
        </SButton>
      </div>
      <div>
        <SButton
          theme="transparent"
          className="!border !border-white/20 overflow-hidden relative before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg mx-4"
          onClick={handleToggleAudio}
        >
          <IAudioIcon className="fill-current text-white" />
          {/*<IVoiceCross className="fill-current text-white" />*/}
        </SButton>
      </div>
      <div>
        <SButton
          theme="transparent"
          className="!border !border-white/20 overflow-hidden relative before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg"
          onClick={onCallClose}
        >
          <IPhoneDisconnect className="fill-current text-white" />
        </SButton>
      </div>
    </div>
  )
}
