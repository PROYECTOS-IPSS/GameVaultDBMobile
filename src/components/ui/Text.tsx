import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors, fonts, fontWeights } from '../../theme';

interface TextProps extends RNTextProps {
  variant?: 'display' | 'heading' | 'body' | 'caption';
  weight?: keyof typeof fontWeights;
}

export function Text({ variant = 'body', weight = 'regular', style, ...props }: TextProps) {
  return <RNText style={[styles.base, styles[variant], { fontWeight: fontWeights[weight] }, style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  display: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 40,
  },
  heading: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 32,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
});
