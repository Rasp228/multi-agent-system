import { Module } from '@nestjs/common';
import { ResultController } from '../Controller/result.controller';
import { ResultService } from '../Service/result.service';
import { AgentsService } from '../service/agents.service';
import { AgentsModule } from './agents.module';

@Module({
  controllers: [ResultController],
  providers: [ResultService, AgentsService],
  imports: [AgentsModule]
})
export class ResultModule {}
