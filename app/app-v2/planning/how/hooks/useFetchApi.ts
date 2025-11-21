import callAppV2Api from '@/config/axios/axiosAppV2';

export const submitStep1 = async ({ setLoading, onNext, budget }: { setLoading: (loading: boolean) => void; onNext: () => void; budget: number }) => {
  setLoading(true);
  try {
    // const { data } = await callAppV2Api.post('/v1/video-tests/plan', {
    //   monthly_budget: budget,
    //   currency: 'JPY',
    //   test_term_weeks: 4,
    //   strong_points: ['string'],
    //   provider: 'openai',
    //   language: 'en',
    // });

    // console.log('API Response for Step 1:', data);
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
    // const { data } = await callAppV2Api.post('/v1/video/main-content', {
    //   key_message: 'string',
    //   strong_points: ['string', 'string', 'string'],
    //   provider: 'openai',
    //   language: 'en',
    // });

    // console.log('API Response for Step 2:', data);
    onNext();
  } catch (error) {
    console.error('Error submitting Step 2:', error);
  } finally {
    setLoading(false);
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
    setTimeout(() => {}, 1000);
    console.log('called');
  } catch (error) {
    console.error('Error submitting Step 4:', error);
  } finally {
    setLoading(false);
  }
};
