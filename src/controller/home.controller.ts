import {
    Controller,
    Get,
    Res
  } from '@nestjs/common';
  
  @Controller()
  export class HomeController {
  
    @Get('home')
    async page(@Res() res) {
      return res.render('home');
    }
  }
  