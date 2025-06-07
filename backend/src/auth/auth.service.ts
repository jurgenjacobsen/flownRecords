import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {
        
    }
    async signin(dto: AuthDto) {
        // Find user by email or username
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // If user does not exist, throw exception
        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        // Compare password with hash
        const pwMatch = await argon.verify(user.passwordHash, dto.password);

        // If password is incorrect, throw exception
        if (!pwMatch) {
            throw new ForbiddenException('Credentials incorrect');
        }

        // Return user without password
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async signup(dto: AuthDto) {
        // Generate the password hash
        const hash = await argon.hash(dto.password);
        
        try {
            // save the new user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    passwordHash: hash,
                },
                
            })

            const { passwordHash, ...userWithoutPassword } = user;

            // return the user
            return userWithoutPassword;
        } catch (e) {
            if(e instanceof PrismaClientKnownRequestError) {
                if(e.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }

            throw e;
        }
    }
}