import { createContext, ReactNode, useEffect, useState } from 'react';
import { firebaseAuth } from '@/utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthContextProvider({ children }: { children: Readonly<ReactNode> }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (authUser) => {
      setLoading(true);
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
