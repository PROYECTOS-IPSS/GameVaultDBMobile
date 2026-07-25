import { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { type Href, router } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useForm } from '../../src/hooks/useForm';
import { registerSchema, type RegisterInput } from '../../src/schemas';
import { Text, Input, Button, Icon } from '../../src/components/ui';
import { colors, spacing, radii } from '../../src/theme';

export default function RegisterScreen() {
  const { login, loading } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { values, errors, setValue, isValid } = useForm<RegisterInput>({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: (vals) => {
      const result = registerSchema.safeParse(vals);
      if (result.success) return {};
      const fieldErrors: Partial<Record<keyof RegisterInput, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RegisterInput;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      return fieldErrors;
    },
  });

  const handleRegister = async () => {
    setSubmitError(null);
    if (!isValid()) return;

    try {
      await login(values.email, values.password);
      router.replace('/home' as Href);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al registrar');
    }
  };

  const handleGoToLogin = () => {
    router.back();
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
          Crea tu cuenta de coleccionista
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text variant="heading" weight="bold">
            Crear cuenta
          </Text>
          <Text variant="body" style={styles.subtitle}>
            Regístrate para administrar tu colección
          </Text>

          {submitError && (
            <View style={styles.errorBox}>
              <Icon name="alert-circle-outline" size={18} color={colors.accent} />
              <Text variant="caption" style={styles.submitError}>
                {submitError}
              </Text>
            </View>
          )}

          <Input
            label="Nombre"
            placeholder="Tu nombre"
            value={values.nombre}
            onChangeText={(text) => setValue('nombre', text)}
            error={errors.nombre}
          />
          <Input
            label="Apellido"
            placeholder="Tu apellido"
            value={values.apellido}
            onChangeText={(text) => setValue('apellido', text)}
            error={errors.apellido}
          />
          <Input
            label="Email"
            placeholder="nombre@ejemplo.com"
            value={values.email}
            onChangeText={(text) => setValue('email', text)}
            error={errors.email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            label="Contraseña"
            placeholder="••••••••"
            value={values.password}
            onChangeText={(text) => setValue('password', text)}
            error={errors.password}
            secureTextEntry
          />
          <Input
            label="Confirmar contraseña"
            placeholder="••••••••"
            value={values.confirmPassword}
            onChangeText={(text) => setValue('confirmPassword', text)}
            error={errors.confirmPassword}
            secureTextEntry
          />

          <Button
            title="Registrarse"
            icon="account-plus"
            onPress={handleRegister}
            loading={loading}
            fullWidth
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text variant="body" style={styles.footerText}>
          ¿Ya tienes cuenta?{' '}
        </Text>
        <Pressable onPress={handleGoToLogin} hitSlop={8}>
          <Text variant="body" weight="semibold" style={styles.loginLink}>
            Ingresa
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
  cardContent: {
    padding: spacing.lg,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: '#2c1212',
    borderWidth: 1,
    borderColor: '#7f1d1d',
    borderRadius: radii.sm,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  submitError: {
    color: colors.accent,
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
  loginLink: {
    color: colors.accent,
  },
});
