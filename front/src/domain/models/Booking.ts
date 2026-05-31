import type { Equipment, NewEquipment } from './Equipment'

export type Booking = {
  readonly id: number
  name: string
  description: string
  idRoom: number
  idOrganizer: number
  day: Date
  timeFrom: string
  timeTo: string
  statut: string
}

export type BookingDto = {
  readonly id: number
  name: string
  description: string
  idRoom: number
  roomName: string
  idOrganizer: number
  organizerLastname: string
  organizerFirstname: string
  day: string
  timeFrom: string
  timeTo: string
  statut: string
  guestsId: number[]
  guestsName: string[]
  equipmentsList: Equipment[]
}

export type newBooking = {
  name: string
  description: string
  idRoom: number
  day: string
  timeFrom: string
  timeTo: string
}

export type updateBookingRequestModel = {
  newBooking: newBooking
  token: string
  guests: number[]
  equipments: NewEquipment[]
}
