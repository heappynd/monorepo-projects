# Component Guidelines — web1

> Vue 3 component patterns for the web1 app.

---

## Overview

All components use **Vue 3 Composition API** with `<script setup lang="ts">` syntax. This is the preferred and idiomatic pattern.

---

## Component Pattern

### Script Setup (Required)

All components must use `<script setup lang="ts">`:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Count is {{ count }}</button>
</template>
```

Reference: `apps/web1/src/components/HelloWorld.vue`

---

## Props

Use TypeScript-based prop declarations with `defineProps`:

```vue
<script setup lang="ts">
defineProps<{
  msg: string
  count?: number
}>()
</script>
```

---

## Component Structure

Follow this order in `.vue` files:

1. `<script setup lang="ts">` — logic
2. `<template>` — markup
3. `<style scoped>` — styles (optional, use `scoped` by default)

---

## File Organization

- One component per file
- Components in `src/components/`
- Use PascalCase for component filenames: `HelloWorld.vue`, not `hello-world.vue`

---

## Anti-patterns

- **Don't** use Options API — always use Composition API with `<script setup>`
- **Don't** use `this` — `<script setup>` doesn't have it
- **Don't** use global component registration — import components explicitly
- **Don't** use unscoped styles unless intentionally global

---

## Current Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `HelloWorld.vue` | `src/components/` | Main display component with counter |
| `App.vue` | `src/` | Root component, imports HelloWorld |
