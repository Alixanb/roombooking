<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { Room } from '@/domain/models/Room'
import { GetRoomGroupe, AddRoom } from '@/domain/services/roomService'
import { usePictureUpload } from '@/application/vue/composables/usePictureUpload'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const router = useRouter()
const loading = ref(false)
const room = ref<Room>({
  name: '',
  adress: '',
  adressComplements: '',
  groupe: '',
  capacity: '',
  area: '',
  isAccessible: false,
  surface: '',
})

const { pictureFile, errorPicture, handlePictureChange } = usePictureUpload()

const roomGroupe = ref<string[]>()
const addError = ref<string>('')

onMounted(async () => {
  try {
    roomGroupe.value = await GetRoomGroupe()
    room.value.groupe = roomGroupe.value[0]
  } catch (error) {
    addError.value = error as string
  }
})

const addRoomFunction = async () => {
  addError.value = ''
  loading.value = true

  try {
    const token = localStorage.getItem('jwtToken')
    const response = await AddRoom({
      newRoom: room.value!,
      token: token!,
      pictureFile: pictureFile.value,
    })
    router.push(`/room/${response}`)
  } catch (error) {
    addError.value = error as string
  }

  loading.value = false
}
</script>

<template>
  <form
    @submit.prevent="addRoomFunction"
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

    <button
      v-if="!loading"
      type="submit"
      class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md col-span-full"
    >
      Créer
    </button>

    <IconLoading v-else />

    <div v-if="addError || errorPicture" class="col-span-full">
      <ErrorMessage>{{ addError || errorPicture }}</ErrorMessage>
    </div>
  </form>
</template>
