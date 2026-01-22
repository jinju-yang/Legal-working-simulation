
export enum AppTab {
  EDITOR = 'EDITOR',
  RESEARCH = 'RESEARCH',
  TIMESHEET = 'TIMESHEET'
}

export type ActionType = 
  | 'type' 
  | 'delete' 
  | 'pause' 
  | 'move' 
  | 'click' 
  | 'scroll' 
  | 'select' 
  | 'switch_tab' 
  | 'toast' 
  | 'comment'
  | 'version_up';

export interface TypingInstruction {
  type: ActionType;
  text?: string;
  count?: number;
  duration?: number;
  x?: number;
  y?: number;
  targetId?: string; // For scrolling to specific sections
  tab?: AppTab;
  message?: string;
  selectionRange?: [number, number]; // [start, end] indices in current text
}

export interface TaskLog {
  id: number;
  time: string;
  content: string;
  completed: boolean;
}

export interface ResearchResult {
  id: number;
  title: string;
  source: string;
  summary: string;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
}
