import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { LoginForm } from '../src/components/features/LoginForm';
import { Text } from '../src/components/ui';
import { colors, spacing, radii } from '../src/theme';

export default function LoginScreen() {
  const { login, loading } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
    router.replace('/home' as any);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </View>
      <View style={styles.footer}>
        <Text variant="body" style={styles.footerText}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    color: colors.textSecondary,
  },
});
