<script setup lang="ts">
import CardRoom from '@/application/vue/components/CardRoomComp.vue'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'
import type { Room } from '@/domain/models/Room'
import { DeleteRoom } from '@/domain/services/roomService'
import { ref } from 'vue'

defineProps<{ listRoomsProps: Array<Room> }>()

const token = localStorage.getItem('jwtToken')
const isAdmin = localStorage.getItem('isAdmin') == 'true'
const deleteError = ref<string>('')
const deleteSucces = ref<string>('')

const deleteRoomFunction = async (roomId: number) => {
  deleteError.value = ''

  try {
    const response = await DeleteRoom({ roomId, token })
    deleteSucces.value = response
  } catch (error) {
    deleteError.value = error
  }
}
</script>

<template>
  <div v-if="deleteSucces.length > 0">
    <SuccessMessage>
      {{ deleteSucces }}
      <br />
    </SuccessMessage>
  </div>

  <div v-else-if="deleteError.length > 0">
    <ErrorMessage>{{ deleteError }}</ErrorMessage>
  </div>

  <div v-if="token && isAdmin" class="mx-2 my-2">
    <RouterLink to="/room/add">
      <button class="p-2 bg-green-200 hover:bg-green-300 rounded-md">
        Ajouter une salle
      </button>
    </RouterLink>
  </div>

  <ul
    class="w-full max-w-screen-xl m-auto p-2 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-3 gap-y-8"
  >
    <li v-for="(room, index) in listRoomsProps" :key="index">
      <CardRoom :room="room" />

      <div v-if="token && isAdmin" class="my-2 flex gap-2">
        <RouterLink :to="`/room/${room.id}/update`">
          <button class="p-2 bg-amber-200 hover:bg-amber-300 rounded-md">
            Mettre à jour
          </button>
        </RouterLink>

        <button
          @click="deleteRoomFunction(room.id)"
          class="p-2 bg-red-200 hover:bg-red-300 rounded-md"
        >
          Supprimer
        </button>
      </div>
    </li>
  </ul>
</template>
