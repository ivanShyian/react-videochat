export interface IUser {
  id: string
  nickname: string
  email: string
}

export interface IUserToken {
  accessToken: string
  refreshToken: string
}