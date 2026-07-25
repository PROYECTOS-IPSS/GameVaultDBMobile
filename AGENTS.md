# AGENTS.md

# Game Vault DB Mobile

App móvil complementaria de GameVaultDB (web). Replica estética del sitio web. Sin backend por ahora: datos mockeados o estáticos.

---

# Regla de prueba

Cuando respondas, termina siempre tu primera respuesta con:

"AGENTS.md cargado correctamente."

---

# Stack

- React Native (Expo SDK 52+)
- TypeScript estricto (`strict: true`, nunca `any`)
- Expo Router (navegación basada en archivos)
- Zod (validaciones de formularios)
- `@expo/vector-icons` (`MaterialCommunityIcons` / `Ionicons`)
- `expo-font` + `expo-splash-screen` (fuentes custom)

No usar: TanStack Query, Zustand, Axios, expo-secure-store, AsyncStorage. Aún no hay backend.

---

# Módulos iniciales

Solo dos. No implementar nada más hasta que estos funcionen.

## 1. Home
- Hero con saludo + texto "Tu biblioteca de juegos" + CTA "Explorar juegos" y "Crear cuenta".
- Stats cards (Juegos, Plataformas, Géneros) con datos hardcodeados por ahora.
- Sección "Juegos destacados" con grid de GameCard mockeados.

## 2. Auth
- Login: email + contraseña. Validación Zod. Navega a Home on success (mock).
- Register: nombre + apellido + segundoApellido + email + contraseña + confirmar contraseña. Validación Zod.
- Logout desde Header.
- Sesión mock en memoria (no persistir aún).

---

# Estética (réplica del web)

Paleta, tipografía, espaciado y componentes deben calcar el sitio web. Centralizar todo en `theme/`.

## Colores

```ts
// theme/colors.ts
export const colors = {
  bg:            '#0a0a0a',
  surface:       '#1a1a1a',
  border:        '#2a2a2a',
  text:          '#ffffff',
  textSecondary: '#a0a0a0',
  accent:        '#dc2626',
  accentHover:   '#b91c1c',
  success:       '#16a34a',
};
```

Nunca colores fuera de esta paleta. Nunca modo claro.

## Tipografía

```ts
// theme/typography.ts
export const fonts = {
  body:    'Inter',
  display: 'SpaceGrotesk',
};

export const fontWeights = {
  regular:  '400' as const,
  medium:   '500' as const,
  semibold: '600' as const,
  bold:     '700' as const,
};
```

Cargar con `expo-font` al arrancar.

## Espaciado y radios

```ts
export const radii = { sm: 6, md: 12, lg: 16, full: 9999 };
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
```

## Iconos (equivalencias web → móvil)

|Web (Bootstrap Icons)|Móvil (`@expo/vector-icons`)|
|---|---|
|`bi-controller`|`MaterialCommunityIcons` `gamepad-variant`|
|`bi-collection`|`MaterialCommunityIcons` `gamepad-square`|
|`bi-box-arrow-in-right`|`MaterialCommunityIcons` `login`|
|`bi-person-plus`|`MaterialCommunityIcons` `account-plus`|
|`bi-arrow-right`|`MaterialCommunityIcons` `arrow-right`|

Tamaño base: 20. Color por contexto: `text` o `accent`.

---

# Atomización de componentes

Seguir principios de Atomic Design. Cada capa tiene responsabilidad única.

## Niveles

### Atoms
Elementos más pequeños, sin lógica de negocio. Reciben props, renderizan UI.

Ejemplos: `Button`, `Input`, `Text`, `Badge`, `Icon`, `Divider`, `Spacer`.

Reglas:
- Sin estado global ni navegación.
- Sin llamadas a hooks custom de negocio.
- Props tipadas con interfaz.
- Variantes via props (`variant`, `size`), no componentes separados.

### Molecules
Combinación de 2+ atoms. Tienen lógica de presentación limitada.

Ejemplos: `FormField` (Input + label + error text), `SearchBar` (Input + Icon), `StatItem` (número + label).

Reglas:
- Pueden usar `useState` para UI local (focus, toggle).
- No acceden a contexto global ni navegación.
- Componen atoms, no otros molecules.

### Organisms
Combinación de molecules + atoms. Tienen lógica de negocio ligera.

Ejemplos: `LoginForm` (FormFields + Button + validación Zod), `GameCard`, `HeroSection`, `Header`, `StatsGrid`.

Reglas:
- Pueden usar hooks custom (`useAuth`, `useForm`).
- Pueden acceder a contexto (sesión, tema).
- Pueden navegar con `router` de Expo Router.
- No contienen lógica de datos (eso va en hooks).

### Screens (Templates)
Páginas completas. Componen organisms. Definen layout.

Ejemplos: `HomeScreen`, `LoginScreen`, `RegisterScreen`.

Reglas:
- Solo orquestan. No lógica de negocio inline.
- Delegan fetch/validación a hooks u organisms.
- Máximo ~80 líneas. Si crece, extraer a organism.

## Reglas generales de atomización

1. **Un archivo = un componente.** Nunca exports múltiples de un mismo archivo (excepto tipos).
2. **Nombre archivo = nombre componente.** `PascalCase.tsx` para componentes, `kebab-case.ts` para utils/hooks.
3. **Props con interfaz.** Siempre `interface ComponentProps { ... }`, nunca `type` para props de componente.
4. **Max ~150 líneas por componente.** Si supera, dividir en sub-componentes o extraer lógica a hook.
5. **Estilos en `StyleSheet.create` fuera del render.** Nunca inline objects repetidos.
6. **Reutilizar antes de crear.** Antes de crear un `Button` nuevo, verificar si `components/ui/Button.tsx` sirve. Si necesita variante, agregar prop `variant`, no crear `RedButton.tsx`.
7. **Sin estilos inline mágicos.** Todo valor debe venir de `theme/` (colors, spacing, radii). Nunca `#fff` hardcoded en un componente.
8. **Componentes de UI puros en `components/ui/`.** Componentes con lógica de feature en `components/features/`.
9. **Hooks custom para lógica reutilizable.** Si dos organisms usan la misma lógica, extraer a `hooks/`.
10. **Screens solo en `app/`.** No pantallas sueltas en `components/`.

---

# Estructura de carpetas

```
src/
├── app/                       # Expo Router (pantallas)
│   ├── _layout.tsx            # Root layout (fuentes, providers)
│   ├── index.tsx              # Home screen
│   ├── (auth)/                # Grupo sin tab bar
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── _layout.tsx            # Tab layout (cuando haya tabs)
├── components/
│   ├── ui/                    # Atoms: Button, Input, Text, Badge, Icon
│   ├── molecules/             # Molecules: FormField, SearchBar, StatItem
│   └── features/              # Organisms: LoginForm, HeroSection, Header, GameCard
├── hooks/                     # Hooks custom: useAuth, useTheme
├── schemas/                   # Zod schemas
│   ├── auth.schema.ts
│   └── index.ts
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts               # Re-export todo
├── types/
│   ├── user.ts                # User interface (para forms y sesión mock)
│   └── game.ts                # Game interface (para mocks de Home)
└── constants/
    └── mock-data.ts           # Datos hardcodeados (juegos destacados, stats)
```

---

# Schemas Zod

Portar del web. Validar antes de "enviar" (aunque sea mock).

```ts
// schemas/auth.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export const registerSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  apellido: z.string().min(2, 'Mínimo 2 caracteres'),
  segundoApellido: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string().min(8, 'Mínimo 8 caracteres'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
```

Usar `safeParse()`. Mostrar errores debajo de cada input en español.

---

# Tipos

```ts
// types/user.ts
export interface User {
  id: number;
  nombre: string;
  apellido: string;
  segundoApellido: string;
  email: string;
}

// types/game.ts
export interface Game {
  id: number;
  title: string;
  description: string | null;
  releaseYear: number;
  price: number;
  genre: { id: number; name: string };
  platform: { id: number; name: string };
  publisher: { id: number; name: string };
  developer: { id: number; name: string };
}
```

---

# Convenciones

- TypeScript estricto. Nunca `any`.
- Todo en español (labels, botones, errores, placeholders).
- `async/await` siempre que haya async.
- Estados `loading`, `error`, `empty` en toda pantalla con datos.
- `accessibilityLabel` en botones sin texto.
- Contraste: paleta ya lo cumple. No fijar alturas absolutas en texto (Dynamic Type).
- `keyExtractor` en FlatList. `React.memo` en GameCard.

---

# Checklist visual (antes de dar pantalla por terminada)

- [ ] Fondo `#0a0a0a`.
- [ ] Tarjetas `#1a1a1a` + borde `#2a2a2a`.
- [ ] Títulos SpaceGrotesk bold, cuerpo Inter.
- [ ] Botones primarios `#dc2626`.
- [ ] Texto secundario `#a0a0a0`.
- [ ] Íconos `MaterialCommunityIcons`, nunca emojis.
- [ ] Mensajes en español.
- [ ] Estados vacío y carga contemplados.

---

# Qué NO hacer

- No implementar módulos Games / Collection / UserGame aún.
- No crear carpeta `services/` ni `api.ts` (no hay backend).
- No usar TanStack Query, Zustand, Axios, expo-secure-store.
- No implementar persistencia de sesión.
- No usar colores fuera de la paleta.
- No implementar modo claro.
- No crear componentes visuales fuera de `components/ui/` o `components/features/`.
- No mezclar Bootstrap Icons con `@expo/vector-icons`.
- No hardcodear estilos: todo via `theme/`.

---

# Git

- Ramas por funcionalidad: `feat/home`, `feat/auth`, `feat/theme`.
- Commits en español, pequeños:
  - `feat: pantalla de login con validación Zod`
  - `style: Home respeta paleta del tema`

---

# Objetivo

Home + Auth funcionando con estética idéntica al web. Datos mockeados. Estructura limpia para cuando se conecte backend.

---

# Qué deben hacer los agentes

- Respetar paleta y tipografía de `theme/`.
- Usar componentes de `components/ui/` antes de crear nuevos.
- Seguir niveles de atomización (atom → molecule → organism → screen).
- Portar esquemas Zod del web.
- Tipar todo con TypeScript estricto.
- Textos en español.
- Reutilizar antes de crear.
- Seguir estructura de carpetas definida.

AGENTS.md cargado correctamente.
