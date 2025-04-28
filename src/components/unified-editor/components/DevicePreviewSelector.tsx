import React from 'react';
import { Button } from '@/components/ui/button';
import { DeviceType } from '@/types/editor';
import { PhoneIcon, TabletIcon, LaptopIcon, MonitorIcon } from 'lucide-react';

type DevicePreviewSelectorProps = {
  deviceSize: DeviceType;
  onChange: (device: DeviceType) => void;
};

export function DevicePreviewSelector({ deviceSize, onChange }: DevicePreviewSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-2 bg-white border-b">
      <Button
        variant={deviceSize === 'mobile' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('mobile')}
        className="flex items-center gap-1"
        title="Visualização Mobile (375px)"
      >
        <PhoneIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Mobile</span>
      </Button>
      
      <Button
        variant={deviceSize === 'tablet' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('tablet')}
        className="flex items-center gap-1"
        title="Visualização Tablet (768px)"
      >
        <TabletIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Tablet</span>
      </Button>
      
      <Button
        variant={deviceSize === 'desktop' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('desktop')}
        className="flex items-center gap-1"
        title="Visualização Desktop (1280px)"
      >
        <LaptopIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Desktop</span>
      </Button>
      
      <Button
        variant={deviceSize === 'custom' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('custom')}
        className="flex items-center gap-1"
        title="Visualização Personalizada"
      >
        <MonitorIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Personalizado</span>
      </Button>
    </div>
  );
} 