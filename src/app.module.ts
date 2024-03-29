import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './module/home.module';
import { SearchModule } from './module/search.module';
import { ResultModule } from './module/result.module';
import { ErrorModule } from './module/error.module';
import { AgentService } from './service/agents.service';
import { ShopAgent } from './service/shopAgents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plant } from './entity/plant.entity';
import { selectedController } from './controller/selected.controller';

@Module({
  imports: [HomeModule, SearchModule, ResultModule, ErrorModule, 
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'shops_database',
    entities: [plant],
    synchronize: true,
  }),],
  controllers: [AppController, selectedController],
  providers: [AppService, AgentService, ShopAgent],
})
export class AppModule {}
