import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors, fonts, fontWeights } from '../../theme';

interface TextProps extends RNTextProps {
  variant?: 'display' | 'heading' | 'body' | 'caption';
  weight?: keyof typeof fontWeights;
}

export function Text({ variant = 'body', weight = 'regular', style, ...props }: TextProps) {
  const isDisplayOrHeading = variant === 'display' || variant === 'heading';
  const fontFamily = isDisplayOrHeading ? fonts.display : fonts.body;

  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        { fontFamily, fontWeight: fontWeights[weight] },
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
