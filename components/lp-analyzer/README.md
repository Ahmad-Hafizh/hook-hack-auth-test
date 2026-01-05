# LP Analyzer Components

A collection of reusable React components for building multi-step LP (Landing Page) analyzer forms. These components are designed to be modular, accessible, and easy to integrate into any React/Next.js application.

## 📦 Components Overview

### Base UI Components

#### Button

A flexible button component with multiple variants and sizes.

```tsx
import { Button, Icon } from '@/components/lp-analyzer';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>

<Button
  variant="secondary"
  icon={<Icon name="arrow_forward" />}
  iconPosition="right"
>
  Next
</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: React.ReactNode
- `iconPosition`: 'left' | 'right'

#### Icon

Material Symbols icon wrapper.

```tsx
<Icon name="search" size="xl" className="text-primary" />
```

#### Card

Container component with variants and padding options.

```tsx
<Card variant="elevated" padding="md">
  <h2>Card Content</h2>
</Card>
```

#### PageHeader

Page title and description component.

```tsx
<PageHeader title="Page Title" description="Optional description text" />
```

#### NavigationButtons

Reusable back/next navigation buttons.

```tsx
<NavigationButtons
  onBack={handleBack}
  onNext={handleNext}
  nextLabel="次へ進む"
  backLabel="戻る"
  isNextDisabled={!isValid}
/>
```

### Form Components

#### RadioCard

Large, visual radio button card for selecting options.

```tsx
<RadioCard
  name="research_method"
  value="search"
  icon="search"
  title="競合他社の調査を始める"
  description="キーワードや業界から、リサーチすべき競合LPを探します。"
  checked={selected === "search"}
  onChange={handleChange}
/>
```

#### URLInput

URL input field with validation and icon.

```tsx
<URLInput
  id="lp-url"
  label="あなたのプロダクトやサービスのLPのurlを入力してください"
  placeholder="https://example.com"
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  error={errorMessage}
/>
```

#### KeywordSelector

Multi-select keyword button grid.

```tsx
const keywords = [
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
  // ...
];

<KeywordSelector
  keywords={keywords}
  selectedKeywords={selected}
  onSelectionChange={setSelected}
  maxSelection={5}
  label="キーワードを選択してください"
/>;
```

#### VisualSelector

Image/visual selection component with checkboxes.

```tsx
const visuals = [
  { id: "1", imageUrl: "/image1.jpg", placeholder: "Visual 1" },
  { id: "2", imageUrl: "/image2.jpg", placeholder: "Visual 2" },
  // ...
];

<VisualSelector
  visuals={visuals}
  selectedVisuals={selected}
  onSelectionChange={setSelected}
  maxSelection={3}
  label="キービジュアルを選んでください"
  hasMore={true}
  onShowMore={loadMore}
/>;
```

### Step Components (Complete Pages)

#### CompetitorResearchStep

Complete page for selecting research method.

```tsx
<CompetitorResearchStep
  onBack={() => router.back()}
  onNext={(method) => handleMethodSelection(method)}
  initialValue="search"
/>
```

#### LPURLInputStep

Complete page for LP URL input.

```tsx
<LPURLInputStep
  onBack={() => router.back()}
  onNext={(url) => handleUrlSubmit(url)}
  initialValue=""
/>
```

#### KeywordSelectionStep

Complete page for keyword selection.

```tsx
const keywords = [
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
];

<KeywordSelectionStep
  keywords={keywords}
  onBack={() => router.back()}
  onNext={(selected) => handleKeywordsSubmit(selected)}
  initialSelected={[]}
  maxSelection={5}
/>;
```

#### VisualSelectionStep

Complete page for visual selection.

```tsx
const visuals = [
  { id: "1", imageUrl: "/image1.jpg" },
  { id: "2", imageUrl: "/image2.jpg" },
];

<VisualSelectionStep
  visuals={visuals}
  onBack={() => router.back()}
  onNext={(selected) => handleVisualsSubmit(selected)}
  onShowMore={loadMoreVisuals}
  initialSelected={[]}
  maxSelection={3}
  hasMore={true}
/>;
```

## 🎨 Theming

These components use Tailwind CSS with custom color tokens defined in the HTML files. To use these components, ensure your `tailwind.config.js` includes:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#0093b4",
        "primary-hover": "#007a92",
        "background-light": "#ffffff",
        "surface-light": "#ffffff",
        "surface-subtle": "#f8fafc",
        "border-light": "#e2e8f0",
        "text-main": "#1e293b",
        "text-muted": "#64748b",
        "background-dark": "#0f1f23",
        "accent-soft": "#e0f2f7",
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
};
```

## 📋 Requirements

- React 18+
- TypeScript
- Tailwind CSS
- Material Symbols Outlined font (for icons)
- Next.js (optional, for routing)

## 🚀 Installation

1. Copy the components to your project:

   ```
   components/lp-analyzer/
   ```

2. Install required dependencies:

   ```bash
   npm install tailwindcss clsx tailwind-merge
   ```

3. Add Material Symbols font to your layout:
   ```html
   <link
     href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
     rel="stylesheet"
   />
   ```

## 💡 Usage Example

See [EXAMPLE_USAGE.tsx](./EXAMPLE_USAGE.tsx) for a complete multi-step form implementation.

## 🎯 Features

- ✅ Fully typed with TypeScript
- ✅ Responsive design (mobile-first)
- ✅ Accessible (keyboard navigation, screen readers)
- ✅ Animated transitions
- ✅ Form validation
- ✅ Reusable and composable
- ✅ Easy to customize
- ✅ Japanese language support

## 📝 License

These components are part of the HookHack Frontend project.
