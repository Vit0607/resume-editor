import type { ReactNode, ButtonHTMLAttributes, MouseEvent } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'accent' | 'danger';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
  // className?: string;
}
