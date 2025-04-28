
import React from 'react';

interface SingleChoiceComponentProps {
  data: {
    question?: string;
    options?: Array<{
      text: string;
      value: string;
      imageUrl?: string;
    }>;
    selectedOption?: string;
    layout?: {
      columns: number;
      direction: 'horizontal' | 'vertical';
    };
  };
  style?: Record<string, any>;
  isEditing?: boolean;
  isSelected?: boolean;
}

const SingleChoiceComponent: React.FC<SingleChoiceComponentProps> = ({
  data,
  style,
  isEditing,
  isSelected
}) => {
  const options = data.options || [];
  const columns = data.layout?.columns || 1;
  const columnClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[columns] || 'grid-cols-1';

  return (
    <div className="py-4">
      {data.question && (
        <h3 className="text-lg font-medium mb-4">{data.question}</h3>
      )}
      <div className={`grid ${columnClass} gap-4`}>
        {options.map((option, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              data.selectedOption === option.value
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {option.imageUrl && (
              <div className="mb-2">
                <img
                  src={option.imageUrl}
                  alt={option.text}
                  className="w-full h-auto rounded object-cover"
                />
              </div>
            )}
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center border ${
                  data.selectedOption === option.value
                    ? 'border-primary bg-primary'
                    : 'border-gray-300'
                }`}
              >
                {data.selectedOption === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span>{option.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleChoiceComponent;
