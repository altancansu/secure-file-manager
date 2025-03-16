
import React from 'react';
import useFileManager from '@/hooks/useFileManager';
import DropZone from '@/components/DropZone';
import FileList from '@/components/FileList';
import ActionPanel from '@/components/ActionPanel';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const {
    files,
    activeActions,
    isProcessing,
    handleFileUpload,
    removeFile,
    clearFiles,
    removeAction,
    processActions,
    saveActionSet,
    addConvertAction,
    addCombineAction,
    addReduceSizeAction,
    addRenameAction,
    addCompressAction
  } = useFileManager();
  
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium mb-2 tracking-tight">Secure File Manager</h1>
          <p className="text-muted-foreground">
            Our tool runs entirely on your device, keeping all actions local and your files private.
            <br />
            With no uploads or external servers, <span className="font-semibold">your data stays fully secure.</span>
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {files.length === 0 ? (
            <div className="max-w-xl mx-auto mb-10">
              <DropZone onFilesAdded={handleFileUpload} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
              <div className="space-y-6">
                <div className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-dark-accent/10">
                  <div className="mb-6">
                    <DropZone onFilesAdded={handleFileUpload} />
                  </div>
                  
                  <FileList 
                    files={files} 
                    onRemoveFile={removeFile} 
                  />
                </div>
              </div>
              
              <div className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-dark-accent/10">
                <ActionPanel 
                  onAddConvertAction={addConvertAction}
                  onAddCombineAction={addCombineAction}
                  onAddReduceSizeAction={addReduceSizeAction}
                  onAddRenameAction={addRenameAction}
                  onAddCompressAction={addCompressAction}
                  onSaveActionSet={saveActionSet}
                  onProcessActions={processActions}
                  onRemoveAction={removeAction}
                  isProcessing={isProcessing}
                  hasFiles={files.length > 0}
                  hasActions={activeActions.length > 0}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
