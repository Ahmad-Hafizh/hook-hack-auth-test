import React from "react";

interface ValueItemProps {
  value: string;
  reason: string;
  isChecked: boolean;
  onValueChange?: (value: string) => void;
  onReasonChange?: (value: string) => void;
  onCheckChange?: (checked: boolean) => void;
}

export const ValueItem: React.FC<ValueItemProps> = ({
  value,
  reason,
  isChecked,
  onValueChange,
  onReasonChange,
  onCheckChange,
}) => (
  <div className="group">
    <div className="flex items-center gap-3 mb-2">
      <input
        className="mt-0.5"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onCheckChange?.(e.target.checked)}
      />
      <input
        className="flex-1 border border-border-light rounded px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        placeholder="案を入力"
        type="text"
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
      />
    </div>
    <div className="flex items-center gap-3 pl-8">
      <span className="text-xs text-text-muted whitespace-nowrap">根拠 :</span>
      <input
        className="flex-1 border-b border-border-light bg-transparent px-2 py-1 text-xs text-text-muted focus:border-primary focus:text-text-main outline-none transition-colors"
        placeholder="根拠を入力"
        type="text"
        value={reason}
        onChange={(e) => onReasonChange?.(e.target.value)}
      />
    </div>
  </div>
);

interface ValueCategoryCardProps {
  title: string;
  items: Array<{
    id: string;
    value: string;
    reason: string;
    isChecked: boolean;
  }>;
  onItemChange?: (
    id: string,
    field: "value" | "reason" | "checked",
    newValue: string | boolean
  ) => void;
}

export const ValueCategoryCard: React.FC<ValueCategoryCardProps> = ({
  title,
  items,
  onItemChange,
}) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-xl font-bold text-text-main border-b border-border-light pb-2">
      {title}
    </h2>
    <div className="flex flex-col gap-5">
      {items.map((item) => (
        <ValueItem
          key={item.id}
          value={item.value}
          reason={item.reason}
          isChecked={item.isChecked}
          onValueChange={(value) => onItemChange?.(item.id, "value", value)}
          onReasonChange={(reason) => onItemChange?.(item.id, "reason", reason)}
          onCheckChange={(checked) =>
            onItemChange?.(item.id, "checked", checked)
          }
        />
      ))}
    </div>
  </div>
);

interface ValueOrganizationGridProps {
  categories: Array<{
    id: string;
    title: string;
    items: Array<{
      id: string;
      value: string;
      reason: string;
      isChecked: boolean;
    }>;
  }>;
  onItemChange?: (
    categoryId: string,
    itemId: string,
    field: "value" | "reason" | "checked",
    newValue: string | boolean
  ) => void;
}

export const ValueOrganizationGrid: React.FC<ValueOrganizationGridProps> = ({
  categories,
  onItemChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 w-full p-4 md:p-6">
    {categories.map((category) => (
      <ValueCategoryCard
        key={category.id}
        title={category.title}
        items={category.items}
        onItemChange={(itemId, field, value) =>
          onItemChange?.(category.id, itemId, field, value)
        }
      />
    ))}
  </div>
);
