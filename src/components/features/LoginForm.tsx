import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from '../ui';
import { colors, spacing } from '../../theme';
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
        <Text variant="caption" style={styles.submitError}>
          {submitError}
        </Text>
      )}

      <Input
        label="Email"
        value={values.email}
        onChangeText={(text) => setValue('email', text)}
        error={errors.email}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />
      <Input
        label="Contraseña"
        value={values.password}
        onChangeText={(text) => setValue('password', text)}
        error={errors.password}
        secureTextEntry
        autoComplete="password"
      />

      <Button title="Ingresar" onPress={handleSubmit} loading={loading} fullWidth />
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
  submitError: {
    color: colors.accent,
    marginBottom: spacing.md,
  },
});
