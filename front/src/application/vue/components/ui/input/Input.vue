<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" :class="cn('nflex nh-10 nw-full nrounded-md nborder nborder-input nbg-background npx-3 npy-2 ntext-sm nring-offset-background file:nborder-0 file:nbg-transparent file:ntext-sm file:nfont-medium placeholder:ntext-muted-foreground focus-visible:noutline-none focus-visible:nring-2 focus-visible:nring-ring focus-visible:nring-offset-2 disabled:ncursor-not-allowed disabled:nopacity-50', props.class)">
</template>
