# Quality Guidelines — web2

> Code quality standards for the web2 frontend.

---

## Linting Setup

web2 uses the **shared `@repo/eslint-config`** package with `@antfu/eslint-config`. Reference: `apps/web2/eslint.config.js`

```javascript
import { config } from '@repo/eslint-config/base'
export default config
```

---

## Required Patterns

### Component Style

- Use `<script setup lang="ts">` for all components
- Use Composition API exclusively
- Import components with `@/` alias

### Router

- Use `RouterLink` for navigation (not `<a>` tags for internal links)
- Lazy-load routes with dynamic imports for code splitting:

```typescript
{
  path: '/about',
  component: () => import('../views/AboutView.vue'),
}
```

Reference: `apps/web2/src/router/index.ts`

### Stores

- Use Composition API style (`defineStore` with setup function)
- Export store as `use*Store` named export
- Keep stores in `src/stores/`

---

## Forbidden Patterns

- **No Options API** — use Composition API only
- **No `any` type** — use proper types or `unknown`
- **No `console.log`** in production code
- **No unscoped styles** in components unless intentionally global
- **No `<a>` tags for internal navigation** — use `RouterLink`
- **No global component registration** — import explicitly

---

## Verification Commands

```bash
# Lint (auto-fix)
pnpm --filter web2 run lint

# Type check
pnpm --filter web2 run check-types

# Build
pnpm --filter web2 run build
```

---

## Code Review Checklist

- [ ] Component uses `<script setup lang="ts">`
- [ ] No `any` types
- [ ] Styles are scoped
- [ ] Internal links use `RouterLink`
- [ ] Global state uses Pinia (not provide/inject)
- [ ] Lint passes
- [ ] Type check passes
