import {Body, Controller, Inject, Post, Res} from '@nestjs/common';
import { ResultService } from 'src/Service/result.service';
import { AgentService } from 'src/service/agents.service';
import { shopInitializationService } from 'src/service/shopInitialization.service';
import { ShopAgent } from 'src/service/shopAgents.service';
import { JsonService } from 'src/service/jsonFile.service';

interface PlantFormData {
  maxCost: number;
  color: string;
  colorPriority: number;
  dificult: number;
  dificultPriority: number;
  wateringFrequency: number;
  wateringFrequencyPriority: number;
  size: number;
  sizePriority: number;
  sunlight: number;  
  sunlightPriority: number;
  harmfullness: number;
  harmfullnessPriority: number;
}
let data = [], agents = [], shopAgents = [], functions = [];
let questionToShop, questionToClient, sellerNumber, agentsNumber, shops;
let webRender = async()=>{};

@Controller()
export class ResultController {
  constructor(
    @Inject(ResultService)
    private readonly resultService: ResultService, 
    private readonly sshopInitializationService: shopInitializationService,
    private readonly jsonService: JsonService,
  ) {}
/// wejscie na adres
  @Post('result')
  async getDataAndSend(@Body() FormData: PlantFormData, @Res() res) {
    data = []; agents = []; shopAgents = []; functions = [];

    this.resultService.emitEvent('clientData', FormData);

    webRender = async () => {
      res.render('result', { data })
    };
  }
///
/// inicjalizacja + oczekiwanie na dane od użytkownika
  async onModuleInit() {
    sellerNumber = 12; agentsNumber = 25;
    this.sshopInitializationService.initialization( await this.resultService.findAllPlant(), sellerNumber)

    this.resultService.onEvent('clientData', async(formData) => {
      let i = 0;
      do{
        let temp = new AgentService;
        temp.setFormData(formData);
        agents.push(temp);

        this.startClientAgentNegotiation(i);

        //functions.push(questionToClient = async (plant) => {
          //await agents[i].setPlanttoClient(plant);
        //})
        i++;
      }while(i < agentsNumber);

      shops = await this.jsonService.readDataFile();

      i = 0;
      do{
        let temp = new ShopAgent;
        temp.setShop(shops[i]);
        shopAgents.push(temp);

        i++;
      }while(i < sellerNumber);

      await this.resultService.emitEvent('endNegotiation', "end");
    });
    await this.sendDataToUser();
  }
///
/// negocjacja agenta klienta
  async startClientAgentNegotiation(agentIndex) {
    let i = 0
    do{
      if(shopAgents[i].getAvailability()){
        this.negotiationShop(i, agents[agentIndex].getSimpleFormData())
        // start negocjacji z obecnym i wymyślić zakończenie
      }
      i++
    }while(i < sellerNumber)
    // podanie parametrow (bez priorytetow i ceny)
    // start petli, dyskusji
    // odbior propozycji
    // zaakceptowanie lub odrzucenie (do np 10 odrzuceń)
    // przypisanie propozycji bądź dalsze poszukiwanie agenta sklepu (do np. 10 nieudanych)
  }
///
/// negocjacja z sklepem
  async negotiationShop(agentIndex, simpleFormData) {
    shopAgents[agentIndex].changeAvailability(false);
    let planList = shopAgents[agentIndex].compareData(simpleFormData);
    return plantList//zwrocic to co podał agent sklepu
    //zaproponowanie czegos
  }
///
/// przesłanie danych do wyświetlenia i zebranie wyników
  async sendDataToUser() {
    this.resultService.onEvent('endNegotiation', async(response) => {
      //zebranie propozycji od agentow + oczekiwanie na nie
      webRender();
    });
  }
///
}