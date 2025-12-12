'use client';
import { createClient } from '@/lib/supabase/client';
import React from 'react';

const AuthSessionContext = React.createContext<{
  accessToken: string;
}>({
  accessToken: '',
});

export default function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = React.useState<string>('');
  const supabase = createClient();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAccessToken = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        setAccessToken(data.session?.access_token || '');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthSessionContext.Provider value={{ accessToken }}>{children}</AuthSessionContext.Provider>;
}

export const useAuthSession = () => {
  const context = React.useContext(AuthSessionContext);
  return context.accessToken;
};
