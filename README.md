# GameVault DB Mobile

Aplicación móvil complementaria de **GameVaultDB** para la gestión y exploración de colecciones de videojuegos. Construida con React Native, Expo SDK 54 y TypeScript estricto.

---

## 1. Objetivo de la app

**GameVault DB Mobile** es la versión portátil del portal de gestión de videojuegos GameVaultDB. 

En su versión completa, la aplicación permite a los amantes de los videojuegos:
- Explorar un catálogo extenso de juegos categorizados por género, plataforma, editorial y desarrollador.
- Iniciar sesión y gestionar su cuenta personal de forma segura.
- Crear y mantener una colección personal de juegos (biblioteca, favoritos, estado de juego).
- Consultar estadísticas globales del catálogo y recomendaciones personalizadas.

---

## 2. Estructura de carpetas

El proyecto sigue los principios de **Atomic Design** y la arquitectura de archivos de **Expo Router**:

```
game-vault-mobile/
├── app/                        # Pantallas y rutas (Expo Router)
│   ├── _layout.tsx             # Root layout (carga de fuentes, providers)
│   ├── index.tsx               # Redirección condicional (Auth Guard)
│   ├── login.tsx               # Pantalla de Login interactiva
│   ├── home.tsx                # Pantalla de Bienvenida (Home protegida)
│   └── (auth)/                 # Grupo de rutas de autenticación
│       ├── _layout.tsx
│       └── register.tsx        # Pantalla de Registro interactiva
├── src/
│   ├── theme/                  # Sistema de tokens (colors, typography, spacing, radii)
│   │   ├── colors.ts           # Paleta de colores oficial (Dark Theme + Red Accent)
│   │   ├── typography.ts       # Configuración de tipografías (Space Grotesk + Inter)
│   │   ├── spacing.ts          # Escalas de espaciado y radios de borde
│   │   └── index.ts            # Exportador del tema
│   ├── components/             # Arquitectura Atomic Design
│   │   ├── ui/                 # Átomos puros: Button, Input, Text, Label, Icon
│   │   └── features/           # Organismos: LoginForm, HeroSection
│   ├── hooks/                  # Custom hooks (useAuth, useForm, use-color-scheme)
│   ├── schemas/                # Esquemas de validación Zod (auth.schema.ts)
│   └── types/                  # Tipos TypeScript (user.ts, game.ts)
├── assets/                     # Recursos gráficos e íconos
├── AGENTS.md                   # Configuración del arnés agéntico y reglas del proyecto
├── App.json / tsconfig.json    # Configuración de Expo y TypeScript estricto
└── README.md                   # Documentación oficial del proyecto
```

---

## 3. Justificación de decisiones

- **React Native + Expo SDK 54:** Permite desarrollo multiplataforma nativo (iOS, Android, Web) con un único código fuente en TypeScript, garantizando velocidad y consistencia visual.
- **Expo Router 6:** Sistema de navegación declarativa basada en archivos que simplifica el flujo de pantallas y guards de autenticación.
- **Atomic Design:** Separación clara entre componentes de UI reutilizables (`components/ui/`), componentes de feature (`components/features/`) y pantallas orquestadoras (`app/`).
- **Zod:** Validación estricta y declarativa de datos de formularios en tiempo de ejecución con inferencia de tipos TypeScript.
- **Dark Theme + Red Accent:** Réplica exacta de la identidad visual de la aplicación web original (`#0a0a0a` fondo, `#1a1a1a` tarjeta, `#dc2626` acento).
- **TypeScript Estricto (`strict: true`):** Garantiza seguridad de tipos en todo el proyecto, prohibiendo explícitamente el uso de `any`.

---

## 4. Proveedor y modelos de IA

Para la construcción asistida mediante el arnés agéntico se utilizaron los siguientes proveedores y modelos de inteligencia artificial:

- **Arnés Agéntico:** Harness especializado en desarrollo con soporte para `AGENTS.md` y reglas de contexto.
- **Modelos de IA utilizados:**
  - **Google Gemini 3.6 Flash / OpenCode:** Generación iterativa de código React Native, tipado TypeScript y componentes Atomic Design.
  - **Claude 3.5 Sonnet / Anthropic:** Auditoría de calidad de código, refactorización estricta sin `any` y formateo de documentación.

---

## 5. Constitución del arnés agéntico

El arnés agéntico se configuró mediante el archivo `AGENTS.md` en la raíz del proyecto. Este archivo actúa como la fuente de verdad que guía el comportamiento y las decisiones del agente de IA:

- **Contexto del proyecto:** Define el stack tecnológico, los colores del tema, las tipografías y el propósito de la app.
- **Reglas estrictas de código:** Prohibición absoluta de `: any` o `as any`, uso obligatorio de interfaces para props, importación con alias y manejo de validaciones con Zod.
- **Flujo de trabajo agéntico:** Instrucciones para realizar cambios incrementales, ejecutar linters (`expo lint`) y validadores de tipos (`tsc --noEmit`) antes de entregar cada entrega.
- **Definición de componentes:** Guía clara de cuándo crear un átomo (`components/ui/`), una molécula o un organismo (`components/features/`).

---

## 6. Instrucciones de ejecución

### Requisitos previos
- Node.js >= 18
- npm o Yarn
- App **Expo Go** en dispositivo móvil (opcional para pruebas en celular)

### Pasos de instalación y ejecución

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   git clone https://github.com/PROYECTOS-IPSS/GameVaultDBMobile.git
   cd GameVaultDBMobile
   npm install
   ```

2. **Iniciar el servidor de desarrollo (Metro Bundler):**
   ```bash
   npm start
   ```

3. **Elegir plataforma de visualización:**
   - **En el Navegador Web:** Presiona `w` en la terminal (o ejecuta `npm run web`). Se abrirá en `http://localhost:8081`.
   - **En Celular (Expo Go):** Escanea el código QR mostrado en la terminal desde la app Expo Go (Android) o Cámara (iOS).
   - **En Emulador Android:** Presiona `a` en la terminal (con un emulador activo).

### Solución de problemas de conexión con celular

Si al escanear el código QR desde Expo Go no conecta o muestra error de versión incompatible:

1. **Forzar modo LAN** (red local):
   ```bash
   npx expo start --lan
   ```
   Esto genera un QR con la IP local de tu máquina en vez de usar túneles de Expo.

2. **Verificar red WiFi:**
   - Tu celular y tu PC deben estar en la **misma red WiFi**.
   - Si usás red corporativa o universitaria, pueden bloquear los puertos 19000-19002.

3. **Conexión manual por URL:**
   - Copiar la URL que muestra la terminal: `exp://192.168.x.x:8081`
   - En Expo Go, tocar "Enter URL manually" y pegar la URL.

4. **Incompatibilidad de versiones:**
   - Si Expo Go dice "SDK 57 requerido" pero el proyecto usa SDK 54, el problema es que tu Expo Go es muy nuevo.
   - Opciones: actualizar el proyecto con `npx expo install expo@latest` o instalar una versión compatible de Expo Go.

4. **Credenciales de prueba para Login:**
   - **Email:** `test@test.com`
   - **Password:** `123456`
