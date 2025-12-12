'use client';
import { Spinner } from '@/components/ui/spinner';
import callApi from '@/config/axios/axios';
import { useParams } from 'next/navigation';
import React from 'react';
import { useState, useEffect } from 'react';

const PlannningWhatContext = React.createContext({
  step: 1,
  onStep: (step: number) => {},
  page: 'scratch' as 'scratch' | 'skip',
  onChangePage: (page: string) => {},
});

export default function PlannningWhatContextProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [page, setPage] = useState<'scratch' | 'skip'>('scratch');
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(true);

  const getPage = async () => {
    setLoading(true);
    try {
      const { data } = await callApi.get(`/app-v2/planning/what?sessionId=${sessionId}`);
      if (data.page) {
        setPage(data.page.split('_')[1] as 'scratch' | 'skip');
      }
      if (data.step) {
        setStep(data.step);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPage();
  }, [sessionId]);

  const onChangePage = (newPage: string) => {
    const typedPage = newPage as 'scratch' | 'skip';
    setPage(typedPage);
  };

  // Reset to step 1 when page changes
  useEffect(() => {
    setStep(1);
  }, [page]);

  // onStep with bounds checking
  const onStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= (page == 'scratch' ? 4 : page == 'skip' ? 2 : 0)) {
      setStep(newStep);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full gap-4">
        <Spinner />
        Loading...
      </div>
    );
  }

  return <PlannningWhatContext.Provider value={{ step, onStep, page, onChangePage }}>{children}</PlannningWhatContext.Provider>;
}

export function usePlannningWhatContext() {
  return React.useContext(PlannningWhatContext);
}
