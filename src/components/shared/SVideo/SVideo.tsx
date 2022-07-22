import React, {FC, LegacyRef} from 'react'

export const SVideo: FC<{videoRef: LegacyRef<HTMLVideoElement>, className?: string}> = ({videoRef, className = ''}) => {
  return (
    <div className={`${className}`}>
      <video
        className="max-w-[100%] h-full"
        playsInline={true}
        ref={videoRef}
      />
    </div>
  )
}
