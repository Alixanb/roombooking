<script setup lang="ts">
import type { Room } from '@/domain/models/Room'
import { GetRoomById } from '@/domain/services/roomService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import RoomCalendar from '../../components/RoomCalendar.vue'

const token = localStorage.getItem('jwtToken')
const route = useRoute()
const roomId = Number(route.params.id)

const room = ref<Room>()
const roomFind = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    room.value = await GetRoomById(roomId)

    if (room?.value?.pictureUrl) {
      room.value.picture = `data:image/png;base64,${room?.value?.pictureUrl}`
    }

    roomFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <main v-if="!loading">
    <span class="block w-full text-center text-sm text-gray-600">Salle</span>

    <div v-if="room && roomFind">
      <h1>
        {{ room.name }}
      </h1>

      <div class="flex flex-wrap items-center gap-y-4 gap-x-8">
        <img
          class="w-full max-w-xl rounded-xl"
          :src="`${room.picture}`"
          :alt="`Photo de la salle ${room.name}`"
        />

        <div class="max-w-full flex flex-col gap-2">
          <p>
            Adresse :
            <span class="text-blue-700"
              >{{ room.adress }}, {{ room.adressComplements }}</span
            >
          </p>
          <p>
            Groupe : <span class="text-blue-700">{{ room.groupe }}</span>
          </p>
          <p>
            Capacité :
            <span class="text-blue-700">{{ room.capacity }} personne</span>
          </p>
          <p>
            Superficie <span class="text-blue-700">{{ room.area }} m²</span>
          </p>
          <p>{{ room.isAccessible ? 'A' : 'Non a' }}ccessible aux handicapés</p>

          <div v-if="token" class="mt-10 flex gap-4">
            <RouterLink :to="`/room/${room.id}/booking`">
              <button
                class="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-md"
              >
                Réserver
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
      <RoomCalendar :roomId="roomId" />
    </div>

    <div v-else>
      <ErrorMessage>
        La salle que vous recherchez n'a pas été trouvée.
      </ErrorMessage>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
