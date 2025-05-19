import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AviwxController } from './aviwx/aviwx.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController, AviwxController],
  providers: [AppService],
})
export class AppModule {}
