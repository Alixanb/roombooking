<script lang="ts" setup>
import { cn } from '@/utils'
import { CalendarCell, type CalendarCellProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<CalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCell
    :class="cn('nrelative nh-9 nw-9 np-0 ntext-center ntext-sm focus-within:nrelative focus-within:nz-20 [&:has([data-selected])]:nrounded-md [&:has([data-selected])]:nbg-accent [&:has([data-selected][data-outside-view])]:nbg-accent/50', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCell>
</template>
