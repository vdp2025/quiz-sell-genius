<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useEditorHistory } from '@/hooks/editor/useEditorHistory';
import { useEditorState } from '@/hooks/editor/useEditorState';
import { useDevicePreview } from '@/hooks/editor/useDevicePreview';

// Editor state and history management
const { state, updateState } = useEditorState();
const { canUndo, canRedo, undo, redo, pushHistory } = useEditorHistory();

// Device preview management
const { 
  device, 
  setDevice, 
  previewWidth, 
  previewHeight 
} = useDevicePreview();

// UI state
const isPreviewing = ref(false);
const selectedComponentId = ref<string | null>(null);
const showLeftPanel = ref(true);
const showRightPanel = ref(true);

// Computed properties for layout
const mainContentStyle = computed(() => ({
  width: device.value === 'desktop' ? '100%' : `${previewWidth.value}px`,
  height: device.value === 'desktop' ? '100%' : `${previewHeight.value}px`,
  margin: device.value === 'desktop' ? '0' : '0 auto',
  transform: device.value === 'desktop' ? 'none' : `scale(${previewWidth.value / window.innerWidth})`
}));

// Event handlers
const togglePreview = () => {
  isPreviewing.value = !isPreviewing.value;
  if (isPreviewing.value) {
    selectedComponentId.value = null;
  }
};

const handleComponentSelect = (id: string) => {
  if (!isPreviewing.value) {
    selectedComponentId.value = id;
  }
};

const handleStateUpdate = (newState: any) => {
  pushHistory(state.value);
  updateState(newState);
};

const handleSave = async () => {
  // TODO: Implement save functionality
  console.log('Saving editor state:', state.value);
};
</script>

<template>
  <div class="unified-editor h-screen flex flex-col">
    <!-- Editor Toolbar -->
    <div class="editor-toolbar border-b border-gray-200 p-4 flex items-center justify-between bg-white">
      <div class="flex items-center space-x-2">
        <button 
          class="btn" 
          @click="handleSave"
          :disabled="isPreviewing"
        >
          Salvar
        </button>
        <button 
          class="btn" 
          @click="undo"
          :disabled="!canUndo || isPreviewing"
        >
          Desfazer
        </button>
        <button 
          class="btn" 
          @click="redo"
          :disabled="!canRedo || isPreviewing"
        >
          Refazer
        </button>
      </div>

      <div class="flex items-center space-x-2">
        <button 
          class="btn" 
          @click="() => setDevice('desktop')"
          :class="{ active: device === 'desktop' }"
        >
          Desktop
        </button>
        <button 
          class="btn" 
          @click="() => setDevice('tablet')"
          :class="{ active: device === 'tablet' }"
        >
          Tablet
        </button>
        <button 
          class="btn" 
          @click="() => setDevice('mobile')"
          :class="{ active: device === 'mobile' }"
        >
          Mobile
        </button>
        <button 
          class="btn-primary" 
          @click="togglePreview"
        >
          {{ isPreviewing ? 'Editar' : 'Visualizar' }}
        </button>
      </div>
    </div>

    <!-- Editor Main Content -->
    <div class="editor-content flex-1 flex overflow-hidden">
      <!-- Left Panel - Components -->
      <div 
        v-if="showLeftPanel && !isPreviewing" 
        class="editor-left-panel w-64 border-r border-gray-200 bg-white"
      >
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-medium">Componentes</h3>
        </div>
        <!-- Component list will go here -->
      </div>

      <!-- Main Content Area -->
      <div class="editor-main-area flex-1 bg-gray-50 overflow-auto">
        <div 
          class="editor-canvas min-h-full p-8"
          :class="{ 'preview-mode': isPreviewing }"
        >
          <div 
            class="editor-content-wrapper bg-white shadow-sm rounded-lg"
            :style="mainContentStyle"
          >
            <!-- Dynamic content will go here -->
          </div>
        </div>
      </div>

      <!-- Right Panel - Properties -->
      <div 
        v-if="showRightPanel && !isPreviewing" 
        class="editor-right-panel w-80 border-l border-gray-200 bg-white"
      >
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-medium">Propriedades</h3>
        </div>
        <!-- Properties panel will go here -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.unified-editor {
  --editor-primary: #B89B7A;
  --editor-primary-hover: #A38A69;
  --editor-text: #432818;
  --editor-text-light: #8F7A6A;
}

.btn {
  @apply px-3 py-1.5 rounded-md text-sm font-medium;
  @apply border border-gray-200 hover:bg-gray-50;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  color: var(--editor-text-light);
}

.btn.active {
  @apply bg-gray-50;
  color: var(--editor-text);
}

.btn-primary {
  @apply px-3 py-1.5 rounded-md text-sm font-medium;
  background-color: var(--editor-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--editor-primary-hover);
}

.editor-canvas {
  transition: padding 0.3s ease;
}

.editor-canvas.preview-mode {
  padding: 0;
}

.editor-content-wrapper {
  transition: all 0.3s ease;
}

/* Device preview transitions */
.preview-device-enter-active,
.preview-device-leave-active {
  transition: all 0.3s ease;
}

.preview-device-enter-from,
.preview-device-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style> 