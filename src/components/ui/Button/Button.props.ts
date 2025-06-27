import type { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'accent' | 'danger';
  size?: 'md' | 'lg';
  fullWidth?: Boolean;
}
