# Type Safety — web1

> TypeScript patterns in the web1 Vue app.

---

## Overview

web1 uses **TypeScript ~6.0.2** with **vue-tsc ^3.2.8** for type checking Vue single-file components.

---

## Component Props

Always use the type-based `defineProps`:

```vue
<script setup lang="ts">
// ✅ Correct — type-based props
defineProps<{
  msg: string
  count?: number
  items?: string[]
}>()
</script>
```

```vue
<script setup lang="ts">
// ❌ Avoid — runtime declaration (less type-safe)
defineProps({
  msg: String,
  count: Number,
})
</script>
```

---

## Refs and Reactivity

Type inference works well with `ref`; explicit types when needed:

```typescript
import { ref, computed } from 'vue'

// Type inferred as Ref<number>
const count = ref(0)

// Explicit type for complex cases
interface User {
  id: number
  name: string
}
const user = ref<User | null>(null)
```

---

## Event Handling

Type events in template handlers:

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

The app uses three TypeScript configs:
- `tsconfig.json` — base config referencing the others
- `tsconfig.app.json` — app source code (Vue components, TS files)
- `tsconfig.node.json` — Node environment (Vite config files)

---

## Common Mistakes

- **Not running `check-types`**: Always run `pnpm --filter web1 run check-types` before committing
- **Using `any`**: The lint config may allow it, but prefer proper types
- **Missing `lang="ts"`**: Always include `lang="ts"` in `<script setup>`
