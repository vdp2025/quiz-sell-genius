// Tipos de dispositivos para visualização responsiva
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'custom';

// Tipos de elementos editáveis
export type ElementType = {
  id: string;
  type: 'text' | 'image' | 'button' | 'question' | 'option' | 'result' | 'offer';
  content: string;
  properties: {
    styles?: {
      backgroundColor?: string;
      color?: string;
      fontSize?: string;
      fontWeight?: string;
      borderRadius?: string;
      borderColor?: string;
      padding?: string;
      margin?: string;
      width?: string;
      height?: string;
      shadow?: string;
    };
    attributes?: {
      src?: string;
      alt?: string;
      href?: string;
      target?: string;
      rel?: string;
      placeholder?: string;
      title?: string;
    };
    data?: {
      questionId?: string;
      optionId?: string;
      resultId?: string;
      offerId?: string;
      action?: string;
      redirectUrl?: string;
    };
  };
  children?: ElementType[];
  parent?: string;
  position?: {
    x: number;
    y: number;
  };
  constraints?: {
    editable: boolean;
    movable: boolean;
    resizable: boolean;
    deletable: boolean;
  };
};

// Configuração do editor
export type EditorConfig = {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  layout: {
    spacing: string;
    containerWidth: string;
    borderRadius: string;
  };
  blocks: ElementType[];
};

// Tipo para ações de edição
export type EditorAction = {
  type: 'add' | 'update' | 'delete' | 'move' | 'clearAll';
  elementId?: string;
  element?: Partial<ElementType>;
  position?: number;
};

// Tipo para histórico de edições
export type EditorHistory = {
  past: EditorAction[];
  future: EditorAction[];
};

// Tipo para métricas
export type MetricEvent = {
  id: string;
  sessionId: string;
  eventType: 'view' | 'click' | 'submit' | 'abandon';
  targetId?: string;
  targetType?: string;
  questionNumber?: number;
  timestamp: number;
  metadata?: Record<string, any>;
};

// Tipo para dados de métricas agrupados
export type MetricsData = {
  funnelData: {
    stage: string;
    count: number;
    percentage: number;
  }[];
  abandonmentData: {
    questionNumber: number;
    count: number;
    percentage: number;
  }[];
  clicksData: {
    targetId: string;
    targetType: string;
    count: number;
  }[];
};

export interface EditorConfig {
  blocks: EditorBlock[];
  globalStyles: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
    accentColor?: string;
  };
  layout?: {
    spacing: string;
    containerWidth: string;
    borderRadius: string;
  };
}

export interface EditorBlock {
  id: string;
  type: 'header' | 'headline' | 'text' | 'image' | 'benefits' | 'pricing' | 'guarantee' | 
         'cta' | 'style-result' | 'secondary-styles' | 'hero-section' | 'products' | 
         'testimonials' | 'bonus-carousel' | 'spacer' | 'video' | 'two-column' | 'icon' |
         'faq' | 'carousel' | 'custom-code' | 'animation-block';
  content: EditableContent;
  order: number;
}

// Alias EditorBlock as Block for backward compatibility
export type Block = EditorBlock;

export interface EditableContent {
  // Header
  title?: string;
  subtitle?: string;
  logo?: string;
  logoAlt?: string;
  logoHeight?: number | string;
  logoWidth?: number | string;
  
  // Text
  text?: string;
  alignment?: 'left' | 'center' | 'right';
  textColor?: string;
  
  // Image
  imageUrl?: string;
  imageAlt?: string;
  width?: string;
  borderRadius?: string;
  
  // Benefits
  items?: string[];
  icon?: string;
  iconColor?: string;
  useIcons?: boolean;
  
  // Pricing
  regularPrice?: string;
  salePrice?: string;
  buttonText?: string;
  ctaUrl?: string;
  urgencyText?: string;
  checkoutUrl?: string;
  
  // Guarantee
  image?: string;
  
  // Hero Section
  heroImage?: string;
  heroImage2?: string;
  heroImageAlt?: string;
  quote?: string;
  quoteAuthor?: string;
  
  // Products
  images?: {
    url: string;
    alt: string;
    title?: string;
  }[];
  
  // Testimonials
  testimonialsImage?: string;
  
  // Bonus Carousel
  bonusImages?: {
    url: string;
    alt: string;
    title: string;
  }[];
  
  // Video
  videoUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoThumbnail?: string;
  videoAutoplay?: boolean;
  videoControls?: boolean;
  
  // Two-Column
  leftColumn?: {
    content?: string;
    width?: string;
    style?: any;
  };
  rightColumn?: {
    content?: string;
    width?: string;
    style?: any;
  };
  columnGap?: string;
  
  // Spacer
  height?: string;
  
  // Icon Block
  size?: string;
  color?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  
  // FAQ Block
  faqItems?: {
    question: string;
    answer: string;
  }[];
  defaultOpen?: boolean;
  
  // Carousel Block
  carouselImages?: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  
  // Custom Code Block
  code?: string;
  
  // Animation Block
  animationType?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out';
  animationDuration?: string;
  animationDelay?: string;
  animationTrigger?: 'onLoad' | 'onScroll' | 'onHover';
  children?: EditableContent;
  
  // General properties
  description?: string;
  url?: string;
  ctaText?: string;
  price?: string;
  customImage?: string;
  
  // Styling
  style?: {
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    lineHeight?: string;
    letterSpacing?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    boxShadow?: string;
    maxWidth?: string;
    type?: string;
    animation?: string;
    transition?: string;
    transform?: string;
    opacity?: string;
    overflow?: string;
    position?: string;
    zIndex?: string;
  };
}
