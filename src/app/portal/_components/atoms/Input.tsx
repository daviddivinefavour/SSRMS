'use client'
import React, {
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface InputProps<TFormValues extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
  className?: string
  isError?: boolean
  register?: UseFormRegister<TFormValues>
  registerOptions?: Partial<
    TFormValues extends FieldValues ? TFormValues : { [key: string]: any }
  >
  name: Path<TFormValues>
}

const InputField = <TFormValues extends FieldValues = FieldValues>(
  {
    label,
    errorMessage,
    register,
    registerOptions,
    name,
    className = '',
    isError = false,
    ...inputProps
  }: InputProps<TFormValues>,
  ref: React.Ref<HTMLInputElement>
): React.ReactElement => {
  const errorClass =
    'text-error-600 pl-0.5 text-sm pt-2 font-normal leading-[21px]'

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (ref && typeof ref === 'object' && ref.current) {
        ref.current.focus()
      }
    },
  }))

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        ref={ref}
        className={`rounded-md bg-transparent h-12 w-full text-neutral-900 placeholder-neutral-400 border px-3 focus:text-neutral-900 focus:outline-none ${
          isError
            ? 'border-error-10 hover:border-error-10 focus:border-error-10 text-neutral-500'
            : 'border-neutral-300 hover:border-primary-light-80 focus:border-primary-main active:border-neutral-300'
        } ${className}`}
        {...(register && { ...register(name, registerOptions) })}
        {...inputProps}
      />

      {isError && (
        <div className={`${errorClass} select-none`}>{errorMessage}</div>
      )}
    </div>
  )
}

export default forwardRef(InputField)
