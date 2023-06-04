import { Module } from '@nestjs/common';
import { ResultController } from '../Controller/result.controller';
import { ResultService } from '../Service/result.service';
import { AgentService } from 'src/service/agents.service';
import { ShopAgent } from 'src/service/shopAgents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shop } from 'src/entity/shop.entity';
import { plant } from 'src/entity/plant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([shop, plant])],
  controllers: [ResultController],
  providers: [ResultService, AgentService, ShopAgent],
})
export class ResultModule {}
