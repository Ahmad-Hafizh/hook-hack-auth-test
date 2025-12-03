import callAppV2Api from '@/config/axios/axiosAppV2';
import { IWebsites } from './useStepData';
import callApi from '@/config/axios/axios';

// export const submitStep1Scratch = async ({ sessionId, url, onSetKeywords, onNext, setLoading }: { sessionId: string; url: string; onSetKeywords: (keywords: any) => void; onNext: () => void; setLoading: (loading: boolean) => void }) => {
//   setLoading(true);
//   try {
//     const { data } = await callApi.post('/app-v2/planning/what/step1', {
//       product: url,
//       sessionId,
//     });

//     onSetKeywords(data.keywords);
//     onNext();
//   } catch (error) {
//     console.error('Error submitting Step 1:', error);
//   } finally {
//     setLoading(false);
//   }
// };
export const submitStep1Scratch = async ({ url, onSetKeywords, onNext, setLoading }: { url: string; onSetKeywords: (keywords: any) => void; onNext: () => void; setLoading: (loading: boolean) => void }) => {
  setLoading(true);
  try {
    const { data } = await callAppV2Api.post('/v1/keywords', {
      text: url,
      provider: 'OpenAI',
      max_keywords: 12,
    });

    onSetKeywords(data.keywords);
    onNext();
  } catch (error) {
    console.error('Error submitting Step 1:', error);
  } finally {
    setLoading(false);
  }
};

export const submitStep2Scratch = async ({ selectedKeywords, onSetWebsites, onNext, setLoading }: { selectedKeywords: string; onSetWebsites: (websites: any[]) => void; onNext: () => void; setLoading: (loading: boolean) => void }) => {
  setLoading(true);
  try {
    const { data } = await callAppV2Api.post('/v1/websites', {
      keywords: [selectedKeywords],
      limit: 5,
    });

    onSetWebsites(data.websites);
    onNext();
  } catch (error) {
    console.error('Error submitting Step 2:', error);
  } finally {
    setLoading(false);
  }
};

export const submitStep3 = async ({
  selectedVisuals,
  keyVisuals,
  setBriefPlanning,
  onNext,
  setLoadingSubmit,
}: {
  selectedVisuals: string[];
  keyVisuals: any[];
  setBriefPlanning: (briefPlanning: any) => void;
  onNext: () => void;
  setLoadingSubmit: (loading: boolean) => void;
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
    const { data } = await callAppV2Api.post('/v1/key-message', {
      competitors,
      provider: 'openai',
      language: 'en',
      brand_hint: 'string',
      audience: 'string',
      tone: 'professional',
    });

    setBriefPlanning({
      user: data.user ? data.user : { key_message: '', strong_points: [] },
      competitors: data.competitors,
      suggestion: data.suggestion,
    });
    onNext();
  } catch (error) {
    console.error('Error submitting Step 3:', error);
  } finally {
    setLoadingSubmit(false);
  }
};

export const get5MoreVisuals = async ({
  selectedKeywords,
  websites,
  onSetWebsites,
  setLoadingGenerate,
}: {
  selectedKeywords: string;
  websites: IWebsites[];
  onSetWebsites: (websites: IWebsites[]) => void;
  setLoadingGenerate: (loading: boolean) => void;
}) => {
  setLoadingGenerate(true);
  try {
    const exclude_domains = websites.map((w) => w.url);
    const { data } = await callAppV2Api.post('/v1/websites', {
      keywords: [selectedKeywords],
      limit: 5,
      exclude_domains,
    });

    onSetWebsites([...websites, ...data.websites]);
  } catch (error) {
    console.error('Error submitting get additional key visuals:', error);
  } finally {
    setLoadingGenerate(false);
  }
};

export const generateScreenshot = async ({
  keyVisuals,
  websites,
  setKeyVisuals,
  setLoadingGenerateVisual,
}: {
  keyVisuals: any[];
  websites: any[];
  setKeyVisuals: (keyVisuals: any[]) => void;
  setLoadingGenerateVisual: (loading: boolean) => void;
}) => {
  setLoadingGenerateVisual(true);
  try {
    const { data } = await callAppV2Api.post('/v1/websites/screenshot', {
      urls: websites.map((website) => website.url),
    });

    setKeyVisuals([...keyVisuals, ...data.items]);
  } catch (error) {
    console.error('Error generating screenshot:', error);
  } finally {
    setLoadingGenerateVisual(false);
  }
};
