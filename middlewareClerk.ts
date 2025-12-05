import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import callApi from './config/axios/axios';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/app(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // const { isAuthenticated, getToken } = await auth();

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // if (isAuthenticated) {
  //   const { data } = await callApi.get('/user/data', {
  //     headers: {
  //       Authorization: `Bearer ${await getToken()}`,
  //     },
  //   });
  // }

  // All other routes, including /api, are public and not protected
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
