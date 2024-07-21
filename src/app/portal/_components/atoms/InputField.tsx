"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  errorMessage?: string;
  className?: string;
  isError?: boolean;
  type: string;
  register?: UseFormRegister<any>;
  [key: string]: any;
}

const InputField: React.FC<InputProps> = ({
  label,
  errorMessage,
  register,
  registerOptions,
  name,
  className = "",
  isError = false,
  ...inputProps
}) => {
  const errorClass =
    "text-error-600 pl-0.5 text-sm pt-2 font-normal leading-[21px]";

  return (
    <div>
      {label && <label>{label}</label>}
      <Input
        className={`rounded-md bg-transparent h-12 w-full text-neutral-900 placeholder-neutral-400 border px-3 focus:text-neutral-900 focus:outline-none ${
          isError
            ? "border-error-10 hover:border-error-10 focus:border-error-10 text-neutral-500"
            : "border-neutral-300 hover:border-primary-light-80 focus:border-primary-main active:border-neutral-300"
        } ${className}`}
        {...(register && { ...register(name, registerOptions) })}
        {...inputProps}
      />

      {isError && (
        <div className={`${errorClass} select-none`}>{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
