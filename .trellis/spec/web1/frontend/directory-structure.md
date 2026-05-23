# Directory Structure — web1

> How web1 frontend code is organized.

---

## Directory Layout

```
apps/web1/
├── src/
│   ├── main.ts              # App entry point (createApp + mount)
│   ├── App.vue              # Root component
│   ├── style.css            # Global styles
│   ├── assets/              # Static assets (images, icons)
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   └── components/          # Vue components
│       └── HelloWorld.vue   # Main display component
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── tsconfig.app.json        # App-specific TS config
├── tsconfig.node.json       # Node-specific TS config (Vite config)
├── eslint.config.js         # Uses @repo/eslint-config/base
└── package.json
```

---

## Module Organization

This is a simple app — components live in `src/components/`. As the app grows:

```
src/
├── components/              # Shared/reusable components
├── views/                   # Page-level components (if router added)
├── composables/             # Vue composables (shared logic)
├── assets/                  # Static assets
└── utils/                   # Utility functions
```

---

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Component | PascalCase.vue | `HelloWorld.vue` |
| Composable | useCamelCase.ts | `useCounter.ts` |
| Asset | lowercase-with-dashes | `hero.png` |
| Style | camelCase or kebab-case | `style.css` |

---

## Entry Point

`main.ts` creates the Vue app and mounts it:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
```

Reference: `apps/web1/src/main.ts`
