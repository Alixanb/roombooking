<script setup lang="ts">
import type { ComboboxGroupProps } from 'radix-vue'
import { cn } from '@/utils'
import { ComboboxGroup, ComboboxLabel } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ComboboxGroupProps & {
  class?: HTMLAttributes['class']
  heading?: string
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ComboboxGroup
    v-bind="delegatedProps"
    :class="cn('noverflow-hidden np-1 ntext-foreground [&_[cmdk-group-heading]]:npx-2 [&_[cmdk-group-heading]]:npy-1.5 [&_[cmdk-group-heading]]:ntext-xs [&_[cmdk-group-heading]]:nfont-medium [&_[cmdk-group-heading]]:ntext-muted-foreground', props.class)"
  >
    <ComboboxLabel v-if="heading" class="npx-2 npy-1.5 ntext-xs nfont-medium ntext-muted-foreground">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
