<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'radix-vue'
import { cn } from '@/utils'
import { ComboboxSeparator } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ComboboxSeparator
    v-bind="delegatedProps"
    :class="cn('n-mx-1 nh-px nbg-border', props.class)"
  >
    <slot />
  </ComboboxSeparator>
</template>
