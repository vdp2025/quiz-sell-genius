import React from 'react';
import { ElementType } from '@/types/editor';

interface ElementRendererProps {
  element: ElementType;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export function ElementRenderer({ element, isSelected, isEditing, onClick }: ElementRendererProps) {
  const { type, content, properties } = element;
  
  // Gerar CSS inline a partir das propriedades de estilo
  const generateStyles = () => {
    const styles = properties.styles || {};
    return {
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      borderRadius: styles.borderRadius,
      borderColor: styles.borderColor,
      padding: styles.padding,
      margin: styles.margin,
      width: styles.width,
      height: styles.height,
      boxShadow: styles.shadow,
      position: element.position ? 'absolute' : 'relative',
      top: element.position?.y ? `${element.position.y}px` : undefined,
      left: element.position?.x ? `${element.position.x}px` : undefined,
      cursor: isEditing ? 'pointer' : 'default',
      outline: isSelected ? '2px solid #3b82f6' : 'none',
      transition: 'all 0.2s ease'
    };
  };
  
  // Renderiza diferentes tipos de elementos
  const renderElement = () => {
    switch (type) {
      case 'text':
      case 'question':
        return (
          <div 
            className="editor-text"
            style={generateStyles()}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
        
      case 'image':
        return (
          <img
            src={properties.attributes?.src}
            alt={properties.attributes?.alt || 'Imagem'}
            className="editor-image"
            style={generateStyles()}
            onClick={onClick}
          />
        );
        
      case 'button':
        return (
          <button
            className="editor-button"
            style={generateStyles()}
            onClick={(e) => {
              e.preventDefault();
              if (onClick) onClick();
            }}
          >
            {content}
          </button>
        );
        
      case 'option':
        return (
          <div
            className="editor-option"
            style={generateStyles()}
            onClick={onClick}
          >
            {content}
          </div>
        );
        
      case 'result':
      case 'offer':
        return (
          <div
            className="editor-result"
            style={generateStyles()}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
        
      default:
        return (
          <div
            className="editor-unknown"
            style={generateStyles()}
            onClick={onClick}
          >
            {content || `Elemento: ${type}`}
          </div>
        );
    }
  };
  
  return (
    <div className={`element-wrapper ${isEditing ? 'editable' : ''}`}>
      {renderElement()}
      {isSelected && isEditing && (
        <div className="element-controls absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl z-50">
          {type}
        </div>
      )}
    </div>
  );
} 