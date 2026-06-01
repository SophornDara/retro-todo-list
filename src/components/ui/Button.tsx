import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold border-4 border-black transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none';
  
  const variants = {
    primary: 'bg-[#FF60F0] text-black hover:bg-[#e055d4]',
    secondary: 'bg-[#FFF!important] text-black hover:bg-gray-100', // Override possible parent styles with !important if needed
    danger: 'bg-black text-white hover:bg-gray-800',
    icon: 'bg-[#00E0FF] text-black hover:bg-[#50ebff]',
  };

  const shadowStyles = 'shadow-[4px_4px_0_0_#000]';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const iconSizes = {
    sm: 'p-1.5',
    md: 'p-2.5',
    lg: 'p-3',
  };

  const sizeStyles = variant === 'icon' ? iconSizes[size] : sizes[size];

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizeStyles} ${shadowStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
