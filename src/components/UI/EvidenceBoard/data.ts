/**
 * @file data.ts
 * @description Static mock data for the Evidence Board.
 */

import { ProjectData, ProjectDataWithKey } from './types';

/**
 * Array of projects displayed on the Evidence Board.
 */
export const PROJECTS_DATA: ProjectData[] = [
  { id: '01', title: 'Célia', type: '3D EXPERIENCE', image: '/projects/celia.jpg' },
  { id: '02', title: 'J. Pancras', type: 'PORTFOLIO', image: '/projects/pancras.jpg' },
  { id: '03', title: '2026 Greetings', type: '3D EXPERIENCE', image: '/projects/2026.jpg' },
  { id: '04', title: 'Ciao', type: 'SHOWCASE WEBSITE', image: '/projects/ciao.jpg' },
  { id: '05', title: 'H.A.N.D.S.', type: 'INTERACTIVE EXPERIENCE', image: '/projects/hands.jpg' },
  { id: '06', title: 'Apogée', type: '3D EXPERIENCE', image: '/projects/apogee.jpg' },
  { id: '07', title: 'K. Herzer', type: 'PORTFOLIO', image: '/projects/herzer.jpg' },
];

/**
 * Returns a duplicated list of projects mapping 5 segments:
 * L2 - L1 - Center - R1 - R2
 * This ensures bulletproof infinite scrolling by adding wider buffer zones
 * to accommodate ultra-wide screens without visible edge stops.
 */
export const getBufferedProjects = (): ProjectDataWithKey[] => [
  ...PROJECTS_DATA.map(p => ({ ...p, uniqueKey: p.id + '-l2' })),
  ...PROJECTS_DATA.map(p => ({ ...p, uniqueKey: p.id + '-l1' })),
  ...PROJECTS_DATA.map(p => ({ ...p, uniqueKey: p.id + '-c' })),
  ...PROJECTS_DATA.map(p => ({ ...p, uniqueKey: p.id + '-r1' })),
  ...PROJECTS_DATA.map(p => ({ ...p, uniqueKey: p.id + '-r2' }))
];
