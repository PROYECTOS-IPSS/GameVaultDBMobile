# GameVault DB Mobile

App móvil complementaria de GameVaultDB. React Native + Expo SDK 54 + TypeScript.

## Stack

- React Native 0.81.5
- Expo SDK 54
- Expo Router 6
- TypeScript 5.9
- Zod 3.24
- Google Fonts (Inter + Space Grotesk)

## Instalación

```bash
yarn install
yarn start
```

Escanea QR con Expo Go (Android/iOS) o presiona `w` para web.

## Credenciales de prueba

- Email: `test@test.com`
- Password: `123456`

## Estructura

```
app/                    # Pantallas (Expo Router)
├── _layout.tsx         # Root layout (fonts, providers)
├── index.tsx           # Entry (redirect condicional)
├── login.tsx           # Pantalla login
└── home.tsx            # Pantalla home (protegida)

src/
├── theme/              # Colores, tipografía, espaciado
├── components/
│   ├── ui/             # Atoms (Button, Text, Input, Label, TextInput)
│   └── features/       # Organisms (LoginForm)
├── hooks/              # Custom hooks (useAuth, useForm, use-color-scheme)
└── schemas/            # Validaciones Zod
```

## Módulos

- **Auth:** Login con validación Zod, sesión mock en memoria
- **Home:** Pantalla protegida con bienvenida y logout

## Estética

Réplica del web: dark theme (`#0a0a0a`), rojo accent (`#dc2626`), Space Grotesk (headings) + Inter (body).

## Comandos

```bash
yarn start              # Inicia Metro bundler
yarn android            # Corre en Android
yarn ios                # Corre en iOS (macOS)
yarn web                # Corre en web
yarn lint               # ESLint
```

## Convenciones

Ver `AGENTS.md` para detalles completos:
- TypeScript estricto (sin `any`)
- Atomic Design (atoms → molecules → organisms → screens)
- Rutas relativas en imports
- Validación con Zod antes de enviar
- Textos en español
