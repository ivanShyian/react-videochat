const auth = {
  postLogin: () => '/login',
  postSignup: () => '/signup',
  postRefreshToken: () => '/token/refresh'
}

const chats = {
  alias: '/chat',
  getChats: () => `${chats.alias}/all`,
  getChatByUserId: (id: string) => `${chats.alias}/user/${id}`,
  getChatByRoomId: (id: string) => `${chats.alias}/room/${id}`,
  postChatWithUser: () => `${chats.alias}/create`
}

const users = {
  alias: '/user',
  getUserList: (query: string) => `${users.alias}/find/?search=${query}` 
}

const messages = {
  alias: '/chat',
  getChatMessages: (chatId: string) => `${messages.alias}/messages/${chatId}`
}
 
export default {
  auth,
  chats,
  users,
  messages
}