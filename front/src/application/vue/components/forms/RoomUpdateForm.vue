<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Room } from '@/domain/models/Room'
import { usePictureUpload } from '@/application/vue/composables/usePictureUpload'
import { GetRoomGroupe, UpdateRoom } from '@/domain/services/roomService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'

const props = defineProps<{
  roomProps: Room
}>()

const loading = ref(false)
const room = ref<Room>({ ...props.roomProps })
const { pictureFile, errorPicture, handlePictureChange } = usePictureUpload()
const roomGroupe = ref<string[]>()
const updateError = ref<string>('')
const updateSucces = ref<string>('')

const timerNumber = ref<number>(5)

onMounted(async () => {
  try {
    roomGroupe.value = await GetRoomGroupe()
  } catch (error) {
    updateError.value = error
  }
})

const updateRoomFunction = async () => {
  updateError.value = ''
  updateSucces.value = ''
  loading.value = true

  try {
    const token = localStorage.getItem('jwtToken')
    const response = await UpdateRoom({
      newRoom: room.value!,
      token: token!,
      pictureFile: pictureFile.value,
    })
    updateSucces.value = response
  } catch (error) {
    updateError.value = error
  }

  loading.value = false
}
</script>

<template>
  <form
    @submit.prevent="updateRoomFunction"
    class="grid grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto gap-4"
  >
    <div class="my-input">
      <label for="name">Nom *</label>
      <input type="text" id="name" v-model="room.name" required />
    </div>

    <div class="my-input">
      <label for="picture">Photo</label>
      <input
        type="file"
        id="picture"
        accept="image/*"
        @change="handlePictureChange"
        class="border text-gray-600"
      />
    </div>

    <div class="my-input">
      <label for="adress">Adresse *</label>
      <input type="text" id="adress" v-model="room.adress" required />
    </div>

    <div class="my-input">
      <label for="adressComplements">Complément d'adresse</label>
      <input
        type="text"
        id="adressComplements"
        v-model="room.adressComplements"
      />
    </div>

    <div class="my-input col-span-full">
      <label for="room-groupe">Type *</label>
      <select name="room-groupe" id="room-groupe" v-model="room.groupe">
        <option v-for="groupe in roomGroupe" :key="groupe" :value="groupe">
          {{ groupe }}
        </option>
      </select>
    </div>

    <div class="my-input">
      <label for="capacity">Capacité (nombre de personnes) *</label>
      <input type="number" id="capacity" v-model="room.capacity" required />
    </div>

    <div class="my-input">
      <label for="area">Surface *</label>
      <input type="number" id="area" v-model="room.area" required />
    </div>

    <div class="flex items-center gap-2">
      <input name="isAccessible" type="checkbox" v-model="room.isAccessible" />
      <label for="isAccessible" class="text-blue-700">
        {{ room.isAccessible ? '' : 'Non' }} Accessible pour les handicapés
      </label>
    </div>

    <div class="my-input">
      <label for="surface">Intérieur et/ou Exterieur ?</label>
      <input type="text" id="surface" v-model="room.surface" />
    </div>

    <div class="col-span-full">
      <button
        v-if="!loading"
        type="submit"
        class="w-full p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        Enregistrer les modifications
      </button>

      <IconLoading v-else />

      <div v-if="updateSucces">
        <SuccessMessage>
          {{ updateSucces }}
        </SuccessMessage>

        <RouterLink
          to="/rooms-list"
          class="block w-fit text-center mx-auto p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
        >
          Retourner à la liste des salles
        </RouterLink>
      </div>

      <div v-else-if="updateError || errorPicture">
        <ErrorMessage>{{ updateError || errorPicture }}</ErrorMessage>
      </div>
    </div>
  </form>
</template>
