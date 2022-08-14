import React, {Dispatch, FC, SetStateAction, useCallback, useRef, useState} from 'react'
import { ReactComponent as IEmoji } from '@/assets/icons/i-emoji.svg'
import SButton from '@/components/shared/SButton'
import 'emoji-picker-element'
import type { EmojiClickEvent } from 'emoji-picker-element/shared'

export const ChatFooterEmoji: FC<{onEmoji: Dispatch<SetStateAction<string | null>>}> = ({onEmoji}) => {
  const [isShown, changeShown] = useState(false)
  const callbackRef = useRef(onEmoji)

  const handleElementRef = useCallback((element: HTMLElement) => {
    if (element != null) {
      if (element.dataset['emoji-picker-registered'] == null) {
        element.setAttribute('emoji-picker-registered', 'true')
        element.addEventListener('emoji-click', event => {
          callbackRef.current?.((event as EmojiClickEvent).detail.unicode ?? '')
          changeShown(false)
        })
      }
    }
  }, [])

  return (
    <div className="chat__emoji">
      <SButton
        theme="transparent"
        className="!p-0 !h-[2.125rem] !w-10 rounded-md flex items-center justify-center border-none opacity-70 hover:!bg-white/10 hover:opacity-100"
        size="small"
        onClick={() => changeShown((isShown) => !isShown)}
      >
        <IEmoji className="w-6 h-6 stroke-current text-white mr-[0.1rem] mt-[0.1rem]" />
      </SButton>
      {/*@ts-expect-error: Custom HTML Element*/}
      {isShown && <div className="absolute bottom-14"><emoji-picker ref={handleElementRef} /></div>}
    </div>
  )
}
