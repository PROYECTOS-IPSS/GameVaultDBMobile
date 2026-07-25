import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

export interface IconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 20, color = colors.text }: IconProps) {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}
