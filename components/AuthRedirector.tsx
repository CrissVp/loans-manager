import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import Loader from '@/components/Loader';
import useAuth from '@/hooks/useAuth';

export default function AuthRedirector({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  const segment = typeof segments[0] === 'string' ? segments[0] : undefined;

  const inAuthenticatedGroup = segment === '(authenticated)';
  const inPublicGroup = !segment || segment === '(public)';

  useEffect(() => {
    if (loading) return;

    if (!user && inAuthenticatedGroup) {
      console.log('Redirecting to / from AuthRedirector....');
      router.replace('/(public)');
    }

    if (user && inPublicGroup) {
      console.log('Redirecting to /(authenticated)/(tabs) from AuthRedirector....');
      router.replace('/(authenticated)/(tabs)');
    }
  }, [user, loading, segment]);

  if (loading) return <Loader />;

  return <>{children}</>;
}
