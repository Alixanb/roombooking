<script lang="ts" setup>
import { buttonVariants } from '@/application/vue/components/ui/button'
import { cn } from '@/utils'
import { ChevronRight } from 'lucide-vue-next'
import {
  CalendarNext,
  type CalendarNextProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  CalendarNextProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarNext
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
      <ChevronRight class="nh-4 nw-4" />
    </slot>
  </CalendarNext>
</template>
