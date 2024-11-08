import Link from 'next/link'
import React from 'react';

interface ButtonProps{
  children: React.ReactNode,
  onClick: () => void,
  variant: "primary" | "secondary" | "purple",
  href?: string,
  disabled?: boolean
}

const Button = ({ children, onClick, variant = 'primary' , href = '', disabled} : ButtonProps) => {
  const baseClasses = 'h-fit flex items-center px-6 py-3 rounded-md font-semibold transition-colors text-sm';
  const variantClasses = {
    primary: 'bg-popover text-popover-foreground',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    purple: 'bg-principal text-white'
  };

  return (
    disabled ? (
      <div className={`${baseClasses} ${variantClasses[variant]} opacity-50 cursor-not-allowed`}>
        {children}
      </div>
    ) : (
      <Link className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick} href={href}>
        {children}
      </Link>
    )
  );
};

export default Button;