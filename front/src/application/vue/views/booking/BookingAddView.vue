<script setup lang="ts">
import BookingAddForm from '@/application/vue/components/forms/BookingAddForm.vue'
import { onMounted, ref } from 'vue'

const currentTime = ref('')

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<template>
  <main class="flex flex-col items-center">
    <div
      class="text-center w-fit mt-4 font-mono border border-gray-300 rounded-md p-2"
    >
      {{ currentTime }}
    </div>
    <h1 class="text-4xl font-bold my-4">Réservation de salle</h1>
    <BookingAddForm />
  </main>
</template>
