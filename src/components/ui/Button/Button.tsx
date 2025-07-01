import type { ButtonProps } from './Button.props';

import styles from './Button.module.scss';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
