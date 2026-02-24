import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { reformValue } from '../hooks/useLogic';
import { Edit, Save } from 'lucide-react';
import { CustomCheckboxItem } from './customCheckbox';

const CustomEditMessage = ({ value, onVariantChange, index, title }: { value: string; onVariantChange: (value: string, index: number) => void; index: number; title: string }) => {
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="flex items-center space-x-2 w-full" key={index}>
      <CustomCheckboxItem id={`${title}-${index + 1}`} value={value} />
      <div className="relative">
        <Textarea ref={textRef} defaultValue={reformValue(value, 6, 6)} className="w-[180px] h-[120px] p-2 disabled:opacity-100 pr-8" disabled={!isEditing} />
        <div
          className="absolute top-2 right-2 border bg-white rounded-full shadow-md text-sm leading-none font-bold cursor-pointer flex items-center gap-1 hover:bg-gray-100 px-2 py-1 "
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing && textRef.current) {
              onVariantChange(textRef.current.value, index);
            }
          }}
        >
          {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
};

export default CustomEditMessage;
