import { Button } from '@/components/ui/button'
import React from 'react'

interface ButtonThemeProps{
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    type?: "submit" | "reset" | "button"
}

export default function ButtonTheme({children, onClick, className='', type='button'} : ButtonThemeProps) {
    return (
        <Button
            type={type}
            onClick={onClick}
            className={`bg-btn-bg hover:bg-btn-hover text-white font-semibold py-5 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none ${className}`}
        >
            {children}
        </Button>
    )
}
