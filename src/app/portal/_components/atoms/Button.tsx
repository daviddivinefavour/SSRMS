import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className,
  ...buttonProps
}): React.ReactElement => (
  <button
    {...{
      className: `${className}`,
    }}
    onClick={onClick}
    disabled={disabled}
    {...buttonProps}
  >
    {label}
  </button>
);

export default Button;
