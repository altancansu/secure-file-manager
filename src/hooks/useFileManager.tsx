
import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { 
  FileItem, 
  Action, 
  ConvertOptions, 
  CombineOptions, 
  ReduceOptions, 
  RenameOptions,
  CompressOptions
} from '@/types';
import { 
  getFileTypeFromName, 
  isFileTypeSupported, 
  generateUniqueId,
  simulateFileOperation
} from '@/lib/fileUtils';

export const useFileManager = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [activeActions, setActiveActions] = useState<Action[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Handle file uploads
  const handleFileUpload = useCallback((uploadedFiles: FileList | File[]) => {
    const fileArray = Array.from(uploadedFiles);
    const newFiles: FileItem[] = [];
    let unsupportedCount = 0;
    
    fileArray.forEach(file => {
      if (isFileTypeSupported(file)) {
        newFiles.push({
          id: generateUniqueId(),
          name: file.name,
          size: file.size,
          type: getFileTypeFromName(file.name),
          file: file,
          progress: 0,
        });
      } else {
        unsupportedCount++;
      }
    });
    
    if (unsupportedCount > 0) {
      toast({
        title: `${unsupportedCount} file(s) not supported`,
        description: "Only DOCX, PDF, XLS, and PNG files are supported.",
        variant: "destructive"
      });
    }
    
    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      toast({
        title: `${newFiles.length} file(s) added`,
        description: "Files are ready to be processed.",
      });
    }
  }, []);
  
  // Remove a file
  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  }, []);
  
  // Clear all files
  const clearFiles = useCallback(() => {
    setFiles([]);
    setActiveActions([]);
  }, []);
  
  // Update file progress
  const updateFileProgress = useCallback((id: string, progress: number) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === id ? { ...file, progress } : file
      )
    );
  }, []);
  
  // Mark file as complete
  const markFileComplete = useCallback((id: string) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === id ? { ...file, progress: 100, isComplete: true } : file
      )
    );
  }, []);
  
  // Add an action
  const addAction = useCallback((action: Action) => {
    setActiveActions(prev => [...prev, action]);
  }, []);
  
  // Remove an action
  const removeAction = useCallback((index: number) => {
    setActiveActions(prev => prev.filter((_, i) => i !== index));
  }, []);
  
  // Process all actions and files
  const processActions = useCallback(async () => {
    if (activeActions.length === 0 || files.length === 0) {
      toast({
        title: "No actions to process",
        description: "Please add files and select actions to process.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real application, you would process each action with real operations
      // Here we're just simulating progress and completion
      for (const action of activeActions) {
        const actionFiles = files.filter(file => action.files.includes(file.id));
        
        // Different toast messages based on action type
        let actionDescription = "";
        switch (action.type) {
          case 'convert':
            const convertOptions = action.options as ConvertOptions;
            actionDescription = `Converting to ${convertOptions.targetFormat.toUpperCase()}`;
            break;
          case 'combine':
            actionDescription = "Combining files";
            break;
          case 'reduce':
            actionDescription = "Reducing file size";
            break;
          case 'resize':
            actionDescription = "Resizing images";
            break;
          case 'compress':
            actionDescription = "Compressing files";
            break;
          case 'rename':
            actionDescription = "Renaming files";
            break;
        }
        
        toast({
          title: `Processing: ${actionDescription}`,
          description: `Working on ${actionFiles.length} file(s)...`
        });
        
        await simulateFileOperation(
          actionFiles,
          action.type,
          updateFileProgress,
          markFileComplete
        );
      }
      
      toast({
        title: "Processing complete",
        description: "All actions have been completed successfully.",
      });
      
    } catch (error) {
      console.error("Error processing files:", error);
      toast({
        title: "Processing failed",
        description: "An error occurred while processing your files.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [activeActions, files, updateFileProgress, markFileComplete]);
  
  // Save an action set for later use
  const saveActionSet = useCallback(() => {
    if (activeActions.length === 0) {
      toast({
        title: "No actions to save",
        description: "Please add actions before saving.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would save this to localStorage or a database
    toast({
      title: "Action set saved",
      description: "Your action set has been saved for future use.",
    });
  }, [activeActions]);
  
  // Add a convert action
  const addConvertAction = useCallback((options: ConvertOptions) => {
    const fileIds = files.map(file => file.id);
    
    addAction({
      type: 'convert',
      options,
      files: fileIds
    });
    
    toast({
      title: "Convert action added",
      description: `${fileIds.length} file(s) will be converted to ${options.targetFormat.toUpperCase()}.`,
    });
  }, [files, addAction]);
  
  // Add a combine action
  const addCombineAction = useCallback((options: CombineOptions) => {
    const fileIds = files.map(file => file.id);
    
    addAction({
      type: 'combine',
      options,
      files: fileIds
    });
    
    toast({
      title: "Combine action added",
      description: `${fileIds.length} file(s) will be combined.`,
    });
  }, [files, addAction]);
  
  // Add a reduce size action
  const addReduceSizeAction = useCallback((options: ReduceOptions) => {
    const fileIds = files.map(file => file.id);
    
    addAction({
      type: 'reduce',
      options,
      files: fileIds
    });
    
    toast({
      title: "Reduce size action added",
      description: `${fileIds.length} file(s) will be optimized for size.`,
    });
  }, [files, addAction]);
  
  // Add a rename action
  const addRenameAction = useCallback((options: RenameOptions) => {
    const fileIds = files.map(file => file.id);
    
    addAction({
      type: 'rename',
      options,
      files: fileIds
    });
    
    toast({
      title: "Rename action added",
      description: `${fileIds.length} file(s) will be renamed.`,
    });
  }, [files, addAction]);
  
  // Add a compress action
  const addCompressAction = useCallback((options: CompressOptions) => {
    const fileIds = files.map(file => file.id);
    
    addAction({
      type: 'compress',
      options,
      files: fileIds
    });
    
    toast({
      title: "Compress action added",
      description: `${fileIds.length} file(s) will be compressed.`,
    });
  }, [files, addAction]);
  
  return {
    files,
    activeActions,
    isProcessing,
    handleFileUpload,
    removeFile,
    clearFiles,
    addAction,
    removeAction,
    processActions,
    saveActionSet,
    addConvertAction,
    addCombineAction,
    addReduceSizeAction,
    addRenameAction,
    addCompressAction
  };
};

export default useFileManager;
