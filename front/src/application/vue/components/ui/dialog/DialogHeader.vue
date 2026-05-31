<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('nflex nflex-col ngap-y-1.5 ntext-center sm:ntext-left', props.class)"
  >
    <slot />
  </div>
</template>
