<script setup lang="ts">
import { cn } from '@/utils'
import { Search } from 'lucide-vue-next'
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div class="nflex nitems-center nborder-b npx-3" cmdk-input-wrapper>
    <Search class="nmr-2 nh-4 nw-4 nshrink-0 nopacity-50" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="cn('nflex nh-11 nw-full nrounded-md nbg-transparent npy-3 ntext-sm noutline-none placeholder:ntext-muted-foreground disabled:ncursor-not-allowed disabled:nopacity-50', props.class)"
    />
  </div>
</template>
