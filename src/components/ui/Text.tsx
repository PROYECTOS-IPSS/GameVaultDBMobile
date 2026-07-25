import { Text as RNText, type TextProps as RNTextProps, StyleSheet, Platform } from 'react-native';
import { colors, fontWeights } from '../../theme';

interface TextProps extends RNTextProps {
  variant?: 'display' | 'heading' | 'body' | 'caption';
  weight?: keyof typeof fontWeights;
}

export function Text({ variant = 'body', weight = 'regular', style, ...props }: TextProps) {
  const isDisplayOrHeading = variant === 'display' || variant === 'heading';

  const fontFamily = isDisplayOrHeading
    ? weight === 'bold'
      ? 'SpaceGrotesk_Bold'
      : weight === 'semibold'
      ? 'SpaceGrotesk_SemiBold'
      : weight === 'medium'
      ? 'SpaceGrotesk_Medium'
      : 'SpaceGrotesk'
    : weight === 'bold'
    ? 'Inter_Bold'
    : weight === 'semibold'
    ? 'Inter_SemiBold'
    : weight === 'medium'
    ? 'Inter_Medium'
    : 'Inter';

  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        { fontFamily },
        Platform.OS === 'ios' ? { fontWeight: fontWeights[weight] } : undefined,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  display: {
    fontSize: 32,
    lineHeight: 40,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
});
