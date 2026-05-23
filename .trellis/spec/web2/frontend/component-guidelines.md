# Component Guidelines — web2

> Vue 3 component patterns for the web2 app.

---

## Overview

All components use **Vue 3 Composition API** with `<script setup lang="ts">` syntax.

---

## Component Types

### View Components (`views/`)

Route-level components that represent pages. Use the `*View.vue` naming convention.

```vue
<!-- views/HomeView.vue -->
<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
```

Reference: `apps/web2/src/views/HomeView.vue`

### Reusable Components (`components/`)

Presentational components that can be used anywhere. Use PascalCase naming.

```vue
<!-- components/HelloWorld.vue -->
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>
```

Reference: `apps/web2/src/components/HelloWorld.vue`

### Layout Components

Components like `WelcomeItem.vue` that provide structure with slots:

```vue
<!-- components/WelcomeItem.vue -->
<template>
  <div class="item">
    <i><slot name="icon" /></i>
    <div class="details">
      <h3><slot name="heading" /></h3>
      <slot />
    </div>
  </div>
</template>
```

Reference: `apps/web2/src/components/WelcomeItem.vue`

---

## Props

Use TypeScript-based `defineProps`:

```vue
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>
```

---

## Slots

Use named slots for flexible component composition:

```vue
<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>
      Documentation
    </template>
    Content goes here...
  </WelcomeItem>
</template>
```

---

## Component Structure Order

1. `<script setup lang="ts">`
2. `<template>`
3. `<style scoped>`

---

## Anti-patterns

- **Don't** use Options API
- **Don't** put route-level logic in `components/` — use `views/` for that
- **Don't** use global component registration
- **Don't** use unscoped styles unless intentionally global
