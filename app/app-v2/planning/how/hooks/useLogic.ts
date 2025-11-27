import { IVariants } from './useStepData';

export const reformValue = (value: string, col: number, row: number) => {
  const splittedArray: string[] = [];
  const splited = value.split('');
  splited.forEach((char, index) => {
    if (Math.floor(index / col) <= row) {
      splittedArray[Math.floor(index / col)] = (splittedArray[Math.floor(index / col)] || '') + char;
    }
  });
  const reform = splittedArray.join('\n');

  return reform;
};

export const replaceMessages = (message: string, setVariants: React.Dispatch<React.SetStateAction<IVariants>>, index: number, variantKey: keyof IVariants, variantElement: any) => {
  setTimeout(() => {
    setVariants((prev: IVariants) => {
      const newHooks = [...(variantElement || [])];
      newHooks[index] = message;
      return { ...prev, [variantKey]: newHooks };
    });
  }, 500);
};
