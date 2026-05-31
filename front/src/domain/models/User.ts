export type Users = {
  readonly id: number
  lastname: string
  firstname: string | null
}

export type UserLog = {
  readonly id: number
  lastname: string
  firstname: string | null
  readonly email: string
  password: string
  company: string | null
  job: string | null
  role: string
}

export type UsersAdmin = {
  readonly id: number
  lastname: string
  firstname: string | null
  role: string
}
