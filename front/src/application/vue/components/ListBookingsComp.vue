<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { BookingDto } from '@/domain/models/Booking'
import { GetBookingsUser } from '@/domain/services/bookingService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import CardBooking from '@/application/vue/components/CardBookingComp.vue'

const listBookings = ref<BookingDto[]>()
const listBookingsFutur = ref<BookingDto[]>()
const listBookingsPast = ref<BookingDto[]>()
const listRoomsFind = ref<boolean>(false)
const loading = ref(true)
const token = localStorage.getItem('jwtToken')

const props = defineProps<{
  userId: number
}>()

const userId = ref<number>(props.userId)

onMounted(async () => {
  try {
    listBookings.value = await GetBookingsUser(token!)

    listBookingsFutur.value = listBookings.value
      ?.sort(
        (b1, b2) =>
          new Date(b1.day + 'T' + b1.timeFrom).getTime() -
          new Date(b2.day + 'T' + b2.timeFrom).getTime(),
      )
      .filter(booking => booking.statut.toLowerCase() != 'terminer')

    listBookingsPast.value = listBookings.value
      ?.sort(
        (b1, b2) =>
          new Date(b2.day + 'T' + b2.timeFrom).getTime() -
          new Date(b1.day + 'T' + b1.timeFrom).getTime(),
      )
      .filter(booking => booking.statut.toLowerCase() == 'terminer')

    listRoomsFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <div v-if="!loading" class="basis-46">
    <div
      v-if="listBookings && listRoomsFind"
      class="flex flex-wrap gap-x-4 gap-y-10"
    >
      <div class="basis-10 min-w-72">
        <h2>Réservations Futures</h2>

        <ul
          v-if="listBookingsFutur && listBookingsFutur.length > 0"
          class="w-full p-2 grid gap-4"
        >
          <li v-for="(booking, index) in listBookingsFutur" :key="index">
            <CardBooking :booking="booking" />

            <div v-if="booking.idOrganizer == userId">
              <RouterLink :to="`/booking/${booking.id}/update`">
                <button
                  class="mt-1 p-2 bg-amber-200 hover:bg-amber-300 rounded-md"
                >
                  Mettre à jour
                </button>
              </RouterLink>
            </div>
          </li>
        </ul>
        <div v-else>Aucune réservation prévus.</div>
      </div>

      <div class="basis-10 min-w-72">
        <h2>Réservations Passées</h2>

        <ul
          v-if="listBookingsPast && listBookingsPast.length > 0"
          class="w-full p-2 grid gap-4"
        >
          <li v-for="(booking, index) in listBookingsPast" :key="index">
            <CardBooking :booking="booking" />
          </li>
        </ul>
        <div v-else>Aucune réservation passées.</div>
      </div>
    </div>

    <div v-else>
      <ErrorMessage>
        La liste des réservations n'a pas pu être chargée
      </ErrorMessage>
    </div>
  </div>

  <div v-else>
    <IconLoading />
  </div>
</template>
