# Quality Guidelines — web1

> Code quality standards for the web1 frontend.

---

## Linting Setup

web1 uses the **shared `@repo/eslint-config`** package with `@antfu/eslint-config`. Reference: `apps/web1/eslint.config.js`

```javascript
import { config } from '@repo/eslint-config/base'
export default config
```

The shared config enables:
- Vue + TypeScript ESLint rules
- Prettier formatting via `eslint-plugin-format`
- Opinionated defaults from `@antfu/eslint-config`

---

## Required Patterns

### Component Style

- Use `<script setup lang="ts">` for all components
- Use `ref()` for reactive state
- Import components explicitly (no global registration)

### TypeScript

- All `.ts` and `.vue` files must type-check with `vue-tsc`
- Use explicit types for function parameters and return values
- Prefer `interface` over `type` for object shapes

---

## Forbidden Patterns

- **No Options API** — use Composition API only
- **No `any` type** — use proper types or `unknown`
- **No `console.log`** in production code — remove or use a logger
- **No unscoped styles** in components — use `scoped` unless intentionally global
- **No inline event handlers with complex logic** — extract to methods

---

## Verification Commands

```bash
# Lint (auto-fix)
pnpm --filter web1 run lint

# Type check
pnpm --filter web1 run check-types

# Build (catches most errors)
pnpm --filter web1 run build
```

---

## Code Review Checklist

- [ ] Component uses `<script setup lang="ts">`
- [ ] No `any` types
- [ ] Styles are scoped
- [ ] Lint passes
- [ ] Type check passes
