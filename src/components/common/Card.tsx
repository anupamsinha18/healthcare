import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, interactive = false, className = '', ...props }) => {
  const baseClasses = [styles.card];
  if (interactive) baseClasses.push(styles.interactive);
  if (className) baseClasses.push(className);

  return (
    <div className={baseClasses.join(' ')} {...props}>
      {children}
    </div>
  );
};
