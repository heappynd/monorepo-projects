# Logging Guidelines

> How logging is done in the NestJS backend.

---

## Overview

The backend uses **NestJS built-in Logger** (`@nestjs/common`). No external logging library is currently configured.

---

## Log Levels

NestJS Logger provides these levels:

| Level | Method | When to Use |
|-------|--------|-------------|
| `log` | `logger.log()` | Normal operations, successful actions |
| `error` | `logger.error()` | Unhandled errors, failures |
| `warn` | `logger.warn()` | Recoverable issues, deprecations |
| `debug` | `logger.debug()` | Development-only detailed info |
| `verbose` | `logger.verbose()` | Very detailed tracing |

---

## Usage Pattern

### In Services

```typescript
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('getHello called');
    return 'Hello World!';
  }
}
```

### In Controllers

```typescript
import { Controller, Logger } from '@nestjs/common';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
}
```

---

## What to Log

- Service method entry for important operations
- External API calls and their results
- Errors that are caught and handled
- Startup and shutdown events

---

## What NOT to Log

- **PII**: User emails, passwords, tokens
- **Secrets**: API keys, database credentials
- **Request bodies** in full (log summary only)
- **Verbose data** in production (use `debug` level)

---

## Common Mistakes

- **Using `console.log`**: Always use NestJS `Logger` for consistency and log level control
- **Logging in hot paths**: Avoid logging inside tight loops or frequently-called methods
- **Missing context**: Always include the class name via `new Logger(ClassName.name)`
