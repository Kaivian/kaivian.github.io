/**
 * @file types.ts
 * @description Type definitions for EvidenceBoard component and its sub-components.
 */

export interface ProjectData {
  id: string;
  title: string;
  type: string;
  image: string;
}

export interface ProjectDataWithKey extends ProjectData {
  uniqueKey: string;
}

export type ViewMode = 'slider' | 'list';
