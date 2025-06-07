import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatch = await argon.verify(user.passwordHash, dto.password);

    if (!pwMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          passwordHash: hash,
        },
      });

       return this.signToken(user.id, user.email);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw e;

    }
  }

  
  async signToken(userId: number, email: string): Promise<{accessToken: string}> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    return {
      accessToken: await this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret,
      })
    }
  }
}
