
import React from 'react';

interface BenefitsListComponentProps {
  data: {
    title?: string;
    benefits?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  style?: Record<string, any>;
  isEditing?: boolean;
  isSelected?: boolean;
}

const BenefitsListComponent: React.FC<BenefitsListComponentProps> = ({
  data,
  style,
  isEditing,
  isSelected
}) => {
  const benefits = data.benefits || [];

  return (
    <div className="py-6">
      {data.title && <h3 className="text-xl font-semibold mb-4">{data.title}</h3>}
      <ul className="space-y-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex gap-3">
            <div className="flex-shrink-0 h-6 w-6 text-teal-600">
              {benefit.icon ? (
                <span aria-hidden="true">{benefit.icon}</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div>
              <h4 className="font-medium">{benefit.title}</h4>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitsListComponent;
