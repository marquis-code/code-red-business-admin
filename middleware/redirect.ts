// middleware/auth.js
import { decodeToken } from '@/utils/jwt';

export default defineNuxtRouteMiddleware((context) => {
  const token = localStorage.getItem('token');
  const router = useRouter();
  if (token) {
    try {
      const decodedToken = decodeToken(token);
      const currentTime = Date.now() / 1000; // convert to seconds

      // Check if the token has expired
      if (decodedToken.exp < currentTime) {
        // Token has expired, clear it and redirect to sign-in page
        localStorage.removeItem('token');
        return router.push({ path: "/", query: { page: "login" } });
        // return navigateTo('/signin');
      }
    } catch (error) {
      // On error, remove the token and redirect
      localStorage.removeItem('token');
      return router.push({ path: "/", query: { page: "login" } });
    //   return navigateTo('/signin');
    }
  } else {
    // No token, redirect to sign-in
    // return navigateTo('/signin');
    return router.push({ path: "/", query: { page: "login" } });
  }
});
