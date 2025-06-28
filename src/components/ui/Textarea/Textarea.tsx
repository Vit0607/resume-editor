import type { TextareaProps } from './Textarea.props';

import styles from './Textarea.module.scss';

const Textarea = ({ ...props }: TextareaProps) => {
  return <textarea className={styles.textarea} {...props}></textarea>;
};

export default Textarea;
