import { Module } from '@nestjs/common';
import { AgentsController } from 'src/controller/agents.controller';
import { AgentsService } from 'src/service/agents.service';

@Module({
  controllers: [AgentsController],
  providers: [AgentsService]
})
export class AgentsModule {}
