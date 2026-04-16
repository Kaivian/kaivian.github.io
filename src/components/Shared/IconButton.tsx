/**
 * @file IconButton.tsx
 * @description A styled button component usually containing a single icon/character.
 */

import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon or character to render inside the button */
  children: React.ReactNode;
}

/**
 * IconButton Component
 * 
 * Provides a standardized icon button used throughout the application. 
 * Includes pre-styled borders and hover states fitting the "Evidence Board" aesthetic.
 * 
 * @example
 * <IconButton onClick={onNext}>
 *   &rarr;
 * </IconButton>
 */
export const IconButton: React.FC<IconButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`w-8 h-8 flex items-center justify-center border border-gray-800 bg-black/50 text-gray-500 hover:border-red-500 hover:shadow-[inset_0_0_10px_rgba(220,38,38,0.2)] transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
