# Frontend Development Guidelines — Backend

> Not applicable for this package.

---

## Status

The backend app (`apps/backend`) is a **pure NestJS API server** with no frontend code. This spec directory exists because Trellis detected the `[backend, frontend]` layer tags, but no frontend code exists in this package.

---

## What Exists

The backend has:
- NestJS controllers, services, and modules (see [Backend Guidelines](../backend/))
- Its own ESLint config (`eslint.config.mjs`) — NOT the shared `@repo/eslint-config`
- No Vue, React, or other frontend framework code

---

## If Frontend Code Is Added

If the backend package gains frontend code in the future (e.g., an admin dashboard), update this spec directory with actual conventions at that time.

Until then, all frontend guidelines are in the app-specific specs:
- [web1 Frontend Guidelines](../../web1/frontend/index.md)
- [web2 Frontend Guidelines](../../web2/frontend/index.md)
