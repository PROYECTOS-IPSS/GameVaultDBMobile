import { Pressable, ActivityIndicator, StyleSheet, type PressableProps } from 'react-native';
import { Text } from './Text';
import { colors, radii, spacing } from '../../theme';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'ghost' | 'success';
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({ title, variant = 'primary', loading, fullWidth, disabled, style, ...props }: ButtonProps) {
  const isDisabled = disabled || loading;
  const pressedStyles: Record<string, object> = {
    primary: styles.primaryPressed,
    ghost: styles.ghostPressed,
    success: styles.successPressed,
  };

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        pressed && pressedStyles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <Text style={styles.text} weight="semibold">
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: colors.accent,
  },
  primaryPressed: {
    backgroundColor: colors.accentHover,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghostPressed: {
    borderColor: colors.textSecondary,
  },
  success: {
    backgroundColor: colors.success,
  },
  successPressed: {
    backgroundColor: '#15803d',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
});
