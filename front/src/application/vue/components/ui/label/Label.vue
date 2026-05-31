<script setup lang="ts">
import { cn } from '@/utils'
import { Label, type LabelProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'ntext-sm nfont-medium nleading-none peer-disabled:ncursor-not-allowed peer-disabled:nopacity-70',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>
