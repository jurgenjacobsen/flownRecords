import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getAllUsers() {
        const users = await this.prisma.user.findMany();
        return users.map(({ passwordHash, ...rest }) => rest);
    }

    async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getUserByUsername(username: string) {
        const user = await this.prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
