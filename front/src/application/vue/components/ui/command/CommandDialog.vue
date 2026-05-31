<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'radix-vue'
import { Dialog, DialogContent } from '@/application/vue/components/ui/dialog'
import { useForwardPropsEmits } from 'radix-vue'
import Command from './Command.vue'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog v-bind="forwarded">
    <DialogContent class="noverflow-hidden np-0 nshadow-lg">
      <Command
        class="[&_[cmdk-group-heading]]:npx-2 [&_[cmdk-group-heading]]:nfont-medium [&_[cmdk-group-heading]]:ntext-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:npt-0 [&_[cmdk-group]]:npx-2 [&_[cmdk-input-wrapper]_svg]:nh-5 [&_[cmdk-input-wrapper]_svg]:nw-5 [&_[cmdk-input]]:nh-12 [&_[cmdk-item]]:npx-2 [&_[cmdk-item]]:npy-3 [&_[cmdk-item]_svg]:nh-5 [&_[cmdk-item]_svg]:nw-5"
      >
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
