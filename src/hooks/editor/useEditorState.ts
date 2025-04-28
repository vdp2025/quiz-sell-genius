import { ref, computed } from 'vue';

export interface EditorBlock {
  id: string;
  type: string;
  content: Record<string, any>;
  styles?: Record<string, any>;
  settings?: Record<string, any>;
}

export interface EditorState {
  blocks: EditorBlock[];
  theme: Record<string, any>;
  settings: Record<string, any>;
}

const initialState: EditorState = {
  blocks: [],
  theme: {
    colors: {
      primary: '#B89B7A',
      secondary: '#432818',
      text: '#432818',
      background: '#FFFFFF'
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Inter'
    }
  },
  settings: {
    layout: 'default',
    spacing: 'comfortable'
  }
};

export function useEditorState() {
  const state = ref<EditorState>(initialState);

  // Computed properties for easy access
  const blocks = computed(() => state.value.blocks);
  const theme = computed(() => state.value.theme);
  const settings = computed(() => state.value.settings);

  // State update methods
  const updateState = (newState: Partial<EditorState>) => {
    state.value = {
      ...state.value,
      ...newState
    };
  };

  const updateBlock = (blockId: string, updates: Partial<EditorBlock>) => {
    const blockIndex = state.value.blocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;

    const updatedBlocks = [...state.value.blocks];
    updatedBlocks[blockIndex] = {
      ...updatedBlocks[blockIndex],
      ...updates
    };

    state.value = {
      ...state.value,
      blocks: updatedBlocks
    };
  };

  const addBlock = (block: EditorBlock) => {
    state.value = {
      ...state.value,
      blocks: [...state.value.blocks, block]
    };
  };

  const removeBlock = (blockId: string) => {
    state.value = {
      ...state.value,
      blocks: state.value.blocks.filter(b => b.id !== blockId)
    };
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blockIndex = state.value.blocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;

    const newBlocks = [...state.value.blocks];
    if (direction === 'up' && blockIndex > 0) {
      [newBlocks[blockIndex - 1], newBlocks[blockIndex]] = 
      [newBlocks[blockIndex], newBlocks[blockIndex - 1]];
    } else if (direction === 'down' && blockIndex < newBlocks.length - 1) {
      [newBlocks[blockIndex], newBlocks[blockIndex + 1]] = 
      [newBlocks[blockIndex + 1], newBlocks[blockIndex]];
    }

    state.value = {
      ...state.value,
      blocks: newBlocks
    };
  };

  const updateTheme = (updates: Partial<typeof initialState.theme>) => {
    state.value = {
      ...state.value,
      theme: {
        ...state.value.theme,
        ...updates
      }
    };
  };

  const updateSettings = (updates: Partial<typeof initialState.settings>) => {
    state.value = {
      ...state.value,
      settings: {
        ...state.value.settings,
        ...updates
      }
    };
  };

  return {
    state,
    blocks,
    theme,
    settings,
    updateState,
    updateBlock,
    addBlock,
    removeBlock,
    moveBlock,
    updateTheme,
    updateSettings
  };
} 