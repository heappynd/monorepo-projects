# Frontend Development Guidelines — web1

> Vue 3 + Vite conventions for the web1 app.

---

## Overview

`web1` is a **simple Vue 3 frontend app** built with Vite. It uses the Composition API with `<script setup>` syntax and has no router or state management library.

---

## Guidelines Index

| Guide | Description |
|-------|-------------|
| [Directory Structure](./directory-structure.md) | File layout and organization |
| [Component Guidelines](./component-guidelines.md) | Vue 3 Composition API patterns |
| [Hook Guidelines](./hook-guidelines.md) | Composables (not applicable — no custom composables yet) |
| [State Management](./state-management.md) | Local state with `ref` / `reactive` |
| [Quality Guidelines](./quality-guidelines.md) | Linting and code standards |
| [Type Safety](./type-safety.md) | TypeScript in Vue components |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Vue 3 | ^3.5.34 |
| Build Tool | Vite | ^8.0.12 |
| Language | TypeScript | ~6.0.2 |
| Type Checking | vue-tsc | ^3.2.8 |
| Linting | @repo/eslint-config | workspace:* |
| Package Manager | pnpm | 10.0.0 |

---

## Quick Commands

```bash
# Development
pnpm --filter web1 run dev

# Build
pnpm --filter web1 run build

# Type check
pnpm --filter web1 run check-types

# Lint
pnpm --filter web1 run lint
```
