import { Module } from '@nestjs/common';
import { HomeController } from '../Controller/home.controller';
import { HomeService } from '../Service/home.service';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
