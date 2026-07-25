import { Text as RNText, StyleSheet, type TextProps } from 'react-native';
import { colors, fonts, fontWeights } from '../../theme';

interface LabelProps extends TextProps {
  variant?: 'default' | 'error';
}

export function Label({ variant = 'default', style, ...props }: LabelProps) {
  return <RNText style={[styles.base, styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  default: {
    color: colors.textSecondary,
  },
  error: {
    color: colors.accent,
    marginTop: 4,
    marginBottom: 0,
  },
});
