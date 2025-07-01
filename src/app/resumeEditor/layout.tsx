import type { ReactNode } from 'react';

import styles from './layout.module.scss';

interface ResumeEditorLayoutProps {
  children: ReactNode;
}

export const ResumeEditorLayout = ({ children }: ResumeEditorLayoutProps) => {
  return <div className={styles.layout}>{children}</div>;
};
