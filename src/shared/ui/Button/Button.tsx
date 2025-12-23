import './Button.scss';
import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'small' | 'large';
  variant: 'primary' | 'secondary' | 'tertiary';
  text: string;
  fontWeight?: number;
  icon?: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  size,
  variant,
  text,
  icon: Icon,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`button button--${size} button--${variant} text-md-regular`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon}
      {text}
    </button>
  );
};

export default Button;
