<script setup lang="ts">
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import type { newBooking } from '@/domain/models/Booking'
import type { NewEquipment } from '@/domain/models/Equipment'
import type { Users } from '@/domain/models/User'
import { AddBooking } from '@/domain/services/bookingService'
import { GetRoomsShort } from '@/domain/services/roomService'
import { GetAvailableEquipments } from '@/domain/services/equipmentService'
import { GetUsers } from '@/domain/services/userService'
import { useAvailableHours } from '@/application/vue/composables/useAvailableHours'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const roomId = Number(route.params.id)

const today = new Date()
const dateToday =
  today.getFullYear() +
  '-' +
  String(today.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(today.getDate()).padStart(2, '0')

const loading = ref(false)
const booking = ref<newBooking>({
  name: '',
  description: '',
  idRoom: roomId,
  day: dateToday,
  timeFrom: '',
  timeTo: '',
})

const users = ref<Users[]>()
const guests = ref<number[]>([])
const equipments = ref<string[]>()
const equipmentsForBooking = ref<NewEquipment[]>([])
const rooms = ref([])

const addError = ref<string>('')

onMounted(async () => {
  try {
    users.value = await GetUsers()
    equipments.value = await GetAvailableEquipments()
    rooms.value = await GetRoomsShort()
  } catch (error) {
    addError.value = error
  }
})

const addBookingFunction = async () => {
  addError.value = ''
  loading.value = true

  try {
    const token = localStorage.getItem('jwtToken')

    const response = await AddBooking({
      newBooking: booking.value!,
      token: token!,
      guests: guests.value,
      equipments: equipmentsForBooking.value,
    })
    router.push(`/booking/${response}`)
  } catch (error) {
    addError.value = error
  }

  loading.value = false
}

const { availableStartHours, availableEndHours, errorHours } =
  useAvailableHours(booking.value, roomId)
if (errorHours) addError.value = errorHours

function toggleGuest(userId: number) {
  const index = guests.value.indexOf(userId)

  if (index === -1) {
    guests.value.push(userId)
  } else {
    guests.value.splice(index, 1)
  }
}

function toggleEquipment(eq: string) {
  const index = equipmentsForBooking.value?.findIndex(
    equipment => equipment.materiel === eq,
  )

  if (index === -1) {
    equipmentsForBooking.value.push({ materiel: eq, number: 1 })
  } else {
    equipmentsForBooking.value.splice(index, 1)
  }
}

const getEquipment = (materiel: string): NewEquipment => {
  return (
    equipmentsForBooking.value.find(
      equipment => equipment.materiel === materiel,
    ) || { materiel, number: 0 }
  )
}
</script>

<template>
  <form
    @submit.prevent="addBookingFunction"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-y-10 gap-x-8"
  >
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-full my-input">
        <label for="name">Nom de la réunion *</label>
        <input type="text" id="name" v-model="booking.name" required />
      </div>

      <div class="col-span-full my-input">
        <label for="description">Description</label>
        <textarea
          name="description"
          id="description"
          v-model="booking.description"
        ></textarea>
      </div>

      <div class="my-input">
        <label for="date">Salle *</label>
        <select v-model="booking.idRoom" id="timeFrom" required class="border">
          <option v-for="room in rooms" :key="room.id" :value="room.id">
            {{ room.name }}
          </option>
        </select>
      </div>

      <div class="full my-input">
        <label for="date">Jour *</label>
        <input
          type="date"
          id="date"
          v-model="booking.day"
          required
          :min="dateToday"
        />
      </div>

      <div class="my-input">
        <label for="timeFrom">Heure de début *</label>
        <select
          v-model="booking.timeFrom"
          id="timeFrom"
          required
          class="border"
        >
          <option
            v-for="(hour, index) in availableStartHours"
            :key="index"
            :value="hour"
          >
            {{ hour }}
          </option>
        </select>
        <span class="text-sm text-gray-700">Choisissez un jour d'abord</span>
      </div>

      <div class="my-input">
        <label for="timeTo">Heure de Fin *</label>
        <select v-model="booking.timeTo" id="timeTo" required class="border">
          <option
            v-for="(hour, index) in availableEndHours"
            :key="index"
            :value="hour"
          >
            {{ hour }}
          </option>
        </select>
        <span class="text-sm text-gray-700">
          Choisissez une heure de début d'abord
        </span>
      </div>
    </div>

    <div>
      <h2>Renseignez les participants</h2>
      <div class="flex flex-wrap gap-6">
        <label v-for="user in users" :key="user.id" class="cursor-pointer">
          <input
            type="checkbox"
            :value="user.id"
            :checked="guests.includes(user.id)"
            @change="toggleGuest(user.id)"
          />
          {{ user.lastname }} {{ user.firstname }}
        </label>
      </div>
    </div>

    <div class="grid grid-cols-1">
      <h2>Choisissez vos équipements si besoin</h2>
      <div
        v-for="(eq, index) in equipments"
        :key="index"
        class="flex justify-between my-1"
      >
        <label class="cursor-pointer">
          <input
            type="checkbox"
            :value="eq"
            :checked="
              equipmentsForBooking.some(equipment => equipment.materiel === eq)
            "
            @change="toggleEquipment(eq)"
          />
          {{ eq }}
        </label>

        <input
          v-if="
            equipmentsForBooking.some(equipment => equipment.materiel === eq)
          "
          type="number"
          class="border w-20"
          min="0"
          max="1000"
          v-model="getEquipment(eq).number"
        />
      </div>
    </div>

    <button
      v-if="!loading"
      type="submit"
      class="col-span-full w-60 mx-auto p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
    >
      Réserver
    </button>

    <IconLoading v-else />

    <div v-if="addError.length > 0" class="col-span-full mx-auto">
      <ErrorMessage>{{ addError }}</ErrorMessage>
    </div>
  </form>
</template>
