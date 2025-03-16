import React, { useState } from 'react';
import { 
  FileType, 
  ConvertOptions, 
  CombineOptions, 
  ReduceOptions, 
  RenameOptions,
  CompressOptions,
  Action
} from '@/types';
import ActionButton from './ActionButton';
import { 
  FileUp, FilesIcon, ImageIcon, Download, Save, Trash2, Plus,
  RefreshCw, FileArchive, FileText, FileSpreadsheet, FileJson, PenLine
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface ActionPanelProps {
  onAddConvertAction: (options: ConvertOptions) => void;
  onAddCombineAction: (options: CombineOptions) => void;
  onAddReduceSizeAction: (options: ReduceOptions) => void;
  onAddRenameAction: (options: RenameOptions) => void;
  onAddCompressAction: (options: CompressOptions) => void;
  onSaveActionSet: () => void;
  onProcessActions: () => void;
  onRemoveAction: (index: number) => void;
  isProcessing: boolean;
  hasFiles: boolean;
  hasActions: boolean;
  activeActions: Action[];
}

const ActionPanel: React.FC<ActionPanelProps> = ({
  onAddConvertAction,
  onAddCombineAction,
  onAddReduceSizeAction,
  onAddRenameAction,
  onAddCompressAction,
  onSaveActionSet,
  onProcessActions,
  onRemoveAction,
  isProcessing,
  hasFiles,
  hasActions,
  activeActions
}) => {
  const [activeActionType, setActiveActionType] = useState<string | null>(null);
  
  const [convertOptions, setConvertOptions] = useState<ConvertOptions>({
    targetFormat: 'pdf',
    mode: 'all'
  });
  
  const [combineOptions, setCombineOptions] = useState<CombineOptions>({
    mode: 'sameFormat',
    outputFormat: 'pdf'
  });
  
  const [reduceOptions, setReduceOptions] = useState<ReduceOptions>({
    mode: 'optimize',
    maxSize: 10
  });
  
  const [renameOptions, setRenameOptions] = useState<RenameOptions>({
    mode: 'addAfter',
    text: ''
  });
  
  const [compressOptions, setCompressOptions] = useState<CompressOptions>({
    outputName: 'compressed_files',
    format: 'zip'
  });
  
  const handleActionSelect = (actionType: string) => {
    setActiveActionType(actionType);
  };
  
  const handleAddAction = () => {
    if (!activeActionType) return;
    
    switch (activeActionType) {
      case 'convert':
        onAddConvertAction(convertOptions);
        break;
      case 'combine':
        onAddCombineAction(combineOptions);
        break;
      case 'reduce':
        onAddReduceSizeAction(reduceOptions);
        break;
      case 'rename':
        onAddRenameAction(renameOptions);
        break;
      case 'compress':
        onAddCompressAction(compressOptions);
        break;
    }
    
    setActiveActionType(null);
  };
  
  const renderActionConfiguration = () => {
    switch (activeActionType) {
      case 'convert':
        return (
          <div className="space-y-4 mt-4 animate-fade-in">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Convert files to:</label>
              <Select 
                value={convertOptions.targetFormat}
                onValueChange={(value) => setConvertOptions({ ...convertOptions, targetFormat: value })}
              >
                <SelectTrigger className="bg-dark-secondary border-dark-accent/30">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-dark-secondary/95 backdrop-blur-lg border-dark-accent/30">
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="docx">DOCX</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Conversion mode:</label>
              <Select 
                value={convertOptions.mode}
                onValueChange={(value) => setConvertOptions({ 
                  ...convertOptions, 
                  mode: value as 'all' | 'individual' | 'selected' 
                })}
              >
                <SelectTrigger className="bg-dark-secondary border-dark-accent/30">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent className="bg-dark-secondary/95 backdrop-blur-lg border-dark-accent/30">
                  <SelectItem value="all">Convert all files</SelectItem>
                  <SelectItem value="individual">Convert files separately</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 'combine':
        return (
          <div className="space-y-4 mt-4 animate-fade-in">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Combine mode:</label>
              <Select 
                value={combineOptions.mode}
                onValueChange={(value) => setCombineOptions({ 
                  ...combineOptions, 
                  mode: value as 'sameFormat' | 'merge' | 'singlePdf' 
                })}
              >
                <SelectTrigger className="bg-dark-secondary border-dark-accent/30">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent className="bg-dark-secondary/95 backdrop-blur-lg border-dark-accent/30">
                  <SelectItem value="sameFormat">Combine same format files</SelectItem>
                  <SelectItem value="merge">Merge Excel workbooks</SelectItem>
                  <SelectItem value="singlePdf">Create single PDF file</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(combineOptions.mode === 'sameFormat' || combineOptions.mode === 'singlePdf') && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Output format:</label>
                <Select 
                  value={combineOptions.outputFormat}
                  onValueChange={(value) => setCombineOptions({ ...combineOptions, outputFormat: value })}
                >
                  <SelectTrigger className="bg-dark-secondary border-dark-accent/30">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-secondary/95 backdrop-blur-lg border-dark-accent/30">
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">DOCX</SelectItem>
                    <SelectItem value="xls">XLS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {combineOptions.mode === 'singlePdf' && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Output filename:</label>
                <Input 
                  className="bg-dark-secondary border-dark-accent/30"
                  placeholder="combined_document"
                  value={combineOptions.outputName || ''}
                  onChange={(e) => setCombineOptions({ ...combineOptions, outputName: e.target.value })}
                />
              </div>
            )}
          </div>
        );
        
      case 'reduce':
        return (
          <div className="space-y-4 mt-4 animate-fade-in">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Optimization level:</label>
              <Select 
                value={reduceOptions.mode}
                onValueChange={(value) => setReduceOptions({ 
                  ...reduceOptions, 
                  mode: value as 'optimize' | 'maximum' 
                })}
              >
                <SelectTrigger className="bg-dark-secondary border-dark-accent/30">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-dark-secondary/95 backdrop-blur-lg border-dark-accent/30">
                  <SelectItem value="optimize">Optimize for email</SelectItem>
                  <SelectItem value="maximum">Maximum compression</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {reduceOptions.mode === 'optimize' && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Max file size:</label>
                <Select 
                  value={String(reduceOptions.maxSize)}
                  onValueChange={(value) => setReduceOptions({ ...reduceOptions, maxSize: Number(value) })}
                >
                  <SelectTrigger className="bg-dark-secondary border-dark-accent/30">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-secondary/95 backdrop-blur-lg border-dark-accent/30">
                    <SelectItem value="5">under 5MB</SelectItem>
                    <SelectItem value="10">under 10MB</SelectItem>
                    <SelectItem value="25">under 25MB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        );
      
      case 'rename':
        return (
          <div className="space-y-4 mt-4 animate-fade-in">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Rename mode:</label>
              <Select 
                value={renameOptions.mode}
                onValueChange={(value) => setRenameOptions({ 
                  ...renameOptions, 
                  mode: value as 'addBefore' | 'addAfter' | 'replace'
                })}
              >
                <SelectTrigger className="bg-dark-secondary border-dark-accent/30">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent className="bg-dark-secondary/95 backdrop-blur-lg border-dark-accent/30">
                  <SelectItem value="addBefore">Add text before file names</SelectItem>
                  <SelectItem value="addAfter">Add text after file names</SelectItem>
                  <SelectItem value="replace">Replace text in file names</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Text to add:</label>
              <Input 
                className="bg-dark-secondary border-dark-accent/30"
                placeholder={renameOptions.mode === 'addBefore' ? "Prefix-" : "-Suffix"}
                value={renameOptions.text}
                onChange={(e) => {
                  const text = e.target.value;
                  setRenameOptions({
                    ...renameOptions,
                    text,
                    example: text ? `Example: ${
                      renameOptions.mode === 'addBefore' ? 
                      `${text}Filename.ext` : `Filename${text}.ext`
                    }` : undefined
                  });
                }}
              />
            </div>
            
            {renameOptions.example && (
              <p className="text-xs text-muted-foreground">{renameOptions.example}</p>
            )}
          </div>
        );
      
      case 'compress':
        return (
          <div className="space-y-4 mt-4 animate-fade-in">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Archive name:</label>
              <Input 
                className="bg-dark-secondary border-dark-accent/30"
                placeholder="compressed_files"
                value={compressOptions.outputName}
                onChange={(e) => setCompressOptions({ ...compressOptions, outputName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Format:</label>
              <Select 
                value={compressOptions.format}
                onValueChange={(value) => setCompressOptions({ ...compressOptions, format: value as 'zip' })}
              >
                <SelectTrigger className="bg-dark-secondary border-dark-accent/30">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-dark-secondary/95 backdrop-blur-lg border-dark-accent/30">
                  <SelectItem value="zip">ZIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const getActionTypeLabel = (type: string) => {
    switch (type) {
      case 'convert': return 'Convert file to other format';
      case 'combine': return 'Combine files together';
      case 'reduce': return 'Reduce file size';
      case 'resize': return 'Resize images';
      case 'compress': return 'Compress files';
      case 'rename': return 'File renaming';
      default: return type;
    }
  };
  
  const getActionDescription = (action: Action) => {
    switch (action.type) {
      case 'convert':
        const convertOpts = action.options as ConvertOptions;
        return `Convert files to ${convertOpts.targetFormat.toUpperCase()}`;
      case 'combine':
        const combineOpts = action.options as CombineOptions;
        return combineOpts.mode === 'singlePdf' 
          ? 'Create single PDF file' 
          : 'Combine same format files';
      case 'reduce':
        const reduceOpts = action.options as ReduceOptions;
        return reduceOpts.mode === 'optimize' 
          ? `Optimize file size for email (${reduceOpts.maxSize}MB)` 
          : 'Maximum compression';
      case 'rename':
        const renameOpts = action.options as RenameOptions;
        return `${renameOpts.mode === 'addBefore' ? 'Add text before' : 'Add text after'} file names`;
      case 'compress':
        return 'Compress files to ZIP archive';
      default:
        return action.type;
    }
  };
  
  const actionOptions = [
    { id: 'convert', label: 'Convert file to other format', icon: <FileUp className="w-5 h-5" /> },
    { id: 'resize', label: 'Resize images', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'combine', label: 'Combine files together', icon: <FilesIcon className="w-5 h-5" /> },
    { id: 'reduce', label: 'Reduce file size', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'compress', label: 'Compress files', icon: <FileArchive className="w-5 h-5" /> },
    { id: 'rename', label: 'File renaming', icon: <PenLine className="w-5 h-5" /> },
  ];
  
  return (
    <div className="space-y-6">
      {/* Added Actions - Displayed as a stack */}
      {activeActions.length > 0 && (
        <div className="space-y-4 mb-6">
          {activeActions.map((action, index) => (
            <div 
              key={index} 
              className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl p-4 border border-dark-accent/10"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{getActionTypeLabel(action.type)}</span>
                <button 
                  onClick={() => onRemoveAction(index)}
                  className="p-1.5 text-muted-foreground hover:text-white rounded-full 
                  transition-colors"
                  aria-label="Remove action"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {getActionDescription(action)}
              </p>
              
              {action.type === 'convert' && (
                <div className="flex flex-wrap gap-2 mb-2">
                  <Select defaultValue="pdf" disabled>
                    <SelectTrigger className="w-24 h-9 text-sm">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Action Configuration */}
      {activeActionType && (
        <div className="bg-dark-secondary/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-dark-accent/20 animate-scale-in mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {getActionTypeLabel(activeActionType)}
            </h3>
            <button 
              onClick={() => setActiveActionType(null)}
              className="p-2 text-muted-foreground hover:text-white rounded-lg
              transition-colors"
            >
              Cancel
            </button>
          </div>
          
          {renderActionConfiguration()}
          
          <div className="mt-4">
            <button
              onClick={handleAddAction}
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-4
              bg-highlight-purple hover:bg-highlight-purple/90 
              text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Action</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Action Buttons - Displayed as individual buttons */}
      {!activeActionType && (
        <>
          {activeActions.length === 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Please select what you want to do with your files:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {actionOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleActionSelect(option.id)}
                    disabled={!hasFiles}
                    className="flex items-center justify-center space-x-2 py-3 px-4 
                    bg-dark-secondary/50 hover:bg-dark-secondary/80
                    border border-dark-accent/10 rounded-lg
                    transition-colors disabled:opacity-50"
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Add other actions:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {actionOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleActionSelect(option.id)}
                    disabled={!hasFiles}
                    className="flex items-center justify-center space-x-2 py-3 px-4 
                    bg-dark-secondary/50 hover:bg-dark-secondary/80
                    border border-dark-accent/10 rounded-lg
                    transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Action Controls - Save action set and Process & Download buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-dark-accent/20">
        <button
          onClick={onSaveActionSet}
          disabled={!hasActions}
          className="flex items-center space-x-2 p-2 text-muted-foreground
          hover:text-white transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>Save this action set</span>
        </button>
        
        <button
          onClick={onProcessActions}
          disabled={isProcessing || !hasActions}
          className="flex items-center space-x-2 py-2.5 px-5
          bg-highlight-purple hover:bg-highlight-purple/90 
          text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>Process & Download</span>
        </button>
      </div>
    </div>
  );
};

export default ActionPanel;
