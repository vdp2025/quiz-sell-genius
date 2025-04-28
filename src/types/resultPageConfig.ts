import { Block } from './editor';

export interface StyleOptions {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  width?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontFamily?: string;
}

export interface ImageOptions {
  url: string;
  alt: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export interface SectionContent {
  [key: string]: any;
  style?: StyleOptions;
  images?: ImageOptions[];
}

export interface OfferContent {
  title?: string;
  subtitle?: string;
  description?: string;
  price?: string;
  regularPrice?: string;
  installments?: string;
  ctaText?: string;
  ctaUrl?: string;
  urgencyText?: string;
  heroImage?: string;
  heroImage2?: string;
  table?: Array<{
    item: string;
    value: string;
  }>;
  productImages?: Array<{
    url: string;
    alt: string;
  }>;
  items?: Array<{
    title: string;
    description: string;
  }>;
  testimonials?: Array<{
    name: string;
    role: string;
    text: string;
  }>;
  image?: string;
  [key: string]: any;
}

export interface Section {
  visible: boolean;
  content: SectionContent;
  appearance?: Record<string, any>;
  style?: StyleOptions;
}

export interface OfferSection {
  hero: {
    visible: boolean;
    content: OfferContent;
    appearance?: Record<string, any>;
    style?: StyleOptions;
  };
  benefits: Section;
  products: Section;
  pricing: Section;
  testimonials: Section;
  guarantee: Section;
}

export interface MentorSection {
  visible: boolean;
  content: {
    title?: string;
    name?: string;
    image?: string;
    beforeAfterImage?: string;
    stylesImage?: string;
    bio?: string[];
  };
  style?: StyleOptions;
}

export interface ResultPageConfig {
  styleType: string;
  header: Section;
  mainContent: Section;
  secondaryStyles?: Section;
  offer: OfferSection;
  mentor?: MentorSection;
  globalStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
  blocks?: Block[];
}

export interface ResultPageConfigsStore {
  configs: Record<string, ResultPageConfig>;
}
