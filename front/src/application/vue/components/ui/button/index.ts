import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'ninline-flex nitems-center njustify-center ngap-2 nwhitespace-nowrap nrounded-md ntext-sm nfont-medium nring-offset-background ntransition-colors focus-visible:noutline-none focus-visible:nring-2 focus-visible:nring-ring focus-visible:nring-offset-2 disabled:npointer-events-none disabled:nopacity-50 [&_svg]:npointer-events-none [&_svg]:nsize-4 [&_svg]:nshrink-0',
  {
    variants: {
      variant: {
        default:
          'nbg-primary ntext-primary-foreground nshadow hover:nbg-primary/90',
        destructive:
          'nbg-destructive ntext-destructive-foreground nshadow-sm hover:nbg-destructive/90',
        outline:
          'nborder nborder-input nbg-background nshadow-sm hover:nbg-accent hover:ntext-accent-foreground',
        secondary:
          'nbg-secondary ntext-secondary-foreground nshadow-sm hover:nbg-secondary/80',
        ghost: 'hover:nbg-accent hover:ntext-accent-foreground',
        link: 'ntext-primary nunderline-offset-4 hover:nunderline',
      },
      size: {
        default: 'nh-9 npx-4 npy-2',
        sm: 'nh-8 nrounded-md npx-3 ntext-xs',
        lg: 'nh-10 nrounded-md npx-8',
        icon: 'nh-9 nw-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
