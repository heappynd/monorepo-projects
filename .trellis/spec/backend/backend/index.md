# Backend Development Guidelines

> NestJS backend conventions for this Turborepo project.

---

## Overview

The backend app (`apps/backend`) is a **NestJS 11** application using Express under the hood. It follows the standard NestJS module-controller-service architecture with TypeScript.

---

## Guidelines Index

| Guide | Description |
|-------|-------------|
| [Directory Structure](./directory-structure.md) | NestJS module organization and file layout |
| [Error Handling](./error-handling.md) | NestJS exception filters and error patterns |
| [Quality Guidelines](./quality-guidelines.md) | Linting, testing, and code standards |
| [Logging Guidelines](./logging-guidelines.md) | NestJS built-in Logger usage |
| [Database Guidelines](./database-guidelines.md) | Not applicable — no database currently configured |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | NestJS | ^11.0.1 |
| HTTP Platform | Express | ^5.0.0 (via @nestjs/platform-express) |
| Language | TypeScript | ^5.7.3 |
| Testing | Jest | ^30.0.0 |
| E2E Testing | Supertest | ^7.0.0 |
| Linting | ESLint + Prettier | ^9.18.0 |
| Package Manager | pnpm | 10.0.0 |

---

## Quick Commands

```bash
# Development
pnpm --filter backend run start:dev

# Build
pnpm --filter backend run build

# Unit tests
pnpm --filter backend run test

# E2E tests
pnpm --filter backend run test:e2e

# Lint
pnpm --filter backend run lint

# Type check
pnpm --filter backend run check-types
```

---

## Key Conventions

- Use **NestJS CLI** (`nest generate`) for scaffolding modules, controllers, services
- Controllers handle HTTP routing only; business logic belongs in services
- Use **dependency injection** via constructor injection (NestJS default)
- Unit tests live beside source files as `*.spec.ts`
- E2E tests live in `test/` directory
