import { useState } from 'react';

export const usePage = () => {
  const [page, setPage] = useState<'switch' | 'scratch' | 'skip'>('switch');

  const onChangePage = (newPage: string) => {
    const typedPage = newPage as 'switch' | 'scratch' | 'skip';
    setPage(typedPage);
  };

  return { page, onChangePage };
};
