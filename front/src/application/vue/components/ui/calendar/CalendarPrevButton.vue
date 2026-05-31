<script lang="ts" setup>
import { buttonVariants } from '@/application/vue/components/ui/button'
import { cn } from '@/utils'
import { ChevronLeft } from 'lucide-vue-next'
import {
  CalendarPrev,
  type CalendarPrevProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  CalendarPrevProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarPrev
    :class="
      cn(
        buttonVariants({ variant: 'outline' }),
        'nh-7 nw-7 nbg-transparent np-0 nopacity-50 hover:nopacity-100',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeft class="nh-4 nw-4" />
    </slot>
  </CalendarPrev>
</template>
