# Hook Guidelines — web1

> Composables (Vue "hooks") for the web1 app.

---

## Current Status

**No custom composables exist yet.** The app uses Vue's built-in `ref` directly.

---

## When to Create Composables

Extract logic into composables when:
- Logic is reused across multiple components
- A component has complex stateful logic (e.g., fetching, timers, subscriptions)
- You want to unit-test logic independently

---

## Naming Convention

Composables follow the `use*` naming pattern:

```
src/composables/
├── useCounter.ts
├── useFetch.ts
└── useAuth.ts
```

---

## Composable Pattern

```typescript
// src/composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const doubled = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubled, increment }
}
```

```vue
<!-- In a component -->
<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'

const { count, doubled, increment } = useCounter()
</script>
```

---

## Anti-patterns

- **Don't** create composables for single-use logic — keep it in the component
- **Don't** make composables depend on component lifecycle — they should be pure state + logic
- **Don't** use mixins — composables are the modern replacement
