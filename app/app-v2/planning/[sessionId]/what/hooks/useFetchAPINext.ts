import callApi from '@/config/axios/axios';
import { IKeyVisual } from './useStepData';

export const submitStep1Scratch = async ({ sessionId, url, onSetKeywords, onNext, setLoading }: { sessionId: string; url: string; onSetKeywords: (keywords: any) => void; onNext: () => void; setLoading: (loading: boolean) => void }) => {
  setLoading(true);
  try {
    const { data } = await callApi.post('/app-v2/planning/what/step1', {
      product: url,
      sessionId,
    });

    onSetKeywords(data.keywords);
    onNext();
  } catch (error) {
    console.error('Error submitting Step 1:', error);
  } finally {
    setLoading(false);
  }
};

export const submitStep2Scratch = async ({
  selectedKeywords,
  onNext,
  setLoading,
  sessionId,
  onSetKeyVisuals,
}: {
  selectedKeywords: string;
  onNext: () => void;
  setLoading: (loading: boolean) => void;
  sessionId: string;
  onSetKeyVisuals: (visuals: any[]) => void;
}) => {
  setLoading(true);
  try {
    const { data } = await callApi.post('/app-v2/planning/what/step2', {
      keywords: [selectedKeywords],
      sessionId,
    });

    onSetKeyVisuals(data.key_visuals);
    onNext();
  } catch (error) {
    console.error('Error submitting Step 2:', error);
  } finally {
    setLoading(false);
  }
};

export const getMoreVisuals = async ({
  setLoadingGenerate,
  onSetKeyVisuals,
  keyVisuals,
  sessionId,
}: {
  setLoadingGenerate: (loading: boolean) => void;
  onSetKeyVisuals: (visuals: any[]) => void;
  keyVisuals: IKeyVisual[];
  sessionId: string;
}) => {
  setLoadingGenerate(true);
  try {
    const exclude_domains = keyVisuals.map((w) => w.url);
    const { data } = await callApi.post('/app-v2/planning/what/step3/generate', {
      exclude_domains,
      sessionId,
    });

    onSetKeyVisuals([...keyVisuals, ...data.key_visuals]);
  } catch (error) {
    console.error('Error submitting get additional key visuals:', error);
  } finally {
    setLoadingGenerate(false);
  }
};

export const submitStep3 = async ({
  selectedVisuals,
  keyVisuals,
  setBriefPlanning,
  onNext,
  setLoadingSubmit,
  sessionId,
}: {
  selectedVisuals: string[];
  keyVisuals: any[];
  setBriefPlanning: (briefPlanning: any) => void;
  onNext: () => void;
  setLoadingSubmit: (loading: boolean) => void;
  sessionId: string;
}) => {
  setLoadingSubmit(true);
  try {
    const selectedVisualsData = keyVisuals.filter((keyVisual) => selectedVisuals.includes(keyVisual.url));
    const competitors = selectedVisualsData.map((visual) => {
      return {
        url: visual.url,
        title: visual.title,
        meta_description: visual.meta_description,
        hero_text: {
          headline: 'string',
          subhead: 'string',
          cta: 'string',
        },
      };
    });

    const { data } = await callApi.post('/app-v2/planning/what/step3', {
      competitors,
      sessionId,
    });

    setBriefPlanning({
      user: data.key_message.user ? data.key_message.user : { key_message: '', strong_points: [] },
      competitors: data.key_message.competitors,
      suggestion: data.key_message.suggestion,
    });
    onNext();
  } catch (error) {
    console.error('Error submitting Step 3:', error);
  } finally {
    setLoadingSubmit(false);
  }
};

export const submitStep4 = async ({ keyMessage, strongPoints, onNext, setLoading, sessionId }: { keyMessage: string; strongPoints: string[]; onNext: () => void; setLoading: (loading: boolean) => void; sessionId: string }) => {
  setLoading(true);
  try {
    await callApi.post('/app-v2/planning/what/step4', {
      key_message: keyMessage,
      strong_points: strongPoints,
      sessionId,
    });
    onNext();
  } catch (error) {
    console.error('Error submitting Step 4:', error);
  } finally {
    setLoading(false);
  }
};
