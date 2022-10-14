import { Module, Post } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReposController } from './repos.controller';
import { ReposService } from './repos.service';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [ReposController],
    providers: [ReposService],
    exports: [ReposService]
})
export class ReposModule {
}
