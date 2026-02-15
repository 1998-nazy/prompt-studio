export interface Tool {
  id: string;
  title: string;
  description: string;
  iconName: 'Sparkles' | 'ScanEye' | 'ScanFace' | 'Palette' | 'Wand2';
  gradient: string;
  accentColor: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface GeneratedOutput {
  prompt: string;
  technicalDetails?: string[];
}

export type ToolId = 'text-refiner' | 'visual-describer' | 'character' | 'stylist' | 'smart-editor';