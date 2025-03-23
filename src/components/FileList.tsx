
import React from 'react';
import { FileItem as FileItemType } from '@/types';
import FileItem from './FileItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FileListProps {
  files: FileItemType[];
  onRemoveFile: (id: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  
  const formatTotalSize = () => {
    const kb = 1024;
    const mb = kb * 1024;
    const gb = mb * 1024;
    
    if (totalSize < mb) {
      return `${(totalSize / kb).toFixed(2)} KB`;
    } else if (totalSize < gb) {
      return `${(totalSize / mb).toFixed(2)} MB`;
    } else {
      return `${(totalSize / gb).toFixed(2)} GB`;
    }
  };
  
  // Show only first 5 files when collapsed
  const visibleFiles = collapsed ? files.slice(0, 5) : files;
  
  return (
    <div className="space-y-1 animate-fade-in">
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-3 py-2 text-xs text-muted-foreground">
        <div>Format</div>
        <div>File name</div>
        <div>Size</div>
        <div className="text-right">Delete</div>
      </div>
      
      <div className="space-y-1 max-h-[460px] overflow-y-auto">
        {visibleFiles.map((file) => (
          <FileItem 
            key={file.id} 
            file={file} 
            onRemove={onRemoveFile} 
          />
        ))}
      </div>
      
      {files.length > 5 && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 text-sm 
          text-muted-foreground hover:text-white transition-colors"
        >
          {collapsed ? (
            <>
              <span className="mr-1">SHOW ALL</span>
              <ChevronDown className="w-4 h-4" />
            </>
          ) : (
            <>
              <span className="mr-1">SHOW LESS</span>
              <ChevronUp className="w-4 h-4" />
            </>
          )}
        </button>
      )}
      
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-dark-accent/20">
        <span>Total {files.length} files</span>
        <span>Approximately {formatTotalSize()}</span>
      </div>
    </div>
  );
};

export default FileList;
