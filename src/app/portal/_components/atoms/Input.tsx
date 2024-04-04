"use client";
import React, { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputProps<TFormValues extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  className?: string;
  isError?: boolean;
  register?: UseFormRegister<TFormValues>;
  registerOptions?: Partial<
    TFormValues extends FieldValues ? TFormValues : { [key: string]: any }
  >;
  name: Path<TFormValues>;
}

const Input = <TFormValues extends FieldValues = FieldValues>({
  label,
  errorMessage,
  register,
  registerOptions,
  name,
  className,
  isError = false,
  ...inputProps
}: InputProps<TFormValues>): React.ReactElement => {
  const errorClass =
    "text-error-600 pl-0.5 text-sm pt-2 font-normal leading-[21px]";

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        {...{
          className: `rounded-md bg-transparent h-12 w-full text-neutral-900 placeholder-neutral-400 border px-3 focus:text-neutral-900 focus:outline-none focus:border-primary-main ${className} 
            ${
              isError
                ? "border-error-10 hover:border-error-10 focus:border-error-10 text-neutral-500"
                : "border-neutral-300 hover:border-primary-light-80 focus:border-primary-main active:border-neutral-300"
            }`,
        }}
        {...(register && { ...register(name, registerOptions) })}
        {...inputProps}
      />

      {isError && (
        <div className={`${errorClass} select-none`}>{errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
