# Component Guidelines — @repo/eslint-config

> Vue component linting rules in the shared ESLint config.

---

## Overview

The shared config enables `eslint-plugin-vue` with Vue 3 recommended rules, enforcing consistent component patterns across all frontend apps.

---

## Enforced Vue Rules

### Component Structure

- **`<script setup>` required**: The config prefers Composition API with `<script setup>` over Options API
- **Single-file component order**: Script → Template → Style (configurable)
- **Component naming**: PascalCase for component names and filenames

### Template Rules

- **No text interpolation in `<template>`**: Use `{{ }}` only for data binding
- **Self-closing components**: Empty components should be self-closing
- **Attribute quoting**: Consistent quote style in templates

### Props

- **Type-based `defineProps`**: Prefer `defineProps<T>()` over runtime declaration
- **Required props**: Should be explicitly marked

---

## Recommended Patterns

```vue
<!-- ✅ Correct — Composition API with script setup -->
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>{{ msg }}</div>
</template>

<style scoped>
/* styles */
</style>
```

```vue
<!-- ❌ Avoid — Options API -->
<script lang="ts">
export default {
  props: {
    msg: String,
  },
}
</script>
```

---

## Linting Vue Files

The shared config handles `.vue` files automatically via `eslint-plugin-vue`:

```bash
# Lint all Vue files in an app
pnpm --filter web1 run lint
pnpm --filter web2 run lint
```

---

## Common Violations

| Violation | Fix |
|-----------|-----|
| Options API usage | Convert to `<script setup>` |
| Missing `lang="ts"` | Add `lang="ts"` to `<script>` |
| Unscoped styles | Add `scoped` to `<style>` |
| Inline complex logic | Extract to method or composable |
