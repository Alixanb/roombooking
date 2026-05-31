<script setup lang="ts">
import { cn } from '@/utils'
import { X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="nfixed ninset-0 nz-50 ngrid nplace-items-center noverflow-y-auto nbg-black/80 n data-[state=open]:nanimate-in data-[state=closed]:nanimate-out data-[state=closed]:nfade-out-0 data-[state=open]:nfade-in-0"
    >
      <DialogContent
        :class="
          cn(
            'nrelative nz-50 ngrid nw-full nmax-w-lg nmy-8 ngap-4 nborder nborder-border nbg-background np-6 nshadow-lg nduration-200 sm:nrounded-lg md:nw-full',
            props.class,
          )
        "
        v-bind="forwarded"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose
          class="nabsolute ntop-3 nright-3 np-0.5 ntransition-colors nrounded-md hover:nbg-secondary"
        >
          <X class="nw-4 nh-4" />
          <span class="nsr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
