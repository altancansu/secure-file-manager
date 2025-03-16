
import React from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  variant?: 'default' | 'primary' | 'ghost';
  className?: string;
  disabled?: boolean;
  size?: 'default' | 'sm' | 'lg';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  label,
  variant = 'default',
  className,
  disabled = false,
  size = 'default',
}) => {
  const baseStyles = 'action-button';
  
  const variantStyles = {
    default: '',
    primary: 'action-button-primary',
    ghost: 'bg-transparent hover:bg-dark-accent/30',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2.5',
    lg: 'px-5 py-3',
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default ActionButton;
