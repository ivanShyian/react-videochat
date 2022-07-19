import SButton from '@/components/shared/SButton';
import { usePeerContext } from '../../../context/PeerContext';
import React, { FC, useEffect, useMemo, useState } from 'react';
import ReactModal from 'react-modal';
import {useTypedSelector} from '@/use/useTypedSelector'

ReactModal.setAppElement(document.getElementById('root')!)

export const ChatAnswerModal: FC = () => {
  const {chats} = useTypedSelector(selector => selector.chats)
  const [isModalOpen, changeModalVisibility] = useState(false)
  const {acceptCall, declineCall, isCallView} = usePeerContext()

  const caller = useMemo(() => {
    if (chats && Object.keys(chats).length) {
      return Object.values(chats).find((chat) => chat.callData)
    }
    return null
  }, [chats])

  const callerName = useMemo(() => {
    if (caller?.callData) {
      return caller.member.nickname
    }
    return 'Unknown user'
  }, [caller])

  useEffect(() => {
    const call = caller?.callData
    if (call?.type === 'receiver' && !call.myVideoStream && !isCallView) {
      return changeModalVisibility(true)
    }
  }, [caller])

  const closeModal = () => {
    changeModalVisibility(false)
    if (caller?.id) {
      declineCall(caller.id)
    }
  }

  const handleAcceptCall = () => {
    if (caller?.id) {
      acceptCall(caller.id)
    }
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
