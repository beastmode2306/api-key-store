export type UserKey = {
  KeyName: string
  KeyValue: string
}

export type KeyData = {
  UserId: string
  Keys: UserKey[]
}

export type FormattedResponse<T> = {
  message?: string
  data: T
}