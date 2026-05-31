<script setup lang="ts">
import type { BookingDto } from '@/domain/models/Booking'
import { CancelBooking, GetBookingById } from '@/domain/services/bookingService'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const route = useRoute()
const router = useRouter()
const bookingId = Number(route.params.id)

const booking = ref<BookingDto>()
const bookingFound = ref(false)
const loading = ref(true)
const cancelLoading = ref(false)
const cancelSuccess = ref('')
const cancelError = ref('')

onMounted(async () => {
  try {
    booking.value = await GetBookingById(bookingId)
    bookingFound.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})

const handleCancelBooking = async () => {
  if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
    return
  }

  cancelLoading.value = true
  cancelError.value = ''
  cancelSuccess.value = ''

  try {
    const message = await CancelBooking(bookingId)
    cancelSuccess.value = message

    if (booking.value) {
      booking.value.statut = 'Annuler'
    }

    setTimeout(() => {
      router.push('/profil')
    }, 3000)
  } catch (error) {
    cancelError.value = error as string
  } finally {
    cancelLoading.value = false
  }
}

const canCancelBooking = () => {
  if (!booking.value) return false
  return booking.value.statut !== 'Annuler'
}
</script>

<template>
  <main v-if="!loading">
    <span class="block w-full text-center text-sm text-gray-600">
      Réservation
    </span>
    <div v-if="booking && bookingFound">
      <h1 class="text-4xl font-bold text-center my-4">
        {{ booking.name }}
      </h1>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4"
      >
        <div class="flex flex-col gap-2">
          <h2>Informations</h2>

          <p>
            Salle :
            <RouterLink
              :to="`/room/${booking.idRoom}`"
              class="text-blue-700 p-2 bg-blue-100 rounded-md hover:bg-blue-300 hover:text-blue-900"
            >
              {{ booking.roomName }}
            </RouterLink>
          </p>
          <p>
            Organisateur :
            <span class="text-blue-700">
              {{ booking.organizerLastname }} {{ booking.organizerFirstname }}
            </span>
          </p>
          <p>
            Horaire :
            <span class="text-blue-700">
              {{ format(booking.day, 'dd MMMM yyyy', { locale: fr }) }}</span
            >
            de <span class="text-blue-700">{{ booking.timeFrom }}</span> à
            <span class="text-blue-700">{{ booking.timeTo }} </span>
          </p>
          <p>
            Statut :
            <span
              :class="
                booking.statut === 'Annuler'
                  ? 'text-red-600 font-semibold'
                  : 'text-blue-700'
              "
            >
              {{ booking.statut }}
            </span>
          </p>

          <div v-if="booking.description.length > 0">
            <p>Description</p>
            <p class="text-blue-700">{{ booking.description }}</p>
          </div>

          <div class="mt-6" v-if="canCancelBooking()">
            <button
              @click="handleCancelBooking"
              :disabled="cancelLoading"
              class="px-4 py-2 bg-red-200 hover:bg-red-300 rounded-md disabled:opacity-50"
            >
              <span class="font-bold text-red-700">
                Annuler cette réservation
              </span>
            </button>
          </div>

          <div v-if="cancelSuccess" class="mt-4">
            <SuccessMessage>
              {{ cancelSuccess }}
              <br />
              Vous allez être redirigé vers votre profil...
            </SuccessMessage>
          </div>

          <div v-if="cancelError" class="mt-4">
            <ErrorMessage>{{ cancelError }}</ErrorMessage>
          </div>
        </div>

        <div>
          <h2>Participants</h2>
          <ul class="list-disc">
            <li
              class="list-inside"
              v-for="(g, index) in booking.guestsName"
              :key="index"
            >
              {{ g }}
            </li>
          </ul>
        </div>

        <div>
          <h2>Equipements</h2>
          <ul v-if="booking.equipmentsList.length > 0" class="list-disc">
            <li
              class="list-inside"
              v-for="(e, index) in booking.equipmentsList"
              :key="index"
            >
              {{ e.number }} {{ e.materiel }}
            </li>
          </ul>
          <div v-else>
            <p>Aucun équipement réservé.</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <ErrorMessage>
        La réservation que vous recherchez n'a pas été trouvée
      </ErrorMessage>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
