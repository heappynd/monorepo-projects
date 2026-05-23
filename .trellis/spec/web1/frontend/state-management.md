# State Management — web1

> How state is managed in the web1 app.

---

## Current Approach

web1 uses **local component state only** with Vue's `ref()`. There is no global state management library.

---

## Pattern

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

## When to Add Global State

Consider adding Pinia when:
- Multiple unrelated components need the same data
- State needs to persist across route changes (if router is added)
- Complex state logic needs to be shared and tested

---

## State Patterns to Use

| Need | Solution |
|------|----------|
| Component-local state | `ref()` / `reactive()` |
| Shared state between parent/child | Props + emits |
| Shared state between unrelated components | Composable with `ref()` (lightweight) or Pinia (if complex) |
| Persistent state | `localStorage` + `ref()` or Pinia plugin |

---

## Anti-patterns

- **Don't** use Vuex — it's the legacy Vue 2 state library
- **Don't** use `provide/inject` for general state sharing — it's for dependency injection
- **Don't** mutate props directly — use emits to communicate changes upward
