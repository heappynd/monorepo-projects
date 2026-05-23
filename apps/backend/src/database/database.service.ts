import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public db: ReturnType<typeof drizzle<typeof schema>>;
  private client: postgres.Sql;

  constructor(private readonly configService: ConfigService) {
    const connectionString =
      this.configService.getOrThrow<string>('DATABASE_URL');
    this.client = postgres(connectionString);
    this.db = drizzle(this.client, { schema });
  }

  async onModuleInit() {
    // Verify database connection on startup
    await this.client`SELECT 1`;
  }
}
