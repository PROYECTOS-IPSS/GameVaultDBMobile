import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface User {
  id: number;
  nombre: string;
  apellido: string;
  segundoApellido: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = '123456';

const MOCK_USER: User = {
  id: 1,
  nombre: 'Test',
  apellido: 'Usuario',
  segundoApellido: 'Demo',
  email: VALID_EMAIL,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { promise, resolve, reject } = Promise.withResolvers<void>();
    
    setTimeout(() => {
      if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
        setLoading(false);
        reject(new Error('Credenciales inválidas'));
      } else {
        setUser(MOCK_USER);
        setLoading(false);
        resolve();
      }
    }, 800);
    
    await promise;
  }, []);

  const logout = useCallback(() => setUser(null), []);

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
