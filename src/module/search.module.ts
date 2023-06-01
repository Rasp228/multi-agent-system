import { Module } from '@nestjs/common';
import { SearchController } from '../Controller/search.controller';
import { SearchService } from '../Service/search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
