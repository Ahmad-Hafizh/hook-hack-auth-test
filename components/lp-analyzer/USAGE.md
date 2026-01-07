# LP Analyzer Components

Reusable React components extracted from HTML mockups (files 62-65) for the LP Analyzer feature.

## Component Structure

### 1. Competitive Matrix Components (`CompetitiveMatrixCard.tsx`)

From file 62 - 競合マトリクス

**Components:**

- `FeatureToggleGroup` - Toggle buttons for function/emotion and process/result
- `FeatureField` - Editable field with label, icon, and optional toggle
- `CompetitiveCard` - Full competitive analysis card (own LP, AI summary, or competitor)
- `CompetitorDetailColumn` - Read-only competitor detail column

**Usage:**

```tsx
import { CompetitiveCard } from "@/components/lp-analyzer";

<CompetitiveCard
  type="own"
  title="自社LP"
  badge={{
    text: "Target",
    bgColor: "bg-primary/10",
    textColor: "text-primary",
  }}
  headerColor="bg-primary"
  features={{
    keyMessage: "業界No.1の精度で...",
    feature1: "AIによる自動分析機能",
    feature2: "直感的な操作性",
    feature3: "24時間サポート体制",
    cta: "無料デモを予約する",
  }}
  onChange={(field, value) => console.log(field, value)}
/>;
```

### 2. Value Organization Components (`ValueOrganizationCard.tsx`)

From file 63 - 価値の整理

**Components:**

- `ValueItem` - Single value item with checkbox, input, and reason
- `ValueCategoryCard` - Category card containing multiple value items
- `ValueOrganizationGrid` - Grid layout for all categories (人/情報/モノ/バイブス)

**Usage:**

```tsx
import { ValueOrganizationGrid } from "@/components/lp-analyzer";

<ValueOrganizationGrid
  categories={[
    {
      id: "people",
      title: "人",
      items: [
        {
          id: "p1",
          value: "ターゲット層の拡大案",
          reason: "既存顧客の分析データより",
          isChecked: false,
        },
      ],
    },
  ]}
  onItemChange={(categoryId, itemId, field, value) => {
    // Handle changes
  }}
/>;
```

### 3. Value Desire Mapping Components (`ValueDesireCard.tsx`)

From file 64 - 価値に対応する欲求の整理

**Components:**

- `DesireItem` - Desire item with priority badge, TOBE fields
- `ValueDesireCard` - Card showing value header and multiple desires

**Usage:**

```tsx
import { ValueDesireCard } from "@/components/lp-analyzer";

<ValueDesireCard
  valueId="V01"
  valueCategory="情報"
  valueTitle="迷わない判断軸"
  desires={[
    {
      id: "d1",
      priority: 1,
      desire: "正しい選択をしたい",
      reason: "失敗したくない心理から",
      isChecked: true,
      tobe: {
        oldPremise: "複雑で何が良いかわからない",
        newPremise: "明確な比較基準が示される",
        judgment: "これなら間違いないと確信",
        action: "自信を持って購入",
      },
    },
  ]}
  onDesireChange={(desireId, field, value) => {
    // Handle changes
  }}
/>;
```

### 4. Positioning Pattern Components (`PositioningPatternCard.tsx`)

From file 65 - ポジショニング骨子

**Components:**

- `PositioningPatternCard` - Selectable pattern card with promise and values
- `PositioningPatternGrid` - Grid of all pattern cards (A/B/C)

**Usage:**

```tsx
import { PositioningPatternGrid } from "@/components/lp-analyzer";

<PositioningPatternGrid
  patterns={[
    {
      pattern: "A",
      isSelected: true,
      promise: "「3クリックで完了する、世界一シンプルな分析体験」",
      functionalValues: [
        { label: "機能 × 結果", value: "作業時間を90%削減..." },
        { label: "機能 × プロセス", value: "AIによる完全自動化..." },
      ],
      emotionalValues: [
        { label: "情緒 × 結果", value: "締め切りに追われる..." },
        { label: "情緒 × プロセス", value: "サクサク進む..." },
      ],
    },
  ]}
  onPatternSelect={(pattern) => console.log(pattern)}
  onPatternChange={(pattern, field, value) => {
    // Handle changes
  }}
/>;
```

### 5. Common Components (`CommonComponents.tsx`)

**Components:**

- `PageHeader` - Page title, description, and legend
- `NavigationButtons` - Back and Next navigation buttons

**Usage:**

```tsx
import { PageHeader, NavigationButtons } from '@/components/lp-analyzer';

<PageHeader
  title="競合マトリクス"
  description="AI分析による競合3社の統合サマリーと..."
  legend={[
    { color: "bg-primary", label: "編集可能エリア" },
    { color: "bg-indigo-500", label: "AI自動生成 (編集可)" }
  ]}
/>

<NavigationButtons
  onBack={() => router.back()}
  onNext={() => router.push('/next')}
/>
```

## Styling

All components use Tailwind CSS with custom color variables:

- `primary` - #0093b4
- `text-main` - #1e293b
- `text-muted` - #64748b
- `border-light` - #e2e8f0
- `surface-subtle` - #f8fafc

Make sure these are defined in your `tailwind.config.ts`.

## Material Symbols

Components use Material Symbols icons. Include in your layout:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
  rel="stylesheet"
/>
```

## TypeScript

All components are fully typed with TypeScript interfaces for props and data structures.
