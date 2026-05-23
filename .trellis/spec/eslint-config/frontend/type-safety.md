# Type Safety — @repo/eslint-config

> TypeScript linting rules in the shared ESLint config.

---

## Overview

The shared config includes `typescript-eslint` for type-aware linting of `.ts` and `.vue` files.

---

## TypeScript Rules

The `@antfu/eslint-config` base enables these TypeScript patterns:

### Enforced

- **No unused variables**: Catches typos and dead code
- **Consistent type imports**: Use `import type` for type-only imports
- **No explicit `any`**: Warns on `any` usage (configurable per app)
- **Strict null checks**: Aligns with TypeScript's strict mode

### Relaxed

- `@typescript-eslint/no-explicit-any`: May be off in some configs — check `@antfu/eslint-config` defaults
- `@typescript-eslint/no-floating-promises`: Depends on config variant

---

## Type Import Convention

Use `import type` for type-only imports:

```typescript
// ✅ Correct — type-only import
import type { User } from './types'

// ✅ Also correct — value import
import { createUser } from './users'

// ❌ Avoid — importing type without `type` keyword
import { User } from './types'  // Only used as a type
```

---

## Vue + TypeScript

The config enables Vue's TypeScript support for `<script setup lang="ts">`:

- Props typed with `defineProps<T>()`
- Emits typed with `defineEmits<T>()`
- Template type checking via `vue-tsc`

---

## App-Specific Overrides

Apps can relax TypeScript rules if needed:

```javascript
// apps/some-app/eslint.config.js
import { config } from '@repo/eslint-config/base'

export default [
  ...config,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
```

---

## Verification

```bash
# Lint specific app
pnpm --filter web1 run lint

# Type check (separate from ESLint)
pnpm --filter web1 run check-types
```

Note: ESLint type rules and `vue-tsc` are complementary — run both.
