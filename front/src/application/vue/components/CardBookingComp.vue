<script setup lang="ts">
import type { BookingDto } from '@/domain/models/Booking'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const colorClasses = {
  red: 'bg-red-50 hover:bg-red-100',
  blue: 'bg-blue-50 hover:bg-blue-100',
  cyan: 'bg-cyan-50 hover:bg-cyan-100',
  amber: 'bg-amber-50 hover:bg-amber-100',
  purple: 'bg-purple-50 hover:bg-purple-100',
}

function cardColor(booking: BookingDto) {
  const dateFrom = new Date(booking.day + 'T' + booking.timeFrom)
  const dateTo = new Date(booking.day + 'T' + booking.timeTo)
  const today = new Date()
  let color = 'cyan'

  if (booking.statut.toLowerCase() === 'annuler') {
    color = 'red'
  } else if (booking.statut.toLowerCase() === 'terminer') {
    color = 'blue'
  } else if (dateFrom.getDay() === today.getDay()) {
    if (
      dateFrom.getTime() <= today.getTime() &&
      today.getTime() < dateTo.getTime()
    ) {
      color = 'amber'
    } else {
      color = 'purple'
    }
  }

  return (
    colorClasses[color as keyof typeof colorClasses] ||
    'bg-gray-50 hover:bg-gray-100'
  )
}

defineProps<{
  booking: BookingDto
}>()
</script>

<template>
  <RouterLink
    :to="`/booking/${booking.id}`"
    :class="`${cardColor(booking)} block max-w-lg p-2 rounded-md cursor-pointer`"
  >
    <h4 class="w-full text-2xl font-semibold">{{ booking.name }}</h4>

    <p>Jour : {{ format(booking.day, 'dd MMMM yyyy', { locale: fr }) }}</p>
    <p>De {{ booking.timeFrom }} à {{ booking.timeTo }}</p>
    <p>Statut : {{ booking.statut }}</p>
    <p>Salle : {{ booking.roomName }}</p>
    <p>
      Organisateur : {{ booking.organizerLastname }}
      {{ booking.organizerFirstname }}
    </p>
  </RouterLink>
</template>
