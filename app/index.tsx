import { useAuth } from '../src/hooks/useAuth';
import LoginScreen from './login';
import HomeScreen from './home';

export default function IndexScreen() {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return <HomeScreen />;
}
