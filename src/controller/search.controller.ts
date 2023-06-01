import {
    Controller,
    Get,
    Res
  } from '@nestjs/common';
  
  @Controller()
  export class SearchController {
  
    @Get('search')
    async page(@Res() res) {
      return res.render('search');
    }
  }
  