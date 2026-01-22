import { IValueOrganization } from "@/app/app-v2/planning/[sessionId]/what/hooks/planningWhatDataContext";
import React from "react";

interface ValueItemProps {
  label: string;
  rationale: string;
  isChecked: boolean;
  onValueChange: (value: string) => void;
  onCheckChange: (checked: boolean) => void;
}

export const ValueItem: React.FC<ValueItemProps> = ({
  label,
  rationale,
  isChecked,
  onValueChange,
  onCheckChange,
}) => (
  <div className="group">
    <div className="flex items-center gap-3 mb-2">
      <input
        className="mt-0.5"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onCheckChange(e.target.checked)}
      />
      <input
        className="flex-1 border border-border-light rounded px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        placeholder="案を入力"
        type="text"
        defaultValue={label}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
    <div className="flex items-center gap-3 pl-8">
      <span className="text-xs text-text-muted whitespace-nowrap">根拠 :</span>
      <input
        className="flex-1 border border-border-light bg-transparent px-2 py-1 text-xs text-text-muted focus:border-primary focus:text-text-main outline-none transition-colors rounded"
        placeholder="根拠を入力"
        type="text"
        value={rationale}
        disabled
      />
    </div>
  </div>
);

interface ValueCategoryCardProps {
  title: string;
  items: Array<IValueOrganization>;
  onCheckChange: (id: string, checked: boolean) => void;
  onValueChange: (id: string, value: string) => void;
  selectedIds: string[];
}

export const ValueCategoryCard: React.FC<ValueCategoryCardProps> = ({
  title,
  items,
  onValueChange,
  onCheckChange,
  selectedIds,
}) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-xl font-bold text-text-main border-b border-border-light pb-2">
      {title}
    </h2>
    <div className="flex flex-col gap-5">
      {items.map((item) => (
        <ValueItem
          key={item.id}
          label={item.label}
          rationale={item.rationale}
          isChecked={selectedIds?.find((id) => id === item.id) ? true : false}
          onValueChange={(value) => onValueChange(item.id, value)}
          onCheckChange={(checked) => onCheckChange(item.id, checked)}
        />
      ))}
    </div>
  </div>
);

// interface ValueOrganizationGridProps {
//   categories: Array<{
//     id: string;
//     title: string;
//     items: Array<{
//       id: string;
//       label: string;
//       rationale: string;
//       isChecked: boolean;
//     }>;
//   }>;
//   onItemChange?: (
//     categoryId: string,
//     itemId: string,
//     field: "value" | "reason" | "checked",
//     newValue: string | boolean
//   ) => void;
// }

// export const ValueOrganizationGrid: React.FC<ValueOrganizationGridProps> = ({
//   categories,
//   onItemChange,
// }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 w-full p-4 md:p-6">
//     {categories.map((category) => (
//       <ValueCategoryCard
//         key={category.id}
//         title={category.title}
//         items={category.items}
//         onItemChange={(itemId, field, value) =>
//           onItemChange?.(category.id, itemId, field, value)
//         }
//       />
//     ))}
//   </div>
// );
