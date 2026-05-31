<script setup lang="ts">
import { Calendar } from '@/application/vue/components/ui/calendar'
import type { BookingDto } from '@/domain/models/Booking'
import { GetBookingsRoom } from '@/domain/services/bookingService'
import { format } from 'date-fns'
import { onMounted, ref } from 'vue'

const props = defineProps<{ roomId: number }>()

const bookings = ref<BookingDto[]>([])
const selectedDate = ref<Date>()
const selectedDateBookings = ref<BookingDto[]>([])

onMounted(async () => {
  try {
    const todayFormatted = format(new Date(), 'yyyy-MM-dd')
    const element = document.querySelector(
      `[month='${todayFormatted}']`,
    ) as HTMLElement | null
    element?.click()
    bookings.value = await GetBookingsRoom(props.roomId)
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
})

const updateSelectedDateBookings = (date: Date) => {
  selectedDate.value = date

  selectedDateBookings.value = bookings.value.filter(
    booking => format(booking.day, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
  )
}

const isDateBooked = (date: Date) => {
  return bookings.value.some(booking => booking.day === date)
}
</script>

<template>
  <div class="mt-8">
    <h2 class="text-2xl font-semibold mb-4">Calendrier des réservations</h2>
    <div class="flex gap-8">
      <Calendar
        v-model="selectedDate"
        class="rounded-md border"
        @update:model-value="updateSelectedDateBookings"
        mode="single"
      >
        <template #day="{ date }">
          <div
            :class="{ 'bg-blue-100 rounded-full': isDateBooked(date) }"
            class="w-full h-full flex items-center justify-center"
          >
            {{ date.getDate() }}
          </div>
        </template>
      </Calendar>

      <div
        v-if="selectedDate && selectedDateBookings.length > 0"
        class="flex-1"
      >
        <h3 class="text-xl font-medium mb-4">
          Réservations du {{ format(selectedDate, 'dd/MM/yyyy') }}
        </h3>
        <ul class="space-y-4">
          <li
            v-for="booking in selectedDateBookings"
            :key="booking.id"
            class="p-4 border rounded-md"
          >
            <h4 class="font-semibold">{{ booking.name }}</h4>
            <p>{{ booking.timeFrom }} - {{ booking.timeTo }}</p>
            <p>
              Organisateur: {{ booking.organizerLastname }}
              {{ booking.organizerFirstname }}
            </p>
            <div v-if="booking.guestsName.length > 0">
              <p class="mt-2 font-medium">Participants:</p>
              <ul class="list-disc list-inside">
                <li v-for="guest in booking.guestsName" :key="guest">
                  {{ guest }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div
        v-else-if="selectedDate"
        class="flex-1 flex items-start justify-center text-gray-500"
      >
        Aucune réservation pour cette date
      </div>
    </div>
  </div>
</template>
