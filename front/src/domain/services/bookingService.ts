import type { updateBookingRequestModel } from '@/domain/models/Booking.ts'
import apiClient from '@/infrastructure/utils/apiClient'

export async function GetBookingsUser(token: string) {
  try {
    const response = await apiClient.get(`/booking/user/${token}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération de vos réservations :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération de vos réservations'
    )
  }
}

export async function GetBookingById(id: number) {
  try {
    const response = await apiClient.get(`/booking/${id}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération de la réservation :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération de la réservation'
    )
  }
}

export async function AddBooking(addBookingRequest: updateBookingRequestModel) {
  try {
    const response = await apiClient.post('/booking', addBookingRequest)
    return response.data.id
  } catch (error) {
    console.error('Erreur lors de la création de la réservation :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la création de la réservation.'
    )
  }
}

export async function UpdateBooking(
  updateBookingRequest: updateBookingRequestModel,
) {
  try {
    const response = await apiClient.put('/booking', updateBookingRequest)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la modification de la réservation :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la modification de la réservation'
    )
  }
}

export async function GetBookingStatus() {
  try {
    const response = await apiClient.get('/booking/status')
    return response.data
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des status des réservations :',
      error,
    )
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération des status des réservations'
    )
  }
}

export async function GetAvailableStartHours(roomId: number, date: string) {
  try {
    const response = await apiClient.get('/booking/available-start-hours', {
      params: { roomId, date: date },
    })

    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des heures de début :', error)
    throw error
  }
}

export async function GetBookingsRoom(roomId: number) {
  try {
    const response = await apiClient.get(`/booking/room/${roomId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching room bookings:', error)
    throw (
      error.response.data.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Error fetching room bookings'
    )
  }
}

export async function CancelBooking(id: number) {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await apiClient.delete(`/booking/cancel/${id}`, {
      params: {
        token,
      },
    })
    return response.data.message
  } catch (error) {
    console.error("Erreur lors de l'annulation de la réservation :", error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      "Erreur lors de l'annulation de la réservation"
    )
  }
}
