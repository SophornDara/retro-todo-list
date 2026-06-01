import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
  noShadow?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  backgroundColor = 'bg-white',
  noShadow = false,
  ...props 
}: CardProps) {
  const shadowStyles = noShadow ? '' : 'shadow-[8px_8px_0_0_#000]';
  return (
    <div 
      className={`${backgroundColor} border-4 border-black p-6 ${shadowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
