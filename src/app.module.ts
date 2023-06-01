import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './module/home.module';
import { SearchModule } from './module/search.module';
import { ResultModule } from './module/result.module';
import { ErrorModule } from './module/error.module';
import { AgentsModule } from './module/agents.module';

@Module({
  imports: [HomeModule, SearchModule, ResultModule, ErrorModule, AgentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
