import callAppV2Api from '@/config/axios/axiosAppV2';
import { IVariants } from './useStepData';

export const submitStep1 = async ({ setLoading, onNext, budget, setPlan }: { setLoading: (loading: boolean) => void; onNext: () => void; budget: number; setPlan: React.Dispatch<React.SetStateAction<any>> }) => {
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

    setPlan(data.plan);
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

export const generateVariants = async ({ setLoadingGenerate, setVariants }: { setLoadingGenerate: (loading: boolean) => void; setVariants: React.Dispatch<React.SetStateAction<IVariants>> }) => {
  setLoadingGenerate(true);
  try {
    const { key_message, strong_points } = JSON.parse(localStorage.getItem('planning-what-data') || '{}');
    const { data } = await callAppV2Api.post('/v1/video/main-content', {
      key_message: key_message,
      strong_points: strong_points,
      provider: 'openai',
      language: 'en',
    });
    setVariants({ ...data.variants, strong_point_1_images: [], strong_point_2_images: [], strong_point_3_images: [] });
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

export const submitStep4 = async ({
  setLoading,
  onNext,
  patternCombinations,
  setRendersCreatomate,
}: {
  setLoading: (loading: boolean) => void;
  onNext: () => void;
  patternCombinations: any[];
  setRendersCreatomate: (renders: any[]) => void;
}) => {
  setLoading(true);
  try {
    const { data } = await callAppV2Api.post('/v1/creatomate/renders', {
      template_id: 'f9a7fdef-4311-4b0c-942a-6f3f00a353dd',
      videos: patternCombinations,
      provider: 'creatomate',
    });

    setRendersCreatomate(data.renders);
    onNext();
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
