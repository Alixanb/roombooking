<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      cn(
        'nflex nflex-col-reverse sm:nflex-row sm:njustify-end sm:ngap-x-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
