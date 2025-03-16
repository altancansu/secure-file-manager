
import { FileItem, FileType } from '@/types';

export const getFileTypeFromName = (fileName: string): FileType => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'doc':
    case 'docx':
      return 'docx';
    case 'pdf':
      return 'pdf';
    case 'xls':
    case 'xlsx':
      return 'xls';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp':
      return 'png';
    default:
      return 'other';
  }
};

export const isFileTypeSupported = (file: File): boolean => {
  const type = getFileTypeFromName(file.name);
  return ['docx', 'pdf', 'xls', 'png'].includes(type);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const simulateFileOperation = (
  files: FileItem[], 
  operationType: string,
  onProgress: (id: string, progress: number) => void,
  onComplete: (id: string) => void
): Promise<void> => {
  return new Promise((resolve) => {
    // For each file, simulate a processing operation with progress
    const operations = files.map((file) => {
      return new Promise<void>((fileResolve) => {
        let progress = 0;
        
        // Start the progress interval
        const interval = setInterval(() => {
          // Calculate a random increment (faster near the beginning, slower near the end)
          let increment = 0;
          
          if (progress < 30) {
            increment = Math.random() * 5 + 3;
          } else if (progress < 70) {
            increment = Math.random() * 3 + 1;
          } else {
            increment = Math.random() * 1 + 0.5;
          }
          
          progress = Math.min(100, progress + increment);
          onProgress(file.id, Math.floor(progress));
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete(file.id);
              fileResolve();
            }, 500);
          }
        }, 200);
      });
    });
    
    Promise.all(operations).then(() => resolve());
  });
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
