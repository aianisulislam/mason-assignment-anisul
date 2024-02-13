import React from 'react'

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> =({children, className}) => {
  return (
    <div className={`w-full bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  )
}

export default Card;