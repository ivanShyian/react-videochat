import SButton from '@/components/Shared/SButton';
import { useCallContext } from '@/use/useCallContext';
import { useTypedSelector } from '@/use/useTypedSelector';
import objectHasOwnProperty from '@/utils/objectHasOwnProperty';
import React, { FC, useEffect, useMemo, useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement(document.getElementById('root')!)

export const ChatAnswerModal: FC = () => {
  const [isModalOpen, changeModalVisibility] = useState(false)
  const {callRequest, acceptCall, declineCall} = useCallContext()
  const {chats} = useTypedSelector(selector => selector.chats)

  const callerName = useMemo(() => {
    if (callRequest) {
      return objectHasOwnProperty(chats, callRequest?.roomId) && chats[callRequest.roomId].member.nickname
    }
    return 'Unknow user'
  }, [callRequest, chats])

  useEffect(() => {
    if (callRequest !== null) {
      return changeModalVisibility(true)
    }
  }, [callRequest])

  const closeModal = () => {
    changeModalVisibility(false)
    declineCall()
  }

  const handleAcceptCall = () => {
    acceptCall()
    changeModalVisibility(false)
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          zIndex: 50
        }
      }}
      className="w-25 bg-gray-900/80 backdrop-blur-sm border border-white/20  rounded-xl"
    >
      <div className="flex flex-col text-white p-10 text-center">
        <p className="mb-4 text-blue-200"><b className="text-xl">{callerName}</b> is calling to you!</p>
        <p className="text-xl text-blue-200 mb-10">Accept call?</p>
        <div>
          <SButton
            className="mr-10 border-green-500 text-green-500"
            theme="transparent"
            onClick={handleAcceptCall}
          >Accept</SButton>
          <SButton
            className="border-red-500 text-red-500"
            theme="transparent"
            onClick={closeModal}
          >Decline</SButton>
        </div>
      </div>
    </ReactModal>
  )
}