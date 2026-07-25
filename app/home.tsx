import { View, ScrollView, StyleSheet } from 'react-native';
import { type Href, router } from 'expo-router';
import { Text, Button, Icon } from '../src/components/ui';
import { colors, spacing, radii } from '../src/theme';
import { useAuth } from '../src/hooks/useAuth';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login' as Href);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Icon name="gamepad-variant" size={28} color={colors.accent} />
          <Text variant="heading" weight="bold">
            GameVault
          </Text>
        </View>
        <Text variant="caption" style={styles.welcome}>
          Bienvenido, {user?.nombre ?? 'Gamer'} {user?.apellido ?? ''}
        </Text>
      </View>

      <View style={styles.lockedBanner}>
        <View style={styles.lockedHeader}>
          <Icon name="shield-lock-outline" size={20} color="#f59e0b" />
          <Text variant="body" weight="bold" style={styles.lockedTitle}>
            Nivel Bloqueado
          </Text>
        </View>
        <Text variant="caption" style={styles.lockedText}>
          Te falta el ítem{' '}
          <Text variant="caption" weight="bold" style={styles.lockedHighlight}>
            &quot;Backend API&quot;
          </Text>{' '}
          para abrir esta puerta. ¡Disponible en v2.0!
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Text variant="heading" weight="bold" style={styles.heroTitle}>
          Tu biblioteca de juegos
        </Text>
        <Text variant="body" style={styles.heroText}>
          Organiza, descubre y administra tu colección favorita.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text variant="heading" weight="bold">
            20
          </Text>
          <Text variant="caption">Juegos</Text>
        </View>
        <View style={styles.statCard}>
          <Text variant="heading" weight="bold">
            5
          </Text>
          <Text variant="caption">Plataformas</Text>
        </View>
        <View style={styles.statCard}>
          <Text variant="heading" weight="bold">
            10
          </Text>
          <Text variant="caption">Géneros</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="heading" weight="bold" style={styles.sectionTitle}>
          Juego destacado
        </Text>
        <View style={styles.gameCard}>
          <View style={styles.gameBadge}>
            <Text variant="caption" style={styles.badgeText}>
              RPG • PC
            </Text>
          </View>
          <Text variant="heading" weight="bold">
            Elden Ring
          </Text>
          <Text variant="caption" style={styles.gameDesc}>
            RPG de mundo abierto desarrollado por FromSoftware.
          </Text>
          <Text variant="body" weight="bold" style={styles.gamePrice}>
            $49.99
          </Text>
        </View>
      </View>

      <Button
        title="Cerrar sesión"
        variant="ghost"
        icon="logout"
        onPress={handleLogout}
        style={styles.logoutBtn}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.md,
    paddingTop: spacing.xl + 10,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  welcome: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  lockedBanner: {
    backgroundColor: '#271b07',
    borderWidth: 1,
    borderColor: '#78350f',
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  lockedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  lockedTitle: {
    color: '#f59e0b',
    fontSize: 15,
  },
  lockedText: {
    color: '#d97706',
    fontSize: 13,
    lineHeight: 18,
  },
  lockedHighlight: {
    color: '#fbbf24',
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  heroTitle: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  heroText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: spacing.md,
  },
  gameCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  gameBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2a1212',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    marginBottom: spacing.xs,
  },
  badgeText: {
    color: colors.accent,
    fontSize: 11,
  },
  gameDesc: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  gamePrice: {
    color: colors.accent,
  },
  logoutBtn: {
    marginTop: spacing.md,
  },
});
