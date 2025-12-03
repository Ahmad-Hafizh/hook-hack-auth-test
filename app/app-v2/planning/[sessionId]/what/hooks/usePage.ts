import { useState } from 'react';

export const usePage = () => {
  const [page, setPage] = useState<'scratch' | 'skip'>('scratch');

  const onChangePage = (newPage: string) => {
    const typedPage = newPage as 'scratch' | 'skip';
    setPage(typedPage);
  };

  return { page, onChangePage };
};
