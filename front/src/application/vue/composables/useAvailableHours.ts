import { onMounted, ref, watch } from 'vue'
import { GetAvailableStartHours } from '@/domain/services/bookingService'
import { generateEndHours } from '@/infrastructure/utils/generateEndHours'
import type { newBooking } from '@/domain/models/Booking'

export function useAvailableHours(booking: newBooking, roomId: number) {
  const availableStartHours = ref<string[]>([])
  const availableEndHours = ref<string[]>([])
  const errorHours = ref<string | unknown>()

  const fetchAvailableHours = async () => {
    try {
      const startHours = await GetAvailableStartHours(roomId, booking.day)
      if (booking.timeFrom && !startHours.includes(booking.timeFrom)) {
        startHours.push(booking.timeFrom)
      }
      availableStartHours.value = startHours.sort()

      const endHours = generateEndHours(
        availableStartHours.value,
        booking.timeFrom,
      )
      if (booking.timeTo && !endHours.includes(booking.timeTo)) {
        endHours.push(booking.timeTo)
      }
      availableEndHours.value = endHours.sort()
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des heures disponibles :',
        error,
      )
      errorHours.value = 'Erreur lors de la récupération des heures disponibles'
    }
  }

  onMounted(async () => {
    if (booking.day) {
      fetchAvailableHours()
    }
  })

  watch(() => booking.day, fetchAvailableHours)

  watch(
    () => booking.timeFrom,
    timeFrom => {
      if (!timeFrom) return
      availableEndHours.value = generateEndHours(
        availableStartHours.value,
        timeFrom,
      )
    },
  )

  return {
    availableStartHours,
    availableEndHours,
    errorHours,
  }
}
