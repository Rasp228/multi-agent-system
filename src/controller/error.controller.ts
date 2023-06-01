import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('error')
export class ErrorController {
  @Get(':id')
  display(@Param('id') id, @Res() res) {
    const message = ErrorController.getMessage(id);
    return res.render('error', { message });
  }

  public static getMessage(id: string): string {
    let message = 'Coś jest nie tak :/...';

    switch (id) {
        case '1':
            message = 'Strona nie istnieje';
            break;
        case '2':
            message = "";
            break;
        case '3':
            message = "";
            break;
    }
    return message;
  }
}
