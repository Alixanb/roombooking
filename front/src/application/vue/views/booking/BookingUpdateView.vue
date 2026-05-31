<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { BookingDto } from '@/domain/models/Booking'
import { GetBookingById } from '@/domain/services/bookingService'
import BookingUpdateForm from '@/application/vue/components/forms/BookingUpdateForm.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'

const route = useRoute()
const bookingId = Number(route.params.id)

const booking = ref<BookingDto>()
const bookingFind = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    booking.value = await GetBookingById(bookingId)
    bookingFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <main v-if="!loading">
    <div v-if="booking && bookingFind">
      <RouterLink to="/profil" class="hover:text-blue-700">
        &lt; Retourner à mon profil
      </RouterLink>

      <h1>
        Mise à jour de la réservation n°<span class="text-blue-700">
          {{ booking.id }}
        </span>
      </h1>

      <BookingUpdateForm :bookingProps="booking" />
    </div>

    <div v-else>
      <ErrorMessage>
        La réservation que vous recherchez n'a pas été trouvée.
      </ErrorMessage>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
