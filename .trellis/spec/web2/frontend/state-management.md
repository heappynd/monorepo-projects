# State Management — web2

> Pinia store patterns for the web2 app.

---

## Overview

web2 uses **Pinia ^3.0.4** for global state management. Stores are defined using the Composition API style with `defineStore`.

---

## Store Pattern

Use the **Composition API style** (setup function) for stores:

```typescript
// stores/counter.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

Reference: `apps/web2/src/stores/counter.ts`

---

## Store Conventions

| Rule | Example |
|------|---------|
| File name | `camelCase.ts` (`counter.ts`, `userAuth.ts`) |
| Store ID | Match file name: `'counter'` |
| Export name | `use*Store` pattern: `useCounterStore` |
| Location | `src/stores/` |

---

## Using Stores in Components

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <button @click="counter.increment()">
    Count: {{ counter.count }} (double: {{ counter.doubleCount }})
  </button>
</template>
```

---

## Store Structure

State → Computed → Actions:

```typescript
export const useExampleStore = defineStore('example', () => {
  // 1. State (ref)
  const items = ref<Item[]>([])

  // 2. Computed (computed)
  const itemCount = computed(() => items.value.length)

  // 3. Actions (functions)
  function addItem(item: Item) {
    items.value.push(item)
  }

  return { items, itemCount, addItem }
})
```

---

## When to Use a Store

- **Global state** shared across multiple views/components
- **Persistent state** (user auth, preferences)
- **Server state** that needs caching
- **Complex state logic** with multiple computed properties

---

## Anti-patterns

- **Don't** use Vuex — Pinia is the official Vue 3 state library
- **Don't** put component-local state in stores — use `ref()` in the component
- **Don't** mutate store state outside actions (when using Options API style)
- **Don't** create stores for simple cross-component communication — use props/emits or composables
