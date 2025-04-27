
import { EditorConfig, EditorBlock, EditableContent } from './editor';

export interface EditorTemplate {
  name: string;
  config: EditorConfig;
}

export interface EditorActions {
  addBlock: (type: EditorBlock['type']) => string;
  updateBlock: (id: string, content: Partial<EditableContent>) => void;
  deleteBlock: (id: string) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
}

export interface EditorThemeActions {
  updateTheme: (theme: Partial<EditorConfig['globalStyles'] | EditorConfig['theme']>) => void;
}

export interface EditorTemplateActions {
  saveAsTemplate: (name: string) => void;
  loadTemplate: (name: string) => boolean;
}
