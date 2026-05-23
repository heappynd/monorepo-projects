# Database Guidelines

> Database patterns and conventions for this project.

---

## Current Status

**No database is currently configured.** The backend is a scaffolded NestJS application with no ORM or database connection.

---

## When Adding a Database

Recommended stack for this project:

| Concern | Recommended | Why |
|---------|------------|-----|
| ORM | TypeORM or Prisma | NestJS has first-class TypeORM integration; Prisma is also popular |
| Database | PostgreSQL | Common choice for NestJS projects |
| Migrations | ORM CLI | Both TypeORM and Prisma have migration CLIs |

---

## NestJS + TypeORM Pattern (Reference)

If TypeORM is chosen, the pattern is:

```typescript
// app.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
  ],
})
export class AppModule {}
```

```typescript
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Entity | PascalCase, singular | `User`, `Post` |
| Table | snake_case, plural | `users`, `posts` |
| Column | snake_case | `created_at`, `user_id` |
| Migration | timestamp prefix | `1234567890-CreateUsers.ts` |

---

## Common Mistakes

- **Using `synchronize: true` in production**: Always use migrations in production
- **N+1 queries**: Use `relations` or `JOIN` to fetch related data in one query
- **Missing indexes**: Add indexes on frequently queried columns
- **Storing secrets in code**: Use environment variables for connection strings
