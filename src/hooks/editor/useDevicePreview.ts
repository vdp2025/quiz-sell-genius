import { ref, computed } from 'vue';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface DevicePreset {
  width: number;
  height: number;
}

const devicePresets: Record<DeviceType, DevicePreset> = {
  desktop: {
    width: 1920,
    height: 1080
  },
  tablet: {
    width: 768,
    height: 1024
  },
  mobile: {
    width: 375,
    height: 667
  }
};

export function useDevicePreview() {
  const device = ref<DeviceType>('desktop');
  const customWidth = ref<number | null>(null);
  const customHeight = ref<number | null>(null);

  // Computed dimensions based on device or custom values
  const previewWidth = computed(() => {
    if (customWidth.value) return customWidth.value;
    return devicePresets[device.value].width;
  });

  const previewHeight = computed(() => {
    if (customHeight.value) return customHeight.value;
    return devicePresets[device.value].height;
  });

  // Scale factor for preview (useful for responsive preview)
  const scale = computed(() => {
    if (device.value === 'desktop') return 1;
    const containerWidth = window.innerWidth * 0.8; // 80% of window width
    return Math.min(1, containerWidth / previewWidth.value);
  });

  // Methods to change device and dimensions
  const setDevice = (newDevice: DeviceType) => {
    device.value = newDevice;
    // Reset custom dimensions when changing device
    customWidth.value = null;
    customHeight.value = null;
  };

  const setCustomDimensions = (width: number, height: number) => {
    customWidth.value = width;
    customHeight.value = height;
  };

  const resetDimensions = () => {
    customWidth.value = null;
    customHeight.value = null;
  };

  return {
    device,
    previewWidth,
    previewHeight,
    scale,
    setDevice,
    setCustomDimensions,
    resetDimensions,
    devicePresets
  };
} 