import { Module } from '@nestjs/common';
import { ResultController } from '../Controller/result.controller';
import { ResultService } from '../Service/result.service';
import { AgentService } from 'src/service/agents.service';
import { ShopAgent } from 'src/service/shopAgents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plant } from 'src/entity/plant.entity';
import { shopInitializationService } from 'src/service/shopInitialization.service';
import { JsonService } from 'src/service/jsonFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([plant])],
  controllers: [ResultController],
  providers: [ResultService, AgentService, ShopAgent, shopInitializationService, JsonService],
})
export class ResultModule {}
