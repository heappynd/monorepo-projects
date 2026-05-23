# Frontend Development Guidelines — web2

> Vue 3 + Vite + Router + Pinia conventions for the web2 app.

---

## Overview

`web2` is a **full-featured Vue 3 frontend app** with Vue Router for navigation and Pinia for state management. It follows the standard Vue project structure with views, router, stores, and components.

---

## Guidelines Index

| Guide | Description |
|-------|-------------|
| [Directory Structure](./directory-structure.md) | File layout with views, router, stores |
| [Component Guidelines](./component-guidelines.md) | Vue 3 Composition API patterns |
| [Hook Guidelines](./hook-guidelines.md) | Composables for shared logic |
| [State Management](./state-management.md) | Pinia store patterns |
| [Quality Guidelines](./quality-guidelines.md) | Linting and code standards |
| [Type Safety](./type-safety.md) | TypeScript in Vue components |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Vue 3 | ^3.5.32 |
| Build Tool | Vite | ^8.0.8 |
| Router | Vue Router | ^5.0.4 |
| State | Pinia | ^3.0.4 |
| Language | TypeScript | ~6.0.0 |
| Type Checking | vue-tsc | ^3.2.6 |
| Linting | @repo/eslint-config | workspace:* |
| Package Manager | pnpm | 10.0.0 |

---

## Quick Commands

```bash
# Development
pnpm --filter web2 run dev

# Build
pnpm --filter web2 run build

# Type check
pnpm --filter web2 run check-types

# Lint
pnpm --filter web2 run lint
```
