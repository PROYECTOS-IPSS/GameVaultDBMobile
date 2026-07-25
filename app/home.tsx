import { View, StyleSheet } from 'react-native';
import { Text } from '../src/components/ui';
import { colors, spacing } from '../src/theme';
import { useAuth } from '../src/hooks/useAuth';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text variant="heading" weight="bold">
          GameVault
        </Text>
        <Text variant="body" style={styles.welcome}>
          Bienvenido, {user?.nombre}
        </Text>
      </View>

      <View style={styles.content}>
        <Text variant="body" style={styles.description}>
          Tu biblioteca de juegos
        </Text>
      </View>

      <View style={styles.footer}>
        <Text variant="caption" style={styles.logout} onPress={logout}>
          Cerrar sesión
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.md,
  },
  header: {
    paddingTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  welcome: {
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 18,
  },
  footer: {
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  logout: {
    color: colors.accent,
  },
});
