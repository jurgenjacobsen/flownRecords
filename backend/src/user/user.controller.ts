import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @Get('all')
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':username')
    getUserByUsername(@Req() req) {
        const username = req.params.username;
        return this.userService.getUserByUsername(username);
    }
}
