import * as React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { EditorToolbar } from './EditorToolbar';
import { EditorSidebar } from './EditorSidebar';
import { EditorPreview } from './EditorPreview';
import { EditorProperties } from './EditorProperties';
import { useEditorContext } from '@/context/EditorContext';
import { DevicePreviewSelector } from './DevicePreviewSelector';
import { useDevicePreview } from '@/hooks/editor/useDevicePreview';

export function LiveEditor() {
  const { selectedElement, isPreviewing, togglePreview, saveChanges } = useEditorContext();
  const { deviceSize, setDeviceSize } = useDevicePreview();
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <EditorToolbar 
        isPreviewing={isPreviewing}
        onPreviewToggle={togglePreview}
        onSave={saveChanges}
        deviceSize={deviceSize}
        setDeviceSize={setDeviceSize}
      />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Elementos editáveis */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <EditorSidebar />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Centro - Preview */}
        <ResizablePanel defaultSize={55}>
          <div className="h-full flex flex-col">
            <DevicePreviewSelector 
              deviceSize={deviceSize} 
              onChange={setDeviceSize} 
            />
            <div className="flex-1 overflow-auto p-4 bg-gray-100">
              <EditorPreview deviceSize={deviceSize} />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Painel de Propriedades */}
        <ResizablePanel defaultSize={25}>
          <EditorProperties />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
} 