import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { parseCsv } from './util';
import { LogbookEntries } from '@prisma/client';
import { connect } from 'http2';

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
            include: {
                logbookEntries: true,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }

        const { passwordHash, ...rest } = user;
        return user;
    }

    async getUserByUsername(username: string) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            include: {
                logbookEntries: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const { passwordHash, ...rest } = user;
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                logbookEntries: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const { passwordHash, ...rest } = user;
        return user;
    }

    async getLogbook(userId: number) {
        const logbook = await this.prisma.logbookEntries
        .findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
            include: {
                user: true,
            }
        });

        // Ensure to remove sensitive data like passwordHash
        return logbook.map(entry => {
            const { passwordHash, ...rest } = entry.user;
            return {
                ...entry,
                user: rest,
            };
        });
    }

    async updateLogbook(userId: number, data: any) {
        const buffer = data.buffer;
        if(!buffer) {
            throw new Error('No file data provided');
        }

        let parsed = await parseCsv(buffer, userId);

        if (!Array.isArray(parsed) || parsed.length === 0) {
            throw new Error('No valid logbook entries found in the file');
        }

        // Add each entry to the database but ensure to handle duplicates
        const responses: LogbookEntries[] = []
        for (const entry of parsed) {
            try {
                let response = await this.prisma.logbookEntries.create({
                    data: {
                        ...entry,
                        user: {
                            connect: { id: userId },
                        }
                    },
                })
                .catch((e) => {
                    if (e.code !== 'P2002') {
                        console.error('Error inserting logbook entry:', e);
                    }
                });
                if (response) {
                    responses.push(response);
                }
            } catch (error) {
                // Handle duplicate entries or other errors gracefully
                console.error('Error inserting logbook entry:', error);
            }
        }


        return responses;
    }
}
