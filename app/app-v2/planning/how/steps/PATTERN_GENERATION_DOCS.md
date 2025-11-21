# Pattern Generation Algorithm Documentation

## Overview

This document explains how the pattern combination algorithm works in `step3.tsx`. The algorithm generates all possible combinations of selected options across 8 different categories to create unique ad pattern variations.

---

## Core Concepts

### 1. Cartesian Product

The algorithm uses a **Cartesian Product** approach to generate all possible combinations. The Cartesian Product of multiple sets creates a new set where each element is a combination of one element from each input set.

**Mathematical Example:**

```
Set A = {1, 2}
Set B = {a, b}
Cartesian Product (A × B) = {(1, a), (1, b), (2, a), (2, b)}
```

In our case, we have 8 categories (sets), and we want to find all possible combinations.

---

## The Code Breakdown

### Function: `generateCombinations`

```typescript
const generateCombinations = (arrays: string[][]): string[][] => {
  // Base case: if no arrays, return empty combination
  if (arrays.length === 0) return [[]];

  // Split arrays into first and rest
  const [first, ...rest] = arrays;

  // Recursively get combinations of remaining arrays
  const restCombinations = generateCombinations(rest);

  // Build all combinations
  const combinations: string[][] = [];
  for (const item of first) {
    for (const restCombo of restCombinations) {
      combinations.push([item, ...restCombo]);
    }
  }

  return combinations;
};
```

#### Step-by-Step Explanation:

**1. Base Case**

```typescript
if (arrays.length === 0) return [[]];
```

- When there are no more arrays to process, return an array containing one empty array
- This serves as the starting point for building combinations

**2. Destructuring**

```typescript
const [first, ...rest] = arrays;
```

- Takes the first array and separates it from the rest
- Example: If `arrays = [['A', 'B'], ['1', '2'], ['X', 'Y']]`
  - `first = ['A', 'B']`
  - `rest = [['1', '2'], ['X', 'Y']]`

**3. Recursive Call**

```typescript
const restCombinations = generateCombinations(rest);
```

- Recursively generates combinations of all remaining arrays
- Continues until it hits the base case

**4. Building Combinations**

```typescript
for (const item of first) {
  for (const restCombo of restCombinations) {
    combinations.push([item, ...restCombo]);
  }
}
```

- For each item in the first array, pair it with every combination from the rest
- Uses nested loops to create the Cartesian Product

---

## Visual Example

### Input:

```javascript
[
  ['hook-1', 'hook-2'], // Hooks
  ['img-1'], // Body 1 Images
  ['msg-1', 'msg-2'], // Body 1 Messages
];
```

### Execution Flow:

**Call 1:** `generateCombinations([['hook-1', 'hook-2'], ['img-1'], ['msg-1', 'msg-2']])`

- `first = ['hook-1', 'hook-2']`
- `rest = [['img-1'], ['msg-1', 'msg-2']]`
- Calls: `generateCombinations([['img-1'], ['msg-1', 'msg-2']])`

**Call 2:** `generateCombinations([['img-1'], ['msg-1', 'msg-2']])`

- `first = ['img-1']`
- `rest = [['msg-1', 'msg-2']]`
- Calls: `generateCombinations([['msg-1', 'msg-2']])`

**Call 3:** `generateCombinations([['msg-1', 'msg-2']])`

- `first = ['msg-1', 'msg-2']`
- `rest = []`
- Calls: `generateCombinations([])`

**Call 4 (Base Case):** `generateCombinations([])`

- Returns: `[[]]`

**Back to Call 3:**

- `restCombinations = [[]]`
- Builds:
  ```javascript
  [['msg-1'], ['msg-2']];
  ```

**Back to Call 2:**

- `restCombinations = [['msg-1'], ['msg-2']]`
- Builds:
  ```javascript
  [
    ['img-1', 'msg-1'],
    ['img-1', 'msg-2'],
  ];
  ```

**Back to Call 1:**

- `restCombinations = [['img-1', 'msg-1'], ['img-1', 'msg-2']]`
- Builds:
  ```javascript
  [
    ['hook-1', 'img-1', 'msg-1'],
    ['hook-1', 'img-1', 'msg-2'],
    ['hook-2', 'img-1', 'msg-1'],
    ['hook-2', 'img-1', 'msg-2'],
  ];
  ```

### Final Output:

```javascript
[
  ['hook-1', 'img-1', 'msg-1'],
  ['hook-1', 'img-1', 'msg-2'],
  ['hook-2', 'img-1', 'msg-1'],
  ['hook-2', 'img-1', 'msg-2'],
];
```

**Result:** 4 unique pattern combinations!

---

## The `calculatePatterns` Function

```typescript
React.useEffect(() => {
  const calculatePatterns = () => {
    // Prepare arrays, use placeholder if empty
    const categories = [
      hooks.length > 0 ? hooks : ['default-hook'],
      body1Images.length > 0 ? body1Images : ['default-body1-image'],
      body1Messages.length > 0 ? body1Messages : ['default-body1-message'],
      body2Images.length > 0 ? body2Images : ['default-body2-image'],
      body2Messages.length > 0 ? body2Messages : ['default-body2-message'],
      body3Images.length > 0 ? body3Images : ['default-body3-image'],
      body3Messages.length > 0 ? body3Messages : ['default-body3-message'],
      ctas.length > 0 ? ctas : ['default-cta'],
    ];

    // Generate all combinations
    const combinations = generateCombinations(categories);

    setPatternCombinations(combinations);
    setPatternCount(combinations.length);
  };

  calculatePatterns();
}, [hooks, body1Images, body1Messages, body2Images, body2Messages, body3Images, body3Messages, ctas]);
```

### What It Does:

1. **Prepares Categories**
   - Creates an array of 8 category arrays
   - If a category is empty, uses a default placeholder
   - This ensures we always have at least 1 option per category

2. **Generates Combinations**
   - Calls `generateCombinations` with all 8 categories
   - Returns an array of all possible combinations

3. **Updates State**
   - `setPatternCombinations`: Stores all pattern combinations
   - `setPatternCount`: Updates the count displayed to the user

4. **Reactivity**
   - Runs automatically whenever any category selection changes
   - Thanks to the `useEffect` dependency array

---

## Pattern Count Calculation

The total number of patterns is calculated by multiplying the number of options in each category:

```
Pattern Count = (Hooks) × (Body1 Images) × (Body1 Messages) × (Body2 Images) × (Body2 Messages) × (Body3 Images) × (Body3 Messages) × (CTAs)
```

### Example:

```
Hooks: 2 selected
Body 1 Images: 1 selected
Body 1 Messages: 3 selected
Body 2 Images: 1 selected
Body 2 Messages: 2 selected
Body 3 Images: 1 selected
Body 3 Messages: 1 selected
CTAs: 2 selected

Total Patterns = 2 × 1 × 3 × 1 × 2 × 1 × 1 × 2 = 24 patterns
```

---

## Real-World Example

### User Selections:

```javascript
hooks = ['hook-option-1', 'hook-option-2'];
body1Images = ['body1-image-1'];
body1Messages = ['body1-message-1', 'body1-message-2'];
body2Images = ['body2-image-1'];
body2Messages = ['body2-message-1'];
body3Images = ['body3-image-1'];
body3Messages = ['body3-message-1'];
ctas = ['cta-1'];
```

### Generated Combinations:

```javascript
[
  ['hook-option-1', 'body1-image-1', 'body1-message-1', 'body2-image-1', 'body2-message-1', 'body3-image-1', 'body3-message-1', 'cta-1'],
  ['hook-option-1', 'body1-image-1', 'body1-message-2', 'body2-image-1', 'body2-message-1', 'body3-image-1', 'body3-message-1', 'cta-1'],
  ['hook-option-2', 'body1-image-1', 'body1-message-1', 'body2-image-1', 'body2-message-1', 'body3-image-1', 'body3-message-1', 'cta-1'],
  ['hook-option-2', 'body1-image-1', 'body1-message-2', 'body2-image-1', 'body2-message-1', 'body3-image-1', 'body3-message-1', 'cta-1'],
];
```

**Total:** 4 unique patterns (2 hooks × 2 messages = 4)

---

## Array Structure

Each pattern combination is an array with 8 elements in this order:

| Index | Category       | Example Value     |
| ----- | -------------- | ----------------- |
| 0     | Hook           | 'hook-option-1'   |
| 1     | Body 1 Image   | 'body1-image-1'   |
| 2     | Body 1 Message | 'body1-message-1' |
| 3     | Body 2 Image   | 'body2-image-1'   |
| 4     | Body 2 Message | 'body2-message-1' |
| 5     | Body 3 Image   | 'body3-image-1'   |
| 6     | Body 3 Message | 'body3-message-1' |
| 7     | CTA            | 'cta-1'           |

---

## Performance Considerations

### Time Complexity

- **O(n₁ × n₂ × n₃ × ... × n₈)** where nᵢ is the number of selections in category i
- Grows exponentially with selections

### Space Complexity

- **O(total combinations × 8)** for storing all combinations
- Each combination stores 8 string references

### Example Growth:

```
1 option each:  1 × 1 × 1 × 1 × 1 × 1 × 1 × 1 = 1 pattern
2 options each: 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 256 patterns
3 options each: 3 × 3 × 3 × 3 × 3 × 3 × 3 × 3 = 6,561 patterns
5 options each: 5 × 5 × 5 × 5 × 5 × 5 × 5 × 5 = 390,625 patterns
```

### Recommendations:

- **Limit selections** to avoid generating millions of combinations
- Consider **lazy generation** for large datasets
- Implement **pagination** if displaying combinations to users
- Add **maximum limit** warnings in the UI

---

## Usage in Code

```typescript
// Access the pattern count
console.log(`Total Patterns: ${patternCount}`);

// Access all combinations
console.log('All Patterns:', patternCombinations);

// Access a specific pattern
const firstPattern = patternCombinations[0];
console.log('First Pattern:', firstPattern);

// Iterate through all patterns
patternCombinations.forEach((pattern, index) => {
  console.log(`Pattern ${index + 1}:`, pattern);
});

// Filter patterns (example: find patterns with specific hook)
const patternsWithHook1 = patternCombinations.filter((pattern) => pattern[0] === 'hook-option-1');
```

---

## Summary

The pattern generation algorithm:

1. Takes 8 categories of user-selected options
2. Uses **recursive Cartesian Product** to generate all combinations
3. Returns an **array of arrays**, where each sub-array represents one unique pattern
4. Updates automatically when selections change via React's `useEffect`
5. Provides both the **count** and **full list** of combinations

This approach ensures every possible variation of the selected options is generated for A/B testing purposes.
