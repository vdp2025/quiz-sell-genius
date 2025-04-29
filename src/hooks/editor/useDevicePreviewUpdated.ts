import { useState } from 'react';
import { DeviceType } from '@/types/editor';

interface DevicePreset {
  width: number;
  height: number;
  label: string;
}

type DevicePresets = Record<DeviceType, DevicePreset>;

export function useDevicePreviewUpdated() {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');
  const [customWidth, setCustomWidth] = useState(375);
  const [customHeight, setCustomHeight] = useState(667);

  const devicePresets: DevicePresets = {
    mobile: { width: 375, height: 667, label: 'Mobile' },
    tablet: { width: 768, height: 1024, label: 'Tablet' },
    desktop: { width: 1280, height: 800, label: 'Desktop' },
    custom: { width: customWidth, height: customHeight, label: 'Personalizado' }
  };

  const currentPreset = devicePresets[deviceType];

  const setDeviceSize = (type: DeviceType) => {
    setDeviceType(type);
  };

  const setCustomDimensions = (width: number, height: number) => {
    setCustomWidth(width);
    setCustomHeight(height);
    if (deviceType !== 'custom') {
      setDeviceType('custom');
    }
  };

  return {
    deviceType,
    devicePresets,
    currentPreset,
    previewWidth: deviceType === 'custom' ? customWidth : devicePresets[deviceType].width,
    previewHeight: deviceType === 'custom' ? customHeight : devicePresets[deviceType].height,
    setDeviceSize,
    setCustomDimensions
  };
} 