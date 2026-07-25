import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';

export default function IndexScreen() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/login' as any);
    }
  }, [user]);

  return null;
}
