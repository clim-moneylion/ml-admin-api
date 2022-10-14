import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReposModule } from './repos/repos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ReposModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
