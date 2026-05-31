<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'radix-vue'
import { cn } from '@/utils'
import { ComboboxItem, useForwardPropsEmits } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :class="cn('nrelative nflex ncursor-default nselect-none nitems-center nrounded-sm npx-2 npy-1.5 ntext-sm noutline-none data-[highlighted]:nbg-accent data-[highlighted]:ntext-accent-foreground data-[disabled]:npointer-events-none data-[disabled]:nopacity-50', props.class)"
  >
    <slot />
  </ComboboxItem>
</template>
