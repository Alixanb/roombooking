<script lang="ts" setup>
import { buttonVariants } from '@/application/vue/components/ui/button'
import { cn } from '@/utils'
import {
  CalendarCellTrigger,
  type CalendarCellTriggerProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
    :class="
      cn(
        buttonVariants({ variant: 'ghost' }),
        'nh-9 nw-9 np-0 nfont-normal',
        '[&[data-today]:not([data-selected])]:nbg-accent [&[data-today]:not([data-selected])]:ntext-accent-foreground',
        // Selected
        'data-[selected]:nbg-primary data-[selected]:ntext-primary-foreground data-[selected]:nopacity-100 data-[selected]:hover:nbg-primary data-[selected]:hover:ntext-primary-foreground data-[selected]:focus:nbg-primary data-[selected]:focus:ntext-primary-foreground',
        // Disabled
        'data-[disabled]:ntext-muted-foreground data-[disabled]:nopacity-50',
        // Unavailable
        'data-[unavailable]:ntext-destructive-foreground data-[unavailable]:nline-through',
        // Outside months
        'data-[outside-view]:ntext-muted-foreground data-[outside-view]:nopacity-50 [&[data-outside-view][data-selected]]:nbg-accent/50 [&[data-outside-view][data-selected]]:ntext-muted-foreground [&[data-outside-view][data-selected]]:nopacity-30',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
