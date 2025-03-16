
import React, { useState } from 'react';
import { 
  FileType, 
  ConvertOptions, 
  CombineOptions, 
  ReduceOptions, 
  RenameOptions,
  CompressOptions 
} from '@/types';
import ActionButton from './ActionButton';
import { 
  FileConvert, FilesIcon, ImageIcon, Download, Save, Trash2, Plus,
  RefreshCw, FileArchive, FileText, FileSpreadsheet, FilePdf, PenLine
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  hasActions
}) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  // Convert action state
  const [convertOptions, setConvertOptions] = useState<ConvertOptions>({
    targetFormat: 'pdf',
    mode: 'all'
  });
  
  // Combine action state
  const [combineOptions, setCombineOptions] = useState<CombineOptions>({
    mode: 'sameFormat',
    outputFormat: 'pdf'
  });
  
  // Reduce size action state
  const [reduceOptions, setReduceOptions] = useState<ReduceOptions>({
    mode: 'optimize',
    maxSize: 10
  });
  
  // Rename action state
  const [renameOptions, setRenameOptions] = useState<RenameOptions>({
    mode: 'addAfter',
    text: ''
  });
  
  // Compress action state
  const [compressOptions, setCompressOptions] = useState<CompressOptions>({
    outputName: 'compressed_files',
    format: 'zip'
  });
  
  // Toggle active action
  const toggleAction = (action: string) => {
    if (activeAction === action) {
      setActiveAction(null);
    } else {
      setActiveAction(action);
    }
  };
  
  // Handle add action based on type
  const handleAddAction = () => {
    if (!activeAction) return;
    
    switch (activeAction) {
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
    
    // Reset active action after adding
    setActiveAction(null);
  };
  
  // Action buttons
  const actionButtons = [
    {
      id: 'convert',
      label: 'Convert file to other format',
      icon: <FileConvert className="w-5 h-5" />,
      component: (
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
          
          <ActionButton 
            onClick={handleAddAction}
            label="Add Action"
            icon={<Plus className="w-4 h-4" />}
            variant="primary"
          />
        </div>
      )
    },
    {
      id: 'combine',
      label: 'Combine files together',
      icon: <FilesIcon className="w-5 h-5" />,
      component: (
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
          
          <ActionButton 
            onClick={handleAddAction}
            label="Add Action"
            icon={<Plus className="w-4 h-4" />}
            variant="primary"
          />
        </div>
      )
    },
    {
      id: 'reduce',
      label: 'Reduce file size',
      icon: <RefreshCw className="w-5 h-5" />,
      component: (
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
          
          <ActionButton 
            onClick={handleAddAction}
            label="Add Action"
            icon={<Plus className="w-4 h-4" />}
            variant="primary"
          />
        </div>
      )
    },
    {
      id: 'resize',
      label: 'Resize images',
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
        <div className="space-y-4 mt-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Resize image files to reduce their dimensions and file size.
          </p>
          
          <ActionButton 
            onClick={handleAddAction}
            label="Add Action"
            icon={<Plus className="w-4 h-4" />}
            variant="primary"
          />
        </div>
      )
    },
    {
      id: 'compress',
      label: 'Compress files',
      icon: <FileArchive className="w-5 h-5" />,
      component: (
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
          
          <ActionButton 
            onClick={handleAddAction}
            label="Add Action"
            icon={<Plus className="w-4 h-4" />}
            variant="primary"
          />
        </div>
      )
    },
    {
      id: 'rename',
      label: 'File renaming',
      icon: <PenLine className="w-5 h-5" />,
      component: (
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
                  // Create an example based on the first file
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
          
          <ActionButton 
            onClick={handleAddAction}
            label="Add Action"
            icon={<Plus className="w-4 h-4" />}
            variant="primary"
          />
        </div>
      )
    }
  ];
  
  return (
    <div className="space-y-6">
      {!activeAction && (
        <div className="space-y-2 animate-fade-in">
          <label className="text-sm text-muted-foreground">
            Please select what you want
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {actionButtons.map((button) => (
              <ActionButton
                key={button.id}
                onClick={() => toggleAction(button.id)}
                label={button.label}
                icon={button.icon}
                className="justify-start text-left"
                disabled={!hasFiles}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Show active action configuration */}
      {activeAction && (
        <div className="action-panel animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {actionButtons.find(b => b.id === activeAction)?.label}
            </h3>
            <ActionButton
              onClick={() => setActiveAction(null)}
              label="Cancel"
              variant="ghost"
              size="sm"
            />
          </div>
          
          {actionButtons.find(b => b.id === activeAction)?.component}
        </div>
      )}
      
      <div className="flex justify-between items-center pt-6 border-t border-dark-accent/20">
        <div className="flex space-x-2">
          <ActionButton
            onClick={onSaveActionSet}
            label="Save this action set"
            icon={<Save className="w-4 h-4" />}
            variant="ghost"
            disabled={!hasActions}
          />
        </div>
        
        <ActionButton
          onClick={onProcessActions}
          label="Process & Download"
          icon={<Download className="w-4 h-4" />}
          variant="primary"
          disabled={isProcessing || !hasActions}
        />
      </div>
    </div>
  );
};

export default ActionPanel;
