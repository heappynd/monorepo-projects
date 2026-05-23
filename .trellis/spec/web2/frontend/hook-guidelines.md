# Hook Guidelines — web2

> Composables (Vue "hooks") for the web2 app.

---

## Current Status

**No custom composables exist yet.** The app uses Pinia for shared state and Vue's built-in reactivity APIs directly.

---

## When to Create Composables

Extract logic into composables when:
- Logic is reused across multiple components
- A component has complex stateful logic (fetching, timers, subscriptions)
- You want to unit-test logic independently
- Logic doesn't belong in a Pinia store (not global state)

---

## Naming Convention

Composables follow the `use*` pattern:

```
src/composables/
├── useFetch.ts
├── useAuth.ts
└── useForm.ts
```

---

## Composable Pattern

```typescript
// src/composables/useFetch.ts
import { ref } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function execute() {
    loading.value = true
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, execute }
}
```

---

## Composables vs Pinia Stores

| Concern | Solution |
|---------|----------|
| Global app state (auth, theme) | Pinia store |
| Shared UI logic (form validation) | Composable |
| Component-specific logic | Keep in component |
| Server state caching | Pinia store or composable |

---

## Anti-patterns

- **Don't** create composables for single-use logic
- **Don't** make composables depend on component lifecycle
- **Don't** use mixins — composables are the replacement
