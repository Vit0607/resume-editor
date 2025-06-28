import type { InputProps } from './Input.props';

import styles from './Input.module.scss';

const Input = ({ ...props }: InputProps) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
