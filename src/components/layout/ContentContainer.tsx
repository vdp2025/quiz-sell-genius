
import React, { ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
  maxWidth?: string;
  className?: string;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({ 
  children, 
  maxWidth = "max-w-5xl", 
  className = "" 
}) => {
  return (
    <div className={`w-full mx-auto px-4 sm:px-6 ${maxWidth} ${className}`}>
      {children}
    </div>
  );
};
