# Directory Structure — @repo/eslint-config

> Package layout for the shared ESLint config.

---

## Directory Layout

```
packages/eslint-config/
├── base.js              # Main config export (antfu + Vue + formatters)
├── package.json         # Package manifest with exports
└── node_modules/        # Dependencies
```

---

## Package Configuration

```json
{
  "name": "@repo/eslint-config",
  "type": "module",
  "exports": {
    "./base": "./base.js"
  }
}
```

Reference: `packages/eslint-config/package.json`

---

## Base Config

The single export `base.js` creates an `@antfu/eslint-config` instance with Vue and formatters enabled:

```javascript
import antfu from '@antfu/eslint-config'

export const config = antfu({
  formatters: true,
  vue: true,
})
```

Reference: `packages/eslint-config/base.js`

---

## Adding New Configs

When adding new config variants (e.g., `./node` for Node.js apps):

1. Create new file: `packages/eslint-config/node.js`
2. Add export in `package.json`: `"./node": "./node.js"`
3. Update this spec
4. Test against consuming apps
