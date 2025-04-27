
import React from 'react';
import { cn } from '@/lib/utils';

interface BenefitItem {
  title: string;
  description?: string;
  icon?: string;
}

interface BenefitsListComponentProps {
  data: {
    title?: string;
    benefits?: BenefitItem[];
  };
  style: any;
  isEditing?: boolean;
  isSelected?: boolean;
}

const BenefitsListComponent: React.FC<BenefitsListComponentProps> = ({
  data,
  style,
  isEditing = false,
  isSelected = false,
}) => {
  const benefits = data.benefits || [
    { title: 'Benefício 1', description: 'Descrição do benefício 1' },
    { title: 'Benefício 2', description: 'Descrição do benefício 2' },
    { title: 'Benefício 3', description: 'Descrição do benefício 3' },
  ];

  return (
    <div className={cn(
      'space-y-4',
      isEditing && 'cursor-pointer',
      isSelected && 'ring-2 ring-blue-500'
    )}>
      {data.title && (
        <h3 className="text-xl font-semibold text-center mb-6">{data.title}</h3>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <h4 className="text-lg font-medium mb-2">{benefit.title}</h4>
            {benefit.description && (
              <p className="text-gray-600">{benefit.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsListComponent;
