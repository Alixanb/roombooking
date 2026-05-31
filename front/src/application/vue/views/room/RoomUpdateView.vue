<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Room } from '@/domain/models/Room'
import { GetRoomById } from '@/domain/services/roomService'
import RoomUpdateForm from '@/application/vue/components/forms/RoomUpdateForm.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'

const route = useRoute()
const roomId = Number(route.params.id)

const room = ref<Room>()
const roomFind = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    room.value = await GetRoomById(roomId)
    roomFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <main v-if="!loading">
    <div v-if="room && roomFind">
      <h1>
        Mise à jour de la salle n°<span class="text-blue-700">
          {{ room.id }}
        </span>
      </h1>

      <RoomUpdateForm :roomProps="room" />
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
