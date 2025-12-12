'use client';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const handleOAuthLink = async ({ setLoading, setError }: { setLoading: React.Dispatch<React.SetStateAction<boolean>>; setError: React.Dispatch<React.SetStateAction<string | null>> }) => {
  try {
    setLoading(true);
    const { error } = await supabase.auth.linkIdentity({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  } catch (err: any) {
    setError(err.message || `Failed to link Google account`);
    setLoading(false);
  }
};

export const handleSignIn = async ({
  event,
  formData,
  setError,
  setLoading,
  router,
}: {
  event: React.FormEvent;
  formData: { email: string; password: string };
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  router: any;
}) => {
  event.preventDefault();
  setError(null);
  setLoading(true);

  try {
    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to sign in');
    }

    console.log(data);

    // Redirect to dashboard or home page
    // router.push('/');
    // router.refresh();
  } catch (err: any) {
    setError(err.message || 'An error occurred during sign in');
  } finally {
    setLoading(false);
  }
};

export const handleOAuthSignIn = async ({ setLoading, setError }: { setLoading: React.Dispatch<React.SetStateAction<boolean>>; setError: React.Dispatch<React.SetStateAction<string | null>> }) => {
  try {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  } catch (err: any) {
    setError(err.message || `Failed to sign in with google`);
    setLoading(false);
  }
};

export const handleSignUp = async ({
  event,
  formData,
  setError,
  setLoading,
  setSuccess,
  router,
}: {
  event: React.FormEvent;
  formData: { name: string; email: string; password: string; confirmPassword: string };
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  router: any;
}) => {
  event.preventDefault();
  setError(null);
  setLoading(true);

  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    setLoading(false);
    return;
  }

  // Validate password length
  if (formData.password.length < 8) {
    setError('Password must be at least 8 characters long');
    setLoading(false);
    return;
  }

  try {
    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to sign up');
    }

    setSuccess(true);
    // Redirect to sign in after 2 seconds
    setTimeout(() => {
      router.push('/auth/sign-in');
    }, 2000);
  } catch (err: any) {
    setError(err.message || 'An error occurred during sign up');
  } finally {
    setLoading(false);
  }
};
