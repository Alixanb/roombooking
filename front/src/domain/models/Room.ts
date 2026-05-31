export type Room = {
  readonly id: number
  name: string
  picture: File | string | null
  pictureUrl: string | null
  adress: string
  adressComplements: string | null
  groupe: string
  capacity: number
  area: string
  isAccessible: boolean
  surface: string | null // intérieur et/ou exterieur
}

export type updateRoomRequestModel = {
  newRoom: Room
  token: string
  pictureFile: string | null | undefined
}

export type deleteRoomRequestModel = {
  roomId: number
  token: string
}
