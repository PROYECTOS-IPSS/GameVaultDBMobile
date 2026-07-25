import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button, Icon } from '../ui';
import { colors, radii, spacing } from '../../theme';
import { useForm } from '../../hooks/useForm';
import { loginSchema } from '../../schemas';
import type { LoginInput } from '../../schemas';

interface LoginFormProps {
  onSubmit: (data: LoginInput) => Promise<void>;
  loading: boolean;
}

export function LoginForm({ onSubmit, loading }: LoginFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { values, errors, setValue, isValid } = useForm<LoginInput>({
    initialValues: { email: '', password: '' },
    validate: (vals) => {
      const result = loginSchema.safeParse(vals);
      if (result.success) return {};
      const fieldErrors: Partial<Record<keyof LoginInput, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginInput;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      return fieldErrors;
    },
  });

  const handleSubmit = async () => {
    setSubmitError(null);
    if (!isValid()) return;

    try {
      await onSubmit(values);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="heading" weight="bold">
        Ingresar
      </Text>
      <Text variant="body" style={styles.subtitle}>
        Accede a tu cuenta de GameVault
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
        label="Email"
        placeholder="nombre@ejemplo.com"
        value={values.email}
        onChangeText={(text) => setValue('email', text)}
        error={errors.email}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />
      <Input
        label="Contraseña"
        placeholder="••••••••"
        value={values.password}
        onChangeText={(text) => setValue('password', text)}
        error={errors.password}
        secureTextEntry
        autoComplete="password"
      />

      <Button title="Ingresar" icon="login" onPress={handleSubmit} loading={loading} fullWidth />

      <View style={styles.hintCard}>
        <Icon name="information-outline" size={16} color={colors.textSecondary} />
        <Text variant="caption" style={styles.hintText}>
          Prueba con: <Text variant="caption" weight="medium" style={styles.hintHighlight}>test@test.com</Text> / <Text variant="caption" weight="medium" style={styles.hintHighlight}>123456</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  hintCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.sm,
    marginTop: spacing.lg,
  },
  hintText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  hintHighlight: {
    color: colors.text,
  },
});
