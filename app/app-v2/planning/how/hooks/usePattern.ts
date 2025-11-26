import { IElements, IPattern } from './useStepData';

// Optimized iterative Cartesian product
const generateCombinations = (arrays: string[][]): string[][] => {
  if (arrays.length === 0) return [[]];

  let result: string[][] = [[]];

  for (const array of arrays) {
    const temp: string[][] = [];
    for (const resultItem of result) {
      for (const item of array) {
        temp.push([...resultItem, item]);
      }
    }
    result = temp;
  }

  return result;
};

// Calculate total pattern count only (lightweight, runs on every change)
export const calculatePatternCount = (elements: IElements): number => {
  const { hooks, body1Images, body1Messages, body2Images, body2Messages, body3Images, body3Messages, ctas } = elements;

  // Quick check if all categories are empty
  const hasSelections = hooks.length || body1Images.length || body1Messages.length || body2Images.length || body2Messages.length || body3Images.length || body3Messages.length || ctas.length;

  if (!hasSelections) {
    return 0;
  }

  // Calculate pattern count directly without generating combinations
  return (hooks.length || 1) * (body1Images.length || 1) * (body1Messages.length || 1) * (body2Images.length || 1) * (body2Messages.length || 1) * (body3Images.length || 1) * (body3Messages.length || 1) * (ctas.length || 1);
};

// Generate actual pattern combinations (heavy, only call on submit/next)
export const generatePatternCombinations = (elements: IElements): IPattern[] => {
  const { hooks, body1Images, body1Messages, body2Images, body2Messages, body3Images, body3Messages, ctas } = elements;

  // Quick check if all categories are empty
  const hasSelections = hooks.length || body1Images.length || body1Messages.length || body2Images.length || body2Messages.length || body3Images.length || body3Messages.length || ctas.length;

  if (!hasSelections) {
    return [];
  }

  // Prepare arrays with defaults inline
  const categories = [
    hooks.length > 0 ? hooks : ['default-hooks'],
    body1Images.length > 0 ? body1Images : ['default-body1Images'],
    body1Messages.length > 0 ? body1Messages : ['default-body1Messages'],
    body2Images.length > 0 ? body2Images : ['default-body2Images'],
    body2Messages.length > 0 ? body2Messages : ['default-body2Messages'],
    body3Images.length > 0 ? body3Images : ['default-body3Images'],
    body3Messages.length > 0 ? body3Messages : ['default-body3Messages'],
    ctas.length > 0 ? ctas : ['default-ctas'],
  ];

  const stringCombinations = generateCombinations(categories);

  // Map to IPattern objects
  return stringCombinations.map((combination) => ({
    hook: combination[0],
    strong_point_1: combination[2],
    strong_point_2: combination[4],
    strong_point_3: combination[6],
    cta: combination[7],
    images: {
      strong_point_1: combination[1],
      strong_point_2: combination[3],
      strong_point_3: combination[5],
      logo: 'https://example.com/',
    },
  }));
};

export const calculateValuePattern = (elements: IElements, category: keyof IElements, newValue: string[]): number => {
  // Get the count for the updated category
  const getValue = (key: keyof IElements) => (key === category ? newValue.length : elements[key].length);

  // Quick check if all categories would be empty
  if (
    !newValue.length &&
    !elements.hooks.length &&
    !elements.body1Images.length &&
    !elements.body1Messages.length &&
    !elements.body2Images.length &&
    !elements.body2Messages.length &&
    !elements.body3Images.length &&
    !elements.body3Messages.length &&
    !elements.ctas.length
  ) {
    return 0;
  }

  // Calculate pattern count directly without temporary arrays
  return (
    (getValue('hooks') || 1) *
    (getValue('body1Images') || 1) *
    (getValue('body1Messages') || 1) *
    (getValue('body2Images') || 1) *
    (getValue('body2Messages') || 1) *
    (getValue('body3Images') || 1) *
    (getValue('body3Messages') || 1) *
    (getValue('ctas') || 1)
  );
};
