import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  children: React.ReactNode;
}

export function Badge({ children, color = 'bg-white', className = '', ...props }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center font-bold border-4 border-black ${color} text-black shadow-[4px_4px_0_0_#000] uppercase ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
