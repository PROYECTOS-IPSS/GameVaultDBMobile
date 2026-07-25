import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '../types/user';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEFAULT_USER: User = {
  id: 1,
  nombre: 'Test',
  apellido: 'Usuario',
  email: 'test@test.com',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setLoading(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        const namePart = email.split('@')[0] ?? 'Gamer';
        const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

        setUser({
          id: Date.now(),
          nombre: email === 'test@test.com' ? DEFAULT_USER.nombre : capitalizedName,
          apellido: email === 'test@test.com' ? DEFAULT_USER.apellido : 'Player',
          email,
        });
        setLoading(false);
        resolve();
      }, 500);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
