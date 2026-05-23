# Quality Guidelines

> Code quality standards for the NestJS backend.

---

## Overview

The backend uses **ESLint + Prettier** for code quality. It has its own standalone ESLint config (not the shared `@repo/eslint-config`).

---

## Linting Setup

The backend uses `typescript-eslint` with `eslint-plugin-prettier`. Reference: `apps/backend/eslint.config.mjs`

Key rules:
- `@typescript-eslint/no-explicit-any`: **off** (allowed for now)
- `@typescript-eslint/no-floating-promises`: **warn**
- `@typescript-eslint/no-unsafe-argument`: **warn**
- `prettier/prettier`: **error** (enforced formatting)

---

## Required Patterns

### Dependency Injection

Always use constructor injection for NestJS providers:

```typescript
@Injectable()
export class AppService {
  // ✅ Correct — constructor injection
  constructor(private readonly configService: ConfigService) {}
}
```

### Module Registration

Every controller and service must be registered in its module:

```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

### Unit Testing

Unit tests use `@nestjs/testing` `Test.createTestingModule`:

```typescript
// Reference: apps/backend/src/app.controller.spec.ts
const app: TestingModule = await Test.createTestingModule({
  controllers: [AppController],
  providers: [AppService],
}).compile();
```

---

## Forbidden Patterns

- **Don't** import from `@nestjs/common` in test files — use `@nestjs/testing` instead
- **Don't** put business logic in controllers — delegate to services
- **Don't** use `any` type when a specific type is available (rule is off but still best practice)
- **Don't** leave floating promises unhandled — always `await` or `.catch()`

---

## Testing Requirements

| Type | Tool | Config | Location |
|------|------|--------|----------|
| Unit | Jest + ts-jest | `package.json` jest field | `src/**/*.spec.ts` |
| E2E | Jest + Supertest | `test/jest-e2e.json` | `test/*.e2e-spec.ts` |

Run commands:
```bash
pnpm --filter backend run test          # Unit tests
pnpm --filter backend run test:e2e      # E2E tests
pnpm --filter backend run test:cov      # Coverage
```

---

## Code Review Checklist

- [ ] Controller methods delegate to services
- [ ] Services use proper NestJS exceptions for error cases
- [ ] New providers are registered in their module
- [ ] Unit tests cover the happy path
- [ ] E2E tests cover the API endpoint
- [ ] No `console.log` — use NestJS Logger if needed
