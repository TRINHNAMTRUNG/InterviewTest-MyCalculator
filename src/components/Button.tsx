import React from 'react'

interface ButtonProps {
    onClick: () => void
    className?: string
    children: React.ReactNode
    variant?: 'number' | 'operator' | 'equals' | 'danger' | 'warning' | 'divide'
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    className = "",
    children,
    variant = 'number'
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'number':
                return 'bg-sky-50 hover:bg-gray-300 text-red-800'
            case 'operator':
                return 'bg-yellow-500 hover:bg-yellow-600 text-white'
            case 'divide':
                return 'bg-blue-500 hover:bg-blue-600 text-white'
            case 'equals':
                return 'bg-green-500 hover:bg-green-600 text-white'
            case 'danger':
                return 'bg-red-500 hover:bg-red-600 text-white'
            case 'warning':
                return 'bg-orange-500 hover:bg-orange-600 text-white'
            default:
                return 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }
    }

    return (
        <button
            onClick={onClick}
            className={`h-12 rounded-lg font-medium text-lg transition-all duration-150 hover:scale-105 active:scale-95 ${getVariantStyles()} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button
