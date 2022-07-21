import {IChatsMap} from '@/models/IChat'
import moment from 'moment/moment'

export default function sortChats(chats: IChatsMap): IChatsMap {
  return Object.fromEntries(
    Object.entries(chats).sort(([, a],[, b]) => {
      if (a.lastMessage && b.lastMessage) {
        return moment(b.lastMessage.updatedAt).unix() - moment(a.lastMessage.updatedAt).unix()
      } else if (!a.lastMessage) {
        return 1
      } else if (!b.lastMessage) {
        return -1
      }
      return 0
    })
  )
}
