'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Input } from './input'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

const InputWithLabel = ({
  id,
  label,
  type,
  placeHolder,
  htmlFor,
}: {
  id: string
  label: string
  type?: string
  placeHolder?: string
  htmlFor?: string
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={htmlFor ? htmlFor : ''}>{label}</Label>
      <Input
        type={type ? type : ''}
        id={id}
        placeholder={placeHolder ? placeHolder : ''}
      />
    </div>
  )
}
export { Label, InputWithLabel }
