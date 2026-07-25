import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { type Href, router } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { LoginForm } from '../src/components/features/LoginForm';
import { Text, Icon } from '../src/components/ui';
import { colors, spacing, radii } from '../src/theme';

export default function LoginScreen() {
  const { login, loading } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
  };

  const handleGoToRegister = () => {
    router.push('/(auth)/register' as Href);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Icon name="gamepad-variant" size={32} color={colors.accent} />
        </View>
        <Text variant="display" weight="bold" style={styles.brandTitle}>
          GameVault
        </Text>
        <Text variant="caption" style={styles.brandTagline}>
          Organiza y descubre tus juegos favoritos
        </Text>
      </View>

      <View style={styles.card}>
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </View>

      <View style={styles.footer}>
        <Text variant="body" style={styles.footerText}>
          ¿No tienes cuenta?{' '}
        </Text>
        <Pressable onPress={handleGoToRegister} hitSlop={8}>
          <Text variant="body" weight="semibold" style={styles.registerLink}>
            Regístrate
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.md,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brandTitle: {
    letterSpacing: 0.5,
  },
  brandTagline: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    color: colors.textSecondary,
  },
  registerLink: {
    color: colors.accent,
  },
});
