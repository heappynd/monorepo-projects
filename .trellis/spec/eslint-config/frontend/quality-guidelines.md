# Quality Guidelines — @repo/eslint-config

> ESLint rules enforced by the shared config.

---

## Overview

The shared config uses `@antfu/eslint-config` which provides **opinionated defaults** for Vue + TypeScript projects. Key features:

- TypeScript ESLint rules
- Vue 3 recommended rules
- Prettier formatting via `eslint-plugin-format`
- Consistent import ordering

---

## Enabled Rule Sets

| Rule Set | Source | Purpose |
|----------|--------|---------|
| TypeScript | `typescript-eslint` | Type-aware linting for `.ts` files |
| Vue | `eslint-plugin-vue` | Vue 3 SFC and template rules |
| Formatters | `eslint-plugin-format` | Prettier integration for formatting |

---

## What's Enforced

### TypeScript

- Strict type checking rules
- No unused variables
- Consistent type imports
- Proper module boundaries

### Vue

- `<script setup>` preferred over Options API
- Component naming conventions
- Template directive consistency
- Props validation

### Formatting

- Prettier formatting applied via ESLint
- Consistent quotes, semicolons, indentation

---

## What's NOT Enforced (by default)

- Testing rules (no `eslint-plugin-vitest` or similar)
- Accessibility rules (no `eslint-plugin-jsx-a11y`)
- Import sorting (antfu config has its own conventions)

---

## Modifying Rules

### Adding Rules to the Shared Config

Edit `packages/eslint-config/base.js`:

```javascript
import antfu from '@antfu/eslint-config'

export const config = antfu({
  formatters: true,
  vue: true,
  rules: {
    // Add custom rules here
    'no-console': 'warn',
  },
})
```

### Per-App Overrides

If an app needs different rules, add them in the app's `eslint.config.js` AFTER importing the base:

```javascript
import { config } from '@repo/eslint-config/base'

export default [
  ...config,
  {
    rules: {
      // App-specific overrides
    },
  },
]
```

---

## Verification

Lint all frontend apps:

```bash
pnpm --filter web1 run lint
pnpm --filter web2 run lint
```
