
import React, { useCallback, useState } from 'react';
import { File, Upload } from 'lucide-react';

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
      className={`file-drop-zone ${isDragging ? 'active' : ''} animate-fade-in`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        id="file-input" 
        className="sr-only" 
        multiple 
        onChange={handleFileSelect}
        accept=".docx,.pdf,.xls,.xlsx,.png,.jpg,.jpeg"
      />
      
      <div className="p-4 bg-dark-accent/20 rounded-full mb-6">
        <File className="w-10 h-10 text-highlight-purple animate-float" strokeWidth={1.5} />
      </div>
      
      <h3 className="text-xl font-medium mb-2">Click or drop your files here</h3>
      <p className="text-sm text-muted-foreground mb-4">
        DOCX, PDF, XLS, PNG formats are supported
      </p>
      
      <label 
        htmlFor="file-input"
        className="px-4 py-2 bg-highlight-purple hover:bg-highlight-purple/90 
        rounded-lg transition-all duration-200 cursor-pointer flex items-center"
      >
        <Upload className="w-4 h-4 mr-2" />
        <span>Select Files</span>
      </label>
    </div>
  );
};

export default DropZone;
