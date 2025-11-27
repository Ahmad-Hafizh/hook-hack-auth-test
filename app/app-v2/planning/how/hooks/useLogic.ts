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
