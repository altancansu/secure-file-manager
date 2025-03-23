
import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  onFilesAdded: (files: FileList | File[]) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFilesAdded }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(e.dataTransfer.files);
    }
  }, [onFilesAdded]);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(e.target.files);
      // Reset the input so the same file can be selected again
      e.target.value = '';
    }
  }, [onFilesAdded]);
  
  return (
    <div 
      className={`
        flex flex-col items-center justify-center py-10 px-6
        border-2 border-dashed border-dark-accent/50 rounded-lg
        ${isDragging ? 'border-highlight-purple bg-dark-secondary/40' : 'bg-dark-secondary/20'}
        transition-all duration-200 cursor-pointer
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input 
        type="file" 
        id="file-input" 
        className="sr-only" 
        multiple 
        onChange={handleFileSelect}
        accept=".docx,.pdf,.xls,.xlsx,.png,.jpg,.jpeg"
      />
      
      <Upload 
        className="w-12 h-12 text-highlight-purple mb-4 opacity-80" 
        strokeWidth={1.5} 
      />
      
      <div className="text-center">
        <h3 className="text-lg font-medium mb-1">Click or drop your files here</h3>
        <p className="text-sm text-muted-foreground">
          DOCX, PDF, XLS, PNG formats are supported
        </p>
      </div>
    </div>
  );
};

export default DropZone;
