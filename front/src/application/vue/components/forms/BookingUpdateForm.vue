<script setup lang="ts">
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import type { BookingDto } from '@/domain/models/Booking'
import type { NewEquipment } from '@/domain/models/Equipment'
import type { Users } from '@/domain/models/User'
import { UpdateBooking } from '@/domain/services/bookingService'
import { GetRoomsShort } from '@/domain/services/roomService'
import { GetAvailableEquipments } from '@/domain/services/equipmentService'
import { GetUsers } from '@/domain/services/userService'
import { onMounted, ref } from 'vue'
import { useAvailableHours } from '@/application/vue/composables/useAvailableHours'

const props = defineProps<{
  bookingProps: BookingDto
}>()

const today = new Date()
const dateToday =
  today.getFullYear() +
  '-' +
  String(today.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(today.getDate()).padStart(2, '0')

const loading = ref(false)
const booking = ref<BookingDto>({ ...props.bookingProps })

const users = ref<Users[]>()
const guests = ref<number[]>([])
const rooms = ref([])
const equipments = ref<string[]>()
const equipmentsForBooking = ref<NewEquipment[]>([])

const updateError = ref<string | unknown>('')
const updateSucces = ref<string | unknown>('')

const { availableStartHours, availableEndHours, errorHours } =
  useAvailableHours(booking.value, booking.value.idRoom)
if (errorHours) updateError.value = errorHours

onMounted(async () => {
  try {
    users.value = await GetUsers()
    equipments.value = await GetAvailableEquipments()
    rooms.value = await GetRoomsShort()

    equipmentsForBooking.value = booking.value.equipmentsList.map(eq => ({
      materiel: eq.materiel,
      number: eq.number,
    }))

    guests.value = booking.value.guestsId
  } catch (error) {
    updateError.value = error
  }
})

const addBookingFunction = async () => {
  updateError.value = ''
  loading.value = true

  try {
    const token = localStorage.getItem('jwtToken')

    const response = await UpdateBooking({
      newBooking: booking.value!,
      token: token!,
      guests: guests.value,
      equipments: equipmentsForBooking.value,
    })
    updateSucces.value = response
  } catch (error) {
    updateError.value = error
  }

  loading.value = false
}

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

      <div class="my-input">
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
          <option v-for="hour in availableStartHours" :key="hour" :value="hour">
            {{ hour }}
          </option>
        </select>
        <span class="text-sm text-gray-700">Choisissez un jour d'abord</span>
      </div>

      <div class="my-input">
        <label for="timeTo">Heure de Fin *</label>
        <select v-model="booking.timeTo" id="timeTo" required class="border">
          <option v-for="hour in availableEndHours" :key="hour" :value="hour">
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

    <div class="col-span-full">
      <button
        v-if="!loading"
        type="submit"
        class="block w-60 mx-auto p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        Enregistrer les modifications
      </button>

      <IconLoading v-else />

      <div v-if="updateSucces" class="mx-auto w-fit">
        <SuccessMessage>
          {{ updateSucces }}
        </SuccessMessage>
      </div>

      <div v-if="updateError.length > 0" class="col-span-full mx-auto">
        <ErrorMessage>{{ updateError }}</ErrorMessage>
      </div>
    </div>
  </form>
</template>
