import { combineReducers } from 'redux'
import auth from './auth'
import chats from './chats'
import users from './users'

export default combineReducers({
  auth,
  chats,
  users
})