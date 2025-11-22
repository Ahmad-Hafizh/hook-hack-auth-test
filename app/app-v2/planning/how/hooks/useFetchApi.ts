import callAppV2Api from '@/config/axios/axiosAppV2';

export const submitStep1 = async ({ setLoading, onNext, budget, onSetPlan }: { setLoading: (loading: boolean) => void; onNext: () => void; budget: number; onSetPlan: (plan: any) => void }) => {
  setLoading(true);
  try {
    const { data } = await callAppV2Api.post('/v1/video-tests/plan', {
      monthly_budget: budget,
      currency: 'JPY',
      test_term_weeks: 4,
      strong_points: ['string'],
      provider: 'openai',
      language: 'en',
    });

    onSetPlan(data.plan);
    onNext();
  } catch (error) {
    console.error('Error submitting Step 1:', error);
  } finally {
    setLoading(false);
  }
};

export const submitStep2 = async ({ setLoading, onNext }: { setLoading: (loading: boolean) => void; onNext: () => void }) => {
  setLoading(true);
  try {
    onNext();
  } catch (error) {
    console.error('Error submitting Step 2:', error);
  } finally {
    setLoading(false);
  }
};

export const generateVariants = async ({ setLoadingGenerate, onSetVariants }: { setLoadingGenerate: (loading: boolean) => void; onSetVariants: (variants: any) => void }) => {
  setLoadingGenerate(true);
  try {
    const { data } = await callAppV2Api.post('/v1/video/main-content', {
      key_message: 'stringstri',
      strong_points: ['string', 'string', 'string'],
      provider: 'openai',
      language: 'en',
    });
    onSetVariants(data.variants);
  } catch (error) {
    console.error('Error generating variants:', error);
  } finally {
    setLoadingGenerate(false);
  }
};

export const submitStep3 = async ({ setLoading, onNext }: { setLoading: (loading: boolean) => void; onNext: () => void }) => {
  setLoading(true);
  try {
    setTimeout(() => {}, 1000);
    console.log('called');
    onNext();
  } catch (error) {
    console.error('Error submitting Step 3:', error);
  } finally {
    setLoading(false);
  }
};

export const submitStep4 = async ({ setLoading, onNext }: { setLoading: (loading: boolean) => void; onNext: () => void }) => {
  setLoading(true);
  try {
    const { data } = await callAppV2Api.post('/v1/creatomate/renders', {
      template_id: 'string',
      videos: [
        {
          hook: 'string',
          strong_point_1: 'string',
          strong_point_2: 'string',
          strong_point_3: 'string',
          cta: 'string',
          images: {
            strong_point_1: 'https://example.com/',
            strong_point_2: 'https://example.com/',
            strong_point_3: 'https://example.com/',
            logo: 'https://example.com/',
          },
        },
      ],
      provider: 'creatomate',
    });
    console.log(data);
  } catch (error) {
    console.error('Error submitting Step 4:', error);
  } finally {
    setLoading(false);
  }
};

export const uploadImage = async ({ file, onUploadImage }: { file: File; onUploadImage: (url: string) => void }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await callAppV2Api.post('/v1/assets/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    onUploadImage(data.url);
  } catch (error) {
    console.log(error);
  }
};
