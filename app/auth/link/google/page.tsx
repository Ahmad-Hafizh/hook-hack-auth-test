'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { handleOAuthLink } from '../../hooks/fetchAPIs';

const GoogleLinkPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center container mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Link Your Google Account</h1>
        <p className="mb-4">We need to access your Google Ads Manager account to link it.</p>
        <Button className="" type="button" variant={'outline'} disabled={loading} onClick={() => handleOAuthLink({ setLoading, setError })}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Link Google Account
        </Button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default GoogleLinkPage;
