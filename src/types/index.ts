
export type FileType = 'docx' | 'pdf' | 'xls' | 'png' | 'other';

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: FileType;
  file: File;
  progress: number; // 0-100
  isComplete?: boolean; // for completed operations
}

export interface ActionOption {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export type ActionType = 
  | 'convert' 
  | 'combine' 
  | 'reduce' 
  | 'resize' 
  | 'compress' 
  | 'rename';

export interface Action {
  type: ActionType;
  options?: Record<string, any>;
  files: string[]; // file ids
}

export interface ConvertOptions {
  targetFormat: string;
  mode: 'all' | 'individual' | 'selected';
}

export interface CombineOptions {
  mode: 'sameFormat' | 'merge' | 'singlePdf';
  outputFormat?: string;
  outputName?: string;
}

export interface ReduceOptions {
  mode: 'optimize' | 'maximum';
  maxSize?: number; // in MB
}

export interface RenameOptions {
  mode: 'addBefore' | 'addAfter' | 'replace';
  text: string;
  example?: string;
}

export interface CompressOptions {
  outputName: string;
  format: 'zip';
}
