import { View, StyleSheet, type TextInputProps } from 'react-native';
import { Label } from './Label';
import { TextInput } from './TextInput';
import { spacing } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View style={styles.wrapper}>
      {label && <Label>{label}</Label>}
      <TextInput error={!!error} style={style} {...props} />
      {error && <Label variant="error">{error}</Label>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
});
