# Directory Structure

> How backend code is organized in this project.

---

## Overview

The backend follows **standard NestJS conventions**. All source code lives under `src/`, with the entry point at `main.ts`. Modules group related controllers and services.

---

## Directory Layout

```
apps/backend/
├── src/
│   ├── main.ts                    # Application entry point (bootstrap)
│   ├── app.module.ts              # Root module
│   ├── app.controller.ts          # Root controller (HTTP routes)
│   ├── app.service.ts             # Root service (business logic)
│   ├── app.controller.spec.ts     # Unit test for root controller
│   └── [feature].module.ts        # Feature modules (when added)
├── test/
│   ├── app.e2e-spec.ts            # E2E tests
│   └── jest-e2e.json              # E2E Jest config
├── nest-cli.json                  # NestJS CLI config
├── tsconfig.json                  # TypeScript config
├── tsconfig.build.json            # Build-specific TS config
├── eslint.config.mjs              # ESLint config (standalone, not shared)
└── package.json
```

---

## Module Organization

Each feature module should follow this pattern:

```
src/
├── feature/
│   ├── feature.module.ts          # Module definition
│   ├── feature.controller.ts      # HTTP routes
│   ├── feature.service.ts         # Business logic
│   ├── feature.controller.spec.ts # Unit tests
│   └── dto/
│       └── create-feature.dto.ts  # Data transfer objects
```

---

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Module | `<name>.module.ts` | `app.module.ts` |
| Controller | `<name>.controller.ts` | `app.controller.ts` |
| Service | `<name>.service.ts` | `app.service.ts` |
| Unit test | `<name>.controller.spec.ts` | `app.controller.spec.ts` |
| E2E test | `<name>.e2e-spec.ts` | `app.e2e-spec.ts` |
| DTO | `<action>-<name>.dto.ts` | `create-user.dto.ts` |

---

## Entry Point Pattern

The `main.ts` bootstrap function:
- Creates the NestJS app from the root module
- Listens on `process.env.PORT ?? 3000`
- Reference: `apps/backend/src/main.ts`

---

## Example: Root Module

Reference: `apps/backend/src/app.module.ts`

The root module imports feature modules and registers controllers + providers. Keep the root module as the aggregation point; don't put business logic in it.
