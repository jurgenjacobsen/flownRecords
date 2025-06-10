import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    AuthModule, 
    UserModule, 
    PrismaModule, GeneralModule
  ],
})
export class AppModule {}
