export enum Category {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  DATABASE = 'Database',
  RUNTIME = 'Runtime'
}

export enum InstallStatus {
  INSTALLED = 'INSTALLED',
  MISSING = 'MISSING',
  CORRUPTED = 'CORRUPTED', // Just for flavor
  PENDING = 'PENDING'
}

export interface TechItem {
  id: string;
  name: string;
  category: Category;
  version: string;
  status: InstallStatus;
  description?: string; // AI Generated analysis
}

export interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'warning' | 'system';
}

// New Theming System
export type ThemeMode = 'dark' | 'light';

export enum ThemePreset {
  NETRUNNER = 'NETRUNNER', // Classic Yellow/Blue
  ARASAKA = 'ARASAKA',     // White/Red/Black
  MILITECH = 'MILITECH',   // Military Green/Orange
  NEON_CITY = 'NEON_CITY',  // Purple/Pink/Navy
  MATRIX = 'MATRIX',       // Hacker Green/Black
  NOMAD = 'NOMAD',         // Sand/Rust/Brown
  FROST = 'FROST'          // Ice Blue/White/Dark Grey
}

export interface ThemeColors {
  mode: ThemeMode;
  primary: string;    // Main accent (e.g., Yellow)
  secondary: string;  // Secondary accent (e.g., Blue)
  bg: string;         // Main background
  surface: string;    // Card/Panel background
  text: string;       // Main text color
  subtext: string;    // Secondary text color
  border: string;     // Border color
  error: string;      // Error/Danger color
}

export type Language = 'zh-CN' | 'en-US';