# Type Safety — web2

> TypeScript patterns in the web2 Vue app.

---

## Overview

web2 uses **TypeScript ~6.0.0** with **vue-tsc ^3.2.6** for type checking.

---

## Component Props

Use type-based `defineProps`:

```vue
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>
```

Reference: `apps/web2/src/components/HelloWorld.vue`

---

## Pinia Store Typing

TypeScript infers types from `ref` and `computed` in stores:

```typescript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)                    // Ref<number>
  const doubleCount = computed(() => count.value * 2)  // ComputedRef<number>

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

Reference: `apps/web2/src/stores/counter.ts`

---

## Router Typing

Route params are typed by convention. For typed routes:

```typescript
// Define route param types
interface RouteParams {
  id: string
}

// In component
const route = useRoute()
const id = route.params.id as string  // Type assertion needed for dynamic params
```

---

## Path Alias Imports

Use `@/` for consistent imports:

```typescript
// ✅ Correct
import HelloWorld from '@/components/HelloWorld.vue'
import { useCounterStore } from '@/stores/counter'

// ❌ Avoid — fragile relative paths
import HelloWorld from '../../../components/HelloWorld.vue'
```

---

## Event Typing

Type event handlers:

```vue
<script setup lang="ts">
function handleClick(event: MouseEvent) {
  console.log(event.target)
}
</script>

<template>
  <button @click="handleClick">Click</button>
</template>
```

---

## tsconfig Setup

- `tsconfig.json` — base config
- `tsconfig.app.json` — app source (Vue + TS)
- `tsconfig.node.json` — Vite config environment

---

## Common Mistakes

- **Not running `check-types`**: Always run `pnpm --filter web2 run check-types` before committing
- **Missing `lang="ts"`**: Always include in `<script setup>`
- **Untyped route params**: Use type assertions or a typed route composable
