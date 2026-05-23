import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: { user: { sub: number } }) {
    return this.usersService.findById(req.user.sub);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  updateProfile(
    @Request() req: { user: { sub: number } },
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.sub, updateProfileDto);
  }

  @Patch('me/password')
  @UseGuards(AuthGuard)
  changePassword(
    @Request() req: { user: { sub: number } },
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(
      req.user.sub,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }
}
