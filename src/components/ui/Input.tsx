import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className = '', error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        className={`w-full px-4 py-3 bg-white border-4 border-black font-bold text-black placeholder:text-gray-500 shadow-[4px_4px_0_0_#000] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0_0_#000] transition-all ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 font-bold text-sm mt-1">{error}</span>}
    </div>
  );
}
