<script lang="ts" setup>
import { computed } from 'vue';
import { useEditorState } from '@/hooks/editor/useEditorState';

const props = defineProps<{
  componentId: string;
  properties: Record<string, {
    type: 'text' | 'number' | 'color' | 'select' | 'boolean';
    label: string;
    value: any;
    options?: { label: string; value: any }[];
  }>;
}>();

const emit = defineEmits<{
  (e: 'update', property: string, value: any): void;
}>();

const { theme } = useEditorState();

// Função para renderizar o input apropriado baseado no tipo
const renderInput = (property: string, config: typeof props.properties[string]) => {
  switch (config.type) {
    case 'text':
      return (
        <input
          type="text"
          value={config.value}
          class="property-input"
          onInput={(e: Event) => 
            emit('update', property, (e.target as HTMLInputElement).value)
          }
        />
      );
    
    case 'number':
      return (
        <input
          type="number"
          value={config.value}
          class="property-input"
          onInput={(e: Event) => 
            emit('update', property, Number((e.target as HTMLInputElement).value))
          }
        />
      );
    
    case 'color':
      return (
        <div class="color-input-wrapper">
          <input
            type="color"
            value={config.value}
            class="property-color-input"
            onChange={(e: Event) => 
              emit('update', property, (e.target as HTMLInputElement).value)
            }
          />
          <input
            type="text"
            value={config.value}
            class="property-input"
            onInput={(e: Event) => 
              emit('update', property, (e.target as HTMLInputElement).value)
            }
          />
        </div>
      );
    
    case 'select':
      return (
        <select
          value={config.value}
          class="property-select"
          onChange={(e: Event) => 
            emit('update', property, (e.target as HTMLSelectElement).value)
          }
        >
          {config.options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    
    case 'boolean':
      return (
        <label class="property-checkbox">
          <input
            type="checkbox"
            checked={config.value}
            onChange={(e: Event) => 
              emit('update', property, (e.target as HTMLInputElement).checked)
            }
          />
          <span class="checkbox-label">{config.label}</span>
        </label>
      );
  }
};
</script>

<template>
  <div class="property-editor">
    <div 
      v-for="(config, property) in properties" 
      :key="property"
      class="property-field"
    >
      <label v-if="config.type !== 'boolean'" class="property-label">
        {{ config.label }}
      </label>
      <component :is="renderInput(property, config)" />
    </div>
  </div>
</template>

<style scoped>
.property-editor {
  padding: 16px;
}

.property-field {
  margin-bottom: 16px;
}

.property-label {
  display: block;
  font-size: 14px;
  color: var(--editor-text);
  margin-bottom: 4px;
}

.property-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
}

.property-input:focus {
  outline: none;
  border-color: var(--editor-primary);
}

.color-input-wrapper {
  display: flex;
  gap: 8px;
}

.property-color-input {
  width: 40px;
  height: 40px;
  padding: 2px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

.property-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
}

.property-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label {
  font-size: 14px;
  color: var(--editor-text);
}
</style> 