import type { ChangeEvent } from 'react';

import type { SelectProps } from './Select.props';

import styles from './Select.module.scss';

const Select = ({ options, onChange, placeholder, ...props }: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select {...props} onChange={handleChange} className={styles.select}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
