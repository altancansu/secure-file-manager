
import React from 'react';
import { FileItem as FileItemType } from '@/types';
import { formatFileSize } from '@/lib/fileUtils';
import { Trash2 } from 'lucide-react';
import { 
  FileText, FilePdf, FileSpreadsheet, ImageIcon, 
  CheckCircle2
} from 'lucide-react';

interface FileItemProps {
  file: FileItemType;
  onRemove: (id: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => {
  const { id, name, size, type, progress, isComplete } = file;
  
  const getFileIcon = () => {
    switch (type) {
      case 'docx':
        return <FileText className="w-6 h-6" />;
      case 'pdf':
        return <FilePdf className="w-6 h-6" />;
      case 'xls':
        return <FileSpreadsheet className="w-6 h-6" />;
      case 'png':
        return <ImageIcon className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };
  
  const getFileTypeColor = () => {
    switch (type) {
      case 'docx':
        return 'bg-filetype-docx';
      case 'pdf':
        return 'bg-filetype-pdf';
      case 'xls':
        return 'bg-filetype-xls';
      case 'png':
        return 'bg-filetype-png';
      default:
        return 'bg-slate-500';
    }
  };
  
  return (
    <div className="file-item animate-slide-up group">
      <div className={`file-icon ${getFileTypeColor()}`}>
        {getFileIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium truncate">{name}</p>
          <span className="text-xs text-muted-foreground ml-2">
            {formatFileSize(size)}
          </span>
        </div>
        
        {progress > 0 && (
          <div className="progress-bar">
            {progress < 100 ? (
              <div 
                className="progress-bar-fill transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              />
            ) : (
              <div className="progress-bar-fill" style={{ width: '100%' }} />
            )}
          </div>
        )}
        
        {progress > 0 && (
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">
              {isComplete ? (
                <span className="flex items-center text-highlight-purple">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Complete
                </span>
              ) : (
                `${progress}%`
              )}
            </span>
          </div>
        )}
      </div>
      
      <button 
        onClick={() => onRemove(id)}
        className="p-2 text-muted-foreground hover:text-white rounded-full 
        transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Remove file"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FileItem;
