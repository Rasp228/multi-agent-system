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

interface Plant {
  ID: number;
  shopID: number;
  name: string;
  color: string;
  dificult: number;
  wateringFrequency: number;
  size: number;
  sunlight: number;
  harmfullness: number;
  images: string;
  price: number;
}
let data = [], agents = [], shopAgents = [];
let sellerNumber, agentsNumber, shops;
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
    data = []; agents = []; shopAgents = [];

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
      const promises = [];
      shops = await this.jsonService.readDataFile();

      do{
        let temp = new ShopAgent;
        temp.setShop(shops[i]);
        shopAgents.push(temp);

        i++;
      }while(i < sellerNumber);

      i = 0;
      do{
        let temp = new AgentService;
        temp.setFormData(formData);
        agents.push(temp);

        promises.push(this.startClientAgentNegotiation(i));

        i++;
      }while(i < agentsNumber);

      await Promise.all(promises);

      this.resultService.emitEvent('endNegotiation', "end");
    });
    await this.sendDataToUser();
  }
///
/// negocjacja agenta klienta
  async startClientAgentNegotiation(agentIndex) {
    console.log(`Rozpoczęcie dla agenta ${agentIndex}`);
    let i = 0
    do{
      let tempTab = this.generateRandomNumbers(sellerNumber, 0, sellerNumber-1) as number[];
      if(shopAgents[tempTab[i]].getAvailability()){
        let plantList: Plant[] = await this.negotiationShop(i, agents[agentIndex].getSimpleFormData());
        agents[agentIndex].setProposition(plantList);
        console.log(`Zakończenie dla agenta ${agentIndex}`);
        return;
      }else{
        i--
      }
      i++
    }while(i < sellerNumber)
  }
///
/// negocjacja z sklepem
  async negotiationShop(agentIndex, simpleFormData): Promise<Plant[]> {
    shopAgents[agentIndex].changeAvailability(false);
    let plantList = shopAgents[agentIndex].compareData(simpleFormData);
    shopAgents[agentIndex].changeAvailability(true);
    return plantList;
  }
///
/// przesłanie danych do wyświetlenia i zebranie wyników
  async sendDataToUser() {
    this.resultService.onEvent('endNegotiation', async(response) => {
      let i = 0;
      do{
        data[i] = await agents[i].findBestMatchedPlant();
        i++;
      }while(i<agentsNumber)
      webRender();
    });
  }
///
  generateRandomNumbers(quantity, min, max){
    const numbers = new Set();
    while (numbers.size < quantity){
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(randomNumber);
    }
    return Array.from(numbers);
  }
}