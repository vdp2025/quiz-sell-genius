
import React, { useRef } from 'react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { useDrag, useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { GripVertical, Edit, Copy, Trash } from 'lucide-react';
import HeaderBlockPreview from './block-previews/HeaderBlockPreview';
import HeadlineBlockPreview from './block-previews/HeadlineBlockPreview';
import TextBlockPreview from './block-previews/TextBlockPreview';
import ImageBlockPreview from './block-previews/ImageBlockPreview';
import BenefitsBlockPreview from './block-previews/BenefitsBlockPreview';
import PricingBlockPreview from './block-previews/PricingBlockPreview';
import GuaranteeBlockPreview from './block-previews/GuaranteeBlockPreview';
import CTABlockPreview from './block-previews/CTABlockPreview';
import StyleResultBlockPreview from './block-previews/StyleResultBlockPreview';
import SecondaryStylesBlockPreview from './block-previews/SecondaryStylesBlockPreview';
import HeroSectionBlockPreview from './block-previews/HeroSectionBlockPreview';
import ProductsBlockPreview from './block-previews/ProductsBlockPreview';
import TestimonialsBlockPreview from './block-previews/TestimonialsBlockPreview';
import SpacerBlockPreview from './block-previews/SpacerBlockPreview';
import VideoBlockPreview from './block-previews/VideoBlockPreview';
import TwoColumnBlockPreview from './block-previews/TwoColumnBlockPreview';
import IconBlockPreview from './block-previews/IconBlockPreview';
import FAQBlockPreview from './block-previews/FAQBlockPreview';
import CarouselBlockPreview from './block-previews/CarouselBlockPreview';
import CustomCodeBlockPreview from './block-previews/CustomCodeBlockPreview';
import AnimationBlockPreview from './block-previews/AnimationBlockPreview';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface EditableBlockProps {
  block: Block;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  isPreviewMode: boolean;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  primaryStyle: StyleResult;
}

const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  index,
  isSelected,
  onClick,
  isPreviewMode,
  onReorderBlocks,
  primaryStyle
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'BLOCK',
    item: { index, id: block.id, type: 'BLOCK' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [{ isOver }, drop] = useDrop({
    accept: 'BLOCK',
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Time to actually perform the action
      onReorderBlocks(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  
  // Initialize drag and drop refs
  drag(drop(ref));
  
  // Render the appropriate block preview based on type
  const renderBlockPreview = () => {
    switch (block.type) {
      case 'header':
        return <HeaderBlockPreview content={block.content} />;
      case 'headline':
        return <HeadlineBlockPreview content={block.content} />;
      case 'text':
        return <TextBlockPreview content={block.content} />;
      case 'image':
        return <ImageBlockPreview content={block.content} />;
      case 'benefits':
        return <BenefitsBlockPreview content={block.content} />;
      case 'pricing':
        return <PricingBlockPreview content={block.content} />;
      case 'guarantee':
        return <GuaranteeBlockPreview content={block.content} />;
      case 'cta':
        return <CTABlockPreview content={block.content} />;
      case 'style-result':
        return <StyleResultBlockPreview content={block.content} primaryStyle={primaryStyle} />;
      case 'secondary-styles':
        return <SecondaryStylesBlockPreview content={block.content} />;
      case 'hero-section':
        return <HeroSectionBlockPreview content={block.content} primaryStyle={primaryStyle} />;
      case 'products':
        return <ProductsBlockPreview content={block.content} />;
      case 'testimonials':
        return <TestimonialsBlockPreview content={block.content} />;
      case 'spacer':
        return <SpacerBlockPreview content={block.content} />;
      case 'video':
        return <VideoBlockPreview content={block.content} />;
      case 'two-column':
        return <TwoColumnBlockPreview content={block.content} />;
      case 'icon':
        return <IconBlockPreview content={block.content} />;
      case 'faq':
        return <FAQBlockPreview content={block.content} />;
      case 'carousel':
        return <CarouselBlockPreview content={block.content} />;
      case 'custom-code':
        return <CustomCodeBlockPreview content={block.content} />;
      case 'animation-block':
        return <AnimationBlockPreview content={block.content} />;
      default:
        return <div>Tipo de bloco desconhecido: {block.type}</div>;
    }
  };
  
  // Styles for the block container
  const blockStyle = {
    opacity: isDragging ? 0.5 : 1,
    cursor: isPreviewMode ? 'default' : 'pointer',
    border: isSelected && !isPreviewMode ? '2px solid #B89B7A' : isPreviewMode ? 'none' : '2px dashed #e2e2e2',
    borderRadius: '0.5rem',
    backgroundColor: isPreviewMode ? 'transparent' : isOver ? '#f9f3e9' : 'white',
    position: 'relative' as 'relative',
    zIndex: isSelected ? 1 : 0
  };
  
  if (isPreviewMode) {
    return (
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        {renderBlockPreview()}
      </div>
    );
  }
  
  return (
    <div
      ref={ref}
      style={blockStyle}
      onClick={onClick}
      className="p-3 group transition-all duration-200"
    >
      {!isPreviewMode && (
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-[#f9f3e9]">
            <Edit className="h-4 w-4 text-[#8F7A6A]" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-[#f9f3e9]">
            <Copy className="h-4 w-4 text-[#8F7A6A]" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-100 hover:text-red-600">
            <Trash className="h-4 w-4" />
          </Button>
          <div
            className="h-8 w-8 flex items-center justify-center cursor-move"
            ref={drag}
          >
            <GripVertical className="h-4 w-4 text-[#8F7A6A]" />
          </div>
        </div>
      )}
      
      {renderBlockPreview()}
    </div>
  );
};

export default EditableBlock;
