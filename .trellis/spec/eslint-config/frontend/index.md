# Shared ESLint Config Guidelines

> Conventions for the `@repo/eslint-config` shared package.

---

## Overview

`@repo/eslint-config` (`packages/eslint-config`) provides **shared ESLint configuration** for all frontend apps in this Turborepo. It uses `@antfu/eslint-config` as the base with Vue and formatter support.

---

## Guidelines Index

| Guide | Description |
|-------|-------------|
| [Directory Structure](./directory-structure.md) | Package layout |
| [Quality Guidelines](./quality-guidelines.md) | ESLint rules and enforcement |
| [Type Safety](./type-safety.md) | TypeScript linting rules |
| [Component Guidelines](./component-guidelines.md) | Vue component linting rules |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Base Config | @antfu/eslint-config | ^9.0.0 |
| Vue Plugin | eslint-plugin-vue | ^10.9.1 |
| TypeScript | typescript-eslint | ^8.59.4 |
| Formatters | eslint-plugin-format | ^2.0.1 |
| ESLint | ESLint | ^10.4.0 |

---

## Usage

### In Frontend Apps

```javascript
// eslint.config.js
import { config } from '@repo/eslint-config/base'
export default config
```

Apps using this config: `web1`, `web2`

### Export Path

```json
{
  "exports": {
    "./base": "./base.js"
  }
}
```

Import as: `@repo/eslint-config/base`

---

## Key Conventions

- **Do not** create app-specific ESLint overrides — contribute rules back to this shared config instead
- **Do not** modify the base config without testing against all consuming apps
- The backend does NOT use this config — it has its own standalone ESLint setup
