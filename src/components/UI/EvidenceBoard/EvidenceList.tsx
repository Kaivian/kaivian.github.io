/**
 * @file EvidenceList.tsx
 * @description List view for the Evidence Board. Shows projects using the dynamic FlowingMenu component.
 */

import React, { useMemo } from 'react';
import { PROJECTS_DATA } from './data';
import FlowingMenu from '../FlowingMenu';

export interface EvidenceListProps {
  /** Should element be currently visible */
  isVisible?: boolean;
}

/**
 * EvidenceList Component
 * 
 * Provides an alternative, simplified list view to the EvidenceSlider using FlowingMenu.
 */
export const EvidenceList: React.FC = React.memo(() => {

  const menuItems = useMemo(() => {
    return PROJECTS_DATA.map((project) => ({
      link: '#',
      text: project.title,
      image: project.image,
    }));
  }, []);

  return (
    <FlowingMenu
      items={menuItems}
      speed={15}
      textColor="#ffffff"
      bgColor="#050505"
      marqueeBgColor="#ef4444"
      marqueeTextColor="#ffffff"
      borderColor="#1f2937"
    />
  );
});

EvidenceList.displayName = 'EvidenceList';
