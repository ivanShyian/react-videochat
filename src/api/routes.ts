const auth = {
  postLogin: () => '/login',
  postSignup: () => '/signup',
  postRefreshToken: () => '/token/refresh'
}

const chats = {
  alias: '/chat',
  getChats: () => `${chats.alias}/all`
}

const users = {
  alias: '/user',
  getUserList: (query: string) => `${users.alias}/find/?search=${query}` 
}

export default {
  auth,
  chats,
  users
}