import React, {FC, useState} from 'react'
import SButton from '@/components/shared/SButton'
import {ReactComponent as IVideoOff} from '@/assets/icons/i-video-off.svg'
import {ReactComponent as IVoiceCross} from '@/assets/icons/i-voice-2-cross.svg'
import {ReactComponent as IPhoneDisconnect} from '@/assets/icons/i-phone-disconnect.svg'

interface ICallControls {
  onCallClose: () => void
  onToggleVideo: () => void
  onToggleAudio: () => void
  myVideoStream: MediaStream | undefined
}

export const ChatsChatCallControls: FC<ICallControls> = ({onCallClose, onToggleAudio, onToggleVideo, myVideoStream}) => {
  const [videoHidden, changeVideoHidden] = useState(false)
  const [audioMuted, changeAudioMuted] = useState(false)

  const handleToggleVideo = () => {
    if (myVideoStream) {
      onToggleVideo()
      changeVideoHidden(!myVideoStream.getVideoTracks()[0].enabled)
    }
  }

  const handleToggleAudio = () => {
    if (myVideoStream) {
      onToggleAudio()
      changeAudioMuted(!myVideoStream.getAudioTracks()[0].enabled)
    }
  }

  return (
    <div className="h-[60px] flex items-center justify-center md:flex-1 md:-mb-5">
      <div>
        <SButton
          theme="transparent"
          className={`!border overflow-hidden !border-white/20 relative ${videoHidden ? 'before:bg-white/30' : 'before:bg-black/20'}  before:absolute before:inset-0 before:z-0 before:blur-lg`}
          onClick={handleToggleVideo}
        >
          <IVideoOff className={`fill-current text-white`} />
        </SButton>
      </div>
      <div>
        <SButton
          theme="transparent"
          className={`!border !border-white/20 overflow-hidden relative  ${audioMuted ? 'before:bg-white/30' : 'before:bg-black/20'} before:absolute before:inset-0 before:z-0 before:blur-lg mx-4`}
          onClick={handleToggleAudio}
        >
          <IVoiceCross className="fill-current text-white" />
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
