import {
    Body,
    Controller, Inject, Post, Res 
  } from '@nestjs/common';
import { AgentsService } from 'src/service/agents.service';
  
interface PlantFormData {
    color: string;
    dificult: number;
    wateringFrequency: number;
    size: number;
    sunlight: number;
    harmfullness: number;
}

@Controller()
export class AgentsController {
    constructor(
        @Inject(AgentsService)
        private readonly agentsService: AgentsService,
    ) {}

    @Post('agents')
    async getDataAndSend(@Body() FormData: PlantFormData) {
        console.log(FormData);
        this.agentsService.emitEvent('clientData', FormData);
    }

    async onModuleInit() {
        this.agentsService.onEvent('clientData', async(formData) => {
        // TODO umieścić logikę odpowiedzi sprzedawcy na dane klienta
        console.log('Otrzymano dane od klienta:', formData);

        // Przykładowa odpowiedź sprzedawcy
        const response = {
            message: 'Odpowiedź od sprzedawcy',
            suggestion: 'Propozycja rośliny',
        };

        this.agentsService.emitEvent('sellerResponse', response);
        });
        this.sendResponseToClients();
    }

    async sendResponseToClients() {
        this.agentsService.onEvent('sellerResponse', async(response) => {
            await console.log('Otrzymano dane od sprzedawcy:', response);
            await this.agentsService.emitEvent('sellerResponseToClient', response);
        });
    }
}
  