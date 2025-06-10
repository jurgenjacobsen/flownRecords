import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { csvFilter } from './util';

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
    
    @Get('logbook')
    getLogbook(@GetUser() user: User) {
        return this.userService.getLogbook(user.id);
    }

    @HttpCode(HttpStatus.OK)
    @Post('logbook/update')
    @UseInterceptors(
        FileInterceptor('file', { fileFilter: csvFilter } )
    )
    updateLogbook(@GetUser() user: User, @UploadedFile() file: Express.Multer.File) {
        return this.userService.updateLogbook(user.id, file);
    }

    @Get(':username')
    getUserByUsername(@Req() req) {
        const username = req.params.username;
        return this.userService.getUserByUsername(username);
    }

}
