import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = [styles.btn, styles[variant]];
  if (fullWidth) baseClasses.push(styles.fullWidth);
  if (className) baseClasses.push(className);

  return (
    <button
      className={baseClasses.join(' ')}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex-center">
          <svg className={`animate-pulse`} style={{width: '16px', height: '16px', marginRight: '8px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {icon && <span style={{display: 'flex', alignItems: 'center'}}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
