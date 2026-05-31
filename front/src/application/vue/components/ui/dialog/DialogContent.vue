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
      class="nfixed ninset-0 nz-50 nbg-black/80 n data-[state=open]:nanimate-in data-[state=closed]:nanimate-out data-[state=closed]:nfade-out-0 data-[state=open]:nfade-in-0"
    />
    <DialogContent
      v-bind="forwarded"
      :class="
        cn(
          'nfixed nleft-1/2 ntop-1/2 nz-50 ngrid nw-full nmax-w-lg n-translate-x-1/2 n-translate-y-1/2 ngap-4 nborder nbg-background np-6 nshadow-lg nduration-200 data-[state=open]:nanimate-in data-[state=closed]:nanimate-out data-[state=closed]:nfade-out-0 data-[state=open]:nfade-in-0 data-[state=closed]:nzoom-out-95 data-[state=open]:nzoom-in-95 data-[state=closed]:nslide-out-to-left-1/2 data-[state=closed]:nslide-out-to-top-[48%] data-[state=open]:nslide-in-from-left-1/2 data-[state=open]:nslide-in-from-top-[48%] sm:nrounded-lg',
          props.class,
        )"
    >
      <slot />

      <DialogClose
        class="nabsolute nright-4 ntop-4 nrounded-sm nopacity-70 nring-offset-background ntransition-opacity hover:nopacity-100 focus:noutline-none focus:nring-2 focus:nring-ring focus:nring-offset-2 disabled:npointer-events-none data-[state=open]:nbg-accent data-[state=open]:ntext-muted-foreground"
      >
        <X class="nw-4 nh-4" />
        <span class="nsr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
