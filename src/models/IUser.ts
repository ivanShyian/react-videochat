export interface IUser {
  id: number
  nickname: string
  email: string
}

export interface IUserToken {
  accessToken: string
  refreshToken: string
}