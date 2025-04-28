<script lang="ts" setup>
import { computed } from 'vue';
import { useEditorState } from '@/hooks/editor/useEditorState';

const props = defineProps<{
  component: any; // O componente real a ser editado
  componentId: string;
  isSelected?: boolean;
  isPreview?: boolean;
}>();

const emit = defineEmits<{
  (e: 'select'): void;
  (e: 'update', value: any): void;
}>();

const { theme } = useEditorState();

// Estilos computados que serão aplicados ao wrapper
const wrapperStyle = computed(() => ({
  position: 'relative',
  cursor: props.isPreview ? 'default' : 'pointer',
  outline: props.isSelected ? `2px solid ${theme.value.colors.primary}` : 'none',
  borderRadius: '4px',
  transition: 'all 0.2s ease'
}));

// Função para lidar com cliques no componente
const handleClick = (e: MouseEvent) => {
  if (props.isPreview) return;
  e.stopPropagation();
  emit('select');
};

// Função para lidar com atualizações do componente
const handleUpdate = (value: any) => {
  emit('update', value);
};
</script>

<template>
  <div 
    class="editable-component"
    :style="wrapperStyle"
    @click="handleClick"
  >
    <!-- Overlay de edição (visível apenas quando selecionado e não em preview) -->
    <div 
      v-if="isSelected && !isPreview"
      class="edit-overlay"
    >
      <div class="edit-controls">
        <slot name="controls"></slot>
      </div>
    </div>

    <!-- O componente real sendo editado -->
    <component 
      :is="component"
      v-bind="$attrs"
      @update:modelValue="handleUpdate"
    >
      <slot></slot>
    </component>
  </div>
</template>

<style scoped>
.editable-component {
  position: relative;
}

.editable-component:hover:not(.preview-mode) {
  background: rgba(184, 155, 122, 0.05);
}

.edit-overlay {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  z-index: 10;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.editable-component:hover .edit-overlay {
  opacity: 1;
}

.edit-controls {
  display: flex;
  gap: 4px;
  background: white;
  border: 1px solid var(--editor-primary);
  border-radius: 4px;
  padding: 2px;
}
</style> 