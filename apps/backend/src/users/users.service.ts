import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { users, type User } from '../database/schema';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findById(id: number): Promise<User> {
    const user = await this.databaseService.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.databaseService.db.query.users.findFirst({
      where: eq(users.username, username),
    });
  }

  async updateProfile(
    id: number,
    data: { nickname?: string; email?: string },
  ): Promise<User> {
    const [user] = await this.databaseService.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.findById(id);
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Current password is incorrect');
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await this.databaseService.db
      .update(users)
      .set({ passwordHash: newPasswordHash, updatedAt: new Date() })
      .where(eq(users.id, id));
  }
}
