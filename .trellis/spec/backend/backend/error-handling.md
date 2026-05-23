# Error Handling

> How errors are handled in the NestJS backend.

---

## Overview

The backend uses **NestJS built-in exception handling**. Currently there are no custom exception filters or custom error classes — the default NestJS behavior is used.

---

## Error Types

NestJS provides built-in HTTP exceptions. Use these directly:

```typescript
import { NotFoundException, BadRequestException } from '@nestjs/common';

// 404 Not Found
throw new NotFoundException('User not found');

// 400 Bad Request
throw new BadRequestException('Invalid input');
```

Common exceptions:
- `BadRequestException` (400)
- `UnauthorizedException` (401)
- `ForbiddenException` (403)
- `NotFoundException` (404)
- `InternalServerErrorException` (500)

---

## Error Handling Patterns

### Controller-level

Controllers should let service methods throw; NestJS automatically catches exceptions and returns proper HTTP responses.

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id); // Service throws NotFoundException if not found
  }
}
```

### Service-level

Services throw NestJS exceptions when business rules are violated:

```typescript
@Injectable()
export class UsersService {
  findOne(id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}
```

---

## API Error Responses

NestJS default error response format:

```json
{
  "statusCode": 404,
  "message": "User #123 not found",
  "error": "Not Found"
}
```

No custom error response format is currently configured.

---

## Common Mistakes

- **Catching errors too early**: Let NestJS handle the exception-to-response mapping; don't catch and re-wrap unnecessarily
- **Returning raw errors**: Never return stack traces or internal details to the client in production
- **Missing error propagation**: Services should throw, not return `null` silently when a resource isn't found

---

## Future Improvements

When the app grows, consider:
- Custom `ExceptionFilter` for standardized error responses
- Custom error classes for domain-specific errors
- Global validation pipe with `class-validator`
