<script setup lang="ts">
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import ListCards from '@/application/vue/components/ListCardsComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import type { Room } from '@/domain/models/Room'
import { GetRooms } from '@/domain/services/roomService'
import apiClient from '@/infrastructure/utils/apiClient'
import { Download } from 'lucide-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const listRooms = ref<Room[]>([])
const listRoomsFind = ref(false)
const loading = ref(true)
const selectedFormat = ref<'cal' | 'ical' | 'csv' | 'xlsx'>('xlsx')

const exportCalendar = async () => {
  try {
    const response = await apiClient.get(
      `/booking/export/${selectedFormat.value}`,
    )
    const blob = new Blob([response.data], {
      type:
        selectedFormat.value === 'csv'
          ? 'text/csv'
          : selectedFormat.value === 'xlsx'
            ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            : 'text/calendar',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `calendar.${selectedFormat.value}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error(`Error exporting calendar as ${selectedFormat.value}:`, error)
  }
}

const filteredRooms = computed(() => {
  const searchQuery = route.query.search?.toString().toLowerCase()
  const searchType = route.query.type?.toString() || 'all'

  if (!searchQuery) return listRooms.value

  return listRooms.value.filter(room => {
    switch (searchType) {
      case 'name':
        return room.name.toLowerCase().includes(searchQuery)
      case 'location':
        return room.adress.toLowerCase().includes(searchQuery)
      case 'capacity':
        return room.capacity.toString().includes(searchQuery)
      case 'all':
      default:
        return (
          room.name.toLowerCase().includes(searchQuery) ||
          room.adress.toLowerCase().includes(searchQuery) ||
          room.groupe.toLowerCase().includes(searchQuery) ||
          room.capacity.toString().includes(searchQuery)
        )
    }
  })
})

watch(
  () => route.query,
  () => {
    // La computed property filteredRooms sera recalculée automatiquement
    // quand la query change
  },
  { immediate: true },
)

onMounted(async () => {
  try {
    listRooms.value = await GetRooms()
    listRoomsFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <main>
    <h1>Catalogue de Salles</h1>

    <div v-if="!loading">
      <div v-if="listRooms && listRoomsFind">
        <div class="flex justify-end mb-4">
          <div class="flex">
            <select
              v-model="selectedFormat"
              class="border border-gray-300 px-4 py-2 rounded-l-md cursor-pointer"
            >
              <option value="xlsx">XLSX</option>
              <option value="csv">CSV</option>
              <option value="cal">CAL</option>
              <option value="ical">ICAL</option>
            </select>
            <button
              @click="exportCalendar"
              class="px-4 py-2 border border-gray-300 border-l-0 rounded-r-md flex gap-2 items-center hover:underline"
            >
              <Download class="size-4" />
              Exporter
            </button>
          </div>
        </div>
        <ListCards :listRoomsProps="filteredRooms" />
      </div>

      <div v-else>
        <ErrorMessage>
          La liste des salles n'a pas pu être chargée.
        </ErrorMessage>
      </div>
    </div>

    <div v-else>
      <IconLoading />
    </div>
  </main>
</template>
