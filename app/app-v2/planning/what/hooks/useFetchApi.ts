import callAppV2Api from '@/config/axios/axiosAppV2';

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

export const submitStep2Scratch = async ({ selectedKeywords, onSetWebsites, onNext, setLoading }: { selectedKeywords: string[]; onSetWebsites: (websites: any[]) => void; onNext: () => void; setLoading: (loading: boolean) => void }) => {
  setLoading(true);
  try {
    const { data } = await callAppV2Api.post('/v1/websites', {
      keywords: selectedKeywords,
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
  onSetSuggestions,
  onSetCompetitorStrategy,
  onNext,
  setLoadingSubmit,
}: {
  selectedVisuals: string[];
  keyVisuals: any[];
  onSetSuggestions: (suggestions: any) => void;
  onSetCompetitorStrategy: (competitorStrategy: any) => void;
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

    onSetSuggestions(data.suggestion);
    onSetCompetitorStrategy(data.competitors);
    onNext();
  } catch (error) {
    console.error('Error submitting Step 3:', error);
  } finally {
    setLoadingSubmit(false);
  }
};

export const get5MoreVisuals = async ({
  keywords,
  websites,
  onSetWebsites,
  setLoadingGenerate,
}: {
  keywords: { term: string }[];
  websites: any[];
  onSetWebsites: (websites: any[]) => void;
  setLoadingGenerate: (loading: boolean) => void;
}) => {
  setLoadingGenerate(true);
  try {
    const { data } = await callAppV2Api.post('/v1/websites', {
      keywords: keywords.map((k) => k.term),
      limit: 5,
      exclude_domains: websites.map((w) => w.domain),
    });

    onSetWebsites([...websites, ...data.websites]);
  } catch (error) {
    console.error('Error submitting get additional key visuals:', error);
  } finally {
    setLoadingGenerate(false);
  }
};

export const generateScreenshot = async ({ websites, setKeyVisuals, setLoadingGenerateVisual }: { websites: any[]; setKeyVisuals: (keyVisuals: any[]) => void; setLoadingGenerateVisual: (loading: boolean) => void }) => {
  setLoadingGenerateVisual(true);
  try {
    const { data } = await callAppV2Api.post('/v1/websites/screenshot', {
      urls: websites.map((website) => website.url),
    });

    setKeyVisuals(data.items);
  } catch (error) {
    console.error('Error generating screenshot:', error);
  } finally {
    setLoadingGenerateVisual(false);
  }
};
