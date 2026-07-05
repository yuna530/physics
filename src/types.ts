export type ActiveTheme = 'mechanics' | 'electromagnetism';

export type SidebarTab = 'dashboard' | 'experiments' | 'library' | 'analytics';

export interface ConceptTopic {
  id: number;
  title: string;
  description: string;
  formula: string;
}

export interface SimulationParams {
  velocity: number;      // m/s
  angle: number;         // degrees
  height: number;        // m
  mass: number;          // kg
  gravity: number;       // m/s^2
}

export interface SimulationData {
  range: number;         // m
  maxHeight: number;     // m
  timeToPeak: number;    // s
  totalTime: number;     // s
}
