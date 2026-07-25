import {
  TextInput as RNTextInput,
  StyleSheet,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import { colors, fonts, radii, spacing } from "../../theme";

interface TextInputProps extends RNTextInputProps {
  error?: boolean;
}

export function TextInput({ error, style, ...props }: TextInputProps) {
  return (
    <RNTextInput
      style={[styles.input, error && styles.inputError, style]}
      placeholderTextColor={colors.textSecondary}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 16,
    minHeight: 48,
  },
  inputError: {
    borderColor: colors.accent,
  },
});
