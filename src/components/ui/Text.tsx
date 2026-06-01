import React, { ElementType } from 'react';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
}

export function Text({ variant = 'p', className = '', children, ...props }: TextProps) {
  const baseStyles = 'text-gray-900';
  
  const variants = {
    h1: 'text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none',
    h2: 'text-3xl md:text-5xl font-extrabold tracking-tight',
    h3: 'text-2xl md:text-3xl font-black',
    h4: 'text-xl font-bold',
    p: 'text-base md:text-lg font-medium leading-tight',
    span: 'text-sm font-medium',
  };

  const Component = variant as ElementType;

  return (
    <Component className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
