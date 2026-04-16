/**
 * @file ToggleButton.tsx
 * @description A customizable toggle button component.
 */

import React from 'react';
import { motion } from 'framer-motion';

export interface ToggleButtonProps {
  /** Text or element to display inside the button */
  label: React.ReactNode;
  /** Custom icon elements */
  icon?: React.ReactNode;
  /** Whether this button is currently the active selected state */
  isActive: boolean;
  /** Callback fired when the button is clicked */
  onClick: () => void;
  /** Optional layout ID for framer-motion active indicator sharing */
  layoutId?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ToggleButton Component
 * 
 * Displays a selectable button typically used in a toggle group (e.g., tabs).
 * Utilizes Framer Motion for animating an active underline/indicator.
 * 
 * @example
 * <ToggleButton 
 *   label="LIST VIEW" 
 *   isActive={true} 
 *   onClick={() => setView('list')} 
 *   layoutId="view-toggle" 
 * />
 */
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  icon,
  isActive,
  onClick,
  layoutId = 'activeTab',
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 flex items-center gap-2 transition-colors relative ${
        isActive ? 'text-red-500 bg-red-900/10' : 'text-gray-500 hover:text-white'
      } ${className}`}
    >
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute top-0 left-0 w-full h-px bg-red-500 shadow-[0_0_10px_#ef4444]"
        />
      )}
      {icon && icon}
      {label}
    </button>
  );
};
