import {
  Controller,
  Get,
  Inject,
  Res
} from '@nestjs/common';
import { AgentsService } from 'src/service/agents.service';
  
@Controller()
export class ResultController {
  constructor(
    @Inject(AgentsService)
    private readonly agentsService: AgentsService,
  ) {}

  @Get('result')
  async page(@Res() res) {
    this.agentsService.onEvent('sellerResponse', (response) => {
      // Tutaj umieść logikę przetwarzania odpowiedzi sprzedawcy
      console.log('Otrzymano odpowiedź od sprzedawcy:', response);
      return res.render('result', { response });
    });
  }
}
  