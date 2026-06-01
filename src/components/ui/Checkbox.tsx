import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Checkbox({ checked, onCheckedChange, className = '', ...props }: CheckboxProps) {
  return (
    <div 
      className={`relative flex items-center justify-center w-8 h-8 border-4 border-black cursor-pointer transition-colors ${checked ? 'bg-[#A0E7E5]' : 'bg-white'} ${className}`}
      onClick={() => onCheckedChange(!checked)}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCheckedChange(!checked);
        }
      }}
    >
      <input 
        type="checkbox" 
        className="hidden" 
        checked={checked} 
        onChange={(e) => onCheckedChange(e.target.checked)} 
        {...props} 
      />
      {checked && <Check className="w-5 h-5 text-black stroke-[4]" />}
    </div>
  );
}
