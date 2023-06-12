import {
    Controller,
    Get,
    Res
  } from '@nestjs/common';
  
  @Controller()
  export class selectedController {
  
    @Get('selected')
    async page(@Res() res) {
      return res.render('selected');
    }
  }
  