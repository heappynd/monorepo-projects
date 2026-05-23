# Directory Structure — web2

> How web2 frontend code is organized.

---

## Directory Layout

```
apps/web2/
├── src/
│   ├── main.ts              # App entry point (createApp, Pinia, Router)
│   ├── App.vue              # Root component with RouterView
│   ├── assets/              # Static assets and global CSS
│   │   ├── main.css
│   │   └── logo.svg
│   ├── components/          # Reusable components
│   │   ├── HelloWorld.vue
│   │   ├── TheWelcome.vue
│   │   ├── WelcomeItem.vue
│   │   └── icons/           # Icon components
│   │       ├── IconCommunity.vue
│   │       ├── IconDocumentation.vue
│   │       ├── IconEcosystem.vue
│   │       ├── IconSupport.vue
│   │       └── IconTooling.vue
│   ├── router/              # Vue Router configuration
│   │   └── index.ts
│   ├── stores/              # Pinia stores
│   │   └── counter.ts
│   └── views/               # Route-level components
│       ├── HomeView.vue
│       └── AboutView.vue
├── index.html
├── vite.config.ts           # Vite config with @ alias
├── eslint.config.js         # Uses @repo/eslint-config/base
├── env.d.ts                 # Vite client type declarations
└── package.json
```

---

## Path Aliases

Vite is configured with a `@` alias pointing to `src/`:

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
},
```

Usage in imports:

```typescript
import HelloWorld from '@/components/HelloWorld.vue'
```

Reference: `apps/web2/vite.config.ts`

---

## Module Organization

| Directory | Purpose | Example |
|-----------|---------|---------|
| `components/` | Reusable UI components | `HelloWorld.vue`, `WelcomeItem.vue` |
| `views/` | Route-level page components | `HomeView.vue`, `AboutView.vue` |
| `router/` | Route definitions | `index.ts` |
| `stores/` | Pinia state stores | `counter.ts` |
| `assets/` | CSS, images, fonts | `main.css`, `logo.svg` |

---

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| View component | `*View.vue` | `HomeView.vue`, `AboutView.vue` |
| Reusable component | PascalCase.vue | `HelloWorld.vue` |
| Icon component | `Icon*.vue` | `IconTooling.vue` |
| Store | camelCase.ts | `counter.ts` |
| Router config | `index.ts` | `router/index.ts` |
| Composable | `use*.ts` | `useCounter.ts` |

---

## Entry Point

The entry point sets up Vue with Pinia and Router:

```typescript
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

Reference: `apps/web2/src/main.ts`
