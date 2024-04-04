import { FieldValues, UseFormRegister } from "react-hook-form";

export type TInputBoxProps = {
  label?: string;
  labelClassName?: string;
  id: string;
  name: string;
  placeholder?: string;
  type: "text" | "password" | "email" | "date" | "number";
  transparentBg?: boolean;
  isDisabled?: boolean;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errorMessage?: string;
  dbName?: string;
  isError?: boolean;
  readOnly?: boolean;
  className?: string;
  isHelperText?: boolean;
  helperText?: string;
  borderBottom?: boolean;
  [key: string]: unknown;
};
